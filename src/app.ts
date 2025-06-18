import express, { Application, Request, Response } from "express";
import paymentRouter from "./api/routes/paymentRoutes";

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("The server is running, but the bill will never be paid.");
});

// API Routes
app.use("/api/payments", paymentRouter);

// Error handling placeholder
app.use((err: Error, req: Request, res: Response, _next) => {
  console.error(err.stack);
  res
    .status(500)
    .send("Something broke! But you weren't getting a refund anyway.");
});

export default app;
