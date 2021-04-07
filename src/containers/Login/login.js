import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Form, FormGroup, Input
} from 'reactstrap';



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
        .then(data => console.log('check data', data))
    }

    return (<div>
        <Card>
            <CardBody className="container">
                <CardTitle tag="h5" > Sign In to Elance </CardTitle>
                {/* <div className="dflex justify-space-around">
                    <Button> Continue with Facebook </Button>
                    <Button> Continue with Google </Button>
                    <Button> Continue with Apple </Button>
                </div> */}
                {/* <p> OR </p> */}
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
    </div>);
}

export default Login;