import dotenv from "dotenv";

dotenv.config();

export const configEnv = {
  node_env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),
  postgress: process.env.DATABASE_URL,
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      "THIS_IS_THE_TOP_SECRET_KEY_DO_NOT_SHARE_TO_ANY",
    expiresIn: process.env.JWT_EXPIRESIN || "24h",
  },
};
