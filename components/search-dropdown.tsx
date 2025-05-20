"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Mic, Search, Globe } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useGetMovie } from "@/hooks/useGetMovie"
import { IMovieDetail } from "@/types/movie"
import { formatRuntime } from "@/utils/format"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SpeechRecognition, SpeechRecognitionErrorEvent, SpeechRecognitionEvent } from "@/types/global"

type SearchType = "title" | "content"

// Supported languages for voice search
const SUPPORTED_LANGUAGES = [
    { code: "vi-VN", name: "Vietnamese" },
    { code: "en-US", name: "English (US)" }
] as const;

type LanguageCode = typeof SUPPORTED_LANGUAGES[number]["code"];

export function SearchDropdown() {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [filteredMovies, setFilteredMovies] = useState<IMovieDetail[]>([])
    const [searchType, setSearchType] = useState<SearchType>("title")
    const [isListening, setIsListening] = useState<boolean>(false)
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("vi-VN")
    const dropdownRef = useRef<HTMLDivElement>(null)
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const { moviesData } = useGetMovie(0)

    // Filter movies based on search query and search type
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredMovies([])
            return
        }

        if (searchType === "title") {
            if (moviesData) {
                const filtered = moviesData.filter((movie) =>
                    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                setFilteredMovies(filtered.slice(0, 5))
            }
            else {
                setFilteredMovies([])
            }
        }
    }, [searchQuery, searchType])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Handle search submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            window.location.href = `/searchResult?type=${searchType}&q=${encodeURIComponent(searchQuery)}`
            setIsOpen(false)
        }
    }

    const handleVoiceSearch = () => {
        if (isListening) {
            // Stop listening
            if (recognitionRef.current) {
                recognitionRef.current.stop();
                recognitionRef.current = null;
            }
            setIsListening(false);
            return;
        }

        // Start listening
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error('Speech recognition not supported');
            return;
        }

        setIsListening(true);
        
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = selectedLanguage;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            setSearchQuery(transcript);
            setIsListening(false);
            recognitionRef.current = null;
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            recognitionRef.current = null;
        };

        recognition.onend = () => {
            setIsListening(false);
            recognitionRef.current = null;
        };

        try {
            recognition.start();
        }
        catch (error) {
            console.error('Error starting speech recognition:', error);
            setIsListening(false);
            recognitionRef.current = null;
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <form onSubmit={handleSubmit} className="flex items-center">
                <div className="relative flex items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder={`Search by ${searchType}...`}
                            className={`w-[200px] pl-8 ${searchType === "content" ? "pr-[10.5rem]" : "pr-[6rem]"} md:w-[300px] lg:w-[400px]`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsOpen(true)}
                        />
                    </div>

                    <div className="absolute right-2 flex items-center gap-1">
                        {searchType === "content" && (<>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                            "h-8 w-8 rounded-full",
                                            selectedLanguage !== "en-US" && "text-blue-500"
                                        )}
                                        title="Select language"
                                    >
                                        <Globe className="h-4 w-4" />
                                        <span className="sr-only">Select language</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[200px]">
                                    {SUPPORTED_LANGUAGES.map((lang) => (
                                        <DropdownMenuItem
                                            key={lang.code}
                                            className={cn(
                                                "cursor-pointer",
                                                selectedLanguage === lang.code && "bg-accent"
                                            )}
                                            onClick={() => setSelectedLanguage(lang.code as LanguageCode)}
                                        >
                                            {lang.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "h-8 w-8 rounded-full",
                                    isListening && "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300 animate-pulse",
                                )}
                                onClick={handleVoiceSearch}
                                title="Search by voice"
                            >
                                <Mic className="h-4 w-4" />
                                <span className="sr-only">Search by voice</span>
                            </Button>
                        </>)}

                        <Select value={searchType} onValueChange={(value) => setSearchType(value as SearchType)}>
                            <SelectTrigger className="h-8 w-[80px] border-none px-2 text-xs font-normal">
                                <SelectValue placeholder="Search by" />
                            </SelectTrigger>
                            <SelectContent align="end">
                                <SelectItem value="title">Title</SelectItem>
                                <SelectItem value="content">Content</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </form>

            {isOpen && filteredMovies.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
                    <ul className="py-1">
                        {filteredMovies.map((movie) => (
                            <li key={movie.movie_id}>
                                <Link
                                    href={`/movies/${movie.movie_id}`}
                                    className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="h-12 w-9 flex-shrink-0 overflow-hidden rounded">
                                        <img
                                            src={movie.poster_image || "/placeholder.svg"}
                                            alt={movie.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-medium">{movie.title}</div>
                                        <div className="line-clamp-1 text-xs text-muted-foreground">
                                            {movie.genres?.map((genre) => genre.genre_name).join(", ")}
                                        </div>
                                        <div className="line-clamp-2 text-xs text-muted-foreground">
                                            T{movie.age_rating} • {movie.release_date?.slice(0, 4)} • {formatRuntime(movie.run_time)}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t p-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-sm text-muted-foreground"
                            onClick={() => {
                                window.location.href = `/searchResult?type=${searchType}&q=${encodeURIComponent(searchQuery)}`
                                setIsOpen(false)
                            }}
                        >
                            <Search className="mr-2 h-3.5 w-3.5" />
                            Search for "{searchQuery}"
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}