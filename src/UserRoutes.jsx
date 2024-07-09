/** @format */

import { Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Brand from "./pages/Brand";
import Brands from "./pages/Brands";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Register from "./pages/Register";
import ShippingInfo from "./pages/ShippingInfo";
import TodayDeals from "./pages/TodayDeals";
import { token } from "./redux/features/auth";


const routes = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "div",
				element: (
					<div className="w-full h-screen flex items-center justify-center text-9xl font-bold text-primary">
						Sorry, Not Sorry ...
					</div>
				),
			},
			{
				path: "products",
				children: [
					{
						index: true,
						element: <Products />,
					},
					{
						path: ":product",
						element:  <Product />,
					},
				],
			},
			{
				path: "today-deals",
				element: <TodayDeals />,
			},
			{
				path: "brands",
				children: [
					{
						index: true,
						element: <Brands />,
					},
					{
						path: ":brand",
						element: <Brand />,
					},
				],
			},
			{
				path: "categories",
				children: [
					{
						index: true,
						element: <Categories />,
					},
					{
						path: ":category",
						element: <Category />,
					},
				],
			},
			{
				path: "cart",
				element: <Cart />				
			},
			{
				path: "shipping-info",
				element:  <ShippingInfo />
			}

		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
];

export default routes;
