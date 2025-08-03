import { ResultAsync } from "typescript-functional-extensions";
import { LogRepository } from "../../repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";

interface ICheckServices {
    execute(url: string): any;
}

export class CheckService implements ICheckServices {

    constructor(
        private readonly logRepository: LogRepository,
    ) { }

    execute(url: string) {
        return ResultAsync.try(
            async () => {
                await fetch(url);
                const log = new LogEntity({
                    message: `Service ${url} working`,
                    levelLog: LogSeverityLevel.low,
                    origin: 'check.service.ts'
                });
                this.logRepository.saveLog(log);
                return true;
            },
            (error: any) => {
                const log = new LogEntity({
                    message: `${error.message} to: ${url}`,
                    levelLog: LogSeverityLevel.high,
                    origin: 'check.service.ts'
                });
                this.logRepository.saveLog(log);
                return new Error(`Error checking the URL "${url}": ${error.message}`)
            }
        )
    }


}