import React, { useState } from 'react';
import {
  Card, CardBody,
  CardTitle, Button, Form, FormGroup, Input
} from 'reactstrap';
import Layout from "../layout/layout";
import {jsonRequest} from "../../api/request/request";
import {CATEGORIES_LIST, REGISTER} from "../../api/routing/routes/dashboard";

const Signup = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, username, email, password })
    };

    jsonRequest(REGISTER, requestOptions)
        .then(response => response.json())
        .then(json => {});
  };

  return (
    <Layout>
      <div>
        <Card>
          <CardBody className="container">
            <CardTitle tag="h5"> Create Your Account</CardTitle>
            <Form>
              <FormGroup>
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Email/User Name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="Password"
                  id="examplePassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button onClick={submitForm}>Signup</Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;