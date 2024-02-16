/** @format */

import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductLayout from "../components/products/ProductLayout";
import { reSlugify } from "../utils/slugify";

const title = {
  "recommend" : "Just For You",
  "best-seller" : "Best Selling Products",
  "featured" : "Featured Products",
  "newest" : "New Products",
  "discounted" : "Discount Products"
}

const Products = () => {
	const [searchParams] = useSearchParams();
	const type = searchParams.get("type");

	const pagi = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "/",
    },
		{
			name: `"${title[type]}"`,
			active: "true",
		},
	];

	return (
		<div className="section_padding pb-4 lg:pb-12">
			<ProductLayout
				title={title[type]}
				url={`products/${type}`}
				pagi={pagi}
			/>
		</div>
	);
};

export default Products;
