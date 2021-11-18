import React from "react";
import Form from "../Shared/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { updateForgetPw } from "../../services/passwordService";
import { isPwResetUrlStillActive } from "./../../services/authService";
import { Panel, FlexboxGrid } from "rsuite";
import { Link } from "react-router-dom";
class UpdateForgottenPWForm extends Form {
  state = {
    data: {
      firstPassword: "",
      password: "",
    },
    errors: {},
    submitted: false,
  };

  schema = {
    firstPassword: Joi.string().required().label("First Password"),
    password: Joi.string().required().label("Password"),
  };

  async componentDidMount() {
    const { token, userId } = this.props.match.params;
    const isTokenValid = await isPwResetUrlStillActive(token, userId);
    if (!isTokenValid) {
      this.props.history.push("/expiredLink");
    }
  }

  doSubmit = async () => {
    const { token, userId } = this.props.match.params;
    try {
      this.setState({ showLoader: true });
      const { data, errors } = this.state;

      const { data: result } = await updateForgetPw(
        userId,
        token,
        data.password
      );
      if (result.complete) {
        toast.success("Password Successfully Updated", {
          autoClose: 5000,
          closeOnClick: true,
        });
        this.setState({
          data: {
            firstPassword: "",
            password: "",
          },
          submitted: true,
        });
        //redirect to login
        setTimeout(() => {
          this.props.history.push("/login");
        }, 2000);
      }
    } catch (ex) {
      if (ex.response.status === 400 || ex.response.status === 404)
        toast.error(ex.response.data);
      else if (ex.response.status === 500)
        toast.error("There was an unexpected error");
    }
  };

  render() {
    return (
      <>
        <FlexboxGrid align="bottom" justify="center">
          <Panel className="panel-border" bordered>
            <form onSubmit={this.handleSubmit}>
              <p className="text-center mb-4">
                {" "}
                <strong> Please enter and confirm your new password</strong>
              </p>
              {this.renderRSInputFormGroupItem(
                "New Password",
                "lock",
                "password",
                "firstPassword",
                false
              )}
              {this.renderRSInputFormGroupItem(
                "Confirm Password",
                "lock",
                "password",
                "password",
                false
              )}
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  {this.renderBtn("Submit", "submit", "primary")}
                </div>
              </div>
            </form>
          </Panel>
        </FlexboxGrid>
      </>
    );
  }
}

export default UpdateForgottenPWForm;
