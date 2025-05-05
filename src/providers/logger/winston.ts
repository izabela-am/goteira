import type { Logger } from "winston";
import { createLogger, format, transports } from "winston";

import { IAppLogger, ILogData } from "./interfaces";

class AppLogger implements IAppLogger {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      format: format.json(),
    });

    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new transports.Console({
          format: format.simple(),
        }),
      );
    }
  }

  log({ level, message }: ILogData): void {
    this.logger.log({
      level,
      message,
    });
  }
}

export { AppLogger };
