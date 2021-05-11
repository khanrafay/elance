import React, {FunctionComponent, useCallback, useMemo} from "react";
import {Form, FormGroup, Input} from "reactstrap/es";
import {SEARCH_ROUTE} from "../../routes";
import {useHistory, useLocation} from "react-router";
import {QueryString} from "../../lib/location/query.string";
import {useForm} from "react-hook-form";


export const Search: FunctionComponent = () => {

    const location = useLocation();
    const history = useHistory();
    const {register, handleSubmit} = useForm();

    const searchParams = useMemo(() => {
        return QueryString.parse(location.search);
    }, [location.search]);

    const onSubmit = useCallback((values) => {
        let qs = QueryString.stringify({...searchParams, s: values.s});
        history.push(`${SEARCH_ROUTE}?${qs}`);
    }, [searchParams]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)} action={SEARCH_ROUTE}>
            <FormGroup>
                <Input
                    type="search"
                    {...register('s')}
                    placeholder="Search services..."
                    defaultValue={searchParams.s}
                />
            </FormGroup>
        </Form>
    );
};