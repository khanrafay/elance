import React, {useCallback, useState} from 'react';
import {
    Card, CardBody,
    CardTitle, Button, Form, FormGroup, Input
} from 'reactstrap';
import Layout from "../layout/layout";
import {LOGIN} from "../../api/routing/routes/dashboard";
import {jsonRequest} from "../../api/request/request";
import {useDispatch} from "react-redux";
import {userAuthenticated} from "../../duck/auth/auth.action";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router";
import {DASHBOARD} from "../../routes";


const Login = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined);
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const submitForm = useCallback((values: any) => {
        setLoading(true);
        setErrorMessage(undefined);
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({username: values.username, password: values.password})
        };

        jsonRequest(LOGIN, requestOptions)
        .then(response => response.json())
        .then(json => {
            setLoggedIn(true);
            dispatch(userAuthenticated(json.user));
        }).catch(async (err) => {
            let errorResponse = await err.response.json();
            setErrorMessage(errorResponse.message);
        }).finally(() => {
            setLoading(false);
        });

    }, []);

    return (
        <Layout>
            <div>
                <Card>
                    <CardBody className="container">
                        <CardTitle tag="h5"> Sign In to {process.env.REACT_APP_WEBSITE_NAME} </CardTitle>
                        {errorMessage !== undefined && (
                            <div className="alert alert-danger">{errorMessage}</div>
                        )}

                        {isLoggedIn && (
                            <div className="alert alert-success">Login was successful</div>
                        )}

                        <Form onSubmit={handleSubmit(submitForm)}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    {...register('username')}
                                    id="username"
                                    placeholder="User Name"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="password"
                                    {...register('password')}
                                    id="examplePassword"
                                    placeholder="Password"
                                />
                            </FormGroup>
                            <Button type="submit" disabled={isLoading}>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Layout>
    );
};

export default Login;