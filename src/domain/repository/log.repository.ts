import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository {
  //obligar el comportamiento sobre otras clases

  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
