import { Clock, Play, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ISearch } from "@/types/search";
import { formatTime } from "@/utils/format";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { HighlightedText } from "./highlight-text";

interface ISearchGridProps {
    data: ISearch[];
    query: string;
}

const SearchGrid = ({ data, query }: ISearchGridProps) => {
    const [selectedVideo, setSelectedVideo] = useState<ISearch | null>(null)
    const [videoModalOpen, setVideoModalOpen] = useState(false)

    const openVideoModal = (video: ISearch) => {
        setSelectedVideo(video)
        setVideoModalOpen(true)
    }

    return (
        <div className="space-y-6">
            {data.map((result: any, index) => (
                <Card key={`${result.video_id}-${result.chunk_index}-${index}`} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 lg:w-1/6 h-[250px]">
                            <div className="aspect-video md:aspect-[2/3] relative">
                                <img
                                    src={result.poster_url || "/placeholder.svg?height=600&width=400&text=No+Poster"}
                                    alt={result.file_name}
                                    className="object-cover w-[200px] h-[250px]"
                                />
                                <div className="absolute w-[200px] h-[250px] inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-12 w-12 rounded-full bg-white/20 text-white"
                                        onClick={() => openVideoModal(result)}
                                    >
                                        <Play className="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex-1">
                            <h3 className="font-bold text-lg mb-2">{result.file_name}</h3>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                <button
                                    className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md hover:bg-primary/20 transition-colors"
                                    onClick={() => openVideoModal(result)}
                                >
                                    <Clock className="h-4 w-4" />
                                    <span>{formatTime(result.start_time)}</span>
                                </button>
                                <span>-</span>
                                <button
                                    className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md hover:bg-primary/20 transition-colors"
                                    onClick={() => openVideoModal(result)}
                                >
                                    <span>{formatTime(result.end_time)}</span>
                                </button>
                            </div>

                            <div className="bg-muted/30 rounded-md mb-4 text-sm max-h-32 overflow-y-auto">
                                <p className="whitespace-pre-line">
                                    <HighlightedText text={result.content} searchQuery={query} />
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}

            {/* Video Modal */}
            <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
                <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
                    <DialogTitle className="sr-only">Video Player</DialogTitle>
                    <div className="bg-black">
                        <div className="relative pt-[56.25%] w-full">
                            {selectedVideo && (
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${selectedVideo.video_id}?autoplay=1&start=${Math.floor(selectedVideo.start_time)}&rel=0&modestbranding=1`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            )}
                        </div>
                        <Button
                            className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-black/50 text-white hover:bg-black/70"
                            variant="ghost"
                            size="icon"
                            onClick={() => setVideoModalOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {selectedVideo && (
                        <div className="p-4 max-h-60 overflow-y-auto">
                            <div className="mb-2">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">{selectedVideo.file_name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                                            <Clock className="h-4 w-4" />
                                            <span>
                                            {formatTime(selectedVideo.start_time)} -{" "}
                                            {formatTime(selectedVideo.end_time)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-muted/30 p-3 rounded-md text-sm">
                                        <p className="whitespace-pre-line">
                                            <HighlightedText text={selectedVideo.content} searchQuery={query} />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
 
export default SearchGrid;