import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(" ")[1];
    const isCustomAuth = token.length > 5000;

    let decodeData;

    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, process.env.BCRYPT_SECRET);

      req.userId = decodeData?.id;
    } else {
      decodeData = jwt.decode(token);

      req.userId = decodeData?.id;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
