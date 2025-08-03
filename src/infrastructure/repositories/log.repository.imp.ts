import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImp implements LogRepository {

    constructor(
        private readonly logDatasource: LogDataSource,
    ) { }

    saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log);
    }
    getLogs(severityLog: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLog);
    }

}