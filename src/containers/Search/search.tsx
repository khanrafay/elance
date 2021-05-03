import React, {useState, useEffect, useMemo, FunctionComponent} from "react";
import Layout from "../Layout/layout";
import {jsonRequest} from "../../api/request/request";
import {SERVICES_LIST} from "../../api/routing/routes/dashboard";
import {Col, Row} from "reactstrap";
import Categories from "../Catergories/categories";
import Services from "../Services/services";
import Sellers from "../Sellers/sellers";
import Service from "../../components/Service/service";
import {Service as ServiceModel} from '../../api/model/service';
import {RouteComponentProps, useLocation} from "react-router";
import {QueryString} from "../../lib/location/query.string";

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

    console.log(values);

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
            {services.map((service, index) => {
              return (
                <Col xs={12} lg={4} key={index}>
                  <Service title={service.title} description={service.description} />
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