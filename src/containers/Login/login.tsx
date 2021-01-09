import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Form, FormGroup, Input
} from 'reactstrap';


export interface LoginProps {

}

const Login: React.SFC<LoginProps> = () => {
    return (<div>
        <Card>
            <CardBody>
                <CardTitle tag="h5" > Sign In to Elance </CardTitle>
                <Button> Continue with Facebook </Button>
                <Button> Continue with Google </Button>
                <Button> Continue with Apple </Button>
                <p> OR </p>
                <Form>
                    <FormGroup>
                        <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="Email/User Name" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="password"
                            name="Password"
                            id="examplePassword"
                            placeholder="Password" />
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    </div>);
}

export default Login;