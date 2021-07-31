import {FunctionComponent} from "react";
import Layout from "../../layout/layout";
import {FeaturedSellers} from "./sellers";
import {FeaturedBanners} from "./banners";


export const FeaturedItems: FunctionComponent = () => {
  
  return (
    <Layout>
      <div className="row">
        <div className="col">
          <h3>Featured Sellers</h3>
          <FeaturedSellers />
        </div>
        <div className="col">
          <h3>Banners</h3>
          <FeaturedBanners />
        </div>
      </div>
    </Layout>
  );
};