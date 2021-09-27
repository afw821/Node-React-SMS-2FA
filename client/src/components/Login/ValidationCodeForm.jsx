import React from "react";
import Form from "../Shared/Form";
import { Panel, FlexboxGrid, Form as Wrapper } from "rsuite";
import { login } from "../../services/authService";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Loader from "../Shared/Loader";
import { decodeToken } from "../../services/authService";

class ValidationCodeForm extends Form {
  state = {
    data: {
      validationCode: null,
    },
    errors: {},
    showLoader: false,
  };

  schema = {
    validationCode: Joi.string().required().label("SMS Code"),
  };

  doSubmit = async () => {
    try {
      const token = sessionStorage.getItem("valid_pw_token");
      console.log("toekn from validaiton code form", token);
      const { id: userId } = decodeToken(token);
      console.log("userId validaiton code form", userId);
      this.setState({ showLoader: true });
      const { data } = this.state;

      const result = await login(data.validationCode, userId);
      console.log("result from do submit", result);
      //window.location = "/user";
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
          <Panel
            className="panel-border"
            header={<h3>Please enter the verification code:</h3>}
            bordered
          >
            <form onSubmit={this.handleSubmit}>
              {this.renderRSInputFormGroupItem(
                "Verification Code",
                "mobile",
                "text",
                "validationCode",
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

export default ValidationCodeForm;
