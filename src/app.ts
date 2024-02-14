import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorhandler } from "./app/middleware/globalerrorhandler";
import routes from "./app/routes/routes";
const app: Application = express();
// Define an array of allowed origins

// Configure CORS middleware with multiple allowed origins
cors({
  origin: "https://hello-commerce-client.vercel.app", // Replace with your client-side application's origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.) to be sent cross-origin
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(globalErrorhandler);

export default app;
