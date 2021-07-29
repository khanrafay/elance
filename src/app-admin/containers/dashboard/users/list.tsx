import React, {FunctionComponent, useEffect, useState} from "react";
import Layout from "../../layout/layout";
import {useSelector} from "react-redux";
import {getAuthorizedUser} from "../../../../duck/auth/auth.selector";
import {useHistory} from "react-router";
import {jsonRequest} from "../../../../api/request/request";
import {ADMIN_ORDERS_LIST, ADMIN_USERS_LIST} from "../../../../api/routing/routes/backend.admin";
import {User} from "../../../../api/model/user";
import {SINGLE_ORDER} from "../../../../app-frontend/routes/frontend.routes";
import moment from "moment";
import {SINGLE_USER} from "../../../routes/frontend.routes";


export const Users: FunctionComponent = () => {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const history = useHistory();
  
  const loadUsers = async () => {
    setLoading(true);
    try {
      let response = await jsonRequest(ADMIN_USERS_LIST);
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
  
  return (
    <Layout>
      <h3>Users</h3>
      <table className="table table-hover">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Type</th>
        </tr>
        </thead>
        <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={8} className="p-5 text-center">Loading...</td>
          </tr>
        ) : (
          <>
            {users.map(user => (
              <tr onClick={() => history.push(SINGLE_USER.replace(':id', user.id))} className="cursor-pointer">
                <td>{user.id}</td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.currentType}</td>
              </tr>
            ))}
          </>
        )}
        </tbody>
      </table>
    </Layout>
  );
};