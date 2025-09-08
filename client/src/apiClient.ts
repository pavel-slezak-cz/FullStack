import { Fetcher } from 'openapi-typescript-fetch'
import type { paths } from './types'

export const api = Fetcher.for<paths>()
api.configure({
    baseUrl: '/api',
    init: {
        // headers, credentials apod.
    }
})
