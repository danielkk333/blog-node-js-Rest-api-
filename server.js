const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const articleRouter = require("./routes/articles");



mongoose.connect("mongodb://localhost:27017/blog",{
  useNewUrlParser: true,useUnifiedTopology: true
})

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

app.use("/articles", articleRouter);




app.get("/", (req,res)=>{

  const articles = [{
    title:"Test article",
    createdAt : new Date(),
    description: "Test description"
  }];

  res.render("articles/index",{articles:articles});
})




app.listen(3000,()=>{
  console.log("the server is running on port 3000");
})
