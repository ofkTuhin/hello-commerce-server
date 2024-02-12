"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalerrorhandler_1 = require("./app/middleware/globalerrorhandler");
const routes_1 = __importDefault(require("./app/routes/routes"));
const app = (0, express_1.default)();
// Define an array of allowed origins
const allowedOrigins = [
    "https://book-library-seven.vercel.app",
    // Add other allowed origins as needed
];
// Configure CORS middleware with multiple allowed origins
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(globalerrorhandler_1.globalErrorhandler);
// not found route
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: 'not found',
//     errorMessage: [
//       {
//         path: '',
//         message: 'Api not found',
//       },
//     ],
//   })
//   next()
// })
exports.default = app;
