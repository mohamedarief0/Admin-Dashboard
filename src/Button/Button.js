import React from "react";
export default function Button(props) {
  return (
    <button type={props.type} className={`${props.btncolor}`}>
      {props.label}
    </button>
  );
}
//{ label, btncolor, type } parameter as object or use props