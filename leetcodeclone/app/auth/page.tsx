import React from 'react';
import Navbar from '../components/Navbar';
import AuthModal from '../components/Modals/AuthModal';

type Props = {};

const page = (props: Props) => {
	return (
		<div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
			<div className='max-w-7xl mx-auto'>
        <Navbar />
        <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
          <img src='/hero.png' alt='hero'></img>
          <AuthModal />
        </div>
			</div>
		</div>
	);
};

export default page;
