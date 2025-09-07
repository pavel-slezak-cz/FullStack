import { Fetcher } from 'openapi-typescript-fetch';
import type { paths } from './types';

const fetcher = Fetcher.for<paths>();

// Volitelně: nastavíme základní URL (jinak použije relativní /api)
fetcher.configure({
    baseUrl: '/api', // proxy na localhost:4000
});

export const api = fetcher;
