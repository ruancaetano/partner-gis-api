import express from "express";
import { partnerRoutes } from "./routes/partner.route";

const app = express();

app.use(express.json());


app.use(partnerRoutes)

export default app;
