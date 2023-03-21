import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BookById, BooksCatalog, Item } from "../types"

const key = "AIzaSyDioGS1VOOov15xjvueBT4SIIZMI5tnn34"

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://www.googleapis.com/books/v1` }),
  endpoints: (build) => ({
    getBookById: build.query<BookById, string | undefined>({
      query: (id) => `/volumes/${id}`,
    }),
    getBooks: build.query<
      { array: Item[]; startIndex: number; totalItems: number },
      { category: string; sort: string; keyword: string }
    >({
      async queryFn(arg, api, _extraOptions, baseQuery) {
        const state = api.getState() as any
        const selector = booksApi.endpoints.getBooks.select(arg)
        const result = selector(state)
        let oldData: Item[] = []
        let newData: Item[] = []
        let startIndex = 1
        let totalItems = 0
        if (result.data) {
          oldData = result.data.array
          startIndex = result.data.startIndex
        }
        const resArr = [...oldData]
        async function qry(quantity: number) {
          try {
            const res = await baseQuery(
              `/volumes?q=${arg.keyword}+subject:${
                arg.category === "all" ? "" : "+subject:" + arg.category
              }&orderBy=${
                arg.sort
              }&startIndex=${startIndex}&maxResults=${quantity}&key=${key}`
            )
            const newBooks = res.data as BooksCatalog
            totalItems = newBooks.totalItems
            newBooks.items.forEach((e: any) => newData.push(e))
            startIndex += quantity
          } catch (error) {
            console.log(error)
          }

          const newDataUniq: Item[] = []
          newData.forEach((e) => {
            let counter = 0
            for (let i = 0; i < newData.length; i++) {
              if (newData[i].volumeInfo.title === e.volumeInfo.title) counter++
            }
            if (counter === 1) {
              newDataUniq.push(e)
            }
          })
          for (let i = 0; i < newDataUniq.length; i++) {
            let counter = true
            for (let j = 0; j < oldData.length; j++) {
              if (newDataUniq[i].id === oldData[j].id) counter = false
            }
            if (counter) resArr.push(newDataUniq[i])
          }
          if (resArr.length % 30 !== 0) {
            const a = (Math.ceil(resArr.length / 30) * 30) % resArr.length
            console.log(startIndex, a, resArr.length)
            newData = []
            await qry(a)
          }
        }
        await qry(30)
        return {
          data: {
            array: resArr,
            startIndex,
            totalItems,
          },
        }
      },
    }),
  }),
})

export const { useGetBooksQuery, useGetBookByIdQuery } = booksApi
