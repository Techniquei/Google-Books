import { Card, CardContent, Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { CatalogBookItem } from "../../types"

export function BookCard(props: CatalogBookItem) {
  const navigate = useNavigate()
  return (
    <Card
      sx={{ maxWidth: "200px", cursor: "pointer", backgroundColor: "#e9e9e9" }}
      elevation={5}
      onClick={() => navigate(`detailed/${props.id}`)}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          component="img"
          src={props.image}
          sx={{
            maxHeight: "160px",
            minHeight: "168px",
            objectFit: "contain",
            boxShadow: "5px 5px 3px rgba(0, 0, 0, .5)",
          }}
        />
        <Typography
          variant="overline"
          gutterBottom
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          {props.category}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {props.title}
        </Typography>
        <Typography
          variant="subtitle2"
          fontWeight={400}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {props.author}
        </Typography>
      </CardContent>
    </Card>
  )
}
