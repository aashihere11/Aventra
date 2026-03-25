const jwt = require('jsonwebtoken');
const { UsersModel } = require("../Models/UsersModel");

const isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });

    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UsersModel.findOne({ email: decoded.email })
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token!" });
    }


}

module.exports = isLoggedIn;