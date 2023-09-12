const { userServices } = require("../services");
const { catchAsync } = require("../utils/error");
const request = require("request-promise");

const presignIn = catchAsync(async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    const error = new Error("not phoneNumber");
    error.statusCode = 400;
    throw error;
  }

  const phoneNumberCheck = await userServices.presignIn(phoneNumber);

  if (phoneNumberCheck.length === 0) {
    return res.json({ message: "INVALID_USER" });
  } else {
    res.status(201).json({ message: "user is confirmed" });
  }
});

const getCIByPhoneNumber = catchAsync(async (req, res) => {
  const { phoneNumber } = req.body;
  console.log(req.body);
    const options = {
      method: 'POST',
      uri: 'http://10.58.52.62:3000/auth',
      body: {
        phoneNumber: phoneNumber
      },
      json: true
    };

    const responseBody = await request(options);
    console.log(options)
    console.log(responseBody);

    if (responseBody) {
      return res.status(200).json({ message: "Successful authentication", CI: responseBody.CI});
    } else {
      const error = new Error("not Personal authentication");
      error.status = 400;
      throw error;
    }
});

const signUp = catchAsync(async (req, res) => {
  const { userName, password, phoneNumber } = req.body;
  if (!userName || !password || !phoneNumber) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }

  const membership =  await userServices.signUp(
    CI,
    userName,
    password,
    phoneNumber
  );
  res.status(201).json({ message: "user is created" });
});

const signIn = catchAsync(async (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }

  const { accessToken, userName, profileImage } = await userServices.signIn(
    phoneNumber,
    password
  );
  res.status(201).json({
    accessToken: accessToken,
    userName: userName,
    phoneNumber: phoneNumber,
    profileImage: profileImage,
  });
});

module.exports = { 
  presignIn, 
  signUp, 
  signIn, 
  getCIByPhoneNumber
};
