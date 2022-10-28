import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { TBook } from "../common/types";

export const BookCard = ({
  book,
  isBookmark,
  handleAddBookmark,
  handleRemoveBookmark,
}: {
  book: TBook;
  isBookmark: boolean;
  handleAddBookmark: () => void;
  handleRemoveBookmark: () => void;
}) => {
  return (
    <Card key={book.id} sx={{ maxWidth: 345, marginX: "auto" }}>
      <CardMedia
        component='img'
        height='140'
        image={book.cover_url}
        alt={`cover ${book.title}`}
      />
      <CardContent sx={{ height: { sm: 200, md: 240 } }}>
        <Box sx={{ marginBottom: "1rem" }}>
          <Typography variant='h5' component='div'>
            {book.title}
          </Typography>
          {book.authors.map((author, idx) => (
            <Typography key={idx} variant='subtitle1' color='text.secondary'>
              {author}
            </Typography>
          ))}
        </Box>
        <Typography variant='body2' color='text.secondary'>
          {book.description}
        </Typography>
      </CardContent>
      <CardActions>
        {isBookmark ? (
          <Button size='small' onClick={handleRemoveBookmark}>
            Remove from Bookmark
          </Button>
        ) : (
          <Button size='small' onClick={handleAddBookmark}>
            Add to Bookmark
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
