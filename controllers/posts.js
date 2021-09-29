import mongoose from "mongoose";
import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ error: "Post not found" });

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Post not found" });

  try {
    await Post.findByIdAndRemove(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  console.log(req.userId);
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Post not found" });

  try {
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const index = post.likes.findIndex((id) => id === String(req.userId));

    console.log(post.likes);

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes.splice(index, 1);
      // post.likes.filter((id) => {
      //   console.log(id);
      //   console.log(String(req.userId));
      // });
    }

    console.log(post.likes);

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
