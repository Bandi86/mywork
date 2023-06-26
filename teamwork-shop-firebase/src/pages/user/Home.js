import './home.css';
import Nyitokep from './webshop-nyitokep.png';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import Img1 from './demo-img1.png';
import Img2 from './demo-img2.png';
import Img3 from './demo-img3.png';
import Img4 from './demo-img4.png';
import Img5 from './about.png';



export default function Home() {
	return (
		<>
			<div className="bg-img-container">
				<div className='bg-img'>
					<img src={Nyitokep} alt="nyitokep" />
					<p className='bg-slogan'>Kalandra fel!</p>
					<Link to='/termekek/1' className='bg-featured-link' ><span>IRÁNY A WEBSHOP</span> <span id="bg-featured-link-arrow"><AiOutlineDoubleRight /></span> </Link>

				</div>
			</div>

			<div id="feedback-container">
				<p id="feedback-text-box"><Link id="feedback-link" to='#'>Vélemény</Link></p>
			</div>

			<div>
				<p className='main-subtitle'>A HÓNAP AJÁNLATA</p>
				<h2 className='main-title'>Legújabb termékeink</h2>
				<div className="featured-products-container">
					<div>
						<img
							src={Img1}
							alt='img1'
						/>
						<p>Ez itt a leírás helye</p>
						<p>1000 Ft</p>
					</div>
					<div>
						<img
							src={Img2}
							alt='img2'
						/>
					</div>
					<div>
						<img
							src={Img3}
							alt='img3'
						/>
					</div>
					<div>
						<img
							src={Img4}
							alt='img4'
						/>
					</div>
					<div>
						<img
							src={Img1}
							alt='img1'
						/>
						<p>Ez itt a leírás helye</p>
						<p>1000 Ft</p>
					</div>
					<div>
						<img
							src={Img2}
							alt='img2'
						/>
					</div>
					<div>
						<img
							src={Img3}
							alt='img3'
						/>
					</div>
					<div>
						<img
							src={Img4}
							alt='img4'
						/>
					</div>

				</div>

				<div className='about-section-container'>
					<div className='about-img-container'>
						<img src={Img5} alt='Rolunk' />
					</div>
					<div className='about-text-container'>
						<p className='main-subtitle-about'> A TÖRTÉNETÜNK</p>
						<h2 className='main-title-about'>Rólunk</h2>
						<div className='about-text'>
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry.
								Lorem Ipsum has been the industry's standard dummy text ever since the
								1500s, when an unknown printer took a galley of type and scrambled it to
								make a type specimen book. It has survived not only five centuries, but also
								the leap into electronic
							</p>
							<br />
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry.
								Lorem Ipsum has been the industry's standard dummy text ever since the
								1500s, when an unknown printer took a galley of type and scrambled it to
								make a type specimen book. It has survived not only five centuries, but also
								the leap into electronic... <span ><NavLink className='link-to-page' to='/rolunk'>Tovább</NavLink></span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
