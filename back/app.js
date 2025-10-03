const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const path = require("path");
const productRoutes = require("./routes/product");

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {

  },
  crossOriginResourcePolicy: { policy: "cross-origin"},
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: ["http://127.0.0.1:5500", "http://localhost:5500", "
    "https://escanor1986.github.io", "https://escanor1986.github.io/Kanap_Site_ECommerce/"], // Add other origins as needed
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Logging middleware
app.use(morgan("combined"));

// Static files
app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      }
    },
  })
);
app.use("/images", express.static(path.join(__dirname, "images")));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Internal Server Error",
  });
});

module.exports = app;
