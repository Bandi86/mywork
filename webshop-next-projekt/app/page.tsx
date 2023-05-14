import Recommend from "./components/Home/Recommend";

export default function Home() {
	return (
		<main className='min-h-screen bg-[#efefef] p-2 ml-[20rem] mr-[20rem]'>
			<div className='flex flex-row w-full text-center justify-around border-b-2 border-black'>
				<h2>Akciók</h2>
				<h2>Újdonságok</h2>
				<h2>Legnépszerűbb</h2>
			</div>
			<div></div>
			<Recommend />
		</main>
	);
}
