/** @format */

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import CheckoutStep from "../components/_common/CheckoutStep";
import NothingHere from "../components/_common/NothingHere";
import { FaAnglesLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

// Logos
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { changeCartQuantity, removeCartItem } from "../redux/features/cart";
import { API } from "../hooks/useFetch";

const Cart = () => {
	const cartItems = useSelector((state) => state.cart);

	const RenderCartItem = ({ item }) => {
		const [quantity, setQuantity] = useState(item?.quantity);
		const auth = useSelector((state) => state.auth.auth);
        const [variantPrice, setVariantPrice] = useState();
		const dispatch = useDispatch();
		const truncate_text =
			item?.product_name?.length > 35
				? item?.product_name?.split("").slice(0, 35).join("") + "..."
				: item?.product_name;

		const onCartDelete = () => {
			dispatch(removeCartItem({ id: item.id, token: auth?.token }));
		};

        useEffect(() => {
            if(item.product_id) {
                const fetchVariantPrice = async () => {
									const abortController = new AbortController();
									const signal = abortController.signal;

									fetch(
										`${API}products/variant/price?id=${item?.product_id}&variants=${item?.variation || ""}`,
										{
											methode: "GET",
											headers: {
												Accept: "application/json",
												"Content-Type": "application/json",
											},
										}
									)
										.then((res) => res.json())
										.then((data) => {
											if (!signal.aborted) {
												setVariantPrice(data.data);
											}
										})
										.catch((error) => console.warn("Uh-oh.", error));

									return () => abortController.abort();
								};
								fetchVariantPrice();
            }
        },[item.name]);



		return (
			<motion.article
				// initial={{ opacity: 0 }}
				// animate={{ opacity: 1 }}
				exit={{ opacity: 0, x: -100 }}
				transition={{ duration: 0.5 }}
				className="flex w-full text-center items-center py-2 border-b border-b-black/15 justify-between md:justify-around"
			>
				<div className="flex flex-col items-center justify-center text-gray-400 gap-1 ">
					<button
						disabled={item.quantity <= item.lower_limit}
						onClick={() =>
							item.quantity > item.lower_limit &&
							dispatch(
								changeCartQuantity({
									formData: {
										id: item.id,
										quantity: item.quantity - 1,
									},
									token: auth?.token,
								})
							)
						}
						className="hover:text-primary disabled:text-primary/10 active:text-primary/80"
					>
						{" "}
						<CiCircleMinus className="text-3xl " />
					</button>
					<h3>{quantity}</h3>
					<button
						disabled={item.quantity >= item.upper_limit}
						onClick={() =>
							item.quantity < item.upper_limit &&
							dispatch(
								changeCartQuantity({
									formData: {
										id: item.id,
										quantity: item.quantity + 1,
									},
									token: auth?.token,
								})
							)
						}
						className="hover:text-primary active:text-primary/80 disabled:text-primary/10"
					>
						{" "}
						<CiCirclePlus className="text-3xl " />
					</button>
				</div>
				<div className="flex md:w-1/2 gap-2 text-left  items-center">
					<img
						className="w-16 md:w-24"
						src={item?.product_thumbnail_image}
						alt=""
					/>
					<div>
						<h3 className="hidden text-sm font-medium md:block text-gray-600">
							{truncate_text}
						</h3>
						{item?.has_discount && (
							<>
								<p className="text-xs space-x-2 mt-2">
									<span className=" text-blue-400">Discount Limit Left:</span>
									<span className="text-red-500 font-medium">{"No limit"}</span>
								</p>
								<p className="text-xs font-medium text-red-600 space-x-2">
									<span>Save</span>
									<span>{item?.discount}</span>
								</p>
							</>
						)}
					</div>
				</div>
				<div className=" font-medium text-sm">
					<p>{item?.price_with_symbol}</p>
				</div>
				<div className="">
					<p className="font-medium text-primary text-sm">
						{item?.total_price_with_symbol}
					</p>
				</div>
				<button
					onClick={onCartDelete}
					className="group  float-end block p-2 rounded-full bg-yellowish/20 hover:bg-primary transition"
				>
					<MdDeleteForever className="text-lg text-primary group-hover:text-white transition" />
				</button>
			</motion.article>
		);
	};
	return (
		<div className="max-w-[1100px] mx-auto section_padding responsive_pb">
			{/*active = My Cart | Shipping Info | Delievery Info | Payment | Confirmation */}
			<CheckoutStep active="My Cart" />

			<div className="mt-4 px-6 py-4 md:mt-6 border border-black/15">
				{(cartItems?.data[0]?.cart_items?.length === undefined ||
					cartItems?.data[0]?.cart_items?.length <= 0) && (
					<div className="w-1/2 mx-auto pt-10 flex-col items-center responsive_pb justify-center">
						<NothingHere label="You did't add any cart item yet." />
					</div>
				)}
				{
					// Cart Items
					<motion.div>
						{cartItems?.status === "succeeded" &&
							cartItems?.data[0]?.cart_items?.length > 0 && (
								<>
									<AnimatePresence>
										{cartItems?.data[0]?.cart_items?.map((item) => (
											<RenderCartItem key={item.id} item={item} />
										))}
									</AnimatePresence>

									<p className=" py-3 border-t border-t-gray-300 ">
										<span className="text-gray-400 text-base font-medium">
											Subtotal
										</span>{" "}
										{cartItems?.status === "succeeded" && (
											<span className="text-lg text-primary font-semibold float-right">
												{" "}
												{cartItems?.data[0]?.cart_items
													?.reduce((accu, cur) => {
														return accu + cur.total_price;
													}, 0)
													.toLocaleString() || 0}{" "}
												MMK
											</span>
										)}
									</p>
									<div className="flex mt-4 justify-between">
										<Link
											to={"/"}
											className="flex items-center gap-1 md:gap-2 font-medium md:text-base text-primary hover:text-primary/90"
										>
											<FaAnglesLeft className=" text-xs" /> Home
										</Link>
										<Link
											to={"/shipping-info"}
											className="font-medium text-sm px-4 py-2 bg-primary text-white hover:bg-secondary transition "
										>
											Continute To Shipping
										</Link>
									</div>
								</>
							)}
					</motion.div>
				}
			</div>
		</div>
	);
};

export default Cart;
