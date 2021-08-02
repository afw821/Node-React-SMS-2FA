import React from "react";
import Form from "../Shared/Form";
import { login, getSMSCode } from "../../services/authService";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Loader from "../Shared/Loader";
import { Panel, FlexboxGrid, Form as Wrapper } from "rsuite";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      loginPassword: "",
    },
    errors: {},
    showLoader: false,
  };

  schema = {
    username: Joi.string().required().label("Username"),
    loginPassword: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      this.setState({ showLoader: true });
      const { data } = this.state;
      const { user, validPassword } = await getSMSCode(
        data.username,
        data.loginPassword
      );
      console.log("ispwvalid", validPassword);
      console.log("user", user);
      if (validPassword) window.location = `/authenticate/${user.id}`;
      //window.location = "/validationCode";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors, showLoader: false });
      }
    }
  };

  render() {
    return (
      <>
        <div className="row login-loader">
          <div className="col d-flex justify-content-center">
            <Loader showLoader={this.state.showLoader} />
          </div>
        </div>
        <FlexboxGrid align="bottom" justify="center">
          <Panel className="panel-border" header={<h3>Login</h3>} bordered>
            <form onSubmit={this.handleSubmit}>
              {this.renderRSInputFormGroupItem(
                "User Name",
                "avatar",
                "text",
                "username",
                false
              )}
              {this.renderRSInputFormGroupItem(
                "Password",
                "lock",
                "password",
                "loginPassword",
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
                    <Link to="/passwordRecovery"> Forgotten Password?</Link>
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

export default LoginForm;
