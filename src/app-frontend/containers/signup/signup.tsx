import React, {useState} from 'react';
import {Button, Card, CardBody, CardTitle, Form, FormGroup, Input} from 'reactstrap';
import Layout from "../layout/layout";
import {jsonRequest} from "../../../api/request/request";
import {REGISTER} from "../../../api/routing/routes/backend.app";
import {useForm} from "react-hook-form";

const Signup = () => {
  
  const [isLoading, setLoading] = useState(false);
  
  const {handleSubmit, register} = useForm();
  
  const submitForm = async (values: any) => {
    const {firstName, lastName, username, email, password} = values;
    setLoading(true);
    
    const requestOptions = {
      method : 'POST',
      headers: {'Content-Type': 'application/json'},
      body   : JSON.stringify({firstName, lastName, username, email, password})
    };
    
    try{
      let response = await jsonRequest(REGISTER, requestOptions);
      let json = await response.json();
      
      
    }catch (e) {
      throw e;
    }finally {
      setLoading(false);
    }
    
  };
  
  return (
    <Layout>
      <div>
        <Card>
          <CardBody className="container">
            <CardTitle tag="h5"> Create Your Account</CardTitle>
            <Form onSubmit={handleSubmit(submitForm)}>
              <FormGroup>
                <Input
                  type="text"
                  id="firstname"
                  placeholder="First Name"
                  {...register('firstName')}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  id="lastname"
                  placeholder="Last Name"
                  {...register('lastName')}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  id="username"
                  placeholder="User Name"
                  {...register('username')}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  id="exampleEmail"
                  placeholder="Email"
                  {...register('email')}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  id="examplePassword"
                  placeholder="Password"
                  {...register('password')}
                />
              </FormGroup>
              <Button onClick={submitForm} disabled={isLoading}>Signup</Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;