import React, { useState } from 'react';
import {
  Card, CardBody,
  CardTitle, Button, Form, FormGroup, Input
} from 'reactstrap';
import Layout from "../Layout/layout";


const Login = () => {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const submitForm = () => {
    console.log('object', username, password)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };
    fetch('http://liberrands.smileserviceslib.com/index.php/api/auth/login', requestOptions)
      .then(response => response.json())
      .then(data => console.log('check data', data));
  };

  return (
    <Layout>
      <div>
        <Card>
          <CardBody className="container">
            <CardTitle tag="h5" > Sign In to Elance </CardTitle>
            <Form>
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
                  type="password"
                  name="Password"
                  id="examplePassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button onClick={submitForm}>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;