import {FunctionComponent, useState} from "react";
import Layout from "../../layout/layout";
import {CategoryForm, SelectItemProps} from "./form";
import {useForm} from "react-hook-form";
import {jsonRequest} from "../../../../api/request/request";
import {CREATE_CATEGORY} from "../../../../api/routing/routes/backend.admin";
import {useHistory} from "react-router";
import {CATEGORIES} from "../../../routes/frontend.routes";
import {ConstraintViolation} from "../../../../lib/validator/validation.result";

export const CreateCategory: FunctionComponent = () => {
  const useFormHook = useForm();
  const {setError} = useFormHook;
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  
  const onSubmit = async (values: any) => {
    setLoading(true);
    let parentIds: string[] = [];
    values.parents.forEach((item: SelectItemProps) => {
      parentIds.push(item.value);
    });
  
    values.parents = parentIds;
    
    try{
      await jsonRequest(CREATE_CATEGORY, {
        method: 'POST',
        body: JSON.stringify(values)
      });
      
      history.push(CATEGORIES);
      
    }catch (e) {
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
    }finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <h3>Create Category</h3>
      <CategoryForm useForm={useFormHook} isLoading={isLoading} onSubmit={onSubmit}/>
    </Layout>
  );
};