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
      this.setState({ showLoader: true });
      const {
        token: validPWToken,
        handleSetValidPwToken,
        handleSetUser,
        history,
      } = this.props;
      const user = decodeToken(validPWToken);

      const { data } = this.state;

      const { token: result } = await login(data.validationCode, user.id);

      if (result) {
        //clear valid pw token
        handleSetValidPwToken(null);
        //go to Landing page
        //window.location = `/userPage/${user.id}`;
        handleSetUser(user);
        history.push(`/userPage/${user.id}`);
      }
      //window.location = "/user";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.validationCode = ex.response.data;
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
            </form>
          </Panel>
        </FlexboxGrid>
      </>
    );
  }
}

export default ValidationCodeForm;
