/** @format */

import React from "react";
import { Link } from "react-router-dom";

const BreadCrump = ({ pagi }) => {
	return (
		<ul className="flex w-fit justify-around gap-2 ">
			{pagi?.length > 0 &&
				pagi?.map((item, index) => (
					<li key={index}>
						<Link
							className={`text-xs sm:text-sm ${
								item?.active ? "text-primary" : "text-black/60"
							} capitalize font-medium hover:text-primary`}
							to={item?.path ? item?.path : ""}
						>
							{item?.name}
						</Link>
					</li>
				))}
		</ul>
	);
};

export default BreadCrump;
