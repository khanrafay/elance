import React, {useState, useEffect} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {jsonRequest} from "../../api/request/request";
import {CATEGORIES_LIST, SERVICES_LIST} from "../../api/routing/routes/dashboard";
import {SEARCH_ROUTE} from "../../routes";
import {Link} from "react-router-dom";
import {Category} from "../../api/model/category";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = () => {
    jsonRequest(CATEGORIES_LIST)
      .then(response => response.json())
      .then(json => {
        setCategories(json.list);
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);


  return (
    <ListGroup>
      {categories.map((cat, index) => (
        <Link to={`${SEARCH_ROUTE}?categoryId[]=${cat.id}`} className="list-group-item" key={index}>
          {cat.name}
        </Link>
      ))}
    </ListGroup>
  );
};

export default Categories;
