import express from "express";
import cors from "cors";
import leadsRouter from "./routes/leads";
import { config } from "./config";

export function createApp() {
  const app = express();

  const corsOptions = config.frontendUrl
    ? { origin: config.frontendUrl }
    : {}; // dev: open to all origins

  app.use(cors(corsOptions));
  app.use(express.json());

  app.use("/api", leadsRouter);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return app;
}
