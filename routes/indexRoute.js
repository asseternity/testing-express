const express = require("express");
const index = express.Router();
const prisma = require('../prismaClient');

const array = [];

index.get("/", (req, res) => {
  res.json({ name: "someName" });
});

index.get("/test", (req, res) => res.json({ array }));

index.post("/test", (req, res) => {
  array.push(req.body.item);
  res.send('success!');
});

index.get('/post/:post_author', async (req, res) => {
  const correctPost = await prisma.post.findMany({
      where: {
          author: req.params.post_author
      }
  });
  if (!correctPost) {
      return res.status(404).send({ message: "Post not found" });
  }
  res.json(correctPost);
});


module.exports = index;