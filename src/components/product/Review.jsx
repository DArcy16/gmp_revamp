/** @format */

import React from "react";
import useFetch from "../../hooks/useFetch";
import { Rate } from "antd";

const Review = ({ product }) => {
	const { response: reviews, loading } = useFetch(
		`reviews/product/${product?.id}`
	);

	const RenderReviewer = ({ review }) => {
		return (
			<article className="flex gap-10">
				<div className="w-16 h-16 rounded-full overflow-hidden">
					<img
						className="w-full h-full"
						src={review?.avatar}
						alt={review?.user_name}
					/>
				</div>
				<div>
					<h3 className="font-medium">{review?.user_name}</h3>
					<p className="text-xs">{review?.time}</p>
					<Rate disabled defaultValue={review?.rating} />
					<p className="mt-1">{review?.comment}</p>
				</div>
			</article>
		);
	};

	const onRateBtnClick = () => {};

	return (
		<section className="p-5 border border-black/15">
			<h3 className="font-medium text-lg">Reviews & Ratings</h3>
			<div className="flex flex-col py-10 px-6 bg-yellowish/20 border border-yellowish md:flex-row md:items-center md:justify-between mt-4">
				<div className="flex justify-between md:justify-start items-center gap-6">
					<p>
						{" "}
						<span className="text-2xl font-medium mr-2">
							{product?.rating}
						</span>{" "}
						out of 5.0
					</p>
					<div className="flex items-center">
						<Rate disabled defaultValue={product?.rating} />
						<p className="text-sm ml-4">({product?.rating_count} reviews)</p>
					</div>
				</div>
				<button
					onClick={onRateBtnClick}
					className="px-4 rounded-sm py-2 text-sm font-medium text-white bg-yellowish hover:bg-yellowish/90 transition"
				>
					Rate This Product
				</button>
			</div>
			{!loading && reviews?.data?.length > 0 && (
				<div className="mt-8">
					{reviews?.data?.map((review) => (
						<RenderReviewer review={review} />
					))}
				</div>
			)}
		</section>
	);
};

export default Review;
