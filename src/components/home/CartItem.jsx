/** @format */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image } from "antd";

// Icons
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from "../../redux/features/cart";

const CartItem = ({ item }) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth.auth);

	const onCartDelete = () => {
		try {
			dispatch(
				removeCartItem({ id: item.id, token: auth.token })
			).unwrap();
		} catch (error) {
			return console.log(error);
		} finally {
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
			className="flex items-center gap-5 border-b border-gray-300 py-4"
		>
			<div className="shrink-0">
				<Image
					width={80}
					height={80}
					className="object-contain"
					src={item?.product_thumbnail_image || "/img/placeholder.jpeg"}
					preview={false}
				/>
			</div>
			<div className="text-sm font-semibold ">
				<p>{item?.product_name}</p>
				<p className="mt-2 text-gray-400 font-medium">
					{" "}
					{item?.price_with_symbol} x {item?.quantity}
				</p>
			</div>
			<button
				onClick={onCartDelete}
				className="ml-auto mr-3 text-xl text-gray-500 hover:text-primary"
			>
				<RxCross2 />
			</button>
		</motion.div>
	);
};

export default CartItem;
