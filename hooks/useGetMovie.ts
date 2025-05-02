'use client';

import { getAllMovies, getMovieById, getMovieComingSoon, getMovieNowShowing } from "@/services/movieService";
import { IMovie, IMovieDetail } from "@/types/movie";
import { useEffect, useState } from "react";

export const useGetMovie = (id: number) => {
    const [moviesData, setMoviesData] = useState<IMovie[] | IMovieDetail[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getMovies = async () => {
        setLoading(true);
        try {
            const movies = await getAllMovies();
            setMoviesData(movies);
        }
        catch (error) {
            console.error("Error get all movies: ", error);
            setError("Failed to get all movies");
        }
        finally {
            setLoading(false);
        }
    };

    const getMovieDetail = async (id: number) => {
        setLoading(true);
        try {
            const movie = await getMovieById(id);
            setMoviesData([movie]);
        }
        catch (error) {
            console.error("Error get movie by id: ", error);
            setError("Failed to get movie by id");
        }
        finally {
            setLoading(false);
        }
    };

    const getMoviesNowShowing = async () => {
        setLoading(true);
        try {
            const movie = await getMovieNowShowing();
            setMoviesData(movie);
        }
        catch (error) {
            console.error("Error get movie bow showing: ", error);
            setError("Failed to get movie bow showing");
        }
        finally {
            setLoading(false);
        }
    };

    const getMoviesComingSoon = async () => {
        setLoading(true);
        try {
            const movie = await getMovieComingSoon();
            setMoviesData(movie);
        }
        catch (error) {
            console.error("Error get movie coming soon: ", error);
            setError("Failed to get movie coming soon");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            if (id === -2) getMoviesNowShowing();
            else if (id === -1) getMoviesComingSoon();
            else getMovieDetail(id);
        }
        else {
            getMovies();
        }
    }, [id]);

    return { moviesData, loading, error };
};