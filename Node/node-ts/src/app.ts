import { Mongoose } from "mongoose";

import express from "express";
import morgan from "morgan";
import path from "path";
import mongoose from "mongoose";
import Blog from "../models/blog.js";

const app = express();

const dbURI =
  "mongodb+srv://tranquilinoulysses9:Dmg6shqIHk1yZJjv@cluster0.fw8v1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result: Mongoose) => {
    app.listen(3000);
    console.log("CONNECTED TO DATABASE!");
  })
  .catch((err: string) => console.log(err));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Explicitly set the views directory
app.set("views", path.join(__dirname, "../views")); // Adjust path to locate "views"

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req: any, res: any) => {
  res.redirect("/blogs");
});

// app.get("/about", (req: any, res: any) => {
//   res.render("about", { title: "About" });
// });

app.get("/blogs", (req: any, res: any) => {
  Blog.find()
    .then((result: any) => {
      console.log("Result: ", result);
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req: any, res: any) => {
  res.render("create", { title: "Create a new blog" });
});

app.get("/blogs", (req: any, res: any) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result: any) => {
      res.render("index", { blogs: result, title: "All blogs" });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

app.post("/blogs", (req: any, res: any) => {
  const blog = new Blog(req.body);
  //save to database
  blog
    .save()
    .then((result: any) => {
      res.redirect("/blogs");
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

//Get blog by id
app.get("/blogs/:id", (req: any, res: any) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result: any) => {
      res.render("details", { title: "Blog Details", blog: result });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

//Delete
app.delete("/blogs/:id", (req: any, res: any) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result: any) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

// 404 Page
app.use((req: any, res: any) => {
  res.status(404).render("404", { title: "404" });
});
