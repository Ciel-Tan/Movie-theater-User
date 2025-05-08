export interface IGenre {
    genre_id: number
    genre_name: string
}

export interface IShowtime {
    showtime_id: number
    cinema: {
        cinema_id: number
        cinema_name: string
        address: {
            address_id: number
            address_name: string
        }
    }
    room: {
        room_id: number
        room_name: string
    }
    show_datetime: string
}

export interface IMovieOnly {
    movie_id: number
    title: string
    poster_image: string
    poster_url: string
    description: string
    age_rating: number
    run_time: number
    release_date: string
    trailer_link: string
    language: string
    director: {
        director_id: number
        director_name: string
    }
}

export interface IMovie extends IMovieOnly {
    movie_id: number
    title: string
    poster_image: string
    poster_url: string
    description: string
    age_rating: number
    run_time: number
    release_date: string
    trailer_link: string
    language: string
    director: {
        director_id: number
        director_name: string
    }
    genres: [
        {
            genre_id: number
            genre_name: string
        }
    ]
}

export interface IMovieDetail extends IMovie {
    actors: [
        {
            actor_id: number
            actor_name: string
        }
    ]
    showtime: [
        {
            showtime_id: number
            cinema: {
                cinema_id: number
                cinema_name: string
                address: {
                    address_id: number
                    address_name: string
                }
            }
            room: {
                room_id: number
                room_name: string
            }
            show_datetime: string
        }
    ]
}

export interface IMovieDetailWithShowtime extends IShowtime {
    movie: IMovieOnly
}