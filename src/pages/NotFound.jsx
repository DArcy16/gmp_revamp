import React from 'react'
import { Link } from 'react-router-dom';
import PageChangeMotion from '../components/_common/PageChangeMotion';

const NotFound = () => {
  return (
		<div className="w-full h-screen flex flex-col items-center justify-center text-9xl font-bold text-primary">
			This page doesn't exist.
			<Link to="/" className='block mt-8 text-xl underline underline-offset-2 hover:text-primary'>Back To Home</Link>
			<PageChangeMotion />
		</div>
	);
}

export default NotFound