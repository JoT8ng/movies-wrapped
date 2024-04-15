import tmdb from '../assets/TMDB_Logo.png'
import logo from '../assets/MoviesWrapped_Logo-Solid.png'
import { BsGithub, BsLinkedin } from 'react-icons/bs'

const Contact = () => {
	return (
		<div className='bg-base-green min-h-screen'>
			<div className='flex justify-start py-5 px-10 gap-8'>
				<a href='/'>
					<img src={logo} alt='movies wrapped logo' className='object-contain max-h-10 max-w-15 transition duration-300 hover:filter hover:drop-shadow-lg' />
				</a>
			</div>
			<div className='flex flex-col justify-center items-center px-20 py-20'>
				<h1 className='font-sans font-bold text-pink text-3xl pb-8'>Contact</h1>
				<p className='font-mono lg:text-base py-3 md:text-sm sm:text-xs text-light-green text-center'>
                    Movies Wrapped is a non-commercial app that allows users to keep track of movies and shows
                    they watched.
				</p>
				<p className='font-mono lg:text-base py-3 md:text-sm sm:text-xs text-light-green text-center pb-10'>
                    This web app is an ongoing project by Jocelyn Tang. Feel free to give feedback by contacting me on LinkedIn or
                    filling out an issue on Github.
				</p>
				<div className='p-100 items-center'>
					<img src={tmdb} alt='tmdb logo' className='object-contain max-h-10 max-w-25' />
				</div>
				<p className='font-mono lg:text-base py-3 md:text-sm sm:text-xs text-light-green text-center pb-10'>
                    This product uses the TMDB API but is not endorsed or certified by TMDB.
				</p>
				<div className='flex gap-4'>
					<a href='https://github.com/JoT8ng/'>
						<BsGithub className='w-5 h-5 text-light-green hover:text-pink' />
					</a>
					<a href='https://www.linkedin.com/in/jocelyntang/'>
						<BsLinkedin className='w-5 h-5 text-light-green hover:text-pink' />
					</a>
				</div>
			</div>
		</div>
	)
}

export default Contact