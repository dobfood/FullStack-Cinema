import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user_id }, process.env.NUMBER_SECRET_TOKEN);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const saveUser = await newUser.save();
      const token = jwt.sign(
        { id: saveUser._id },
        process.env.NUMBER_SECRET_TOKEN
      );
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(saveUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
