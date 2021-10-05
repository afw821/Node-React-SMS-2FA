import React from "react";
import { Panel } from "rsuite";
import { Link } from "react-router-dom";
const ExpiredLink = () => {
  return (
    <div className="row">
      <div className="col d-flex justify-content-center mt-3">
        <Panel
          className="form-width"
          bordered
          style={{ marginTop: "100px", backgroundColor: "whitesmoke" }}
        >
          <p>
            It seems the link you clicked is expired. Please click{" "}
            <Link to="/passwordRecovery">here</Link> to return to the forgotten
            password page!
          </p>
        </Panel>
      </div>
    </div>
  );
};

export default ExpiredLink;
