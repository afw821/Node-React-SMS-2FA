import React from "react";
const Loader = ({ showLoader }) => {
  return (
    <div
      style={showLoader ? { "": "" } : { display: "none" }}
      className="spinner-border fast"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
