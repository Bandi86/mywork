import React from 'react';
import { MdRecommend } from 'react-icons/md';

const Recommend = () => {
	return (
		<div className='mt-6 ml-6 h-60 bg-orange-400 p-4'>
			<div className='flex flex-row items-center gap-2 text-xl border-b-2 to-blue-500'>
				<MdRecommend />
				Recommended
			</div>
			<div className='grid grid-col-4 grid-rows-2'></div>
		</div>
	);
};

export default Recommend;
