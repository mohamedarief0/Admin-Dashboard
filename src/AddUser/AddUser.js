import React, { useState, useEffect } from "react";
import { PlusOutlined, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Space,
  Table,
  Checkbox,
  message,
  Modal,
  Image,
} from "antd";
import "./AddUser.css";
import { auth, db, storage } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function AddUser() {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [userData, setUserData] = useState({
    userId: "",
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    role: "",
    permission: [],
    profilePhoto: "",
  });
  const [individualCheckboxes, setIndividualCheckboxes] = useState({
    MainDashboard: false,
    PaymentTracking: false,
    Payment: false,
    Token: false,
    Adduser: false,
  });
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
  const [userList, setUserList] = useState([]); // each user from the data base to firebase
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Adminusers"));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ key: doc.id, ...doc.data() });
      });
      setUserList(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to fetch users. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUserToFirestore = async (userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = userCredential.user;
      const docRef = await addDoc(collection(db, "Adminusers"), {
        ...userData,
        uid: user.uid,
      });
      console.log("User data added to Firestore with ID: ", docRef.id);
      message.success("User added successfully!");
      fetchUsers(); // Fetch users after adding a new user
    } catch (error) {
      console.error("Error adding user data to Firestore: ", error);
      message.error("Failed to add user. Please try again.");
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleFormChange = (changedValues, allValues) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...allValues,
    }));

    // Check permissions based on selected role
    const role = changedValues.role || allValues.role;
    if (role === "SuperAdmin") {
      setIndividualCheckboxes({
        MainDashboard: true,
        PaymentTracking: true,
        Payment: true,
        Token: true,
        Adduser: true,
      });
      setSelectAllCheckbox(true);
    } else if (role === "Admin") {
      setIndividualCheckboxes({
        MainDashboard: true,
        PaymentTracking: true,
        Payment: false,
        Token: true,
        Adduser: false,
      });
      setSelectAllCheckbox(false);
    } else {
      setIndividualCheckboxes({
        MainDashboard: false,
        PaymentTracking: false,
        Payment: false,
        Token: false,
        Adduser: false,
      });
      setSelectAllCheckbox(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setUserData({
      userId: "",
      name: "",
      email: "",
      password: "",
      phoneNo: "",
      role: "",
      permission: [],
    });
    setFileList([]);
    setIndividualCheckboxes({
      MainDashboard: false,
      PaymentTracking: false,
      Payment: false,
      Token: false,
      Adduser: false,
    });
    setSelectAllCheckbox(false);
    setEditMode(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const userId = values.userId;
      const email = values.email;
      const phoneNo = values.phoneNo;
      console.log(userId);

      const userSnapshot = await getDocs(
        query(collection(db, "Adminusers"), where("email", "==", email))
      );
      const keySnapshot = await getDocs(
        query(collection(db, "Adminusers"), where("key", "==", userId))
      );
      const phoneNoSnapshot = await getDocs(
        query(collection(db, "Adminusers"), where("phoneNo", "==", phoneNo))
      );

      if (!userId || !email || !phoneNo) {
        message.error("Please fill in all required fields.");
        return;
      }

      const emailExists = !userSnapshot.empty;
      const phoneNoExists = !phoneNoSnapshot.empty;
      const keyExists = !keySnapshot.empty;

      if (emailExists && phoneNoExists && keyExists) {
        message.warning(
          "A user with the same email or phone number or key already exists."
        );
        return;
      } else if (keyExists) {
        message.warning("A user with the same key exists.");
        return;
      } else if (emailExists) {
        message.warning("A user with the same email already exists.");
        return;
      } else if (phoneNoExists) {
        message.warning("A user with the same phone number already exists.");
        return;
      }

      const permission = Object.keys(individualCheckboxes).filter(
        (key) => individualCheckboxes[key]
      );

      const currentDate = new Date();
      const day = currentDate.getDate();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = monthNames[currentDate.getMonth()];
      const year = currentDate.getFullYear();

      const userDataWithPermissions = {
        ...values,
        key: userData.userId || "",
        date: `${month}/${day}/${year}`,
        permission: permission,
        status: "Open",
      };

      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        const storageRef = ref(storage, `profilePhotos/${userId}`);
        await uploadBytes(storageRef, file);
        const profilePhotoURL = await getDownloadURL(storageRef);

        userDataWithPermissions.profilePhoto = profilePhotoURL;
      }

      if (editMode) {
        await updateUserInFirestore(userDataWithPermissions);
      } else {
        await addUserToFirestore(userDataWithPermissions);
      }

      setUserData((prevUserData) => ({
        ...prevUserData,
        ...userDataWithPermissions,
      }));

      form.resetFields();
      setFileList([]);
      setIndividualCheckboxes({
        MainDashboard: false,
        PaymentTracking: false,
        Payment: false,
        Token: false,
        Adduser: false,
      });
      setSelectAllCheckbox(false);
      setEditMode(false);
    } catch (error) {
      console.error("Error adding user:", error);
      message.error("Failed to add user. Please try again.");
    }
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;

    if (checked) {
      setIndividualCheckboxes({
        MainDashboard: true,
        PaymentTracking: true,
        Payment: true,
        Token: true,
        Adduser: true,
      });
    } else {
      setIndividualCheckboxes({
        MainDashboard: false,
        PaymentTracking: false,
        Payment: false,
        Token: false,
        Adduser: false,
      });
    }
    setSelectAllCheckbox(checked);
  };

  const handleIndividualChange = (e) => {
    const { name, checked } = e.target;

    if (individualCheckboxes[name] === checked) {
      return;
    }

    setIndividualCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));

    const allChecked = Object.values({
      ...individualCheckboxes,
      [name]: checked,
    }).every((checkbox) => checkbox);

    setSelectAllCheckbox(allChecked);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Permission",
      key: "permission",
      dataIndex: "permission",
      render: (permissions) => (permissions ? permissions.join(", ") : ""),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            <EditTwoTone />
          </a>
          <a onClick={() => showDeleteModel(record)}>
            <DeleteTwoTone />
          </a>
        </Space>
      ),
    },
  ];

  const updateUserInFirestore = async (userData) => {
    try {
      const userRef = doc(db, "Adminusers", userData.key);
      await updateDoc(userRef, userData);
      console.log("User data updated in Firestore");
      message.success("User updated successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error updating user data in Firestore: ", error);
      message.error("Failed to update user. Please try again.");
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setUserData(record);
    setIndividualCheckboxes(
      record.permission.reduce((acc, permission) => {
        acc[permission] = true;
        return acc;
      }, {})
    );
    setEditMode(true);
    fetchUsers();
  };

  // Function to handle delete action
  const showDeleteModel = (record) => {
    setSelectedUser(record);
    setDeleteModalVisible(true);
  };

  const handleDeleteUser = async () => {
    try {
      const key = selectedUser.key; // Get the key from the selectedUser object

      // Query Firestore to find the document with the matching key
      const userQuerySnapshot = await getDocs(
        query(collection(db, "Adminusers"), where("key", "==", key))
      );

      if (!userQuerySnapshot.empty) {
        // Get the document ID of the user
        const docId = userQuerySnapshot.docs[0].id;
        const userData = userQuerySnapshot.docs[0].data();

        // Delete the user's document from Firestore
        await deleteDoc(doc(db, "Adminusers", docId));

        // Delete the user's authentication record
        const user = await signInWithEmailAndPassword(auth, userData.email, userData.password);
        await deleteUser(user.user);

        // Delete the user's profile photo from Firebase Storage
        const profilePhotoRef = ref(storage, `profilePhotos/${key}`);
        await deleteObject(profilePhotoRef);

        message.success("User deleted successfully");
        setDeleteModalVisible(false);
      } else {
        console.error("User not found. Please try again.");
        message.error("Failed to delete user. User not found.");
      }
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user. Please try again.");
    }
  };

  // Inside the handleSaveChanges function
  const handleSaveChanges = async () => {
    try {
      const key = userData.key; // Get the key from userData state

      // Query Firestore to find the document with the matching key
      const userQuerySnapshot = await getDocs(
        query(collection(db, "Adminusers"), where("key", "==", key))
      );

      if (!userQuerySnapshot.empty) {
        // Get the document ID of the user
        const docId = userQuerySnapshot.docs[0].id;

        // Update the user's document with new data
        await updateDoc(doc(db, "Adminusers", docId), {
          ...userData,
          permission: Object.keys(individualCheckboxes).filter(
            (key) => individualCheckboxes[key]
          ),
        });
        form.resetFields();
        message.success("Changes saved successfully!");
        setEditMode(false); // Disable edit mode after saving changes
      } else {
        message.error("User not found. Please try again.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      message.error("Failed to save changes. Please try again.");
    }
    setIndividualCheckboxes({
      MainDashboard: false,
      PaymentTracking: false,
      Payment: false,
      Token: false,
      Adduser: false,
    });
    setSelectAllCheckbox(false);
  };

  const handleCancelEdit = () => {
    form.resetFields();
    setEditMode(false);
    setSelectAllCheckbox(false);
  };

  return (
    <div>
      <div className="AddUser-section">
        <h3 className="payment-title">Add user</h3>
        <div className="AddUser-bg-color">
          <Form
            form={form}
            name="horizontal_login"
            layout="vertical"
            className="grid-containers"
            onValuesChange={handleFormChange}
          >
            <div className="grid-container">
              <Form.Item
                name="userId"
                rules={[
                  { required: true, message: "Please input User ID!" },
                  {
                    validator: (_, value) => {
                      if (!value || value > 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("User ID must be a positive integer.")
                      );
                    },
                  },
                ]}
              >
                <Input prefix="" type="number" placeholder="User ID" />
              </Form.Item>

              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input Name!" }]}
              >
                <Input prefix="" type="text" placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input Email!" },
                  { type: "email", message: "Please input a valid Email!" },
                ]}
              >
                <Input prefix="" type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input Password!" },
                  {
                    pattern:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                    message:
                      "Password must be at least 8 characters long and include uppercase, lowercase, numeric, and special characters.",
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="phoneNo"
                rules={[
                  { required: true, message: "Please input Phone No!" },
                  {
                    pattern: /^\d{10}$/,
                    message: "Please input a valid Phone No!",
                  },
                ]}
              >
                <Input prefix="" type="number" placeholder="Phone No" />
              </Form.Item>
              <Form.Item
                name="role"
                // onChange={handleRoleChange}
                rules={[{ required: true, message: "Please select Role!" }]}
              >
                <Select placeholder="Role">
                  <Select.Option value="SuperAdmin">Super Admin</Select.Option>
                  <Select.Option value="Admin">Admin</Select.Option>
                </Select>
              </Form.Item>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
                className="btn-span"
              >
                <h6 className="me-3">User Permission:</h6>
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={selectAllCheckbox}
                >
                  Select All
                </Checkbox>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
                className="btn-span"
              >
                <Checkbox
                  name="MainDashboard"
                  checked={individualCheckboxes.MainDashboard}
                  onChange={handleIndividualChange}
                >
                  MainDashboard
                </Checkbox>
                <Checkbox
                  name="PaymentTracking"
                  checked={individualCheckboxes.PaymentTracking}
                  onChange={handleIndividualChange}
                >
                  PaymentTracking
                </Checkbox>
                <Checkbox
                  name="Payment"
                  checked={individualCheckboxes.Payment}
                  onChange={handleIndividualChange}
                >
                  Payment
                </Checkbox>
                <Checkbox
                  name="Token"
                  checked={individualCheckboxes.Token}
                  onChange={handleIndividualChange}
                >
                  Token
                </Checkbox>
                <Checkbox
                  name="Adduser"
                  checked={individualCheckboxes.Adduser}
                  onChange={handleIndividualChange}
                >
                  Adduser
                </Checkbox>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="btn-span"
              >
                <Form.Item>
                  <Button
                    size="large"
                    style={{ width: 200 }}
                    type="default"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    size="large"
                    style={{ width: 200 }}
                    type="primary"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  {editMode && (
                    <div style={{ marginTop: 16 }}>
                      <Button type="primary" onClick={handleSaveChanges}>
                        Save Changes
                      </Button>
                      <Button
                        style={{ marginLeft: 8 }}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </Form.Item>
              </div>
            </div>

            <Form.Item
              label={<h6>Profile Photo</h6>}
              // valuePropName="fileList"
              // name="profilePhoto"
              // getValueFromEvent={normFile}
            >
              <Upload
                name="profilePhoto"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
              {/* <Upload
                name="profilePhoto"
                listType="picture-card"
                fileList={fileList} // Ensure fileList is passed correctly
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleChange} // Ensure onChange handler is correct
              >
                {fileList.length === 0 && <PlusOutlined />}
              </Upload> */}
            </Form.Item>
          </Form>
        </div>
        <hr></hr>
      </div>
      <Table
        className="table-Adduser"
        columns={columns}
        dataSource={userList} // Pass userData as an array
      />
      {/* dlelte confirmation modal */}
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" onClick={handleDeleteUser}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
}

export default AddUser;
