import React, {FunctionComponent, useEffect, useState} from "react";
import Layout from "../../layout/layout";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {getAuthorizedUser} from "../../../../duck/auth/auth.selector";
import {User} from "../../../../api/model/user";
import {Image} from "../../../../app-common/components/image/image";
import {request} from "../../../../api/request/request";
import {ADMIN_PROFILE_UPDATE} from "../../../../api/routing/routes/backend.admin";
import {userAuthenticated} from "../../../../duck/auth/auth.action";
import {ConstraintViolation} from "../../../../lib/validator/validation.result";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface FormValues extends User {
  password?: string;
  file?: Blob[];
}

export const Profile: FunctionComponent = () => {
  const user = useSelector(getAuthorizedUser);
  
  const {register, handleSubmit, reset, setError, formState: {errors, isSubmitSuccessful, isDirty}} = useForm();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
    });
  }, [user]);
  
  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      let data = new FormData();
      data.append('firstName', values.firstName);
      data.append('lastName', values.lastName);
      if (values.password) {
        data.append('password', values.password);
      }
      
      if (values.file) {
        data.append('file', values.file[0]);
      }
      let response = await request(ADMIN_PROFILE_UPDATE, {
        method: 'POST',
        body: data
      });
      
      let json = await response.json();
      
      dispatch(userAuthenticated(json.user));
    } catch (exception) {
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
    } finally {
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
            <div className="form-group">
              <label htmlFor="file">Profile picture</label>
              <input type="file" {...register('file')} className={`form-control ${errors.file ? 'is-invalid' : ''}`} id="file" />
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