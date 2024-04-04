import React from "react";

export default function DashBoard() {
  return (
    <div className="">
      <header className="bg-dark text-light m-0 d-flex justify-content-center p-2">
        <h1>DevOps Essentials</h1>
      </header>

      <section className="mt-2">
        <div className="col-lg-12 d-flex align-items-center justify-content-between">
          <div className="col-6 ">
            <h2>Welcome to the World of DevOps</h2>
            <p>
              Empower your development and operations teams with DevOps
              practices to enhance collaboration, automate processes, and
              deliver high-quality software faster.
            </p>
          </div>
          <div className="col-6">{/* <Portfolio /> */}</div>
        </div>

        <h3>Key Features</h3>
        <ul>
          <li>Continuous Integration and Deployment (CI/CD)</li>
          <li>Infrastructure as Code (IaC)</li>
          <li>Automated Testing</li>
          <li>Containerization (Docker)</li>
          <li>Monitoring and Logging</li>
        </ul>

        <p>
          Get started with DevOps and transform your development lifecycle.
          Click below to explore more.
        </p>

        <a href="" className="btn btn-success text-light" role="button">
          Learn More
        </a>

        <h2 className="mt-3 mb-4">Learn DevOps - Roadmap</h2>

        <div className="row row-cols-2">
          <div className="col-sm-6">
            <h4>1. Version Control</h4>
            <p>
              Understand version control systems like Git. Learn branching,
              merging, and resolving conflicts.
            </p>
          </div>
          <div className="col">
            <h3>2. Continuous Integration (CI)</h3>
            <p>
              Explore CI tools like Jenkins or GitLab CI. Set up automated
              builds and tests for your projects.
            </p>
          </div>

          <div className="col">
            <h3>3. Infrastructure as Code (IaC)</h3>
            <p>
              Learn tools like Terraform or Ansible to manage infrastructure.
              Define infrastructure in code for automation.
            </p>
          </div>
          <div className="col">
            <h3>4. Containers and Orchestration</h3>
            <p>
              Master containerization with Docker. Explore orchestration tools
              like Kubernetes for managing containerized applications.
            </p>
          </div>
          <div className="col">
            <h3>5. Continuous Deployment (CD)</h3>
            <p>
              Implement CD pipelines to automate the deployment of applications.
              Ensure smooth delivery to production environments.
            </p>
          </div>

          <div className="col">
            <h3>6. Monitoring and Logging</h3>
            <p>
              Learn about monitoring tools (Prometheus, Grafana) and logging
              practices to ensure the health of your systems.
            </p>
          </div>

          <div className="col">
            <h3>7. Cloud Platforms</h3>
            <p>
              Explore cloud platforms like AWS, Azure, or Google Cloud.
              Understand how to leverage cloud services for your infrastructure.
            </p>
          </div>

          <div className="col">
            <h3>8. Collaboration and Communication</h3>
            <p>
              Emphasize collaboration using tools like Slack or Microsoft Teams.
              Understand the importance of effective communication in DevOps.
            </p>
          </div>
        </div>
      </section>

      {/* <!-- Additional sections, features, and information can be added as needed --> */}

      <footer className="bg-black text-light d-flex justify-content-center pt-3 ">
        <p>&copy; 2024 DevOps Essentials. All rights reserved.</p>
      </footer>
    </div>
  );
}
