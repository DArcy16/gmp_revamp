/** @format */

import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductLayout from "../components/products/ProductLayout";
import { reSlugify } from "../utils/slugify";

const Brand = () => {
	const { brand } = useParams();
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");

	const pagi = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "/",
		},
		{
			name: 'All Brands',
			path: "/brands"
		},
		{
			name: "/"
		},
		{
			name: `"${reSlugify(brand)}"`,
			active: "true",
		},
	];

	return (
		<div className="section_padding pb-4 lg:pb-12">
			<ProductLayout title={reSlugify(brand)} url={`products/brand/${id}`} pagi={pagi}/>
		</div>
	);
};

export default Brand;
