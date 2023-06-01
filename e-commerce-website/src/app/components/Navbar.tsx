import logo from '../../../public/assets/img-1-logo-png-transparent.png';
import Image from 'next/image';
import { BsCart2, BsSearch } from 'react-icons/bs';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import NavbarBottom from './NavbarBottom';

const Navbar = () => {
	return (
		<div className='w-full bg-blue text-white'>
			<div className='w-full h-full border-b-[1px] border-b-white'>
				<div className='max-w-container mx-auto h-20 px-4 flex items-center justify-between gap-2'>
					<div className='navBarHover'>
						<h2>Shoppers</h2>
						<Image
							src={logo}
							alt='logo'
							className='w-44 h-8'
						/>
					</div>
					<div className='navBarHover'>
						<div className='w-4 grid grid-cols-2 gap-[2px]'>
							<span className='w-1.5 h1.5 border-[1px] border-white inline-flex '></span>
							<span className='w-1.5 h1.5 border-[1px] border-white inline-flex '></span>
							<span className='w-1.5 h1.5 border-[1px] border-white inline-flex '></span>
							<span className='w-1.5 h1.5 border-[1px] border-white inline-flex '></span>
						</div>
						<p className='text-base font-semibold'>Departments</p>
					</div>
					<div>
						<div className='navBarHover'>
							<div className='w-4 grid grid-cols-2 gap-[2px]'>
								<span className='w-1.5 h1.5 rounded-md border-[1px] border-white inline-flex '></span>
								<span className='w-1.5 h1.5 rounded-md border-[1px] border-white inline-flex '></span>
								<span className='w-1.5 h1.5 rounded-md border-[1px] border-white inline-flex '></span>
								<span className='w-1.5 h1.5 rounded-md border-[1px] border-white inline-flex '></span>
							</div>
							<p className='text-base font-semibold'>Services</p>
						</div>
					</div>
					<div className='h-10 flex flex-1 relative'>
						<input
							type='text'
							placeholder='Search'
							className='h-full w-full rounded-full px-4 text-black text-base outline-none border-[1px] border-transparent focus-visible:border-black duration-200'
						/>
						<span className='absolute w-8 h-8 rounded-full flex items-center justify-center top-1 right-1 bg-yellow text-black text-xl'>
							<BsSearch />
						</span>
					</div>
					<div className='navBarHover'>
						<AiOutlineHeart />
					</div>
					<div>
						<p className='text-xs'>Recorder</p>
						<h2 className='text-base font-semibold -mt-1'>My Items</h2>
					</div>
					<div className='navBarHover'>
						<AiOutlineUser className='text-lg' />
					</div>
					<div>
						<p className='text-xs'>Sign In</p>
						<h2 className='text-base font-semibold -mt-1'>Acount</h2>
					</div>
					<div className='flex flex-col justify-center items-center gap-2 h-12 px-5 rounded-full bg-transparent hover:bg-hoverBg duration-300 relative'>
						<BsCart2 className='text-2xl' />
						<p className='text-[12px] -mt-2'>$0.00</p>
						<span className='absolute w-4 h-4 bg-yellow text-black top-0 right-4 rounded-full flex items-center justify-center font-bodyFont text-xs'>
							0
						</span>
					</div>
				</div>
			</div>

			<NavbarBottom />
		</div>
	);
};
export default Navbar;
