import React, {FunctionComponent, useCallback, useEffect, useState} from "react";
import {FileUploader} from "../../../components/upload/file.uploader";
import {Media} from "../../../../api/model/media";
import {getErrorClass, getErrors} from "../../../../lib/error/error";
import {Category} from "../../../../api/model/category";
import {jsonRequest} from "../../../../api/request/request";
import {CATEGORIES_LIST} from "../../../../api/routing/routes/dashboard";
import {QueryString} from "../../../../lib/location/query.string";
import {useFieldArray, UseFormReturn} from "react-hook-form";
import {Package} from "./package";

interface ServiceFormProps {
  onSubmit: any;
  isLoading: boolean;
  useForm: UseFormReturn,
  initialValues?: any;
}

export const ServiceForm: FunctionComponent<ServiceFormProps> = ({
  onSubmit, isLoading, useForm, initialValues
}) => {
  
  const {watch, handleSubmit, formState: {errors}, register, reset, getValues: values, control} = useForm;
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const parentId = watch('category');
  
  const [files, setFiles] = useState<string[]>([]);
  
  const loadCategories = async () => {
    try {
      let q = QueryString.stringify({
        displayType: 'parent'
      });
      let response = await jsonRequest(CATEGORIES_LIST + '?' + q);
      let json = await response.json();
      
      setCategories(json.list);
    } catch (e) {
      throw e;
    }
  };
  
  const loadSubCategories = async () => {
    if (!parentId) {
      return;
    }
    try {
      let q = QueryString.stringify({
        parentId
      });
      let response = await jsonRequest(CATEGORIES_LIST + '?' + q);
      let json = await response.json();
      
      setSubCategories(json.list);
    } catch (e) {
      throw e;
    }
  };
  
  useEffect(() => {
    loadCategories();
  }, []);
  
  useEffect(() => {
    loadSubCategories();
  }, [parentId]);
  
  const onDeleteFile = (index: number) => {
    setFiles(prevState => prevState.filter((item, i) => i !== index));
  };
  
  const onUploadFiles = (uploadedFiles: Media[]) => {
    setFiles(uploadedFiles.map(i => i.id));
  };
  
  useEffect(() => {
    if(initialValues && initialValues.files) {
      setFiles(initialValues.files);
    }
  }, [initialValues]);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {files.map((file, index) => (
        <input type="hidden" value={file} {...register(`files[${index}]`)} key={index} />
      ))}
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title"
              className={`form-control ${getErrorClass(errors.title)}`}
              {...register('title')}
            />
            {getErrors(errors.title)}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" className={`form-control ${getErrorClass(errors.description)}`} {...register('description')} />
            {getErrors(errors.description)}
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" {...register('category')}
              className={`form-control ${getErrorClass(errors.category)}`}
            >
              <option value="">Choose a category</option>
              {categories.map(category => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))}
            </select>
            {getErrors(errors.category)}
          </div>
          <div className="form-group">
            <label htmlFor="subCategory">Sub Category</label>
            <select id="subCategory" {...register('subCategory')}
              className={`form-control ${getErrorClass(errors.subCategory)}`}
            >
              <option value="">Choose a sub category</option>
              {subCategories.map(category => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))}
            </select>
            {getErrors(errors.subCategory)}
          </div>
        </div>
        <div className="col">
          <div className={`${getErrorClass(errors.files)}`}>
            <FileUploader
              onUpload={(files: Media[]) => onUploadFiles(files)}
              onDelete={(index: number, files: Media[]) => onDeleteFile(index)}
              label="Service photos"
              errorElement={errors.files}
              initialFiles={initialValues?.files}
            />
          </div>
        </div>
      </div>
      <h4>Packages</h4>
      <div className="row mb-3">
        <Package control={control} errors={errors} register={register} />
      </div>
      <button className="btn btn-primary" disabled={isLoading}>Save</button>
    </form>
  );
};













