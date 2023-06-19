'use client';
import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';

const ProfileMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className='relative'>
			<span>
				<CgProfile
					className='hover:scale-125'
					onMouseEnter={handleMenuToggle}
				/>
			</span>
			{isMenuOpen && (
				<div className='absolute right-0 mt-2 py-2 w-40 bg-white border rounded shadow-lg'>
					<ul
						className='flex flex-col items-center gap-6 text-xs'
						onMouseLeave={handleMenuToggle}
					>
						<Link href='/login'>
							<li>Login</li>{' '}
						</Link>
						<Link href='/register'>
							<li>Register</li>
						</Link>
					</ul>
				</div>
			)}
		</div>
	);
};

export default ProfileMenu;
