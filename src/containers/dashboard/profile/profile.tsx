import React, {FunctionComponent, useEffect, useState} from "react";
import Layout from "../../layout/layout";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {getAuthorizedUser} from "../../../duck/auth/auth.selector";
import {User} from "../../../api/model/user";
import {Image} from "../../../components/image/image";
import {jsonRequest, request} from "../../../api/request/request";
import {PROFILE_UPDATE} from "../../../api/routing/routes/dashboard";
import {userAuthenticated} from "../../../duck/auth/auth.action";
import {ConstraintViolation} from "../../../lib/validator/validation.result";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface FormValues extends User{
  password?: string;
  file?: Blob[];
}

export const Profile: FunctionComponent = () => {
  const user = useSelector(getAuthorizedUser);
  
  const {register, handleSubmit, reset, setError, formState: {errors, isSubmitSuccessful, isDirty}} = useForm();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  console.log(isSubmitSuccessful);
  
  
  useEffect(() => {
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      currentType: user?.currentType,
      gender: user?.gender,
      dateOfBirth: user?.dateOfBirth,
      onlineStatus: user?.onlineStatus
    });
  }, [user]);
  
  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      let data = new FormData();
      data.append('firstName', values.firstName);
      data.append('lastName', values.lastName);
      data.append('currentType', values.currentType);
      if(values.gender) {
        data.append('gender', values.gender);
      }
      data.append('dateOfBirth', values.dateOfBirth);
      if(values.onlineStatus) {
        data.append('onlineStatus', 'true');
      }else{
        data.append('onlineStatus', 'false');
      }
      if(values.password){
        data.append('password', values.password);
      }

      if(values.file) {
        data.append('file', values.file[0]);
      }
      let response = await request(PROFILE_UPDATE, {
        method: 'POST',
        body: data
      });
      
      let json = await response.json();

      dispatch(userAuthenticated(json.user));
    }catch (exception) {
      let expResponse = await exception.response.json();
      if (expResponse.code === 422) {
        if (expResponse.violations) {
          expResponse.violations.map((error: ConstraintViolation) => {
            setError(error.propertyPath, {
              type: 'manual',
              message: error.errorMessage
            });
          });
        }
      }
      
      throw exception;
    }finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="row">
          <div className="col-9">
            <div className="form-group">
              <label htmlFor="firstname">First name</label>
              <input type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} id={"firstname"} />
              {errors.firstName && (
                <div className="invalid-feedback">
                  {errors.firstName.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last name</label>
              <input type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} id={"lastname"} />
              {errors.lastName && (
                <div className="invalid-feedback">
                  {errors.lastName.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} id={"password"} />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
  
            <p>Default type</p>
            <div className="form-check form-check-inline">
              <label htmlFor="seller">
                <input type="radio" {...register('currentType')} value="seller" id="seller"/> Seller
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label htmlFor="buyer">
                <input type="radio" {...register('currentType')} value="buyer" id="buyer"/> Buyer
              </label>
            </div>
            {errors.currentType && (
              <div className="invalid-feedback">
                {errors.currentType.message}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select {...register('gender')} className={`form-control ${errors.gender ? 'is-invalid' : ''}`} id={"gender"}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <div className="invalid-feedback">
                  {errors.gender.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of birth</label>
              <input type="date" {...register('dateOfBirth')} className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`} id={"dob"}/>
              {errors.dateOfBirth && (
                <div className="invalid-feedback">
                  {errors.dateOfBirth.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="status">
                <input type="checkbox" {...register('onlineStatus')} id="status"/> Online status
              </label>
            </div>
            
            <div className="form-group">
              <label htmlFor="file">Profile picture</label>
              <input type="file" {...register('file')} className={`form-control ${errors.file ? 'is-invalid' : ''}`} id="file"/>
              {errors.file && (
                <div className="invalid-feedback">
                  {errors.file.message}
                </div>
              )}
            </div>
          </div>
          <div className="col-3">
            <Image image={user?.profilePicture} />
          </div>
        </div>
        
        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          Save {' '}
          {isSubmitSuccessful && !isDirty && (
            <FontAwesomeIcon icon={faCheckCircle} />
          )}
        </button>
        
      </form>
    </Layout>
  );
};