/** @format */

import React from "react";

const BannerSkeleton = () => {
	return (
		<img
			
			className={`w-full h-full overflow-hidden object-cover animate-pulse rounded-md`}
			src="/img/placeholder.jpeg"
			alt="bannerImg"
		/>
	);
};

export default BannerSkeleton;
