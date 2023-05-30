import logo from '../../../public/assets/img-1-logo-png-transparent.png';
import Image from 'next/image';

const Navbar = () => {
	return (
		<div className='w-full bg-blue text-white'>
			<div className='max-w-container mx-auto h-20 px-4 flex items-center'>
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
						<p>Departments</p>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
