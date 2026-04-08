require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./modules/users/user.routes");
const propertyRoutes = require("./modules/property/property.routes");
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI);

app.use("/users", userRoutes);
app.use("/property", propertyRoutes);

app.listen(5000, () => console.log("Server running on 5000"));