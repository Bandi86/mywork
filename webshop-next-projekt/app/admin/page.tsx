import React from 'react';
import Link from 'next/link';

const page = () => {
	return (
		<main className='min-h-screen text-center m-0'>
			<div className='flex flex-row w-full'>
				<div className='flex flex-col font-bold text-center 2 w-1/6 min-h-screen bg-black text-white gap-6'>
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
				<div className='w-5/6'></div>
			</div>
		</main>
	);
};

export default page;
