import axios from "axios";

// Resolve base URL from env or CRA proxy fallback

export const api = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 10000,
    withCredentials: true,
});

export const swrFetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
};


