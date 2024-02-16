/** @format */

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileNavPopUp from "./MobileNavPopUp";
import PageChangeMotion from "../_common/PageChangeMotion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../redux/features/cart";

const Layout = () => {
	const auth = useSelector((state) => state.auth.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		auth.token && dispatch(fetchCartItems(auth.token));
	}, []);

	return (
		<>
			<Header />
			<div className="width_limit">
				<Outlet />
			</div>
			<Footer />
			<MobileNavPopUp />
			<PageChangeMotion />
		</>
	);
};

export default Layout;
