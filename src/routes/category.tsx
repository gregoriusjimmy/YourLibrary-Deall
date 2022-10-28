import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../App";
import { TBook } from "../common/types";
import { BookCard } from "../components/BookCard";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useBookmark } from "../hooks/useBookmark";

type TCategoryParams = { categoryId: string };

type TGetBooksRes = Array<TBook>;

export const CategoryRoute = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [inputSearch, setInputSearch] = useState("");
  const [cachedBook, setCachedBook] = useState<TBook[]>([]);
  const { categoryId } = useParams<TCategoryParams>();

  const { addBookmark, removeBookmark, isBookBookmarked } = useBookmark();
  const location = useLocation();
  const { name: categoryName } = location.state;

  const fetchGetBooks = async (
    size: number,
    page: number,
    categoryId?: string
  ) => {
    if (!categoryId) throw new Error();

    try {
      const res = await axios.get<TGetBooksRes>(
        `fee-assessment-books?categoryId=${categoryId}&page=${page}&size=${size}`
      );
      return res.data;
    } catch (error) {}
  };

  const { data, isFetching, isError } = useQuery(
    [`category=${categoryId}`, size, page, categoryId],
    () => fetchGetBooks(size, page, categoryId),
    {
      keepPreviousData: true,
    }
  );

  const handleChangeSize = (e: SelectChangeEvent<typeof size>) => {
    setSize(Number(e.target.value));
    setPage(0);
  };

  const handleClickPreviousPage = () => {
    if (page === 0) return;
    setPage(page - 1);
    window.scrollTo(0, 0);
  };

  const handleClickNextPage = () => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  };

  const handleSortCachedBook = () => {
    const data = queryClient.getQueriesData<TBook[]>({
      exact: false,
      queryKey: [`category=${categoryId}`, size],
    });
    const tempCachedBooks = new Set<TBook>();
    data.forEach((query) => {
      const books = query[1];
      if (books) {
        for (const book of books) {
          tempCachedBooks.add(book);
        }
      }
    });
    setCachedBook(Array.from(tempCachedBooks));
  };

  const renderBooks = () => {
    let displayedData: TBook[] = data || [];
    if (inputSearch && cachedBook)
      displayedData = cachedBook.filter(
        (book) =>
          book.title
            .toLocaleLowerCase()
            .includes(inputSearch.toLocaleLowerCase()) ||
          book.authors
            .join(" ")
            .toLocaleLowerCase()
            .includes(inputSearch.toLocaleLowerCase())
      );

    return (
      <Grid
        container
        spacing={2}
        direction='row'
        alignItems='center'
        justifyContent='space-around'
      >
        {isFetching ? (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <CircularProgress />
          </Grid>
        ) : isError ? (
          <Typography sx={{ marginTop: "2rem" }} variant='h4'>
            Data is not available
          </Typography>
        ) : (
          displayedData.map((book) => (
            <Grid key={book.id} item xs={12} sm={6} md={4}>
              <BookCard
                isBookmark={isBookBookmarked(book)}
                handleAddBookmark={() => addBookmark(book)}
                handleRemoveBookmark={() => removeBookmark(book)}
                book={book}
              />
            </Grid>
          ))
        )}
      </Grid>
    );
  };

  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <Link to='/'>← Back to Home</Link>
      <Typography sx={{ marginY: "2rem", textAlign: "center" }} variant='h2'>
        {categoryName}
      </Typography>
      <TextField
        sx={{ marginBottom: "1rem" }}
        label='Search Title or Author...'
        fullWidth
        onFocus={handleSortCachedBook}
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box>{renderBooks()}</Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          marginY: "2rem",
          justifyContent: { md: "space-between" },
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
        >
          <Typography style={{ marginRight: "0.5rem" }} variant='body1'>
            Item Per Page:{" "}
          </Typography>
          <Select value={size} label='Size' onChange={handleChangeSize}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </Box>
        <Stack direction='row' spacing={2}>
          <Button variant='contained' onClick={handleClickPreviousPage}>
            <NavigateBeforeIcon />
          </Button>
          <Typography gutterBottom variant='h6' component='div'>
            {page + 1}
          </Typography>
          <Button
            variant='contained'
            onClick={handleClickNextPage}
            disabled={isError}
          >
            <NavigateNextIcon />
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
