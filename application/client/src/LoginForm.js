import React from "react";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Field name="email" validate={validateEmail} />
          {errors.email && touched.email && <div>{errors.email}</div>}

        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={this.handleChange}
        />
        <label htmlFor="email">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={this.handleChange}
        />
        <button type="submit">Login</button>
      </form>
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      
    });
    let error;
      if (!value) {
        error = 'Required';
      } else if (!/[A-Za-z0-9]*@mail\.sfsu\.edu/i.test(value))
      {
        error = 'Invalid email address';
      }
      return error;
  };


  handleSubmit = event => {
    console.log("Submitting");
    console.log(this.state);
  };
}

function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/[A-Za-z0-9]*@mail\.sfsu\.edu/i.test(value))
   {
    error = 'Invalid email address';
  }
  return error;
}