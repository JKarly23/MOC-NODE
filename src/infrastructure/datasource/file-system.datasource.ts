import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';


export class FileSystemDataSource implements LogDataSource {

    private readonly logsPath: string = 'logs/';
    private readonly allLogsPath = 'logs/log-all.log'
    private readonly mediumLogsPath = 'logs/log-medium.log'
    private readonly highLogsPath = 'logs/log-high.log'

    constructor() {
        this.createLogsFile();
    }

    private createLogsFile = () => {
        if (!existsSync(this.logsPath)) mkdirSync(this.logsPath);
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if (existsSync(path)) return;
            writeFileSync(path, '');
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)} \n`;
        appendFileSync(this.allLogsPath, logAsJson);
        switch (newLog.levelLog) {
            case LogSeverityLevel.medium:
                appendFileSync(this.mediumLogsPath, logAsJson);
                break;
            case LogSeverityLevel.high:
                appendFileSync(this.highLogsPath, logAsJson);
                break;
        }
    }

    async getLogs(severityLog: LogSeverityLevel): Promise<LogEntity[]> {
        let path: string = '';
        switch (severityLog) {
            case LogSeverityLevel.medium:
                path = this.mediumLogsPath;
                break;
            case LogSeverityLevel.high:
                path = this.highLogsPath;
                break;
            default:
                break;
        }
        return this.getLogForFile(path);
    }

    private getLogForFile(path: string) {
        try {
            const raw = readFileSync(path, 'utf8')
            return raw
                .split('\n')
                .filter(line => line.trim() !== ' ')
                .map(LogEntity.fromJson);
        } catch (error: Error | any) {
            throw new Error(error.message);
        }

    }

}