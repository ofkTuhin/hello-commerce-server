import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorhandler } from "./app/middleware/globalerrorhandler";
import routes from "./app/routes/routes";
const app: Application = express();
// Define an array of allowed origins

app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "https://hello-commerce-client.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(globalErrorhandler);

export default app;
