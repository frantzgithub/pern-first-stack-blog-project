import { cleanEnv, port, str } from "envalid";

export const Env = cleanEnv(process.env, {
    PORT: port(),
    JWT_SECRET: str(),
    NODE_ENV: str(),
    // CLOUDINARY_NAME: (),
    // CLOUDINARY_API_KEY: num(),
    // CLOUDINARY_API_SECRET: str()
})