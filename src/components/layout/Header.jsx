import React, { useState } from 'react'

import { AiOutlineClose } from "react-icons/ai";
import Banner1 from '../home/Banner1';
import Navbar from '../home/Navbar';


const Header = () => {
    
  return (
		<>
			
			<Banner1 />
			<Navbar />
		</>
	);
}

export default Header