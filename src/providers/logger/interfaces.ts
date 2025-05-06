interface IAppLogger {
  log(data: ILogData): void;
}

type Levels =
  | "emerg"
  | "alert"
  | "crit"
  | "error"
  | "warning"
  | "notice"
  | "info"
  | "debug";

interface ILogData {
  level: Levels;
  message: string;
}

export { IAppLogger, ILogData };
