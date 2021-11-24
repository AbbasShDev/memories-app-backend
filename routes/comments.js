import express from "express";
import { createComment, getComments } from "../controllers/comments.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createComment);
router.get("/", getComments);
// router.get("/search", getPostsBySearch);
// router.get("/:id", getPost);
// router.patch("/:id", auth, updatePost);
// router.delete("/:id", auth, deletePost);
// router.patch("/:id/like", auth, likePost);

export default router;
