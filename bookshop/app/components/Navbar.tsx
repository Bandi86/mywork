import { MdFavorite } from 'react-icons/md';
import { RiShoppingCart2Line } from 'react-icons/ri';
import Link from 'next/link';
import ProfileMenu from './ProfileMenu';

const Navbar = () => {
	return (
		<div className='h-18 bg-[#f4f3ec]'>
			<div className='flex items-center w-full font-bold pl-4 text-wh-10 py-4 gap-4 justify-between'>
				<span>
					<Link href='/'>
						<img
							src='https://e7.pngegg.com/pngimages/659/864/png-clipart-logo-book-cartoon-books-cartoon-character-supplies-thumbnail.png'
							width={50}
							height={50}
							alt='logo'
						/>
					</Link>
				</span>
				<div className='flex gap-2 items-center '>
					<div className='max-w-md mx-auto'>
						<div className='relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden'>
							<div className='grid place-items-center h-full w-12 gap-4 text-gray-300'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6 text-black'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									cursor={'pointer'}
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
									/>
								</svg>
							</div>
							<input
								className='h-full w-full rounded-full px-4 border-slate-900 text-black text-base outline-none border-[2px] border-transparent'
								type='text'
								id='search'
								placeholder='Search something..'
							/>
						</div>
					</div>
				</div>
				<div className='flex items-center gap-10 pr-4 text-3xl text-black hover:cursor-pointer'>
					<ProfileMenu />					
					<span>
						<MdFavorite className='hover:scale-125 text-red-600' />
					</span>
					<span>
						<RiShoppingCart2Line className='hover:scale-125' />
					</span>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
