import React, {FunctionComponent, useEffect, useState} from "react";
import Layout from "../../layout/layout";
import {useForm} from "react-hook-form";
import {ServiceForm} from "./form";
import {jsonRequest} from "../../../../api/request/request";
import {CREATE_SERVICE} from "../../../../api/routing/routes/backend.app";
import {useHistory} from "react-router";
import {SERVICES} from "../../../routes/frontend.routes";
import {ConstraintViolation} from "../../../../lib/validator/validation.result";

interface CreateServiceProps {

}

export const CreateService: FunctionComponent<CreateServiceProps> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const useFormHook = useForm();
  const {setError, reset} = useFormHook;
  const history = useHistory();
  
  const onSubmit = async (values: any) => {
    console.log(values);
    
    setLoading(true);
    try {
      let response = await jsonRequest(CREATE_SERVICE, {
        body: JSON.stringify(values),
        method: 'POST'
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
  
  useEffect(() => {
    reset({
      packages: [
        {
          name: 'Basic',
          price: 5
        }, {
          name: 'Advanced',
          price: 10
        }, {
          name: 'Pro',
          price: 15,
          itemsIncluded: [
            {description: 'nothing here'}
          ]
        }
      ]
    });
  }, [reset]);
  
  
  return (
    <Layout>
      <div className="card">
        <div className="card-header">
          Create Service
        </div>
        <div className="card-body">
          <ServiceForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            useForm={useFormHook}
          />
        </div>
      </div>
    </Layout>
  );
};