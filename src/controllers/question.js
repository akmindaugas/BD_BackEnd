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

export const GET_QUESTIONS_BY_ID = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({ id: req.params.id });
    // ivesti responsa, kad ne 'this endpoint does note exists', bet "no such item found'"
    return res.status(200).json({ question: question });
  } catch (err) {
    console.log(err);
  }
};
// trinant item pagal id, id paduodame per url, todel jis yra imamas is params, ne body

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
      content: req.body.price,
      photoUrl: req.body.photoUrl,
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
