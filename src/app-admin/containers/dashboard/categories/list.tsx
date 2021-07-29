import React, {FunctionComponent, useEffect, useState} from "react";
import Layout from "../../layout/layout";
import {Category} from "../../../../api/model/category";
import {jsonRequest} from "../../../../api/request/request";
import {CATEGORIES_LIST, DELETE_CATEGORY} from "../../../../api/routing/routes/backend.admin";
import {Link} from "react-router-dom";
import {CREATE_SERVICE, SINGLE_SERVICE} from "../../../../app-frontend/routes/frontend.routes";
import {Button} from "reactstrap/es";
import {CREATE_CATEGORY, SINGLE_CATEGORY} from "../../../routes/frontend.routes";
import {QueryString} from "../../../../lib/location/query.string";


export const Categories: FunctionComponent = () => {
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const loadCategories = async () => {
    setLoading(true);
    try {
      let qs = QueryString.stringify({
        sort: 'id',
        sortMode: 'DESC'
      });
      let response = await jsonRequest(CATEGORIES_LIST + '?' + qs);
      let json = await response.json();
      
      setCategories(json.list);
      
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadCategories();
  }, []);
  
  const deleteCategory = async (id: string) => {
    if (!window.confirm('Delete this service?')) {
      return false;
    }
    
    setLoading(true);
    
    try {
      await jsonRequest(DELETE_CATEGORY.replace(':id', id), {
        method: 'DELETE'
      });
      
      await loadCategories();
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
    
  };
  return (
    <Layout>
      <h3>Categories</h3>
      <Link to={CREATE_CATEGORY} className="btn btn-primary mb-3">Create Category</Link>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
          <th>Actions</th>
          </thead>
          <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="p-5 text-center">Loading...</td>
            </tr>
          ) : (
            <>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.type}</td>
                  <td>{category.description}</td>
                  <td>
                    <Link to={SINGLE_CATEGORY.replace(':id', category.id)} className="btn btn-primary">Edit</Link>
                    <Button type="button" className="btn btn-danger ml-3" onClick={() => deleteCategory(category.id)}>Delete</Button>
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