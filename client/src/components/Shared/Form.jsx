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
    if (firstPassword !== password) return "Passwords must match";
    else return "Passwords match!";
  };

  validateOnSubmit = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleChange = (value, { currentTarget: input }) => {
    console.log("input.name", input.name);
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    switch (input.name) {
      case "password":
        const firstPassword = data.firstPassword;
        const pwErrorMessage = this.doPasswordsMatch(
          input.value,
          firstPassword
        );
        errors[input.name] = pwErrorMessage;
        break;
      default:
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
    }
    data[input.name] = input.value;
    this.setState({ data, errors });
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

  renderRSInputFormGroupItem(label, icon, type, name, disabled) {
    const { data, errors } = this.state;
    const styles = { width: 300, marginBottom: 10 };
    return (
      <>
        {/* <MDBInput
          name={name}
          value={data[name]}
          label={label}
          icon={icon}
          group
          type={type}
          id={name}
          onChange={this.handleChange}
        /> */}
        <InputGroup className="mb-3" inside>
          {/* <ControlLabel>{label}</ControlLabel> */}
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
        {errors[name] && (
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
