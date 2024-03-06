export interface BelongsToCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  }

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}
  
export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}
  
export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface MovieDetails {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    belongs_to_collection?: BelongsToCollection;
    budget: number;
    genres: Genre[];
    homepage: string;
    imdb_id: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
}