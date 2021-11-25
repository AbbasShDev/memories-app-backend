import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  comments: [commentSchema],
  selectedFile: String,
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
