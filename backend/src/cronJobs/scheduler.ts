import cron from "node-cron";
import ingestProducts from "./productSync.js";

async function runCronJob() {
  console.log("Cron job is started");
  try {
    const result = await ingestProducts();
    console.log("Cron Job Completed successfully:", result);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Cron Job Failed:", err.message);
    } else {
      console.error("Cron Job Failed:", err);
    }
  }
}

cron.schedule("0 3 * * 0", runCronJob);
//for running manually
if (process.argv.includes("manual")) runCronJob();
