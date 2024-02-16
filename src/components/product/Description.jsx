/** @format */

import React from "react";

const Description = ({ product }) => {

	return (
		<div className="p-5 border border-black/15">
			<h3 className="header_underline text-lg font-medium">
				Description
			</h3>
			<div
				className="mt-4 product_description"
				dangerouslySetInnerHTML={{ __html: product?.description }}
			/>
		</div>
	);
};

export default Description;
