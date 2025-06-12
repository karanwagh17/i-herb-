const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors"); 
const connection = require("./db/connection");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ CORS setup - allow frontend deployed URL or localhost for development
app.use(cors({
  origin: "https://i-herb-ten.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static("./uploads"));

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ✅ Connect to DB *before* starting the server
connection
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1); // Stop if DB connection fails
  });
