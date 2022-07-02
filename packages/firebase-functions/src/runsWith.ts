import { RuntimeOptions } from "firebase-functions";

export const runTimeOpts: Record<
  "dailyCacheBuilders" | "dailyFirestoreBackup",
  RuntimeOptions
> = {
  dailyCacheBuilders: {
    timeoutSeconds: 300,
    memory: "2GB",
  },
  dailyFirestoreBackup: {
    timeoutSeconds: 300,
    memory: "2GB",
  },
};
