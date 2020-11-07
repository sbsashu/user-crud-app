import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditUser extends Component {

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/user/edit-user/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          username: res.data.username,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
        });
      })
      .catch((error) => {
        console.log(error);
      })
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

    axios.put('http://localhost:4000/user/update-user/' + this.props.match.params.id, userObject)
      .then((res) => {
        console.log(res.data)
        console.log('User successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to User List 
    this.props.history.push('/create-user')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={this.state.username} onChange={this.onChange} />
        </Form.Group>
        <Form.Group controlId="Name">
          <Form.Label>FistName</Form.Label>
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
          Update User
        </Button>
      </Form>
    </div>);
  }
}
