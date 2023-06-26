import LoginComp from '../../components/user/Auth/LoginComp';
import SignUpComp from '../../components/user/Auth/SignUpComp';
import '../../styles/auth.css'

export default function Login() {
	return (
		<div className='login-container'>
			<div className='form'>
				<LoginComp />
			</div>
			<div className='form'>
				<SignUpComp />
			</div>
		</div>
	);
}
