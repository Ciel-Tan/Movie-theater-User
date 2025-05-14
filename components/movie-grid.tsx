import { IMovieDetail } from "@/types/movie";
import { Card, CardContent } from "./ui/card";
import Loader from "./common/loader";
import { CalendarDays, Clock, Type } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatDay } from "@/utils/format";

interface IMovieGridProps {
    type: string;
    data: IMovieDetail[] | undefined;
    loading: boolean;
    error: string | null;
}

const MovieGrid = ({ type, data, loading, error }: IMovieGridProps) => {
    return (
        loading ? (
            <div className="h-[400px] flex items-center justify-center">
                <Loader color="black" />
            </div>
        ) : error ? (
            <div className="h-[400px] flex items-center justify-center">
                <span className="text-red-500">{error}</span>
            </div>
        ) : data?.length === 0 ? (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">No movies found</h2>
                <p className="text-muted-foreground mb-6">Try adjusting your search terms or filters</p>
                <Button asChild>
                    <Link href="/">Return to Homepage</Link>
                </Button>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.map((movie: IMovieDetail) => (
                    <Card key={movie.movie_id} className="overflow-hidden">
                        <div className="aspect-[2/3] relative">
                            <img
                                src={movie.poster_image || "/placeholder.svg"}
                                alt={movie.title}
                                className="object-cover w-full h-full"
                            />
                            {type === "Now Showing" && (
                                <div className="absolute top-2 right-2 bg-black/70 text-white rounded-md px-2 py-1 flex items-center gap-1">
                                    <Type className="h-4 w-4 " />
                                    <span>{movie.age_rating}</span>
                                </div>
                            )}
                            {type === "Coming soon" && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                    <div className="text-white">
                                        <div className="flex items-center gap-2 text-sm mb-1">
                                            <CalendarDays className="h-4 w-4" />
                                            <span>Coming {formatDay(movie.release_date)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                {type === "Now Showing" && (
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span className="w-max">{movie.run_time} min</span>
                                    </div>
                                )}
                                <div className="line-clamp-1">
                                    {movie.genres?.map((genre) => genre.genre_name).join(", ")}
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{movie.description}</p>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" asChild>
                                    <Link href={`/movies/${movie.movie_id}`}>View Details</Link>
                                </Button>
                                {type === "Now Showing" && (
                                    <Button size="sm" asChild>
                                        <Link href={`/schedule`}>Book Now</Link>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    );
}
 
export default MovieGrid;