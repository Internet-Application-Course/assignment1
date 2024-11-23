import status from 'http-status';
import commentsModel from '../models/commentsModel.js';

export const createComment = async (req, res) => {
  const commentBody = req.body;

  try {
    const post = await commentsModel.create(commentBody);
    res.status(status.CREATED).send(post);
  } catch (error) {
    res.status(status.BAD_REQUEST).send(error.message);
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await commentsModel.find();
    res.send(comments);
  } catch (error) {
    res.status(status.BAD_REQUEST).send(error.message);
  }
};