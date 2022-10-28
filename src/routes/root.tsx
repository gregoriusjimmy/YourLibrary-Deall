import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

type TGetCategoriesRes = Array<{
  id: number;
  name: string;
}>;

export const Root = () => {
  const fetchCategories = async () => {
    try {
      const res = await axios.get<TGetCategoriesRes>(
        "fee-assessment-categories"
      );
      return res.data;
    } catch (error) {
      console.warn(error);
    }
  };

  const { data: categories, isLoading } = useQuery(
    ["categoryList"],
    fetchCategories
  );

  return (
    <Container
      sx={{
        paddingY: "2rem",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant='h2'
        sx={{ textAlign: "center", marginBottom: "4rem" }}
      >
        Welcome to YourLibrary
      </Typography>
      <Link to='/bookmark' style={{ textDecoration: "none" }}>
        <Button variant='contained' sx={{ marginBottom: "3rem" }}>
          Your bookmark list
        </Button>
      </Link>
      <Typography
        variant='h5'
        sx={{ fontWeight: "bold", marginBottom: "2rem" }}
      >
        Choose Categories
      </Typography>
      <Box
        sx={{
          width: "80%",
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && <CircularProgress />}
        {!isLoading &&
          categories?.map((category) => (
            <Link
              style={{ width: "100%", textDecoration: "none" }}
              key={category.id}
              to={`category/${category.id}`}
              state={category}
            >
              <Card sx={{ marginBottom: "1rem" }}>
                <CardContent>
                  <Typography
                    sx={{ textAlign: "center" }}
                    variant='h6'
                    component='div'
                  >
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
      </Box>
    </Container>
  );
};
