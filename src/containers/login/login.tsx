import React, { useState } from 'react';
import {
  Card, CardBody,
  CardTitle, Button, Form, FormGroup, Input
} from 'reactstrap';
import Layout from "../layout/layout";
import {LOGIN} from "../../api/routing/routes/dashboard";
import {jsonRequest} from "../../api/request/request";


const Login = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setLoggedIn] = useState(false);

  const submitForm = () => {
    console.log('object', username, password)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };

    jsonRequest(LOGIN, requestOptions)
        .then(response => response.json())
        .then(json => {
          setLoggedIn(true);
        });
  };

  return (
    <Layout>
      <div>
        <Card>
          <CardBody className="container">
            <CardTitle tag="h5" > Sign In to {process.env.REACT_APP_WEBSITE_NAME} </CardTitle>
            {!isLoggedIn ? (
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
            ) : (
                <h1 className="text-center my-5">Successfully logged in to application</h1>
            )}

          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;