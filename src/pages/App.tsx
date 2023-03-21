/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import { MenuItem, Select } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Container } from "@mui/system"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import { useDebounce } from "../hooks/useDebounce"
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom"

const styles = {
  topPaper: {
    backgroundImage:
      "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1) ), url(https://www.teahub.io/photos/full/190-1905111_library-books.jpg)",
    backgroundSize: "cover",
    color: "white",
    marginBottom: 1,
  },
  topContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 3,
    gap: 1
  },
  homeTitle: {
    alignSelf: "center",
  },
  searchBox: {
    width: "100%",
  },
  inputSearch: {
    "& .MuiFilledInput-root": {
      backgroundColor: "#ffffff",
    },
    "& .MuiFilledInput-input": {
      paddingTop: 1,
      paddingRight: 5,
    },
    "& .MuiFilledInput-root:hover": {
      backgroundColor: "#ffffff",
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "rgb(255, 255, 255)",
    },
    width: "100%",
  },
  inputSelect: {
    backgroundColor: "white",
    "&.Mui-focused": {
      backgroundColor: "white",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "& .MuiFilledInput-input": {
      padding: 1,
    },
  },
}

function App() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams();
  const [locationState] = useState(location.pathname+searchParams)
  const [inputState, setInputState] = useState("")
  const [categoryState, setCategoryState] = useState("all")
  const [sortState, setSortState] = useState("relevance")
  const keyword = useDebounce(inputState, 200)
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname.includes("/detailed") && (location.pathname+searchParams) !== locationState) {
      navigate("/")
    }else{
      setSearchParams({categoryState, sortState, keyword})
    }
  }, [categoryState, sortState, keyword])

  return (
    <>
      <Toolbar style={styles.topPaper}>
        <Container sx={styles.topContainer} maxWidth='sm'>
          <Typography variant="h2" sx={{cursor: 'pointer'}} onClick={()=>navigate('/')}>Search for books</Typography>
          <Box position={"relative"} sx={styles.searchBox}>
            <TextField
              placeholder="Найти"
              variant="filled"
              sx={styles.inputSearch}
              value={inputState}
              onChange={(e) => setInputState(e.target.value)}
            />
            <IconButton sx={{ position: "absolute", right: 0 }}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="subtitle1">Категории</Typography>
              <Select
                variant="filled"
                fullWidth
                sx={styles.inputSelect}
                value={categoryState}
                onChange={(e) => setCategoryState(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="art">Art</MenuItem>
                <MenuItem value="biography">Biography</MenuItem>
                <MenuItem value="computers">Computers</MenuItem>
                <MenuItem value="history">History</MenuItem>
                <MenuItem value="medical">Medical</MenuItem>
                <MenuItem value="poetry">Poetry</MenuItem>
              </Select>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography variant="subtitle1">Сортировка</Typography>
              <Select
                variant="filled"
                fullWidth
                sx={styles.inputSelect}
                value={sortState}
                onChange={(e) => setSortState(e.target.value)}
              >
                <MenuItem value="relevance">По умолчанию</MenuItem>
                <MenuItem value="newest">По новизне</MenuItem>
              </Select>
            </Box>
          </Box>
        </Container>
      </Toolbar>
      <Container
        sx={{ display: "flex", flexDirection: "column", gap: 2, marginY: 4 }}
      >
        <Outlet context={{ categoryState, sortState, keyword }} />
      </Container>
    </>
  )
}

export default App
