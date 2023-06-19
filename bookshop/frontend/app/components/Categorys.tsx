'use client';
import { Separator } from '@radix-ui/react-separator';

const Categorys = () => {
	return (
		<div className='max-w-container mx-auto py-2 px-6 flex items-center justify-center'>
			<Separator
				orientation='vertical'
				className='h-10'
			/>
			<ul className='h-10 w-full p-2 flex items-center justify-between gap-2 border-y-2 border-black text-[#633A34] font-bold'>
				<li className='bottomNavLi'>Könyv</li>
				<li>|</li>
				<li className='bottomNavLi'>E-Könyv</li>
				<li>|</li>
				<li className='bottomNavLi'>Hangoskönyv</li>
				<li>|</li>
				<li className='bottomNavLi'>Idegen nyelvű könyv</li>
				<li>|</li>
				<li className='bottomNavLi'>Antik Könyv</li>
				<li>|</li>
				<li className='bottomNavLi'>Zene</li>
				<li>|</li>
				<li className='bottomNavLi'>Film</li>
				<li>|</li>
				<li className='bottomNavLi'>Akciók</li>
				<li>|</li>
				<li className='bottomNavLi'>Újdonság</li>
				<li>|</li>
				<li className='bottomNavLi'>Előrendelhető</li>
				<li>|</li>
				<li className='bottomNavLi'>Sikerlista</li>
			</ul>
		</div>
	);
};

export default Categorys;
