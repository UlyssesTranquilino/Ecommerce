"use strict";
//TUTORIAL: https://medium.com/@induwara99/a-step-by-step-guide-to-setting-up-a-node-js-project-with-typescript-6df4481cb335
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Import the 'express' module along with 'Request' and 'Response' types from express
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const wishlist_route_1 = __importDefault(require("./routes/wishlist.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
dotenv_1.default.config();
const _dirname = path_1.default.resolve();
// Create an Express application
const app = (0, express_1.default)();
// Specify the allowed origins
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://192.168.56.1:5173",
//   "http://192.168.1.9:5173",
//   "http://192.168.1.5:5173",
//   "http://192.168.1.6:5173",
//   "http://192.168.1.7:5173",
//   "https://clever-figolla-513dc1.netlify.app",
// ];
// Configure CORS middleware
// const corsOptions = {
//   origin: (
//     origin: string | undefined,
//     callback: (err: Error | null, allow?: boolean) => void
//   ) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("", user_route_1.default);
app.use("", product_route_1.default);
app.use("", wishlist_route_1.default);
app.use("", user_route_1.default);
app.listen(PORT, () => {
    (0, db_1.default)();
    console.log("Server started at localhost:", PORT);
});
