import React from "react";
import { Panel, FlexboxGrid, Form as Wrapper, Card } from "rsuite";
import { Link } from "react-router-dom";
import Form from "../Shared/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { sendEmailForgotPW } from "../../services/emailService";
class ForgotPWEmailForm extends Form {
  state = {
    data: {
      email: "",
    },
    errors: {},
    submitted: false,
  };

  schema = {
    email: Joi.string().email().required().min(5).max(50).label("Email"),
  };

  doSubmit = async () => {
    try {
      const { data, errors } = this.state;

      const { data: result } = await sendEmailForgotPW(data.email);
      const { completed } = result;
      console.log("result from submit to forgotten password", result);
      if (result) {
        this.setState({
          data: {
            email: "",
          },
          submitted: true,
        });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };

        errors.email = ex.response.status;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { submitted } = this.state;
    if (submitted)
      return (
        <div className="row">
          <div className="col d-flex justify-content-center mt-3">
            <Panel
              className="form-width panel-border"
              bordered
              style={{ marginTop: "100px" }}
            >
              <p>
                <strong>
                  If that account is in our system, we will email you a link to
                  reset your password.
                </strong>
              </p>
            </Panel>
          </div>
        </div>
      );
    else
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
                {this.renderRSInputFormGroupItem(
                  "Email",
                  "envelope",
                  "text",
                  "email",
                  false
                )}
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
