import express from "express";
import mongoose from "mongoose";
import routesAuth from "./routes/auth.js"
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = 2212;
const app = express();
dotenv.config();
const connect = async () => {
  await mongoose
    .connect(process.env.DB_MONGOOSE)
    .then(() => {
      console.log("Connect OK");
    })
    .catch(e => {
      throw e;
    });
};

connect();

app.use(cookieParser());

app.use(express.json());

app.use(cors());

app.use("/api/auth",routesAuth)


app.use((err, req, res, next) => {
  const status = err.status || 500;

  const message = err.message | "Co gi do sai ";

  res.status(status).json({

    sucsess: false,

    status,

    message,
    
  });
});

app.post("/",(req,res)=>{
  res.send("asd")
})
app.listen(PORT, "localhost", () => {
  console.log("connect ok http://localhost:" + PORT);
});
