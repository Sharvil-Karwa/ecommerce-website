const app = require("./app");
require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: ", err.message);
  console.log("Uncaught Exception: ", err.stack);
  process.exit(1);
});

const connectDatabase = require("./config/database");
const port = process.env.PORT || 3000;

connectDatabase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
