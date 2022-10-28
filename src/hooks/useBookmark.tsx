import { useEffect, useState } from "react";
import { TBook } from "../common/types";

export function useBookmark() {
  const [bookmarks, setBookmarks] = useState<TBook[]>(() => {
    const data = localStorage.getItem("bookmarks");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (book: TBook) => {
    if (bookmarks.find((bookmarkedBook) => bookmarkedBook.id === book.id))
      return;
    setBookmarks([...bookmarks, book]);
  };

  const isBookBookmarked = (book: TBook) => {
    return !!bookmarks.find((bookmarkedBook) => bookmarkedBook.id === book.id);
  };
  const removeBookmark = (book: TBook) => {
    setBookmarks(
      bookmarks.filter((bookmarkedBook) => bookmarkedBook.id !== book.id)
    );
  };

  return { addBookmark, removeBookmark, isBookBookmarked, bookmarks };
}
