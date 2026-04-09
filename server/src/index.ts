import { createApp } from "./app";
import { config } from "./config";

const app = createApp();

app.listen(config.port, () => {
  console.log(`🚀 LeadScore AI server running on http://localhost:${config.port}`);
});
