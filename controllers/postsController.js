import status from "http-status";
import postModel from "../models/postsModel.js";

export const getPosts = async (req, res) => {
  try {
    const senderId = req.query.sender;
    var posts;
    if (senderId) {
      posts = await postModel.find({ sender: senderId });
    } else {
      posts = await postModel.find();
    }

    res.status(status.OK).send(posts);
  } catch (error) {
    res
      .status(status.BAD_REQUEST)
      .send({ status: "fail", message: error.message });
  }
};

export const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(status.NOT_FOUND).send("Post not found");
    }
  } catch (error) {
    res.status(status.BAD_REQUEST).send(error.message);
  }
};

export const createPost = async (req, res) => {
  const postBody = req.body;
  try {
    const post = await postModel.create(postBody);
    res.status(status.CREATED).send(post);
  } catch (error) {
    res.status(status.BAD_REQUEST).send(error.message);
  }
};
