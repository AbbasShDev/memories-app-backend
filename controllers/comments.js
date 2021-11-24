import mongoose from "mongoose";
import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
  try {
    const { post } = req.query;

    if (!post) res.status(401).json({ error: "Bad requset" });

    const comments = await Comment.find({
      post: post,
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// export const getPost = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await Post.findById(id);

//     res.status(200).json(post);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

// export const getPostsBySearch = async (req, res) => {
//   const { searchQuery, tags } = req.query;

//   try {
//     const title = new RegExp(searchQuery, "i");

//     const posts = await Post.find({
//       $or: [{ title }, { tags: { $in: tags.split(",") } }],
//     });

//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

export const createComment = async (req, res) => {
  const { postId, comment, creatorName } = req.body;

  const newComment = new Comment({
    post: postId,
    comment,
    creatorName,
  });

  console.log();
  try {
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// export const updatePost = async (req, res) => {
//   const { id: _id } = req.params;
//   const post = req.body;

//   if (!mongoose.Types.ObjectId.isValid(_id))
//     return res.status(404).json({ error: "Post not found" });

//   try {
//     const updatedPost = await Post.findByIdAndUpdate(
//       _id,
//       { ...post, _id },
//       { new: true }
//     );

//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const deletePost = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).json({ error: "Post not found" });

//   try {
//     await Post.findByIdAndRemove(id);

//     res.status(200).json({ message: "Post deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const likePost = async (req, res) => {
//   const { id } = req.params;

//   if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).json({ error: "Post not found" });

//   try {
//     const post = await Post.findById(id);

//     if (!post) return res.status(404).json({ error: "Post not found" });

//     const index = post.likes.findIndex((id) => id === String(req.userId));

//     if (index === -1) {
//       post.likes.push(req.userId);
//     } else {
//       post.likes.splice(index, 1);
//       // post.likes.filter((id) => {
//       //   console.log(id);
//       //   console.log(String(req.userId));
//       // });
//     }

//     const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
