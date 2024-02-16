/** @format */

import React from "react";
import BannerSkeleton from "../BannerSkeleton";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const LargeBanner = ({url = "banners-two" , path = ""}) => {
    const {response: photo , loading} = useFetch(url);

	return (
		<div>
			{!loading ? (
				<Link to={`${path ? path : ""}`} className="block w-full h-auto overflow-hidden rounded-md">
					<img
						className="w-full h-full object-cover hover:scale-105 transition duration-300"
						src={photo?.data[0]?.photo}
						alt="large_banner"
					/>
				</Link>
			) : (
				<div className="h-40 lg:h-[30rem]">
					<BannerSkeleton />
				</div>
			)}
		</div>
	);
};

export default LargeBanner;
