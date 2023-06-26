import './footer.style.css';
import { Link } from 'react-router-dom';
import { facebook, instagram, twitter, youtube } from './icons';

const Footer = () => {
	return (
		<div className='footer'>
			<div className='footer-container'>
				<div className='footer-container-1'>
					<h2>Cipők</h2>
					<ul>
						<li>
							<Link to='#'>Sport cipők</Link>
						</li>
						<li>
							<Link to='#'>Utcai cipők</Link>
						</li>
					</ul>
				</div>

				<div className='footer-container-1'>
					<h2>Ruházat</h2>
					<ul>
						<li>
							<Link to='#'>Utcai ruházat</Link>
						</li>
						<li>
							<Link to='#'>Sport ruházat</Link>
						</li>
					</ul>
				</div>

				<div className='footer-container-1'>
					<h2>Sporttermékek</h2>
					<ul>
						<li>
							<Link to='#'>Extrasportok</Link>
						</li>
						<li>
							<Link to='#'>Labdarúgás</Link>
						</li>
					</ul>
				</div>

				<div className='social-media'>
					<h3>Kövess be minket</h3>
					<ul>
						<li>
							<Link
								to='https://www.facebook.com/nike/?locale=hu_HU'
								target={'_blank'}
							>
								{facebook}
							</Link>
						</li>
						<li>
							<Link
								to='https://www.youtube.com/user/NIKE'
								target={'_blank'}
							>
								{youtube}
							</Link>
						</li>
						<li>
							<Link
								to='https://www.instagram.com/nike/'
								target={'_blank'}
							>
								{instagram}
							</Link>
						</li>
						<li>
							<Link
								to='https://www.instagram.com/nike/'
								target={'_blank'}
							>
								{twitter}
							</Link>
						</li>
					</ul>

					<div className='footer-bottom'>
						<p>© 2023 AdrenalineX, Inc. Minden jog fenntartva.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
