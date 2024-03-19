import logo from '../assets/MoviesWrapped_Logo-Solid.png'

const Home = () => {
    return (
        <div className='bg-base-green min-h-screen'>
            <div className='flex justify-end p-5 gap-8'>
                <a href='/login' className='bg-pink px-4 py-2 rounded font-roboto-bold font-bold lg:text-lg text-light-green md:text-sm sm:text-xs'>Log in</a>
                <a href='/signup' className='border px-4 py-2 rounded font-roboto-bold font-bold lg:text-lg text-light-green md:text-sm sm:text-xs'>Sign up</a>
            </div>
            <div className='flex flex-col justify-center center-content p-20'>
                <div className='p-100'>
                    <img src={logo} alt='movies wrapped logo' className='max-h-full max-w-full' />
                </div>
                <div className='p-10'>
                    <p className='font-mono lg:text-base py-3 md:text-sm sm:text-xs text-light-green text-center'>
                        Catalogue movies and shows you watched!
                    </p>
                    <p className='font-mono lg:text-base py-3 md:text-sm sm:text-xs text-light-green text-center'>
                        Generate summaries and share with friends :&#41;
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home