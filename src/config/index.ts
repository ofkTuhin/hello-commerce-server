import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_password: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_password: process.env.DEFAULT_FACULTY_PASS,
  default_admin_password: process.env.DEFAULT_ADMIN_PASS,
  env: process.env.NODE_ENV,
  salt_round: process.env.SALT_ROUND,
  jwt: {
    jwt_secret: process.env.JWT_ACCESSTOKEN_SECRET,
    jwt_exipired: process.env.JWT_ACCESSTOKEN_EXPIRE,
    jwt_refresh_secret: process.env.JWT_REFRESHTOKEN_SECRET,
    jwt_refresh_exipired: process.env.JWT_REFRESHTOKEN_EXPIRE,
  },
};
