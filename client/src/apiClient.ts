import { Fetcher } from 'openapi-typescript-fetch';
import type { paths } from './types';

// Nastavíme přímo URL backendu
const fetcher = Fetcher.for<paths>();

fetcher.configure({
    baseUrl: 'http://localhost:4000/api', // přímo backend
});

export const api = fetcher;
