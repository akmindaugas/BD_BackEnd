import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/user.js";

// taip pat butinas pletinys.js path pabaigoje
import QuestionModel from "../models/question.js";

export const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find();

    return res.status(200).json({ questions: questions });
  } catch (err) {
    console.log(err);
  }
};

export const GET_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({ id: req.params.id });
    // ivesti responsa, kad ne 'this endpoint does note exists', bet "no such question found'"
    return res.status(200).json({ question: question });
  } catch (err) {
    console.log(err);
  }
};
// trinant question pagal id, id paduodame per url, todel jis yra imamas is params, ne body

export const CREATE_QUESTION = async (req, res) => {
  try {
    console.log(req.body);

    const user = await UserModel.findOne({ name: req.body.user });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const question = new QuestionModel({
      id: uuidv4(),
      title: req.body.title,
      user: user.id,
      content: req.body.content,
      photoUrl: req.body.photoUrl,
      like: req.body.like,
      dislike: req.body.dislike,
      answers: req.body.answers
    });
    const response = await question.save();

    user.questions.push(question.id);
    await user.save();

    return res
      .status(200)
      .json({ question: response, message: "question was created successfuly" });
  } catch (err) {
    console.log(err);
  }
};

export const DELETE_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({ id: req.params.id });

    if (!question.userId !== req.body.userId) {
      return res
        .status(401)
        .json({ message: "you try delete question, which you are not author" });
    }

    return res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
  }
};
// ======================================================
export const LIKE_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id; 

    const question = await QuestionModel.findByIdAndUpdate(
      questionId, 
      { $inc: { like: 1 } }, // Increment like count
      { new: true } // Return the updated document
    );

    if (!question) {
      return res.status(404).json({ message: "No question found" });
    }

    return res.status(200).json({ question: question });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const DISLIKE_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id; 

    const question = await QuestionModel.findByIdAndUpdate(
      questionId,
      { $inc: { dislike: 1 } }, // Increment dislike count
      { new: true } // Return the updated document
    );

    if (!question) {
      return res.status(404).json({ message: "No question found" });
    }

    return res.status(200).json({ question: question });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};