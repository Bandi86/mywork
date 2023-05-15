import React from 'react';
import { MdRecommend } from 'react-icons/md';
import { categoriesData } from '../../static/data';
import { sampleSize } from 'lodash';
import { MdOutlineFavorite } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Recommend = () => {
	// Véletlenszerűen válassz ki négy elemet a categoriesData tömbből
	const randomCategories = sampleSize(categoriesData, 4);

	return (
		<div className='mt-6 h-60 bg-ffffff p-4'>
			<div className='flex flex-row items-center gap-2 text-xl'>
				<MdRecommend className='text-2xl' />
				Recommended
			</div>
			<div className='grid grid-cols-4 grid-rows-2 gap-4 mt-2 w-full'>
				{randomCategories.map((category) => (
					<div
						key={category.title}
						className='category-item flex flex-col items-center justify-center gap-2 w-full h-full border-2 border-indigo-300 rounded-md'
					>
						<p className='mt-6 font-bold'>{category.title}</p>
						<img
							src={category.image_Url}
							alt=''
							className='category-image object-cover w-full h-full mt-2 border-2 hover:opacity-80'
						/>
						<div className='flex flex-col gap-2 pb-4'>
							<p className='font-bold'>Product Title</p>
							<p>Product Desc</p>
						</div>
						<div className='flex flex-row gap-6 h-20 w-full border-t-2 border-indigo-300 justify-center items-center'>
							<p>Price</p>
							<p>Reviews</p>
							<p className='text-xl text-rose-700'>
								<MdOutlineFavorite />
							</p>
							<p className='text-xl'>
								<AiOutlineShoppingCart />
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Recommend;
