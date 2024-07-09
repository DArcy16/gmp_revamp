import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai';

const LoadingBtn = ({isLoading, label, width}) => {
  return (
		<button className= {`${width} mx-auto block py-2 bg-primary text-white text-sm font-bold hover:bg-secondary transition`}>
			{isLoading ? (
				<AiOutlineLoading className="white font-bold test-3xl animate-spin mx-auto" />
			) : (
				label
			)}
		</button>
	);
}

export default LoadingBtn