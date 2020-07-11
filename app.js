//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "This web application can be used as your personal diary or as your personal journal. Just go to compose and enter the day or date for your title and start writing about your day. Dont worry, all the data are being saved in the backend as well. Go ahead and start writing your own journal at your fingertips..";
const aboutContent = "Hello, I am a tech lover and I am very much eager to learn about the new technologies that are able to do the most amazing things. Hope you like my project...";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://Subhankar752:facebook@cluster0.fejlf.mongodb.net/blogDB?retryWrites=true&w=majority', {
  useNewUrlParser: true
});



const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
     if(!err){
        res.redirect("/");
}
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});



var port_number=app.listen(process.env.PORT || 3000);
app.listen(port_number,function(){
  console.log("Server started");
})
