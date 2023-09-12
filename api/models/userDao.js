const { AppDataSource } = require("./dataSource");

const phoneNumberCheck = async (phoneNumber) => {
  try {
    const result = await AppDataSource.query(
      `
      SELECT
        phone_number
      FROM users
      WHERE phone_number = ?
      `,
      [phoneNumber]
    );
    return result;
  } catch {
    const error = new Error("INVALID_USER");
    error.stausCode = 400;
    throw error;
  }
};

const createUser = async (userName, password, phoneNumber) => {
  try {
    const result = await AppDataSource.query(
      `
        INSERT INTO users (
          user_name, 
          phone_number,
          password
        ) VALUES (
          ?,
          ?,
          ?
        )
      `,
      [userName, password, phoneNumber]
    );

    return result;
  } catch {
    const error = new Error("dataSource Error #createUser");
    error.statusCode = 400;
    throw error;
  }
};

const getUserByphoneNumber = async (phoneNumber) => {
  try {
    const [result] = await AppDataSource.query(
      `
        SELECT
          id,
          user_name,
          phone_number,
          profile_image,
          password
        FROM users
        WHERE phone_number = ?
      `,
      [phoneNumber]
    );
    return result;
  } catch {
    const error = new Error("dataSource phoeNumber Error");
    error.statusCode = 400;

    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [result] = await AppDataSource.query(
      `
        SELECT 
          id,
          nickname,
          phoneNumber,
          password
          FROM users
          WHERE id = ?
      `,
      [id]
    );

    return result;
  } catch {
    const error = new Error("dataSource id Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  phoneNumberCheck,
  createUser,
  getUserByphoneNumber,
  getUserById,
};
