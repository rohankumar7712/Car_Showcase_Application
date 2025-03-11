const ensureAuthenticated = (req, res, next) => {
  console.log("Checking authentication...");
  console.log("Is authenticated?", req.isAuthenticated());
  console.log("User:", req.user);

  if (req.isAuthenticated()) {
    res.set("Cache-Control", "no-store");
    return next();
  } else {
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/auth/login");
  }
};

function ensureAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    console.log("Admin role validated");
    return next();
  } else {
    console.log("Access denied. Not an admin.");
    req.flash("error_msg", "You are not authorized to view this page");
    return res.redirect("/dashboard/admin");
  }
}

const ensureUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    return next();
  }
  req.flash("error_msg", "Unauthorized access!");
  res.redirect("/dashboard/user");
};

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
  ensureUser,
};
