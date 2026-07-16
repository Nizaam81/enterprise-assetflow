import employModal from "../../Models/employ-Model.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

export const googleCallback = async (req, res) => {
  try {
    const email = req.user.emails[0].value;

    let user = await employModal.findOne({ email });

    if (!user) {
      user = await employModal.create({
        fullName: req.user.displayName,
        email,
        googleID: req.user.id,
        provider: "google",
      });
    }

    const accessToken = generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user._id,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Google Login Successful",
      accessToken,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
