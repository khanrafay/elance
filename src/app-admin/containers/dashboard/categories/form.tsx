import {FunctionComponent, useEffect, useState} from "react";
import {Controller, UseFormReturn} from "react-hook-form";
import classNames from "classnames";
import Select from "react-select";
import {getErrorClass, getErrors} from "../../../../lib/error/error";
import {jsonRequest} from "../../../../api/request/request";
import {CATEGORIES_LIST} from "../../../../api/routing/routes/backend.admin";
import {Category} from "../../../../api/model/category";

interface CategoryFormProps {
  useForm: UseFormReturn<any>;
  isLoading: boolean;
  onSubmit: any;
}

export interface SelectItemProps {
  label: string;
  value: string;
}

export const CategoryForm: FunctionComponent<CategoryFormProps> = (props) => {
  const {register, handleSubmit, formState: {errors}, control, getValues} = props.useForm;
  const [categories, setCategories] = useState<SelectItemProps[]>([]);
  const [isCategoriesLoading, setCategoriesLoading] = useState(false);
  
  const loadCategories = async () => {
    setCategoriesLoading(true);
    try{
      let response = await jsonRequest(CATEGORIES_LIST);
      let json = await response.json();
      
      let r: SelectItemProps[] = [];
      json.list.forEach((item: Category) => {
        if(getValues('id') !== item.id) {
          r.push({
            label: item.name,
            value: item.id
          });
        }
      });
      
      setCategories(r);
    }catch (e) {
      throw e;
    }finally {
      setCategoriesLoading(false);
    }
  };
  
  useEffect(() => {
    loadCategories();
  }, []);
  
  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" {...register('name')} id="name"
          className={classNames('form-control', getErrorClass(errors.name))}
        />
        {getErrors(errors.name)}
      </div>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <input type="text" {...register('type')} id="type"
          className={classNames('form-control', getErrorClass(errors.type))}
        />
        {getErrors(errors.type)}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea {...register('description')} id="description"
          className={classNames('form-control', getErrorClass(errors.description))}
        />
        {getErrors(errors.description)}
      </div>
      <div className="form-group">
        <Controller name="parents"
          render={(props: any) => (
            <>
              <label htmlFor="parents">Parents</label>
              <Select
                options={categories}
                isLoading={isCategoriesLoading}
                onChange={(values) => {
                  let v: string[] = [];
                  values.forEach(a => {
                    v.push(a.value);
                  });
                  
                  props.field.onChange(values);
                }}
                isMulti
                closeMenuOnSelect={false}
                value={props.field.value}
              />
              {getErrors(errors.parents)}
            </>
          )} control={control}
        />
      </div>
      
      <button className="btn btn-primary" type="submit">Save</button>
    </form>
  );
};