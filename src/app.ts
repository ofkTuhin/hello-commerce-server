import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorhandler } from "./app/middleware/globalerrorhandler";
import routes from "./app/routes/routes";
const app: Application = express();
// Define an array of allowed origins
const allowlist = [
  "https://hello-commerce-client.vercel.app",
  "http://localhost:3001/",
];
const corsOptionsDelegate = function (req: any, callback: any) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// Configure CORS middleware with multiple allowed origins
app.use(cors(corsOptionsDelegate));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(globalErrorhandler);

export default app;
