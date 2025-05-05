interface IAppLogger {
  log(data: ILogData): void;
}

interface ILogData {
  level: string;
  message: string;
}

export { IAppLogger, ILogData };
