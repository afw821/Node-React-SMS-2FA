import React, { Component } from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import Joi from "joi-browser";
import {
  InputGroup,
  Input,
  Icon,
  ControlLabel,
  FormGroup,
  FormControl,
  Message,
  Button,
  IconButton,
  ButtonGroup,
  ButtonToolbar,
} from "rsuite";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  doPasswordsMatch = (password, firstPassword) => {
    if (firstPassword !== password) {
      console.log("pw must match");
      return "Passwords must match";
    } else {
      console.log("else");
      return "Passwords match!";
    }
  };

  validateOnSubmit = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  isPhoneNumberValid = ({ value: phoneNo }, phoneNumberLength) => {
    if (0 < phoneNumberLength && phoneNumberLength < 10)
      return "Full Phone No. Required";
    else return "";
  };

  formatPhoneNo = (value) => {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;

    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "");

    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNoLength = phoneNumber.length;
    console.log("Phone length", phoneNoLength);
    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early
    if (phoneNoLength < 4)
      return {
        formatted: phoneNumber,
        phoneNoLength,
      };

    // if phoneNoLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNoLength < 7)
      return {
        formatted: `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`,
        phoneNoLength,
      };
    // finally, if the phoneNoLength is greater then seven, we add the last
    // bit of formatting and return it.
    const formatted = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
    return {
      formatted,
      phoneNoLength,
    };
  };

  handleChange = (value, { currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    switch (input.name) {
      case "password":
        console.log("Made it to password");
        const firstPassword = data.firstPassword;
        console.log("firstpw", firstPassword);
        const pwErrorMessage = this.doPasswordsMatch(
          input.value,
          firstPassword
        );
        errors[input.name] = pwErrorMessage;

        data[input.name] = input.value;
        this.setState({ data, errors });
        break;
      default:
        if (input.name === "phoneNo") {
          const { formatted, phoneNoLength } = this.formatPhoneNo(input.value);
          //const errorMessage = this.validateProperty(input);
          const errorMessage = this.isPhoneNumberValid(input, phoneNoLength);
          if (errorMessage) errors[input.name] = errorMessage;
          else delete errors[input.name];

          data[input.name] = formatted;
          this.setState({ data, errors });
        } else {
          const errorMessage = this.validateProperty(input);
          if (errorMessage) errors[input.name] = errorMessage;
          else delete errors[input.name];

          data[input.name] = input.value;
          this.setState({ data, errors });
        }
    }
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //error handling
    const errors = this.validateOnSubmit();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  //   renderInlineFormGroup(name, label, type = "text") {
  //     const { data, errors } = this.state;
  //     return (
  //       <InlineFormGroup
  //         label={label}
  //         name={name}
  //         type={type}
  //         value={data[name] || ""}
  //         error={errors[name]}
  //         handleChange={this.handleChange}
  //       />
  //     );
  //   }

  //   renderInlineFormSelect(name, label, type = "text", options, value) {
  //     return (
  //       <div className="form-group row">
  //         <label htmlFor={name} className="col-sm-2 col-form-label">
  //           {label}
  //         </label>
  //         <div className="col-sm-10">
  //           <select
  //             className="custom-select my-1 mr-sm-2"
  //             name={name}
  //             value={value}
  //             onChange={this.handleChange}
  //             id={name}
  //           >
  //             <option>Choose...</option>
  //             {options.map((state) => (
  //               <option key={state.key} value={state.key}>
  //                 {state.value}
  //               </option>
  //             ))}
  //           </select>
  //         </div>
  //       </div>
  //     );
  //   }

  //   renderInput(name, label, type = "text") {
  //     const { data, errors } = this.state;

  //     const returnClassName = (errors) => {
  //       if (errors.password === "Passwords must match")
  //         return "alert alert-danger";
  //       else if (errors.password === '"Password" is not allowed to be empty')
  //         return "alert alert-danger";
  //       else return "alert alert-success";
  //     };
  //     console.log("after function");
  //     return (
  //       <>
  //         <Input
  //           error={errors[name]}
  //           name={name}
  //           value={data[name]}
  //           label={label}
  //           handleChange={this.handleChange}
  //           type={type}
  //         />
  //         {name !== "password" && errors[name] && (
  //           <div className="alert alert-danger">{errors[name]}</div>
  //         )}
  //         {name === "password" && errors[name] && (
  //           <div className={returnClassName(errors)}>{errors[name]}</div>
  //         )}
  //       </>
  //     );
  //   }

  //   renderTextArea(name, label, type, rows) {
  //     const { data, errors } = this.state;
  //     return (
  //       <TextArea
  //         name={name}
  //         value={data[name]}
  //         label={label}
  //         onChange={this.handleChange}
  //         type={type}
  //         error={errors[name]}
  //         rows={rows}
  //       />
  //     );
  //   }

  //   renderDropDownList(name, label, type, options, selectedItem) {
  //     const { data, errors } = this.state;
  //     return (
  //       <DropDownList
  //         error={errors[name]}
  //         name={name}
  //         label={label}
  //         options={options}
  //         handleChange={this.handleChange}
  //         selectedItem={selectedItem}
  //       />
  //     );
  //   }

  //   renderSelect(label, options, name) {
  //     return (
  //       <select
  //         name={name}
  //         onChange={this.handleChange}
  //         className="browser-default custom-select"
  //         style={{ border: "none" }}
  //       >
  //         <option>{label}</option>
  //         {options.map((state) => (
  //           <option key={state.key} value={state.key}>
  //             {state.value}
  //           </option>
  //         ))}
  //       </select>
  //     );
  //   }

  handleDeleteError = (name) => {
    const errorClone = { ...this.state.errors };
    delete errorClone[name];
    this.setState({ errors: errorClone });
  };

  returnBgColor = (errors) => {
    if (errors.password === "Passwords must match") return "pink lighten-4";
    else if (errors.password === '"Password" is not allowed to be empty')
      return "pink lighten-4";
    else return "green lighten-4";
  };

  renderRSInputFormGroupItem(label, icon, type, name, disabled) {
    const { data, errors } = this.state;
    const styles = { width: 300, marginBottom: 10 };
    return (
      <>
        <InputGroup className="mb-3" inside>
          <InputGroup.Addon>
            {" "}
            <Icon icon={icon} />
          </InputGroup.Addon>
          <Input
            className="input-width"
            onChange={this.handleChange}
            type={type}
            value={data[name]}
            disabled={disabled}
            name={name}
            placeholder={label}
          />
        </InputGroup>
        {name !== "password" && errors[name] && (
          <Message
            closable={true}
            showIcon
            title="Error"
            description={errors[name]}
            type="error"
            onClose={() => this.handleDeleteError(name)}
          />
        )}
        {name === "password" && errors[name] && (
          <Message
            closable={true}
            showIcon
            title="Error"
            description={errors[name]}
            type="error"
            onClose={() => this.handleDeleteError(name)}
          />
        )}
      </>
    );
  }

  //   renderInputFormRow(label, icon, type, name, label2, icon2, type2, name2) {
  //     const { data, errors } = this.state;
  //     return (
  //       <div className="form-row">
  //         <div className="col">
  //           <MDBInput
  //             name={name}
  //             label={label}
  //             value={data[name]}
  //             icon={icon}
  //             group
  //             type={type}
  //             onChange={this.handleChange}
  //           />
  //           {errors[name] && (
  //             <div className="alert alert-danger">{errors[name]}</div>
  //           )}
  //         </div>
  //         <div className="col">
  //           <MDBInput
  //             name={name2}
  //             label={label2}
  //             value={data[name2]}
  //             group
  //             type={type2}
  //             onChange={this.handleChange}
  //           />
  //           {name2 !== "password" && name2 !== "email" && errors[name2] && (
  //             <div className="alert alert-danger">{errors[name2]}</div>
  //           )}
  //           {name2 === "password" && errors[name2] && (
  //             <div
  //               className={
  //                 errors.password === "Passwords must match"
  //                   ? "alert alert-danger"
  //                   : "alert alert-success"
  //               }
  //             >
  //               {errors[name2]}
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     );
  //   }
  renderBtn(label, type, appearance) {
    return (
      <Button appearance={appearance} type={type}>
        {label}
      </Button>
    );
  }
}

export default Form;
