import { Box, Button, CircularProgress } from "@mui/material";
import { Item } from "../../../types";
import { BookCard } from "../BookCard";

export function Books(props: {books : Item[] | undefined, isLoading: boolean, isFetching: boolean, loadMoreHandler : ()=>void}){
    return (
        <>
             <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 200px)",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {props.books?.map((e) => (
          <BookCard
            key={e.id}
            id={e.id}
            title={e.volumeInfo.title}
            category={
              e.volumeInfo.categories
                ? e.volumeInfo.categories[0].split(", ")[0]
                : "⁣"
            }
            author={e.volumeInfo.authors ? e.volumeInfo.authors.join(", ") : ""}
            image={
              e.volumeInfo.imageLinks
                ? e.volumeInfo.imageLinks.thumbnail
                : "https://placehold.co/160x200"
            }
          />
        ))}
      </Box>
      {props.isLoading || props.isFetching ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        <Button
          variant="contained"
          sx={{ alignSelf: "center" }}
          onClick={props.loadMoreHandler}
        >
          Загрузить еще
        </Button>
      )}
        </>
    )
}