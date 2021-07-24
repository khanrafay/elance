import React, {FunctionComponent, useEffect, useState} from "react";
import Layout from "../../layout/layout";
import {useForm} from "react-hook-form";
import {ServiceForm} from "./form";
import {jsonRequest} from "../../../../api/request/request";
import {CREATE_SERVICE, GET_SERVICE, UPDATE_SERVICE} from "../../../../api/routing/routes/backend.app";
import {RouteComponentProps, useHistory} from "react-router";
import {SERVICES} from "../../../routes/frontend.routes";
import {ConstraintViolation} from "../../../../lib/validator/validation.result";
import {Service} from "../../../../api/model/service";

interface EditServiceProps extends RouteComponentProps<{id: string}>{

}

export const EditService: FunctionComponent<EditServiceProps> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const useFormHook = useForm();
  const {setError, reset, getValues} = useFormHook;
  const history = useHistory();
  const [initialValues, setInitialValues] = useState<any>();
  
  const onSubmit = async (values: any) => {
    console.log(values);
    
    setLoading(true);
    try {
      let response = await jsonRequest(UPDATE_SERVICE.replace(':id', props.match.params.id), {
        body: JSON.stringify(values),
        method: 'PATCH'
      });
      await response.json();
      
      history.push(SERVICES);
      
    } catch (e) {
      if (e.code === 422) {
        let errorResponse = await e.response.json();
        
        if (errorResponse.violations) {
          errorResponse.violations.forEach((error: ConstraintViolation) => {
            setError(error.propertyPath, {
              type: 'manual',
              message: error.errorMessage
            });
          });
        }
      }
      throw e;
    } finally {
      setLoading(false);
    }
  };
  
  const loadService = async (id: string) => {
    setLoading(true);
    try{
      let response = await jsonRequest(GET_SERVICE.replace(':id', id));
      let json: {service: Service} = await response.json();
      
      reset({
        ...json.service,
        category: json.service.category.id,
        subCategory: json.service.subCategory.id,
        files: json.service.images.map(i => i.id)
      });
      
      setInitialValues(getValues());
    }catch (e) {
      throw e;
    }finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadService(props.match.params.id);
  }, [props.match.params.id]);
  
  return (
    <Layout>
      <div className="card">
        <div className="card-header">
          Edit Service
        </div>
        <div className="card-body">
          <ServiceForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            useForm={useFormHook}
            initialValues={initialValues}
          />
        </div>
      </div>
    </Layout>
  );
};