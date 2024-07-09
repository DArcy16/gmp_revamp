/** @format */

import React from "react";
import { Drawer } from "antd";
import { AnimatePresence, motion } from "framer-motion";

// Components
import CartItem from "../home/CartItem";

// Icons
import { IoMdCart } from "react-icons/io";
import { useSelector } from "react-redux";
import NothingHere from "../_common/NothingHere";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartDrawer = ({ setOpenCart, openCart }) => {
	const auth = useSelector((state) => state.auth.auth);
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart);

	return (
		<Drawer
			title={
				<div className=" text-primary float-right">
					<IoMdCart className="md:text-3xl" />
				</div>
			}
			className="pb-0"
			onClose={() => setOpenCart(false)}
			open={openCart}
		>
			{(cartItems?.data[0]?.cart_items?.length === undefined ||
				cartItems?.data[0]?.cart_items?.length <= 0) && (
				<div className="flex pt-10 flex-col items-center justify-center">
					<NothingHere label="You don't add any cart item yet." />
				</div>
			)}
			{
				// Cart Items
				<motion.div layout className="h-4/5 overflow-y-auto scroll-bar-light">
					<AnimatePresence>
						{cartItems?.status === "succeeded" &&
							cartItems?.data[0]?.cart_items?.length > 0 &&
							cartItems?.data[0]?.cart_items?.map((item) => (
								<CartItem key={item.id} item={item} />
							))}
					</AnimatePresence>
				</motion.div>
			}

			<div className="sticky bottom-0 bg-white z-10">
				<p className=" py-3 px-2 border-t border-t-gray-300 ">
					<span className="text-gray-400 text-base font-medium">Subtotal</span>{" "}
					{cartItems?.status === "succeeded" && (
						<span className="text-xl text-primary font-semibold float-right">
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
				<div className="flex pt-3 border-t border-t-gray-300 justify-center gap-5">
					<button
						onClick={() => {
							if (auth?.token) {
								navigate(`/cart`);
							} else {
								toast.warn("Please, Login first.");
							}
						}}
						className="w-2/4 py-2 rounded-full text-white font-medium bg-yellowish"
					>
						View Cart
					</button>

					<button
						onClick={() => {
							if (auth?.token) {
								navigate(`/checkout`);
							} else {
								toast.warn("Please, Login first.");
							}
						}}
						className="w-2/4 py-2 rounded-full text-white font-medium bg-primary hover:bg-secondary transition duration-300"
					>
						Checkout
					</button>
				</div>
			</div>
		</Drawer>
	);
};

export default CartDrawer;
