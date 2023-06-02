import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
	return (
		<div className='flex flex-row h-full'>
			<div className='flex flex-col font-bold text-center bg-black text-white gap-6 w-60'>
				<Link href='/admin/addproducts'>
					<h2 className='mt-6'>Add Products</h2>
				</Link>
				<Link href='admin/manageproducts'>
					<h2>Manage Products</h2>
				</Link>
				<Link href='admin/manageusers'>
					<h2>Manage Users</h2>
				</Link>
				<Link href='admin/manageorders'>
					<h2>Manage Orders</h2>
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
