import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import path from "path";
global.__basedir = path.resolve();

const imageUpload = () => {
  const app = express();
  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(cors());

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now());
    }
  });

  const upload = multer({ storage: storage });

  const imageSchema = mongoose.model("Image", {
    //   name: String,
    //   desc: String,
    img: String
  });

  app.post("/imgUpload", upload.single("image"), (req, res, next) => {
    const img = req.body.img;
    console.log(img);
    const image = new imageSchema({
      img
    });
    try {
      image.save();
      res.send("Image uploaded successfully");
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.listen(5000, (req, res) => console.log("server running on port 5000"));
};

export default imageUpload;
