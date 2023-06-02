import React from 'react';

const page = () => {
	return (
		<div className='flex flex-col w-full text-center items-center gap-10 bg-slate-200'>
			<h1 className='text-3xl font-bold text-center mt-4'>Manage Products</h1>
			<div>
				<table className='table-auto border-b-2 border-slate-800 mb-4'>
					<thead>
						<tr>
							<th className='px-4 py-2'>Product Name</th>
							<th className='px-4 py-2'>Product Description</th>
							<th className='px-4 py-2'>Product Price</th>
							<th className='px-4 py-2'>Product Image</th>
							<th className='px-4 py-2'>Product Category</th>
							<th className='px-4 py-2'>Product Stock</th>
							<th className='px-4 py-2'>Edit</th>
							<th className='px-4 py-2'>Delete</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='border px-4 py-2'>1</td>
							<td className='border px-4 py-2'>2</td>
							<td className='border px-4 py-2'>3</td>
							<td className='border px-4 py-2'>4</td>
							<td className='border px-4 py-2'>5</td>
							<td className='border px-4 py-2'>6</td>
							<td className='border px-4 py-2'>
								<input type='checkbox' />
							</td>
							<td className='border px-4 py-2'>
								<input type='checkbox' />
							</td>
							<td className='border px-4 py-2'>
								<button className='p-2 mt-2 text-lg text-white bg-black rounded-md'>
									Confirm
								</button>
							</td>
						</tr>
					</tbody>
				</table>
				// Add pagination here
			</div>
		</div>
	);
};

export default page;
