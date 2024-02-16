/** @format */

import React from "react";
import { Link } from "react-router-dom";
import getArray from "../../utils/getArray";
import ShopCard, { ShopCardSkeleton } from "../_common/ShopCard";

const PointShop = () => {
	return (
		<div className="section_padding pb-12">
			<h2 className="text-xl font-bold border-b border-b-black/15 pb-4">
				Point Shop{" "}
				<span className=" float-end text-sm hover:text-primary font-semibold transition">
					<Link>View All</Link>
				</span>
			</h2>

			<div className="flex flex-wrap gap-y-6 pt-12">
				{false
					? getArray(4).map((id) => (
							<div key={id} className="xl:w-1/4">
								<ShopCard key={id} />{" "}
							</div>
					  ))
					: getArray(6).map((id) => (
							<div key={id} className="xl:w-1/4">
								<ShopCardSkeleton key={id} />{" "}
							</div>
					  ))}
			</div>
		</div>
	);
};

export default PointShop;
