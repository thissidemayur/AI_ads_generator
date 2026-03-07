import { env } from "./env";
import * as arctic from "arctic"
export const googleProvider = new arctic.Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URI,
);
