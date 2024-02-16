/** @format */

import React from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import getArray from "../../utils/getArray";
import { slugify } from "../../utils/slugify";

const TopSellingProducts = ({ sellerId }) => {
	const { response: products, loading } = useFetch(
		`products/top-from-seller/${sellerId}`
	);

	const RenderProduct = ({ product }) => {
		const productName =
			product?.name?.length > 20
				? product?.name?.slice(0, 20) + " ..."
				: product?.name;
		return (
			<Link to={`/products/${slugify(product?.name)}?id=${product?.id}`}>
				<article className="group flex justify-start items-center lg:justify-start lg:gap-4 p-2 hover:shadow-md transition-all duration-300">
					<div className="w-1/4 lg:w-20 h-auto overflow-hidden rounded-md">
						<img
							className="group-hover:scale-105 transition-all duration-300"
							src={product?.thumbnail_image}
							alt={product?.name}
						/>
					</div>
					<div>
						<h3 className="group-hover:text-primary">{productName}</h3>
						<p className="text-lg font-medium text-primary">
							{product?.main_price}
						</p>
					</div>
				</article>
			</Link>
		);
	};

	const RenderSkeleton = () => {
		return (
			<article className="flex justify-start items-center lg:justify-start lg:gap-4 p-2">
				<div className="w-1/3 lg:w-20 h-auto overflow-hidden">
					<img className="animate-pulse" src="/img/placeholder.jpeg" />
				</div>
				<div className="w-full">
					<div className="w-7/8 rounded-lg h-6 bg-gray-200 animate-pulse"></div>
					<div className="w-1/3 mt-2 rounded-lg h-6 bg-primary/35 animate-pulse"></div>
				</div>
			</article>
		);
	};

	return (
		<section className="p-5 border border-black/15">
			<h3 className="font-medium text-lg mb-2">Top Selling Products</h3>
			<div>
				{!loading
					? products?.data?.map((item) => (
							<RenderProduct key={item?.id} product={item} />
					  ))
					: getArray(10).map((item) => <RenderSkeleton key={item} />)}
			</div>
		</section>
	);
};

export default TopSellingProducts;
