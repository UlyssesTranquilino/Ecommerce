import express from "express";
import morgan from "morgan";
import path from "path";
import mongoose from "mongoose";
import Blog from "../models/blog.js";
const app = express();
const dbURI = "mongodb+srv://tranquilinoulysses9:Dmg6shqIHk1yZJjv@cluster0.fw8v1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
    .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((result) => {
    app.listen(3000);
    console.log("CONNECTED TO DATABASE!");
})
    .catch((err) => console.log(err));
// Set the view engine to EJS
app.set("view engine", "ejs");
// Explicitly set the views directory
app.set("views", path.join(__dirname, "../views")); // Adjust path to locate "views"
// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.redirect("/blogs");
});
// app.get("/about", (req: any, res: any) => {
//   res.render("about", { title: "About" });
// });
app.get("/blogs", (req, res) => {
    Blog.find()
        .then((result) => {
        console.log("Result: ", result);
        res.render("index", { title: "All Blogs", blogs: result });
    })
        .catch((err) => {
        console.log(err);
    });
});
app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create a new blog" });
});
app.get("/blogs", (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
        res.render("index", { blogs: result, title: "All blogs" });
    })
        .catch((err) => {
        console.log(err);
    });
});
app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);
    //save to database
    blog
        .save()
        .then((result) => {
        res.redirect("/blogs");
    })
        .catch((err) => {
        console.log(err);
    });
});
//Get blog by id
app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
        res.render("details", { title: "Blog Details", blog: result });
    })
        .catch((err) => {
        console.log(err);
    });
});
//Delete
app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
        res.json({ redirect: "/blogs" });
    })
        .catch((err) => {
        console.log(err);
    });
});
// 404 Page
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});
