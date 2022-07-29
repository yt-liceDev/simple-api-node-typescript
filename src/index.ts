import express from "express";
import productRoute from "./app/Product/Route";
import notFound from "./middleware/404";
import handleError from "./middleware/error-handler";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1", productRoute);

app.use(notFound);

app.use(handleError);

app.listen(port, (): void => {
  console.log(`Server running on port ${port}`);
});
