import React from 'react'

const Navbar = () => {
  return (
		<div className='w-full bg-emerald-400 text-black'>
			<div className='w-full h-full border-b-[1px] border-b-white'>
				<div className='max-w-container mx-auto h-20 px-4 flex items-center justify-between gap-2'>
					<div className='h-12 px-5 rounded-full bg-transparent flex items-center gap-2 hover:bg-hoverBg duration-300 cursor-pointer'>
						<h2>BookShop</h2>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar