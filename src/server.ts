import app from "./app";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}. Don't expect a payment.`);
});

// Graceful shutdown logic
process.on("SIGTERM", () => {
  console.info("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});
