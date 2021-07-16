import React from "react";
import Form from "../Shared/Form";
import { MDBCard, MDBCardBody, MDBModalFooter } from "mdbreact";
import { login } from "../../services/authService";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Loader from "../Shared/Loader";

class ValidationCodeForm extends Form {
  state = {
    data: {
      validationCode: Number.MIN_VALUE,
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
      await login(data.username, data.loginPassword);

      window.location = "/products";
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
        <div className="row">
          <div className="col d-flex justify-content-center mt-3">
            <MDBCard className="form-width" style={{ marginTop: "100px" }}>
              <MDBCardBody>
                <form className="mt-4" onSubmit={this.handleSubmit}>
                  <p className="h5 text-center mb-4">Log In</p>
                  <div className="grey-text">
                    <div className="form-row">
                      <div className="col">
                        {this.renderMDBInput(
                          "Validation Code",
                          "mobile-alt",
                          "text",
                          "validationCode"
                        )}
                      </div>
                    </div>
                    <div className="row pb-3">
                      <div className="col">
                        {this.renderBtn("Login", "primary", "submit")}
                      </div>
                    </div>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      </>
    );
  }
}

export default ValidationCodeForm;
