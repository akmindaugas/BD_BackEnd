import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/user.js";

// taip pat butinas pletinys.js path pabaigoje
import AnswerModel from "../models/answer.js";

export const GET_ALL_ANSWERS = async (req, res) => {
  try {
    const answers = await AnswerModel.find();

    return res.status(200).json({ answers: answers });
  } catch (err) {
    console.log(err);
  }
};

export const GET_ANSWER_BY_ID = async (req, res) => {
  try {
    const answer = await AnswerModel.findOne({ id: req.params.id });
    // ivesti responsa, kad ne 'this endpoint does note exists', bet "no such item found'"
    return res.status(200).json({ answer: answer });
  } catch (err) {
    console.log(err);
  }
};
// trinant item pagal id, id paduodame per url, todel jis yra imamas is params, ne body

export const INSERT_ANSWER = async (req, res) => {
  try {
    console.log(req.body);

    const user = await UserModel.findOne({ name: req.body.user });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const answer = new AnswerModel({
      id: uuidv4(),
      title: req.body.title,
      user: user.id,
      content: { type: Number, required: true },
      photoUrl: { type: String, required: false },
    });
    const response = await answer.save();

    user.answers.push(answer.id);
    await user.save();

    return res
      .status(200)
      .json({ answer: response, message: "answer was added successfuly" });
  } catch (err) {
    console.log(err);
  }
};

export const DELETE_ANSWER_BY_ID = async (req, res) => {
  try {
    const answer = await AnswerModel.findOne({ id: req.params.id });

    if (!answer.userId !== req.body.userId) {
      return res
        .status(401)
        .json({ message: "you try delete not yours answer" });
    }

    return res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
  }
};
