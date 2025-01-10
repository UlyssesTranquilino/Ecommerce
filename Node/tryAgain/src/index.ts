const express = require("express");
const morgan = require("morgan");
const Mongoose = require("mongoose");
const Blog = require("../models/blog.ts");

const app = express();

const dbURI =
  "mongodb+srv://tranquilinoulysses9:1234@cluster0.fw8v1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

Mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result: any) => {
    app.listen(3000);
    console.log("Connected to mongoDB");
  })
  .catch((err: Error) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(morgan("dev"));

// app.use((req: any, res: any, next: express.NextFunction) => {
//     res.locals.path = req.path;
//     next();
// })

//test
app.get("/add-blog", (req: any, res: any) => {
  const blog = new Blog({
    title: "new blog",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result: any) => {
      res.send(result);
      console.log("SUCCESSFULLY ADDED!");
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

app.post("/blogs", (req: any, res: any) => {
  console.log(req.body);
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result: any) => {
      res.redirect("/blogs");
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

app.get("/", (req: any, res: any) => {
  console.log("About route triggered");
  res.redirect("/blogs");
});

app.get("/about", (req: any, res: any) => {
  console.log("About route triggered");
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req: any, res: any) => {
  res.render("create", {
    title: "Create a new blog",
  });
  console.log(req.body);
  const blog = new Blog({});
});

app.use((req: any, res: any) => {
  res.status(404).render("404", { title: "404" });
});
