/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Tooltip } from "antd";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Icons
import { IoMdCart } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

// Utils
import { slugify } from "../../utils/slugify";
import { useSelector } from "react-redux";
import ProductDetails from "../product/ProductDetails";

const placeholder = {
	discount: "-0MMK",
	has_discount: false,
	id: 2147,
	is_wholesale: false,
	links: { details: "https://dev.gmpshopping.com/api/v2/products/2147" },
	main_price: "25,000 MMK",
	name: "Girl Shoes",
	rating: 0,
	sales: 0,
	stroked_price: "25,000 MMK",
	thumbnail_image:
		"https://ed-gmp-online.s3.ap-southeast-1.amazonaws.com/uploads/all/kzZLo4Wn6LKCAHBTIvnFDY5ILjoNgeRwX7fTIJPo.png",
};

const ProductCard = ({ product = { ...placeholder }, isList = false }) => {
	const [open, setOpen] = useState(false);

	const auth = useSelector((state) => state.auth.auth);

	const showModal = () => {
		setOpen(true);
	};

	const handleOk = () => {
		setOpen(false);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const onFavouriteBtnClick = () => {
		if (!auth.token) {
			toast.warn("Please, login first.");
		}
	};

	const truncate_text =
		product?.name?.length > 35
			? product?.name?.split("").slice(0, 35).join("") + "..."
			: product?.name;

	// styling
	const isFavourite = false
		? "bg-white text-primary"
		: "bg-white text-gray-500";
	const isInCompare = false
		? "bg-white text-primary"
		: "bg-white text-gray-500";

	return (
		<>
			<motion.article
				className={`group flex pb-6 flex-col gap-2 ${
					isList ? "hover:shadow-lg" : "hov-animate-outline"
				} border  border-black/10 hover:border-black/0 transition-all delay-200 duration-300`}
			>
				{/* image and btn */}
				<div className="relative w-[90%] mx-auto h-56 overflow-hidden border-b border-b-black/10 pt-2">
					<Link
						to={`/products/${slugify(product?.name)}?id=${product?.id}`}
						className="w-full h-full"
					>
						<img
							className="w-full h-full object-contain group-hover:scale-105 transition-all duration-300"
							src={product?.thumbnail_image}
							alt="product"
						/>
					</Link>
					{/* Discount Tag */}
					{product?.has_discount && (
						<span className="absolute top-2 px-1 left-0 bg-redish text-xs text-white font-medium">
							{" "}
							{product?.discount}
						</span>
					)}

					{/* Add To Cart Btn */}
					<div className="group absolute w-full h-8 bottom-0 left-0 z-10 overflow-hidden">
						<button
							onClick={showModal}
							className="product_cart_btn w-full h-full bg-black/70 transform translate-y-full active:translate-y-full group-hover:translate-y-0 transition-all duration-300"
						>
							<p className="flex add_to_cart items-center justify-center  text-xs font-bold text-white w-full h-full">
								Add To Cart
							</p>
							<p className="cart_icon flex items-center justify-center  text-xl font-bold text-white w-full h-full">
								{" "}
								<IoMdCart />{" "}
							</p>
						</button>
					</div>

					{/* Favoutite and Compare Btn */}
					<div className="absolute w-10 overflow-hidden top-4 right-1 z-10 pr-1">
						<button
							className={`${isInCompare} transform w-full translate-x-[120%] text-xl  p-2 shadow-lg group-hover:translate-x-0 transition-all duration-300 hover:bg-primary hover:text-white`}
						>
							<Tooltip placement="left" title={"Add To Compare"}>
								<MdCompareArrows />
							</Tooltip>
						</button>
						<button
							onClick={onFavouriteBtnClick}
							className={`${isFavourite} mt-2 transform w-full translate-x-[120%] text-lg  p-2 shadow-lg group-hover:translate-x-0 transition-all duration-300 delay-150 hover:bg-primary hover:text-white`}
						>
							<Tooltip placement="left" title={"Add To Wishlist"}>
								<FaHeart />
							</Tooltip>
						</button>
					</div>
					{/*  */}
				</div>

				{/* proudct info */}
				<div className="px-4">
					<h3 className="mt-2 text-sm h-10 font-medium text-center group-hover:text-primary transition duration-300">
						<Link to={`/products/${slugify(product?.name)}?id=${product?.id}`}>
							{truncate_text}
						</Link>
					</h3>
					<p className="mt-2 text-sm font-bold text-center">
						{product?.has_discount && (
							<span className="mr-2 hidden line-through font-medium text-gray-600 group-hover:inline-block transition duration-300">
								{product?.stroked_price}
							</span>
						)}
						<span className="text-primary">{product?.main_price}</span>
					</p>
				</div>
			</motion.article>

			<Modal
				title="Add To Cart"
				open={open}
				centered
				width={"100%"}
				className="w-full"
				onOk={handleOk}
				footer=""
				onCancel={handleCancel}
			>
				<ProductDetails isModal={true} modal_product_id={product?.id} modalCancel={handleCancel}/>
			</Modal>
		</>
	);
};

export default ProductCard;
