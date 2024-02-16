/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { getId } from "../../utils/getArray";

const BrandCard = ({ brand }) => {

	return (
		<Link
			to={`${slugify(brand?.name)}?id=${getId(brand?.links?.products)}`}
			className="block group p-6 pb-10 hover:shadow-2xl border border-black/10 transition-all duration-300"
		>
			<div className="w-[70%] mx-auto h-auto overflow-hidden">
				<img
					className="w-full h-full group-hover:scale-105 transition-all duration-300"
					src={brand?.logo}
					alt=""
				/>
			</div>
			<h3 className="text-center font-medium mt-3">{brand?.name}</h3>
		</Link>
	);
};

export const BrandCardSkeleton = () => {
	return (
		<div className="p-6 pb-10 hover:shadow-lg border border-black/10">
			<div className="w-[70%] h-24 overflow-hidden mx-auto">
				<img
					className="w-full h-full object-cover animate-pulse"
					src="/img/placeholder.jpeg"
					alt="placeholder"
				/>
			</div>
			<div className="mt-2 w-12 h-6 mx-auto bg-gray-300 animate-pulse"></div>
		</div>
	);
};

export default BrandCard;
