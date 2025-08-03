
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

interface OptionsEntity {
    levelLog: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}


export class LogEntity {

    levelLog: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt: Date;

    constructor(options: OptionsEntity) {
        const { levelLog, message, origin, createdAt = new Date() } = options;
        this.levelLog = levelLog;
        this.message = message;
        this.origin = origin
        this.createdAt = createdAt;
    }

    static fromJson(json: string): LogEntity {
        const { levelLog, message, createdAt } = JSON.parse(json);
        const log = new LogEntity({
            levelLog,
            message,
            origin: 'log.entity.ts'
        });
        log.createdAt = new Date(createdAt);
        return log;
    }


} 
