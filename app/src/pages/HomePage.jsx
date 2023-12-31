import React, { memo } from "react";
import Offers from "../components/home/Offers";
import ServicesParent from "../components/home/Services/ServicesParent";
import BigScreen from "../components/home/bigScreen";
import Deals from "../components/home/Deals";
import OtherOffers from "../components/home/OtherOffers";
import Layout from "../components/Layout/Layout";
import AUTH from "../components/AUTH";

function Home() {
  return (
    <>
      <AUTH type={"user"}>
        <Layout active={true}>
          <div className="home">
            <BigScreen />
            <Offers />
            <ServicesParent />
            <Deals />
            <OtherOffers />
          </div>
        </Layout>
      </AUTH>
    </>
  );
}

export default memo(Home);
