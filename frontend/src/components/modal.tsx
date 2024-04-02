import { WatchlistType } from "../types/watchlist"

interface ModalProps {
    modalData: WatchlistType;
}

const Modal: React.FC<ModalProps> = ({ modalData }) => {
    return (
        <div>
            <div className='flex justify-start gap-5 py-3'>
                <a href='/edit' className='font-mono font-bold text-md text-pink hover:text-light-green'>Edit</a>
                <button className='font-mono font-bold text-md text-pink hover:text-light-green'>Delete</button>
            </div>
            <div className='flex items-center gap-3'>
                <img src={`https://image.tmdb.org/t/p/w300/${modalData.poster_path}`} alt={`Trending ${modalData.title}`} className='w-1/2 shadow-md rounded' />
                <div className='flex flex-col justify-between'>
                    <div>
                        <h1 className='font-mono font-bold text-md text-pink'>{modalData.title}</h1>
                    </div>
                    <div>
                        <p className='font-mono text-xs text-light-green'>Rating: {modalData.user_rating}</p>
                        <p className='font-mono text-xs text-light-green'>Genres: {modalData.genres.map(genre => genre.name).join(', ')}</p>
                        <p className='font-mono text-xs text-light-green'>Date Watched: {modalData.date_watched}</p>
                        <p className='font-mono text-xs text-light-green'>Release Date: {modalData.release_date}</p>
                        <p className='font-mono text-xs text-light-green'>Comments: {modalData.comments}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal