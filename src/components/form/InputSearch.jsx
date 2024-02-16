import React from 'react'

import { IoSearchOutline } from "react-icons/io5";


const InputSearch = ({onSubmit}) => {
  return (
		<form className='w-full' action="" onSubmit={onSubmit}>
			<div className='flex justify-between items-center outline outline-2 rounded-full outline-gray-100 w-100 focus-within:outline-2 focus-within:outline-primary px-6 py-2'>
				<input type="text" placeholder="I want to buy ..." className='text-lg focus-within:outline-none'/>
                <IoSearchOutline className='md:text-xl'/>
			</div>
		</form>
	);
}

export default InputSearch