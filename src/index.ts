import express, { Express, Request, Response } from "express";
import { PORT } from "./secret";
import rootRouter from "./routes";
import { errorMiddleware } from "./middleware/error";

const app: Express = express();
app.use(express.json());

app.use("/api", rootRouter);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
