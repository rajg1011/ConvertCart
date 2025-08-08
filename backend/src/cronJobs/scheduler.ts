import cron from "node-cron";
import ingestProducts from "./productSync.js";
import dbConnection from "../models/dbConnection/dbConnection.js";

async function runCronJob() {
  try {
    await dbConnection();
    console.log("Cron job is started");
    const result = await ingestProducts();
    console.log("Cron Job Completed successfully:", result);
  } catch (err) {
    console.error("Cron Job Failed:", (err as Error)?.message || err);
  }
}

cron.schedule("30 1 * * *", runCronJob);
//for running manually
if (process.argv.includes("manual")) runCronJob();
