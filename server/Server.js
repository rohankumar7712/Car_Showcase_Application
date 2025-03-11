const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const cors = require("cors");
const ejsMate = require("ejs-mate");
const {
  ensureAuthenticated,
  ensureAdmin,
  ensureUser,
} = require("./config/auth");
const adminRoutes = require("./routes/listingRoutes");
const userRoutes = require("./routes/userListingRoutes");

// Passport config
require("./config/passportConfig")(passport);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/carshowcase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session setup (Fixed: ensure sessions persist)
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false, // Only save sessions for authenticated users
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day session expiration
    },
  })
);

// Initialize Passport (Correct order)
app.use(passport.initialize());
app.use(passport.session());

// Flash messages (After session setup)
app.use(flash());

// Cross-Origin Resource Sharing (CORS) Setup
app.use(
  cors({
    origin: "http://localhost:5173", // Client URL
    credentials: true, // Allow cookies (session cookies) to be sent
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// Attach session user to templates (make sure session data is available)
app.use((req, res, next) => {
  res.locals.user = req.user || null; // Use `req.user` instead of `req.session.user`
  next();
});

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Debugging: Print session and user data
app.use((req, res, next) => {
  console.log("Session Data:", req.session);
  console.log("User Data:", req.user);
  next();
});

// Set View Engine
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));

// Access routes
app.use("/listings", ensureAuthenticated, ensureAdmin, adminRoutes);
app.use("/api/car", ensureAuthenticated, ensureUser, userRoutes);

app.get("/", (req, res) => {
  res.render("landing");
});

// Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
