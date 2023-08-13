//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Life is a transient journey filled with opportunities for spiritual growth and self-refinement. Guided by the wisdom of the Imams and the Holy Quran, believers strive to cultivate virtues such as compassion, honesty, and humility, reflecting the divine attributes in their daily conduct. The importance of community, family bonds, and social justice resonates deeply, with a strong emphasis on supporting the less fortunate and standing against oppression. The ultimate goal is to foster a connection with Allah, understanding life's trials as tests of faith, and preparing for the hereafter through righteous living. Each moment is seen as a precious chance to align one's will with divine guidance, seeking balance and contentment through prayer, reflection, and service to others.";
const aboutContent = "Life's journey, ever-changing and brief, is rich with chances for soulful expansion and personal polishing. Illuminated by the sacred teachings of the Imams and the Holy Quran, the faithful endeavor to nurture qualities such as empathy, integrity, and modesty, mirroring the sublime characteristics of the divine in their everyday actions. The value of fellowship, kinship ties, and fair-mindedness is deeply ingrained, accentuated by a commitment to aiding those in need and resisting injustice. The supreme aspiration is to build a profound relationship with Allah, perceiving the challenges of life as examinations of devotion, and readying oneself for the eternal existence through virtuous living. Every instant is embraced as a valuable opportunity to synchronize one's intentions with celestial wisdom, pursuing harmony and fulfillment through devotion, contemplation, and benevolence to others.";
const contactContent = "Life's ephemeral passage is brimming with paths toward inner enlightenment and personal betterment. Guided by the sagacity of spiritual leaders and the sacred verses of the Holy Quran, followers labor to nourish qualities like empathy, truthfulness, and modesty, mirroring celestial virtues in their routine lives. The significance of communal unity, familial connections, and equity is deeply felt, underscored by a steadfast commitment to uplifting those in need and opposing any forms of injustice. The transcendent purpose is to cultivate a profound affinity with Allah, discerning life's hardships as examinations of devotion, and grooming the soul for the eternal realm by living virtuously. Every fleeting instant is recognized as a golden opportunity to harmonize one's desires with the guidance of the Divine. It's a chance to pursue equilibrium and fulfillment through devout worship, mindful contemplation, and altruistic service to fellow beings. In these sacred moments, believers find contentment and balance, forging a path that aligns with spiritual principles and leads towards eternal wisdom.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true}); // Added useUnifiedTopology: true to remove deprecation warning

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", async function(req, res){
  try {
    const posts = await Post.find({});
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", async function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  try {
    await post.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.get("/posts/:postId", async function(req, res){ // Added async
  const requestedPostId = req.params.postId;

  try {
    const post = await Post.findOne({_id: requestedPostId}); // Removed callback, using await instead
    res.render("post", {
      title: post.title,
      content: post.content
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});