/** @format */

import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";

// Icons
import { MdCompareArrows } from "react-icons/md";
import { GiSelfLove } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { HiMenuAlt1 } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";

// Component
import CartDrawer from "../drawer/CartDrawer";
import MenuDrawer from "../drawer/MenuDrawer";
import AutoCompleteBox from "../form/AutoCompleteBox";
import SearchDrawer from "../drawer/SearchDrawer";
import LocaleDropDown from "../form/LocaleDropDown";
import ProfileDropdown from "../form/ProfileDropdown";
import CategoriesDropDown from "../form/CategoriesDropDown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
	const [openCart, setOpenCart] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);

	const auth = useSelector((state) => state.auth.auth);
	const cart = useSelector(state => state.cart)

	const onSubmit = () => {
		return null;
	};

	return (
		<>
			{/* Locale */}
			<div className="width_limit font-mono flex justify-between items-center padding">
				<LocaleDropDown />
				<a className=" font-mono text-xs lg:text-sm" href="tel:+959444442166">
					Hotline: 959444442166
				</a>
			</div>

			{/* Search Section And Navbar */}

			<div className="sticky top-0 z-50">
				{/* Search Section */}

				<div className="flex width_limit items-center justify-start lg:justify-between bg-white padding py-4 drop-shadow-sm md:drop-shadow-none md:py-5">
					{/* Mobile Menu Btn */}
					<HiMenuAlt1
						onClick={() => setOpenMenu(true)}
						className="text-2xl lg:hidden mr-4 cursor-pointer"
					/>
					{/* End Mobile Meny Btn */}

					<img className=" w-16 lg:w-20" src="/img/gmp_logo.png" alt="" />

					{/* Mobile Search Btn */}
					<FiSearch
						onClick={() => setOpenSearch(true)}
						className="text-2xl lg:hidden ml-auto cursor-pointer"
					/>
					{/* End Mobile Search Btn*/}

					<AutoCompleteBox />

					<div className="hidden lg:flex items-center justify-around gap-9 text-2xl text-gray-400">
						<Tooltip title="Compare">
							<button>
								{" "}
								<MdCompareArrows />
							</button>
						</Tooltip>
						<Tooltip title="Wishlist">
							<button>
								<GiSelfLove />
							</button>
						</Tooltip>
						<button>
							<IoIosNotifications />
						</button>
						{auth.token ? (
							<button>
								<RiMessengerLine className="text-primary" />
							</button>
						) : null}
						{auth.token ? (
							<ProfileDropdown />
						) : (
							<div className="hidden xl:flex group items-center gap-4">
								<IoPersonCircleOutline className="group-hover:text-primary font-light group-hover:drop-shadow-xl transition-all duration-300 text-[2.5rem]" />
								<Link
									to="/login"
									className=" text-sm hover:text-primary transition duration-300"
								>
									{" "}
									Login
								</Link>
								|
								<Link
									to="/register"
									className="text-sm hover:text-primary transition duration-300"
								>
									Register
								</Link>
							</div>
						)}
					</div>
				</div>

				{/* Navbar */}
				<div className="bg-primary">
					<div className="hidden lg:flex justify-center xl:justify-between items-stretch width_limit">
						<div className="flex items-stretch justify-center xl:justify-start gap-4">
							<CategoriesDropDown />
							<ul className="flex text-white justify-start text-sm font-semibold items-stretch">
								<li className="flex items-stretch">
									<Link
										className="px-5 py-3 cursor-pointer hover:bg-hov-primary"
										to={"/"}
									>
										Home
									</Link>
								</li>
								<li className="flex items-stretch">
									<Link
										className="px-5 py-3 cursor-pointer hover:bg-hov-primary"
										to={"/flash-sales"}
									>
										Flash Sales
									</Link>
								</li>
								<li className="flex items-stretch">
									<Link
										className="px-5 py-3 cursor-pointer hover:bg-hov-primary"
										to={"/blogs"}
									>
										Blogs
									</Link>
								</li>
								<li className="flex items-stretch">
									<Link
										className="px-5 py-3 cursor-pointer hover:bg-hov-primary"
										to={"/brands"}
									>
										All Brands
									</Link>
								</li>
								<li className="flex items-stretch place-content-center">
									<Link
										className="px-5 py-3 cursor-pointer hover:bg-hov-primary"
										to={"/categories"}
									>
										All Categories
									</Link>
								</li>
								<li className="flex items-stretch">
									<Link
										className="px-5 py-3 cursor-pointer hover:bg-hov-primary"
										to={"/point-shop"}
									>
										Point Shop
									</Link>
								</li>
							</ul>
						</div>
						<div className="hidden xl:flex items-center justify-end gap-6">
							<div className="flex items-center gap-2 bg-white cursor-pointer text-sm font-semibold px-3 py-1 text-primary rounded-full hover:scale-95 active:scale-100 transition-all duration-300">
								<MdOutlineDownloadForOffline className="md:text-xl" />
								Download
							</div>
							<div
								onClick={() => setOpenCart(true)}
								className="flex items-center cursor-pointer bg-hov-primary px-8 gap-3 py-3 text-white"
							>
								<IoMdCart className="md:text-2xl" />
								<p className="font-semibold">
									{cart?.data[0]?.cart_items?.reduce((accu, cur) => {
										return accu + cur?.total_price
									}, 0).toLocaleString() || 0} MMK <span className="text-xs font-normal">({cart?.data[0]?.cart_items?.length || 0} items)</span>
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Drawer */}

				<CartDrawer
					setOpenCart={setOpenCart}
					openCart={openCart}
				/>
				<MenuDrawer setOpenMenu={setOpenMenu} openMenu={openMenu} />
				<SearchDrawer setOpenSearch={setOpenSearch} openSearch={openSearch} />
			</div>
		</>
	);
};

export default Navbar;
