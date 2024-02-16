/** @format */
import * as React from "react";
import { ConfigProvider } from "antd";
import { useLocation, useRoutes } from "react-router-dom";
import ReduxProvider from "./redux/ReduxProvider";
import UserRoutes from "./UserRoutes";
import { AnimatePresence } from "framer-motion";

import "./App.css";


function App() {
	const UserRouting = useRoutes(UserRoutes);
	const location = useLocation();

	return (
		<ReduxProvider>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: "#f86f03",
					},
				}}
			>
				<AnimatePresence mode="wait" initial={false}>
					{React.cloneElement(UserRouting, { key: location.pathname })}
				</AnimatePresence>
			</ConfigProvider>
		</ReduxProvider>
	);
}

export default App;
