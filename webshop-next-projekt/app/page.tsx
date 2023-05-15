import Recommend from "./components/Home/Recommend";

export default function Home() {
	return (
		<main className='bg-[#efefef] h-full ml-[15rem] mr-[15rem]'>
			<div className='flex flex-row p-2 text-center justify-around border-b-2 border-indigo-300 border-l-2 border-r-2 bg-white'>
				<h2>Sale</h2>
				<h2>New Products</h2>
				<h2>Popular</h2>
			</div>
			<div>
				<Recommend />
			</div>
		</main>
	);
}
