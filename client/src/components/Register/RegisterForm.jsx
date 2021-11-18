import React, { Component } from "react";
import Form from "../Shared/Form";
import Joi from "joi-browser";
import { Panel, FlexboxGrid, Form as Wrapper, Row, Col } from "rsuite";
import Loader from "../Shared/Loader";
import { toast } from "react-toastify";
import { register } from "../../services/userService";
import { sendEmailRegister } from "../../services/emailService";
class RegisterForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      userName: "",
      phoneNo: "",
      email: "",
      firstPassword: "",
      password: "",
      isAdmin: 0,
    },
    errors: {},
  };

  schema = {
    firstName: Joi.string().required().min(2).max(50).label("First Name"),
    lastName: Joi.string().required().min(2).max(50).label("Last Name"),
    userName: Joi.string().required().min(2).max(50).label("User Name"),
    phoneNo: Joi.string().required().min(14).max(14).label("Phone No."),
    email: Joi.string().email().required().min(5).max(50).label("Email"),
    firstPassword: Joi.string().required().label("Password"),
    password: Joi.string().required().label("Password"),
    isAdmin: Joi.label("Administrator"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { handleSetActiveTab } = this.props;
      let user = await register(
        data.firstName,
        data.lastName,
        data.userName,
        data.phoneNo,
        data.email,
        data.password,
        data.isAdmin
      );
      if (user.id) {
        this.props.history.push("/login");

        //handleSetActiveTab("Login");
        // await sendEmailRegister(
        //   user.email,
        //   `${user.firstName} ${user.lastName}`
        // );
      } else {
        toast.error("There was an unknow error. Please try again later.");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
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
          <Panel className="panel-border" header={<h3>Register</h3>} bordered>
            <form onSubmit={this.handleSubmit}>
              <Row className="show-grid">
                <Col xs={24} sm={24} md={8}>
                  {this.renderRSInputFormGroupItem(
                    "First Name",
                    "avatar",
                    "text",
                    "firstName",
                    false
                  )}
                </Col>
                <Col xs={24} sm={24} md={8}>
                  {this.renderRSInputFormGroupItem(
                    "Last Name",
                    "avatar",
                    "text",
                    "lastName",
                    false
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={16}>
                  {this.renderRSInputFormGroupItem(
                    "Email",
                    "envelope",
                    "text",
                    "email",
                    false
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={16}>
                  {this.renderRSInputFormGroupItem(
                    "User Name",
                    "avatar",
                    "text",
                    "userName",
                    false
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={16}>
                  {this.renderRSInputFormGroupItem(
                    "Phone No.",
                    "phone",
                    "text",
                    "phoneNo",
                    false
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={8}>
                  {this.renderRSInputFormGroupItem(
                    "Password",
                    "unlock",
                    "password",
                    "firstPassword",
                    false
                  )}
                </Col>
                <Col xs={24} sm={24} md={8}>
                  {this.renderRSInputFormGroupItem(
                    "Confirm Password",
                    "unlock",
                    "password",
                    "password",
                    false
                  )}
                </Col>
              </Row>
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

export default RegisterForm;
