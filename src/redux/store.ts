import {configureStore} from '@reduxjs/toolkit'
import { booksApi } from '../API/booksApi'

export const store = configureStore({
    reducer: {
        [booksApi.reducerPath]: booksApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApi.middleware),
})