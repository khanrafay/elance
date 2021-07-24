import {FunctionComponent} from "react";
import Layout from "../../layout/layout";


export const FeaturedItems: FunctionComponent = () => {
  
  return (
    <Layout>
      <div className="row">
        <div className="col">
          <h3>Featured Sellers</h3>
          
        </div>
        <div className="col">
          <h3>Banners</h3>
        </div>
      </div>
    </Layout>
  );
};