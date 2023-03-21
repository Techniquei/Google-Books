/* eslint-disable react-hooks/exhaustive-deps */
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { useGetBooksQuery } from "../API/booksApi"
import { Books } from "../components/bookCard/Books/Books"
import { OutletContextType } from "../types"

export function LibraryPage() {
  const { categoryState, sortState, keyword } =
    useOutletContext<OutletContextType>()
  const { data, isLoading, isFetching, refetch } = useGetBooksQuery({
    category: categoryState,
    sort: sortState,
    keyword: keyword,
  })
  const [loadingState, setLoadingState] = useState(false)
  useEffect(() => {
    setLoadingState(true)
  }, [categoryState, sortState, keyword])
  useEffect(() => {
    if (!isLoading && !isFetching) {
      setLoadingState(false)
    }
  })
  function loadMoreHandler() {
    refetch()
  }
  if (loadingState) {
    return <CircularProgress sx={{ alignSelf: "center" }} />
  }
  return (
    <>
      <Typography variant="subtitle1" alignSelf="center">
        Публикаций найдено: <b>{data?.totalItems}</b>{" "}
      </Typography>
      <Books
        books={data?.array}
        isLoading={isLoading}
        isFetching={isFetching}
        loadMoreHandler={loadMoreHandler}
      />
    </>
  )
}
