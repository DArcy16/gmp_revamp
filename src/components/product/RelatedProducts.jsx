/** @format */

import React from "react";
import useFetch from "../../hooks/useFetch";

import ProductsSlider from "../home/ProductsSlider";

const RelatedProducts = ({ product_id }) => {
	const { response: relatedProducts, loading } = useFetch(
		`products/related/${product_id}`);


	return (
		<div className="p-5 border border-black/15">
			<h3 className="text-lg font-medium">Related Products</h3>
			<div className="mt-4">
				<ProductsSlider products={relatedProducts?.data} loading={loading} isPage={true} />
			</div>
		</div>
	);
};

export default RelatedProducts;
