import express, {Express} from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { mainRoutes } from "./routes";

const app: Express = express();

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// the principal route
app.use(mainRoutes)


export {app}
