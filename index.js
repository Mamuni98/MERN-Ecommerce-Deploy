require("dotenv").config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require("express");
const productRouter = require("./routes/product");
const userRouter = require("./routes/users");
const server = express();
const path = require('path');
console.log("env", process.env.DB_PASSWORD);

//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  console.log("database started");
}
//Schema 


//body parser


server.use(cors());
server.use(express.json());
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);
server.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'))
})

server.listen(process.env.PORT, () => {
  console.log("server started");
});
