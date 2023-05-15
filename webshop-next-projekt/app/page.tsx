import Recommend from "./components/Home/Recommend";

export default function Home() {
	return (
		<main className='h-auto bg-[#efefef] p-2 ml-[20rem] mr-[20rem]'>
			<div className='flex flex-row w-full text-center justify-around border-b-2 border-black mt-6'>
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
