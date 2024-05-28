import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export default async function handelPostSignup(req, res) {
  try {
    const {
      userName,
      userEmail,
      userPassword,
      phoneNo,
      country,
      State,
      District,
      Pin,
      Location,
    } = req.body;
    const distinctUserEmail = await User.distinct("userEmail");
    const distinctUserPhoneNo = await User.distinct("phoneNo");
    if (distinctUserEmail.includes(userEmail)) {
      return res.status(400).json({
        message: "This Email id is connected with other account",
      });
    }
    if (distinctUserPhoneNo.includes(phoneNo)) {
      return res.status(400).json({
        message:
          "This Phone No is connected with other account,try with Other account",
      });
    }

    const userData = new User({
      userName,
      userEmail,
      userPassword,
      phoneNo,
      country,
      State,
      District,
      Pin,
      Location,
    });

    const salt = await bcrypt.genSalt(10);
    userData.userPassword = await bcrypt.hash(userPassword, salt);
    await userData.save();

    const payload = { userData: { id: userData.id } };
    jwt.sign(payload, process.env.JWTSECRETE, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token }).redirect("/login");
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
}
