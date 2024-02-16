/** @format */

const getArray = (number) =>  {
    return Array.from({ length: number }, (_, i) => i + 1);
}

export const getId = (str) => {
    return str.split("/").slice(-1).join("")
}

export default getArray;
	
