require("dotenv").config();
require("./events.js");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/users");
const server = express();
const app = require("http").createServer(server);
const io = require("socket.io")(app);
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "./public.key"),
  "utf-8"
);
//console.log("env", process.env.DB_PASSWORD);

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  console.log("database started");
}

//body parser

const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    var decoded = jwt.verify(token, publicKey);
    console.log(decoded);
    if (decoded) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(401);
  }
};

//sucket io
io.on("connection", () => {
  console.log("socket", socket.id);

  socket.on("clientmsg", (data) => {
    console.log({ data });
  });
  setTimeout(() => {
    socket.emit("serverMsg", { server: "this is server msg" });
  }, 4000);
});

server.use(cors());
server.use(express.json());
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/auth", authRouter.router);
server.use("/products", auth, productRouter.router);
server.use("/users", auth, userRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
