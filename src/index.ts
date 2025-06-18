import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("The server is running, but the bill will never be paid.");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}. Don't expect a payment.`);
});
