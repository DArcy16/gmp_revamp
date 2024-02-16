/** @format */

import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Banner1 = () => {
	const [showBanner, setShowBanner] = useState(true);

	const closeBanner = () => {
		setShowBanner(false);
	};
	return (
		<>
			{showBanner ? (
				<div className="z-50 relative d-flex items-center">
					<img
						className="w-screen"
						src="/img/LQ6Nnmn8fmwsXYO72YesIs26w5fQyzbclH8jywyU.jpg"
						alt="banner_img"
					/>
					<button
						onClick={closeBanner}
						className="absolute inset-y-0 right-4 text-white text-sm lg:text-2xl font-semibold"
					>
						<AiOutlineClose />
					</button>
				</div>
			) : null}
		</>
	);
};

export default Banner1;
