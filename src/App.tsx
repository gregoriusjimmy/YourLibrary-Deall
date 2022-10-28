import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/root";
import { CategoryRoute } from "./routes/category";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookmarkRoute } from "./routes/bookmark";
import "./configs/axiosConfig";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "category/:categoryId",
    element: <CategoryRoute />,
  },
  {
    path: "bookmark",
    element: <BookmarkRoute />,
  },
]);

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
