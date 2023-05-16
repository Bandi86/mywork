
const page = () => {
	return (
		<div className='flex flex-col w-full mt-4 text-center items-center gap-10 bg-slate-200'>
			<h1 className='text-3xl font-bold text-center'>Add Products</h1>
			<div className='flex flex-col w-full mt-4 text-center items-center gap-10'>
				<form className='flex flex-col w-full mt-4 text-center items-center gap-6'>
					<label className='text-lg text-black text-center'>Product Name</label>
					<input
						className='text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md'
						type='text'
						name='productname'
						placeholder='Product Name'
					/>
					<label className='text-lg text-black text-center'>Product Description</label>
					<input
						className='text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md'
						type='text'
						name='productdescription'
						placeholder='Product Description'
					/>
					<label className='text-lg text-black text-center'>Product Price</label>
					<input
						className='text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md'
						type='text'
						name='productprice'
						placeholder='Product Price'
					/>
					<label className='text-lg text-black text-center'>Product Image</label>
					<input
						className='text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md'
						type='text'
						name='productimage'
						placeholder='Product Image'
					/>
					<label className='text-lg text-black text-center'>Product Category</label>
					<input
						className='text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md'
						type='text'
						name='productcategory'
						placeholder='Product Category'
					/>
					<label className='text-lg text-black text-center'>Product Stock</label>
					<input
						className='text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md'
						type='text'
						name='productstock'
						placeholder='Product Stock'
					/>
					<button
            type='submit'
            className='w-1/6 p-2 mt-2 text-lg text-white bg-black rounded-md'
					>
						Add Product
					</button>
				</form>
			</div>
		</div>
	);
};

export default page;
