export interface ISearch {
    video_id: string;
    content: string;
    poster_url: string;
    file_name: string;
    chunk_index: number;
    start_time: number;
    end_time: number;
    similarity_score: number;
}