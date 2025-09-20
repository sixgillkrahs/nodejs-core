import app from "@/app";
import { ENV } from "./config/env";
import { logger } from "./config/logger";
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
});

export default server