interface TrendingResultMovie {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface TrendingResultTV {
    adult: boolean;
    backdrop_path: string;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
}

export interface TrendingResultsMovie {
    page: number;
    results: TrendingResultMovie[];
    total_pages: number;
    total_results: number;
}

export interface TrendingResultsTV {
    page: number;
    results: TrendingResultTV[];
    total_pages: number;
    total_results: number;
}