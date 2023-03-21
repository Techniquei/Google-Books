import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/system"
import { useParams } from "react-router-dom"
import { useGetBookByIdQuery } from "../API/booksApi"

export function DetailPage() {
  const { id } = useParams()
  const { data , isLoading } = useGetBookByIdQuery(id)
  if(!data || isLoading){
    return <CircularProgress sx={{alignSelf: "center"}} />
  }
  const category = data.volumeInfo.categories !== undefined ? data.volumeInfo.categories?.join(', ') : 'ㅤ'
  return (
    <Box
      sx={{ display: "flex", flexDirection: {xs:'column', md:'row'}, gap: 4, alignItems:{xs:'center', md:'flex-start'}}}
    >
      <Box
        component="img"
        src={ data?.volumeInfo.imageLinks ? (data?.volumeInfo.imageLinks.medium ||
          data?.volumeInfo.imageLinks.thumbnail || data?.volumeInfo.imageLinks.smallThumbnail) : 'https://placehold.jp/150x150.png'
          
        }
        sx={{
          boxShadow: "0 0 10px 10px rgba(0, 0, 0, .5)",
          maxWidth: "400px",
          width: "100%",
        }}
      />
      <Box>
        <Typography variant="overline">{category}</Typography>
        <Typography variant="h4">{data.volumeInfo.title}</Typography>
        <Typography variant="subtitle2" mb={2}>{data.volumeInfo.authors || ''}</Typography>
        <Typography variant="body1">{data.volumeInfo.description?.replace('</p>', '').replace('<p>', '') || 'Описание отсутствует'}</Typography>
      </Box>
    </Box>
  )
}
