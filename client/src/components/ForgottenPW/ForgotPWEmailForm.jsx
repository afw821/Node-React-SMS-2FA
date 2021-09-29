import React from "react";
import { Panel, FlexboxGrid, Form as Wrapper } from "rsuite";
import { Link } from "react-router-dom";
import Form from "../Shared/Form";
class ForgotPWEmailForm extends Form {
  state = {
    data: {
      email: "",
    },
    errors: {},
    submitted: false,
  };
  render() {
    return (
      <>
        <FlexboxGrid align="bottom" justify="center">
          <Panel className="panel-border" bordered>
            <form onSubmit={this.handleSubmit}>
              <p className="text-center mb-4">
                {" "}
                <strong>
                  {" "}
                  It happens to the best of us. Enter the email you registered
                  with and we'll send you reset instructions.
                </strong>
              </p>
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  {this.renderBtn("Submit", "submit", "primary")}
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <p>
                    <Link to="/login"> Forgotten Password?</Link>
                  </p>
                </div>
              </div>
            </form>
          </Panel>
        </FlexboxGrid>
      </>
    );
  }
}

export default ForgotPWEmailForm;
