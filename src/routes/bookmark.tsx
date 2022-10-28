import { Container, Grid, Typography } from "@mui/material";
import { BookCard } from "../components/BookCard";
import { Link } from "react-router-dom";
import { useBookmark } from "../hooks/useBookmark";

export const BookmarkRoute = () => {
  const { bookmarks, addBookmark, removeBookmark, isBookBookmarked } =
    useBookmark();

  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <Link to='/'>← Back to Home</Link>
      <Typography sx={{ marginY: "2rem", textAlign: "center" }} variant='h2'>
        Your Bookmark List
      </Typography>
      <Grid
        container
        spacing={2}
        direction='row'
        alignItems='center'
        justifyContent='space-around'
      >
        {bookmarks.map((book) => (
          <Grid key={book.id} item xs={12} sm={6} md={4}>
            <BookCard
              book={book}
              isBookmark={isBookBookmarked(book)}
              handleAddBookmark={() => addBookmark(book)}
              handleRemoveBookmark={() => removeBookmark(book)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
