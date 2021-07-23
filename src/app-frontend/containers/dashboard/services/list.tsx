import React, {FunctionComponent, useEffect, useState} from "react";
import Layout from "../../layout/layout";
import {Link} from "react-router-dom";
import {CREATE_SERVICE, SINGLE_SERVICE} from "../../../routes/frontend.routes";
import {jsonRequest} from "../../../../api/request/request";
import {DELETE_SERVICE, MY_SERVICES} from "../../../../api/routing/routes/dashboard";
import {Service} from "../../../../api/model/service";
import {Button} from "reactstrap/es";

export const ServicesComponent: FunctionComponent = () => {
  const [isLoading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  
  const loadServices = async () => {
    setLoading(true);
    try {
      let response = await jsonRequest(MY_SERVICES);
      let json = await response.json();
      
      setServices(json.list);
      
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadServices();
  }, []);
  
  const deleteService = async (id: string) => {
    if (!window.confirm('Delete this service?')) {
      return false;
    }
    
    setLoading(true);
    
    try {
      await jsonRequest(DELETE_SERVICE.replace(':id', id), {
        method: 'DELETE'
      });
      
      await loadServices();
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
    
  };
  
  return (
    <Layout>
      <h1>Services</h1>
      <Link to={CREATE_SERVICE} className="btn btn-primary mb-3">Create Service</Link>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Actions</th>
          </thead>
          <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6} className="p-5 text-center">Loading...</td>
            </tr>
          ) : (
            <>
              {services.map(service => (
                <tr>
                  <td>{service.id}</td>
                  <td>{service.title}</td>
                  <td>{service.description.substr(0, 30)}</td>
                  <td>{service.minPrice} - {service.maxPrice}</td>
                  <td>
                    <Link to={SINGLE_SERVICE.replace(':id', service.id)} className="btn btn-primary">Edit</Link>
                    <Button type="button" className="btn btn-danger ml-3" onClick={() => deleteService(service.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </>
          )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};