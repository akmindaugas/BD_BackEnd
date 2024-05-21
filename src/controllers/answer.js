import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/user.js";

// taip pat butinas pletinys.js path pabaigoje
import ItemModel from "../models/question.js";

export const GET_ALL_ITEMS = async (req, res) => {
  try {
    const items = await ItemModel.find();

    return res.status(200).json({ items: items });
  } catch (err) {
    console.log(err);
  }
};

export const GET_ITEM_BY_ID = async (req, res) => {
  try {
    const item = await ItemModel.findOne({ id: req.params.id });
    // ivesti responsa, kad ne 'this endpoint does note exists', bet "no such item found'"
    return res.status(200).json({ item: item });
  } catch (err) {
    console.log(err);
  }
};
// trinant item pagal id, id paduodame per url, todel jis yra imamas is params, ne body

export const INSERT_ITEM = async (req, res) => {
  try {
    console.log(req.body);

    const user = await UserModel.findOne({ name: req.body.user });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const item = new ItemModel({
      id: uuidv4(),
      title: req.body.title,
      user: user.id,
      price: req.body.price,
      photoUrl: req.body.photoUrl,
    });
    const response = await item.save();

    user.items.push(item.id);
    await user.save();

    return res
      .status(200)
      .json({ item: response, message: "item was added successfuly" });
  } catch (err) {
    console.log(err);
  }
};

export const DELETE_ITEM_BY_ID = async (req, res) => {
  try {
    const item = await ItemModel.findOne({ id: req.params.id });

    if (!item.userId !== req.body.userId) {
      return res
        .status(401)
        .json({ message: "you try delete item belongs not for you" });
    }

    return res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
  }
};
