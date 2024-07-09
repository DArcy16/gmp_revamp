/** @format */

import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Color from "color"; // Import the color library
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Image, Rate, Spin, Tooltip } from "antd";
import { motion } from "framer-motion";

import useFetch, { API } from "../../hooks/useFetch";

// Logo
import { GoQuestion } from "react-icons/go";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { MdOutlineMessage } from "react-icons/md";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { IoMdCart } from "react-icons/io";
import TopSellingProducts from "./TopSellingProducts";
import Review from "./Review";
import Description from "./Description";
import RelatedProducts from "./RelatedProducts";
import ProductQueries from "./ProductQueries";
import { addCartItem } from "../../redux/features/cart";
import { AiOutlineLoading } from "react-icons/ai";

const ProductDetails = ({
	isModal = false,
	modal_product_id = "",
	modalCancel = "",
}) => {
	const auth = useSelector((state) => state.auth.auth);
	const dispatch = useDispatch();

	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const { response: product, loading } = useFetch(
		`${isModal ? `products/${modal_product_id}` : `products/${id}`}`
	);

	const [variantPrice, setVariantPrice] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [variant, setVariant] = useState("");
	const [variant1, setVariant1] = useState({
		selectedColors: "",
		attributes: "",
	});
	const [addToCartStatus, setAddToCartStatus] = useState("idle");

	const findPhoto = (photos, variant) => {
		return photos?.filter((item) => item?.variant === variant)[0]?.path;
	};

	const getColorName = (colorCode) => {
		const rgbColor = Color(colorCode).rgb().array();
		const colorName = Color.rgb(rgbColor).keyword(); // Convert hex to RGB
		return colorName.charAt(0).toUpperCase() + colorName.slice(1);
	};

	const getColorValue = (colorName) => {
		return Color(colorName.toLowerCase()).hex();
	};

	useEffect(() => {
		if (!loading) {
			setVariant1((prev) => ({
				...prev,
				selectedColors: product?.data[0]?.colors[0] || "",
			}));

			setVariant1((prev) => ({
				...prev,
				attributes: product?.data[0]?.choice_options
					?.map((item, index) => ({
						[`option${index}`]: item.options[0],
					}))
					?.reduce((accu, cur) => {
						return Object.assign(accu, cur);
					}, {}),
			}));
		}
	}, [product]);

	useEffect(() => {
		if (variant1?.attributes?.option0 && variant1?.selectedColors) {
			setVariant(
				[
					getColorName(variant1?.selectedColors),
					Object.entries(variant1?.attributes).map(([_, value]) =>
						value?.split(" ")?.join("")
					),
				].join("-")
			);
		} else if (variant1?.selectedColors) {
			setVariant([getColorName(variant1?.selectedColors)].join("-"));
		} else {
			variant1?.attributes &&
				setVariant(
					[
						...Object.entries(variant1?.attributes).map(([_, value]) =>
							value?.split(" ")?.join("")
						),
					].join("-")
				);
		}
	}, [variant1?.selectedColors, variant1?.attributes?.option0]);

	useEffect(() => {
		if (!loading) {
			const fetchVariantPrice = async () => {
				const abortController = new AbortController();
				const signal = abortController.signal;

				fetch(
					`${API}products/variant/price?id=${product?.data[0]?.id}&variants=${variant}`,
					{
						method: "GET",
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

		// if (variant) {
		// 	setVariant1({
		// 		selectedColors: getColorValue(
		// 			variant.split("-").slice(0, 1)[0].toLowerCase()
		// 			),
		// 			attributes: variant
		// 			.split("-")
		// 			.slice(1)
		// 			.map((item, index) => ({
		// 				[`option${index}`]: item,
		// 			}))
		// 			.reduce((accu, cur) => {
		// 				return Object.assign(accu, cur);
		// 			}, {}),
		// 		});
		// 	}
	}, [variant, product]);

	const onCompareBtnClick = () => {
		toast.success("Added to Compare.");
	};

	const onWishlistBtnClick = () => {
		if (auth?.token) {
		} else {
			toast.warn("Please, Login first.");
		}
	};

	const onCartBtnClick = async () => {
		if (auth.token) {
			try {
				setAddToCartStatus("pending");
				dispatch(
					addCartItem({
						formData: {
							id: product?.data[0]?.id,
							variant: variant,
							quantity: quantity,
						},
						token: auth.token,
					})
				).unwrap();
			} catch (err) {
				return err;
			} finally {
				setAddToCartStatus("idle");
			}
		} else {
			toast.warn("Please, login first.");
		}
	};
	// Style

	return (
		<>
			{!loading ? (
				<div className=" scroll-smooth">
					<article
						className={`md:flex ${
							isModal ? "md:items-center" : ""
						} responsive_pb`}
					>
						{/* Product Img */}
						<div className="sm:w-2/3 mx-auto md:w-1/2 md:mx-0">
							<div className="sm:w-2/3 mx-auto">
								<Image
									className="w-full"
									src={
										findPhoto(product?.data[0]?.photos, variant) ||
										product?.data[0]?.thumbnail_image
									}
									alt=""
								/>
							</div>

							<div className="flex flex-wrap gap-y-2 justify-center mt-2">
								{product?.data[0]?.photos?.map((item, index) => (
									<div
										onClick={() => {
											setVariant(item?.variant);
											// setPhoto(index);
										}}
										className={` w-16 mr-2 border ${
											variant === item?.variant
												? "border-primary"
												: "border-black-15"
										} cursor-pointer`}
										key={item?.variant}
									>
										<img className="w-full" src={item?.path} alt="" />
									</div>
								))}
							</div>
						</div>

						{/* Product Info */}
						<div className="mt-8 space-y-4 md:space-y-6 md:mt-0">
							<h3 className="font-bold">{product?.data[0]?.name}</h3>
							{/* Reviews and Other */}
							<>
								{!isModal && (
									<>
										<div className="flex items-center gap-4">
											<Rate disabled defaultValue={product?.data[0]?.rating} />
											<pre className="text-black/40 font-medium text-sm">
												({product?.data[0]?.rating_count} reviews)
											</pre>
										</div>

										<div className="sm:flex sm:gap-6 space-y-8 sm:space-y-0">
											<a
												href="#productQueries"
												className="flex gap-1 items-center text-primary hover-animate-outline-primary"
											>
												<GoQuestion />{" "}
												<span className="text-sm font-medium">
													Product Inquery
												</span>
											</a>
											<div className="flex gap-6">
												{!product?.data[0]?.is_wishlisted ? (
													<button
														onClick={onWishlistBtnClick}
														className="flex gap-1 items-center text-black/50 font-medium text-sm"
													>
														<FaRegHeart /> Add To Wishlist
													</button>
												) : (
													<button
														disabled
														className="flex gap-1 items-center text-primary font-medium text-sm"
													>
														<FaHeart /> Added To Wishlist
													</button>
												)}
												<button
													onClick={onCompareBtnClick}
													className="flex gap-1 items-center text-black/50 font-medium text-sm"
												>
													<RiArrowLeftRightFill /> Add To Compare
												</button>
											</div>
										</div>

										<div className="flex items-center gap-6">
											<h3 className="font-medium text-sm">
												{product?.data[0]?.shop_name}
											</h3>
											<button className="flex items-center gap-1 text-sm text-yellowish border border-yellowish bg-yellowish/10 px-4 py-[.35rem] rounded-full hover:text-white hover:bg-yellowish transition">
												<MdOutlineMessage className="text-base" />{" "}
												<span>Message Seller</span>
											</button>
										</div>

										<hr />
									</>
								)}
							</>

							<p>
								<span className="text-black/70 inline-block min-w-20">
									Price{" "}
								</span>
								<span className="text-primary text-lg font-semibold ml-6">
									{product?.data[0]?.stroked_price}
								</span>
								<span className="ml-1 text-black/60">
									/{product?.data[0]?.unit}
								</span>
							</p>

							{product?.data[0]?.colors?.length > 0 && (
								<div className="flex items-center">
									<p className="text-black/70 mr-6 min-w-20">Color</p>
									{product?.data[0]?.colors?.map((item, index) => (
										<div
											onClick={() =>
												setVariant1((prev) => ({
													...prev,
													selectedColors: item,
												}))
											}
											className={` ${
												variant1?.selectedColors === item
													? "border-2 border-primary"
													: "border border-black/15"
											} p-1 mr-3 rounded-sm cursor-pointer`}
											key={index}
										>
											<Tooltip title={getColorName(item)}>
												<div
													style={{ background: item }}
													className="w-6 h-6 rounded-md"
												></div>
											</Tooltip>
										</div>
									))}
								</div>
							)}

							{product?.data[0]?.choice_options?.map((item, index) => (
								<div className="mt-4 flex  items-center" key={item.name}>
									<p className="text-black/70 mr-6 min-w-20">{item?.title}</p>
									<div className="flex flex-wrap">
										{item?.options?.map((item) => (
											<div
												onClick={() =>
													setVariant1((prev) => ({
														...prev,
														attributes: {
															...prev.attributes,
															[`option${index}`]: item,
														},
													}))
												}
												key={item}
												className={` mt-2
									 ${
											variant1?.attributes?.option0 &&
											variant1?.attributes[`option${index}`] === item
												? "border-2 border-primary"
												: "border border-black-15"
										}
									 px-4 py-[.2rem] mr-3 min-w-20 text-center cursor-pointer`}
											>
												{item}
											</div>
										))}
									</div>
								</div>
							))}

							{/* Quantity */}
							<div className="flex sm:items-center">
								<p className="text-black/70 inline-block min-w-20 mr-6">
									Quantity
								</p>
								<div className="sm:flex sm:items-center">
									<div className="flex items-center">
										<div className="flex items-center gap-4">
											<button
												onClick={() => {
													setQuantity((prev) => prev - 1);
												}}
												disabled={quantity <= 1}
												className="text-4xl text-black/30 hover:text-primary disabled:text-black/5 active:text-primary/70 transition"
											>
												<CiSquareMinus />
											</button>
											<p className="min-w-8 text-center font-semibold">
												{quantity}
											</p>
											<button
												onClick={() => {
													setQuantity((prev) => prev + 1);
												}}
												disabled={quantity >= variantPrice?.stock || !variantPrice?.stock}
												className="text-4xl text-black/30 hover:text-primary active:text-primary/70 disabled:text-black/5 transition"
											>
												<CiSquarePlus />
											</button>
										</div>
										<pre className="ml-4 text-black/50 text-sm">
											({variantPrice?.stock || 0} available)
										</pre>
									</div>

									{product?.data[0]?.has_discount && (
										<div className="sm:ml-4 mt-2 sm:mt-0 space-y-2">
											<p className="text-xs space-x-2">
												<span className=" text-blue-500">
													Discount Limit Left:
												</span>
												<span className="text-red-500 font-medium">
													{product?.data[0]?.discount_limt_left || "No limit"}
												</span>
											</p>
											<p className="text-xs font-medium text-red-600 space-x-2">
												<span>Save</span>
												<span>{product?.data[0]?.discount}</span>
											</p>
										</div>
									)}
								</div>
							</div>

							<p>
								<span className="text-black/70 inline-block min-w-20 mr-6">
									Barcode
								</span>
								<span className="text-primary font-medium">
									{variantPrice?.barcode}
								</span>
							</p>

							<p>
								<span className="text-black/70 inline-block min-w-20 mr-6">
									Total Price
								</span>
								<span className="text-primary text-xl font-medium">
									{(
										product?.data[0]?.calculable_price * quantity
									).toLocaleString()}{" "}
									{product?.data[0]?.currency_symbol}
								</span>
							</p>

							<div className="flex text-white text-sm font-medium gap-x-4">
								<button
									disabled={addToCartStatus === "pending"}
									onClick={onCartBtnClick}
									className=" flex items-center py-2 px-4  rounded-sm justify-center min-w-36 gap-2 bg-yellowish hover:bg-yellowish/90 transition"
								>
									{addToCartStatus === "pending" ? (
										<AiOutlineLoading className="white font-bold test-3xl animate-spin mx-auto" />
									) : (
										<>
											<IoMdCart className="text-xl " /> <span>Add To Cart</span>
										</>
									)}
								</button>
								<button className="flex items-center py-2 px-4 rounded-sm justify-center min-w-36 gap-2 bg-primary hover:bg-secondary transition">
									<IoMdCart className="text-xl " /> <span>Buy Now</span>
								</button>
							</div>
						</div>
					</article>
					{!isModal && (
						<section className="flex flex-col-reverse lg:flex-row gap-y-4 lg:gap-x-4 responsive_pb">
							<section className="w-full lg:w-1/4 lg:shrink-0">
								<TopSellingProducts sellerId={product?.data[0]?.seller_id} />
							</section>
							<section className="w-full lg:w-3/4 space-y-6">
								<div>
									<Review product={product?.data[0]} />
								</div>
								<div>
									<Description product={product?.data[0]} />
								</div>
								<div>
									<RelatedProducts product_id={product?.data[0]?.id} />
								</div>
								<div id="productQueries">
									<ProductQueries />
								</div>
							</section>
						</section>
					)}
				</div>
			) : (
				<div className="h-[70vh] flex items-center justify-center">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="mt-8 flex h-80 items-center justify-center"
					>
						<Spin size="large" />
					</motion.div>
				</div>
			)}
		</>
	);
};

export default ProductDetails;
