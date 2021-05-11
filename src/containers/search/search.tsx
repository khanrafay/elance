import React, {useState, useEffect, useMemo, FunctionComponent} from "react";
import Layout from "../layout/layout";
import {jsonRequest} from "../../api/request/request";
import {SERVICES_LIST} from "../../api/routing/routes/dashboard";
import {Col, Row} from "reactstrap";
import Categories from "../categories/categories";
import Services from "../services/services";
import Sellers from "../sellers/sellers";
import Service from "../../components/service/service";
import {Service as ServiceModel} from '../../api/model/service';
import {RouteComponentProps, useLocation} from "react-router";
import {QueryString} from "../../lib/location/query.string";
import FormGroup from "reactstrap/es/FormGroup";
import {Input} from "reactstrap/es";
import {Search as SearchBar} from "../../components/search/search";

export interface SearchProps{}

export interface RequestProps{
  s?: string;
  limit?: string;
  offset?: string;
  orderBy?: string;
  orderMode?: string;
  categories?: string[];
  minPrice?: string;
  maxPrice?: string;
}

const Search: FunctionComponent<SearchProps> = (props) => {
  const [services, setServices] = useState<ServiceModel[]>([]);

  const location = useLocation();

  const searchParams = useMemo(() => {
    return QueryString.parse(location.search);
  }, [location.search]);

  const loadServices = async () => {
    let queryString = QueryString.stringify(searchParamsToRequestParams(searchParams));
    let response, list;
    try {
      response = await jsonRequest(`${SERVICES_LIST}?${queryString}`);
      list = await response.json();
    }catch(exception){
      console.log(exception);
    }

    setServices(list.list);
  };

  const searchParamsToRequestParams = (values: any) => {
    let data: RequestProps = {
      s: values.s,
      limit: values.limit,
      offset: values.offset,
      orderBy: values.orderBy,
      orderMode: values.orderMode,
      categories: values.categoryId,
      minPrice: values.minPrice,
      maxPrice: values.maxPrice
    };

    return data;
  };

  useEffect(() => {
    loadServices();
  }, [searchParams]);

  return (
    <Layout>
      <Row>
        <Col xs={12} lg={3}>
          <Categories />
        </Col>
        <Col xs={12} lg={9}>
          <Row>
            <Col lg={12}>
              <SearchBar />
            </Col>
          </Row>
          <Row>
            {services.map((service, index) => {
              return (
                <Col xs={12} lg={4} key={index}>
                  <Service service={service} />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default Search;