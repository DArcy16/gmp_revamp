/** @format */

import React from "react";
import { Link } from "react-router-dom";

const ShopCard = () => {
	return (
		<article className="group py-8 px-4 w-11/12 border-t border-black/15 rounded-md shadow-md">
			<div className="w-28 h-28 mx-auto rounded-full overflow-hidden shadow-md">
				<Link>
					<img
						className=" w-full h-full object-cover group-hover:scale-105"
						src="/img/gmp_logo.png"
						alt=""
					/>
				</Link>
			</div>
			<div className="mt-8 mb-2">
				<h3 className="font-medium group-hover:text-primary text-center">
					<Link>Ga Mone Pwint Online Shopping Point Shop</Link>
				</h3>
				<Link className="mt-6 block w-40 py-1 overflow-hidden mx-auto font-bold text-center rounded-lg text-black/70 border-2 border-primary hover:text-white hover:bg-primary">
					<p>Visit Store</p>
				</Link>
			</div>
		</article>
	);
};

export const ShopCardSkeleton = () => {
	return (
		<article className=" py-8 px-4 w-11/12 border-t border-black/15 rounded-md shadow-md">
			<div className="w-28 h-28 mx-auto rounded-full bg-gray-200 animate-pulse overflow-hidden shadow-md"></div>
			<div className="mt-8 mb-2">
				<div className="w-3/4 h-8 mx-auto bg-gray-200 animate-pulse"></div>
				<div className="w-1/4 my-4 h-4 mx-auto bg-gray-200 animate-pulse"></div>
			</div>
		</article>
	);
};

export default ShopCard;
