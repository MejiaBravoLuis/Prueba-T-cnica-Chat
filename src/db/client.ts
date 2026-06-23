import { neon } from "@neondatabase/serverless";

export const createDb = (databaseUrl: string) => {
  return neon(databaseUrl);
};