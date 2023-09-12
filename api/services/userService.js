const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");
const { validateEmailAndPassword } = require("../utils/validate");

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10;

  return await bcrypt.hash(plaintextPassword, saltRounds);
};

const getUserById = async (id) => {
  try {
    const result = await userDao.getUserById(id);
    if (!result) {
      throw new Error('User not found');
    }
    return result;
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw error;
  }
};

const presignIn = async (phoneNumber) => {
  const phoneNumberCheck = await userDao.phoneNumberCheck(phoneNumber);

  return phoneNumberCheck;
};

const signUp = async (userName, password, phoneNumber) => {
  validateEmailAndPassword(phoneNumber, password);
  const hashedPassword = await hashPassword(password);
  const createUser = await userDao.createUser(
    userName,
    phoneNumber,
    hashedPassword
  );

  return createUser;
};

const signIn = async (phoneNumber, password) => {
  const user = await userDao.getUserByphoneNumber(phoneNumber, password);

  if (!user) {
    const error = new Error("INVALID_USER");
    error.statusCode = 401;

    throw error;
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    const error = new Error("INVALID_PASSWORD");
    error.statusCode = 401;

    throw error;
  }
  const accessToken = jwt.sign(
    { id: user.id, phoneNumber: user.phoneNumber, userName: user.userName },
    process.env.JWT_SECRET,
    {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return {
    accessToken,
    userName: user.user_name,
    profileImage: user.profile_image,
  };
};

const changePassword = async(id, existingPassword, newPassword) => {
  if (!id || !existingPassword) {
    throw new Error('User not found');
  }
  
  const user = await userDao.findUserByUsername(id);

  const isMatch = await bcrypt.compare(existingPassword, user.password);
  if (!isMatch) {
    throw new Error('Incorrect current password');
  }

  const hashedPassword = await hashPassword(newPassword);
  const passwordchange = await userDao.updatePassword(id, hashedPassword);
  
  return passwordchange;
};

module.exports = { 
  presignIn, 
  getUserById, 
  signUp, 
  signIn,
  changePassword
};
