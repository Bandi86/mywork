import React from 'react';
import { NavLink } from 'react-router-dom';

const page = () => {
	return (
		<main className='min-h-screen text-center m-0'>
			<div className='flex flex-row w-full'>
				<div className='flex flex-col font-bold text-center 2 w-1/6 min-h-screen bg-black text-white gap-6'>
					<NavLink to='/admin/addproducts'>
						<h2 className='mt-6'>Add Products</h2>
					</NavLink>
					<NavLink to='admin/manageproducts'>
						<h2>Manage Products</h2>
					</NavLink>
					<NavLink to='admin/manageusers'>
						<h2>Manage Users</h2>
					</NavLink>
					<NavLink to='admin/manageorders'>
						<h2>Manage Orders</h2>
					</NavLink>
				</div>
				<div className='w-5/6'>
					<h2>Admin Content</h2>
				</div>
			</div>
		</main>
	);
};

export default page;
