import logo from '../assets/MoviesWrapped_Logo-Solid.png'

const Dashboard = () => {
    return (
        <div className="flex bg-dark-green p-10 gap-5 min-h-screen">
            <div className="flex flex-col p-5 justify-between rounded bg-base-green w-80">
                <div className='flex flex-col gap-8'>
                    <a href='/'>
                        <img src={logo} alt='movies wrapped logo' className='object-contain max-h-10 max-w-15 transition duration-300 hover:filter hover:drop-shadow-lg' />
                    </a>
                    <h1 className="font-sans lg:text-lg py-3 md:text-sm sm:text-xs text-light-green">
                        Hello, <span className="text-pink">Username</span>
                    </h1>
                </div>
                <div>
                    <p className="font-sans text-sm text-light-green">
                        In total you have watched...
                    </p>
                    <p className="font-sans text-sm text-light-green">
                        <span className='text-pink'>100</span> movies
                    </p>
                    <p className="font-sans text-sm text-light-green">
                        <span className='text-pink'>60</span> shows
                    </p>
                </div>
                <button type="submit" className="bg-pink hover:bg-base-green hover:border hover:border-pink w-full py-2 rounded font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                    Log out
                </button>
            </div>
            <div className='flex flex-col p-5 rounded bg-base-green w-screen'>
                <div>
                    <button type="submit" className="bg-pink hover:bg-base-green hover:border hover:border-pink w-full py-2 rounded font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                        Add Movie/Show
                    </button>
                    <div className='flex gap-8'>
                        <h1 className='font-sans lg:text-lg py-3 md:text-sm sm:text-xs text-light-green'>Recently Watched</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard