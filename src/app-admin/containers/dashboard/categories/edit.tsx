import {FunctionComponent, useEffect, useState} from "react";
import Layout from "../../layout/layout";
import {CategoryForm, SelectItemProps} from "./form";
import {useForm} from "react-hook-form";
import {jsonRequest} from "../../../../api/request/request";
import {CREATE_CATEGORY, EDIT_CATEGORY, GET_CATEGORY} from "../../../../api/routing/routes/backend.admin";
import {RouteComponentProps, useHistory} from "react-router";
import {CATEGORIES} from "../../../routes/frontend.routes";
import {ConstraintViolation} from "../../../../lib/validator/validation.result";
import {QueryString} from "../../../../lib/location/query.string";
import {Category} from "../../../../api/model/category";

interface EditCategoryProps extends RouteComponentProps<{id: string}>{

}

export const EditCategory: FunctionComponent<EditCategoryProps> = (props) => {
  const useFormHook = useForm();
  const {setError, reset} = useFormHook;
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  
  const loadCategory = async (id: string) => {
    setLoading(true);
    try{
      let queryString = QueryString.stringify({tree: true});
      let response = await jsonRequest(GET_CATEGORY.replace(':id', id) + "?" +queryString);
      let json = await response.json();
      
      let parentIds: SelectItemProps[] = [];
      json.category.parents.forEach((item: Category) => {
        parentIds.push({
          label: item.name,
          value: item.id
        });
      });
      
      reset({...json.category, parents: parentIds});
    
    }catch (e) {
      throw e;
    }finally {
      setLoading(false);
    }
  };
  
  const onSubmit = async (values: any) => {
    setLoading(true);
    try{
      let parentIds: string[] = [];
      values.parents.forEach((item: SelectItemProps) => {
        parentIds.push(item.value);
      });
      
      values.parents = parentIds;
      
      await jsonRequest(EDIT_CATEGORY.replace(':id', props.match.params.id), {
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
  
  useEffect(() => {
    if(props.match.params.id){
      loadCategory(props.match.params.id);
    }
  }, [props.match.params.id]);
  
  return (
    <Layout>
      <h3>Edit Category</h3>
      <CategoryForm useForm={useFormHook} isLoading={isLoading} onSubmit={onSubmit}/>
    </Layout>
  );
};