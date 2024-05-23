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

    const user = await UserModel.findOne({ userId: req.body.userId });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const question = new QuestionModel({
      id: uuidv4(),
      title: req.body.title,
      userId: req.body.userId,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      content: req.body.content,
      photoUrl: req.body.photoUrl,
      votesUp: req.body.votesUp,
      votesDown: req.body.votesDown,
 
    });
    console.log(req.body)
    const response = await question.save();

   
    // await user.save();

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

// ///////////=======================================
// export const VOTE_QUESTION = async (req, res) => {
//   try {
//     const questionId = req.params.id;
//     const vote = req.body.vote; // Assuming vote can be either 'up' or 'down'

//     if (!vote || (vote !== 'up' && vote !== 'down')) {
//       return res.status(400).json({ message: "Invalid vote type" });
//     }

//     const update = {
//       $inc: {
//         [vote === 'up' ? 'votesUp' : 'votesDown']: 1, // Dynamically update votesUp or votesDown
//       },
//     };

//     const question = await QuestionModel.findByIdAndUpdate(
//       questionId,
//       update,
//       { new: true } // Return the updated document
//     );

//     if (!question) {
//       return res.status(404).json({ message: "No question found" });
//     }

//     return res.status(200).json({ question: question });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Usage example (assuming vote is either 'up' or 'down')
// req.body = { vote: 'up' }; // Vote up the question
// // or
// req.body = { vote: 'down' }; // Vote down the question