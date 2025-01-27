import express, { Application, Request, Response } from "express";
import cors from "cors";

import { connectToDatabase } from "./configuration/database";

import errorMiddleware from "./middlewares/errorHandler";

import authRoute from "./routes/auth.routes";
import contactRoute from "./routes/contact.routes";
import courseRoute from "./routes/course.routes";
import paymentRoute from "./routes/payment.routes";
import profileRoute from "./routes/profile.routes";
import ratingRoute from "./routes/rating.routes";

import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const allowedOrigins: string[] = [process.env.FRONTEND_URL as string];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(options));
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/rating-and-review", ratingRoute);

app.use(errorMiddleware);

app.get("/", function (req: Request, res: Response): void {
  console.log("App is running fine...");
  res.send("<h1>Server is running</h1>");
});

app.all("*", (req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: "!Oops page not found",
  });
});

const PORT = process.env.PORT;

connectToDatabase().then(() => {
  app.listen(PORT, function () {
    console.log("Server is running");
    console.log(`http://localhost:${PORT}`);
  });
});
