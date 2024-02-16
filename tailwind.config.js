/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#f86f03",
				"hov-primary": "#df6403",
				yellowish: "#f3af3d",
				secondary: "#0c134f",
				bladish: "#141313",
				redish: "#ef486a",
				grayish: "#292933",
			},
		},
	},
	plugins: [],
};
