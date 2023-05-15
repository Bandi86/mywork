import { BsMinecart } from 'react-icons/bs';
import { SlLogin } from 'react-icons/sl';
import { FcHome } from 'react-icons/fc';
import Link from 'next/link';
import { MdAccountCircle } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md';
import { FcSearch } from 'react-icons/fc';

const Nav = () => {
	return (
		<header>
			<nav className='flex justify-between items-center w-full  bg-fffff text-[#121621] font-bold text-wh-10 px-10 py-4 border-b border-indigo-300'>
				<div className='w-full hidden sm:flex sm:justify-between sm:gap-9 lg:justify-between'>
					<div className='flex flex-row gap-20 justify-center items-center'>
						<span>Logo here</span>
						<Link href='/'>
							<span>
								<FcHome className='text-2xl' />
							</span>
						</Link>
					</div>
					<div className='flex flex-row gap-2 justify-center items-center'>
						<FcSearch className='text-4xl' />
						<input
							type='text'
							placeholder='Search for anything...'
							name='search'
							className='placeholder:italic placeholder:text-slate-400 block bg-white w-[30rem] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
						/>
					</div>
					<div className='flex flex-row gap-20 justify-center items-center'>
						<span className='flex flex-row items-center gap-2'>
							<BsMinecart className='text-2xl' />
							Cart
						</span>
						<span className='flex flex-row items-center gap-2'>
							<MdFavorite className='text-2xl text-rose-700' />
							Favorites
						</span>
						<span className='flex flex-row items-center gap-2'>
							<MdAccountCircle className='text-2xl' />
							Profile
						</span>
						<span className='flex flex-row items-center gap-2'>
							<SlLogin className='text-xl' />
							Login
						</span>
						<Link href='/admin'>
							<span>Admin</span>
						</Link>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Nav;
