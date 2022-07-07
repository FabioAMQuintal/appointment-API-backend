import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  api: {
    prefix: "/api",
  },
  auth: {
    key: process.env.SECRET,
    tokenExpiresIn: process.env.EXPIREIN
  },
  port: process.env.PORT,
};
