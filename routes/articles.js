const express = require("express");
const router = express.Router();
const Article = require("./../models/article")


router.get("/new", (req,res)=>{
  res.render("articles/new",{article:new Article()});
});

router.get("/:id", async (req,res)=>{
  const article = await Article.findOne({_id:req.params.id},function(err,result){
    if(result == null){
      res.redirect('/');
    }
  })
  res.render("articles/show", {article:article })
})

router.post("/",  async (req,res)=>{
  const article = new Article({
    title:req.body.title,
    description :req.body.description,
    markdown:req.body.markdown
  });

  try{
     await article.save();
   res.redirect(`/articles/${article._id}`)
  }catch(e){
    res.render("articles/new",{article:article});
  }
})

module.exports = router;
