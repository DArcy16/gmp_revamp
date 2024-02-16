/** @format */

import * as React from "react";

export const API = "https://dev.gmpshopping.com/api/v2/";

export default function useFetch(path, method = "GET", body = "") {
	const [response, setResponse] = React.useState(null);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		setLoading(true);
		setResponse(null);

		const abortController = new AbortController();
		const signal = abortController.signal;

		fetch(`${API}${path}`, {
			method,
			...(body ? { body } : {}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (!signal.aborted) {
					setResponse(data);
					setLoading(false);
				}
			})
			.catch((error) => console.warn("Uh-oh.", error));

		return () => abortController.abort();
	}, [path, method, body]);

	return { response, loading };
}
