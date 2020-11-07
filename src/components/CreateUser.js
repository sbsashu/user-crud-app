import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateUser extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const userObject = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
    };

    axios.post('http://localhost:4000/user/create-user', userObject)
      .then(res => console.log(res.data));

    this.setState({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    });
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={this.state.username} onChange={this.onChange} />
        </Form.Group>
        <Form.Group controlId="Name">
          <Form.Label>FirstName</Form.Label>
          <Form.Control type="text" name="firstName" value={this.state.firstName} onChange={this.onChange} />
        </Form.Group>
        <Form.Group controlId="Name">
          <Form.Label>LastName</Form.Label>
          <Form.Control type="text" name="lastName" value={this.state.lastName} onChange={this.onChange} />
        </Form.Group>
        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={this.state.email} onChange={this.onChange} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create User
        </Button>
      </Form>
    </div>);
  }
}
