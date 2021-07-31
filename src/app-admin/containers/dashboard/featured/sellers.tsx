import React, {FunctionComponent, useEffect, useState} from "react";
import {User} from "../../../../api/model/user";
import {jsonRequest} from "../../../../api/request/request";
import {ADMIN_FEATURED_SELLERS_LIST, ADMIN_FEATURED_SELLERS_UPDATE} from "../../../../api/routing/routes/backend.admin";
import moment from "moment";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap/es";
import _ from "lodash";
import {useForm} from "react-hook-form";


export const FeaturedSellers: FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [seller, setSeller] = useState<User|undefined>();
  
  const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm();
  
  const loadUsers = async () => {
    setLoading(true);
    try {
      let response = await jsonRequest(ADMIN_FEATURED_SELLERS_LIST);
      let json = await response.json();
      
      setUsers(json.users);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      await jsonRequest(ADMIN_FEATURED_SELLERS_UPDATE, {
        method: 'POST',
        body: JSON.stringify(values)
      });

      toggleModal();
      loadUsers();
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <table className="table table-hover">
        <thead>
        <tr>
          <th>Name</th>
          <th>Is Featured</th>
          <th>Featured till</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.displayName}</td>
            <td>{user.seller?.isFeatured ? 'Yes' : 'No'}</td>
            <td>{user.seller?.featuredTill ? moment(user.seller?.featuredTill).format('lll') : ''}</td>
            <td>
              <button className="btn btn-primary" type="button" onClick={() => {setSeller(user); setModal(true)}}>Update</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <Modal isOpen={modal} toggle={toggleModal} size="lg" fade={false} backdrop="static">
        <ModalHeader toggle={toggleModal}>Update {seller?.displayName}</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <input type="hidden" {...register('sellerId')} value={seller?.seller?.id} />
            <div className="form-group">
              <label htmlFor="featured-till">Featured Till</label>
              <input type="date" id="featured-till" className="form-control" {...register('featuredTill')} />
              {errors.featuredTill && (
                <div className="text-danger">{errors.featuredTill.message}</div>
              )}
            </div>
            <div className="form-group">
              <input type="checkbox" {...register('isFeatured')} id="isFeatured" />
              <label htmlFor="isFeatured" className="ml-2">Featured?</label>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" type="submit" disabled={isLoading || isSubmitting}>Update</button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};