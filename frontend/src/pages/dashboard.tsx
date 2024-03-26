import logo from '../assets/MoviesWrapped_Logo-Solid.png'
import Summary from '../components/summary'
import Trending from '../components/trending'

const Dashboard = () => {

    return (
        <div className="flex bg-dark-green py-10 p-3 gap-3 min-h-screen">
            <div className="flex flex-col p-5 justify-between rounded bg-base-green w-1/5">
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-8'>
                        <a href='/'>
                            <img src={logo} alt='movies wrapped logo' className='object-contain max-h-10 max-w-15 transition duration-300 hover:filter hover:drop-shadow-lg' />
                        </a>
                        <h1 className="font-sans lg:text-lg py-3 md:text-sm sm:text-xs text-light-green">
                            Hello, <span className="text-pink">Username</span>
                        </h1>
                    </div>
                    <Summary />
                </div>
                <button type="submit" className="bg-pink hover:bg-base-green hover:border hover:border-pink w-full py-2 rounded font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                    Log out
                </button>
            </div>
            <div className='flex flex-col gap-3 bg-dark-green w-4/5'>
                <div className='flex flex-col rounded bg-base-green p-5'>
                    <a href='/add' className="bg-pink hover:bg-base-green hover:border hover:border-pink py-2 w-full rounded items-center text-center font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                        Add Movie/Show
                    </a>
                    <div className='flex gap-8'>
                        <h1 className='font-sans lg:text-lg py-3 md:text-sm sm:text-xs text-light-green'>Recently Watched</h1>
                    </div>
                </div>
                <div className='flex flex-col rounded bg-base-green p-5'>
                    <Trending />
                </div>
            </div>
        </div>
    )
}

export default Dashboard