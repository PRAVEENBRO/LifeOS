import { configEnv } from './src/shared/index';
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: configEnv.postgress ?? '' ,
  },
});
