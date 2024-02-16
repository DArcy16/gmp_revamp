/** @format */

import React from "react";
import ProductList from "../components/_common/ProductList";
import LargeBanner from "../components/home/LargeBanner";
import useFetch from "../hooks/useFetch";


const TodayDeals = () => {
    	const { response: data, loading } = useFetch("products/todays-deal");

	return (
		<>
			<div className="section_padding">
				<LargeBanner />
			</div>

      <div className="section_padding pb-4 md:pb-8 lg:pb-12">
        <ProductList products={data?.data} loading={loading}/>
      </div>
		</>
	);
};

export default TodayDeals;
