import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers);

  if (!token) {
    return res.status(401).json({ message: "bad auth, no token" });
  }

  // tikrinam, kas ateina su tokeno payloadu
  const decodedToken = jwt.decode(token);
  console.log("decoded token payload:", decodedToken);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(401).json({ message: "bad auth, wrong token" });
    }
    // pasitikrinam, ar tokene uzkoduotas userId
    if (!decoded || !decoded.userId) {
      console.error("bad token payload:", decoded);
      return res.status(401).json({ message: "bad auth, bad token payload" });
    }

    req.body.userId = decoded.userId;

    return next();
  });
};
