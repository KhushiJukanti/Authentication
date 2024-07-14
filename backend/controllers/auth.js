const AuthModel = require('../Models/auth')
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { fullName, email, password, repassword } = req.body;

  try {
    let isUserExist = await AuthModel.findOne({ email: email });
    if (isUserExist) {
      return res.status(400).send({ message: "User Already Exists", success: false });
    }

    if (password !== repassword) {
      return res.status(400).send({ message: "Passwords do not match", success: false });
    }

    const newUser = new AuthModel({ fullName, email, password });
    const createUser = await newUser.save();
    res.status(201).send({ message: "User signed up successfully", success: true });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ message: "Server error", success: false });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let isUserExist = await AuthModel.findOne({ email: email });
    if (isUserExist) {
      if (password === isUserExist.password) {
        //  token generation line pass to client
        let token = jwt.sign({ email: isUserExist.email, _id: isUserExist._id }, process.env.JWT_SECRET)
        return res.status(200).send({ message: "User Login Successfully", success: true, token: token, email: isUserExist.email, userId: isUserExist._id });
      } else {
        return res.status(401).send({ message: "Invalid credentials", success: false });
      }
    } else {
      return res.status(404).send({ message: "User Not Exist", success: false });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ message: "Server error", success: false });
  }
};


const authDetails = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.user._id).select('-password'); // Use _id instead of id
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { signup, login, authDetails }