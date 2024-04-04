import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div>
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link className="btn border-1 bg-success text-white px-5 py-2" to="/" >Login Page</Link>
      </div>
    </div>
  );
}
