export const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const option = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  };
  res.status(statusCode).cookie("Token", token, option).json({
    success: true,
    message: "User created successfully",
    user,
  });
};
