import { Result, ResultAsync } from "typescript-functional-extensions";
import { EmailService } from "../../../presentation/email/email.services";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
    execute(to: string | string[]): ResultAsync<boolean, Error> | any
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly emailService: EmailService,
    ) { }

    execute(to: string | string[]): ResultAsync<boolean, Error> {
        return ResultAsync.try(
            async () => {
                this.emailService.sentEmailWithAttachment(to);
                const log = new LogEntity({
                    levelLog: LogSeverityLevel.high,
                    message: 'Email send suscefully:',
                    origin: 'send-email.log.ts'
                });
                this.logRepository.saveLog(log);
                return true;
            },
            (err: Error | any) => {
                const log = new LogEntity({
                    levelLog: LogSeverityLevel.high,
                    message: 'Failed to send email:',
                    origin: 'send-email.log.ts'
                });
                this.logRepository.saveLog(log);
                return new Error(err.message);
            }
        )
    }

}