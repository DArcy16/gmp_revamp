/** @format */

import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

// Slugify
import { reSlugify } from "../utils/slugify";
import ProductLayout from "../components/products/ProductLayout";

const Category = () => {
	const { category } = useParams();
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
			name: "All Categories",
			path: "/categories",
		},
		{
			name: "/",
		},
		{
			name: `"${reSlugify(category)}"`,
			active: "true",
		},
	];

	return (
		<div className="section_padding pb-4 lg:pb-12">
			<ProductLayout title={reSlugify(category)} url={`products/category/${id}`} pagi={pagi} />
		</div>
	);
};

export default Category;
