import { CheckService } from "../domain/use-cases/checks/check-services";
import { SendEmailLogs } from "../domain/use-cases/email/send-email.log";
import { MongoDatasource } from "../infrastructure/datasource/db/mongo/mongoose.datasource";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";
import { LogRepositoryImp } from "../infrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.services";

// instance of data source
const dataSourceFS = new FileSystemDataSource();
const dataSourceMDB = new MongoDatasource();
// instance of repository
const logRepository = new LogRepositoryImp(dataSourceMDB);
// instance of email service
const emailService = new EmailService();
// instance of use case 
const sendEmail = new SendEmailLogs(logRepository, emailService);

const destinatary: string[] = [
    'perezsalcedocarlosjavier191@gmail.com',
]

const sendDailyEmail = () => {
    sendEmail.execute(destinatary).match({
        success: () => console.log('Email sent suscefully'),
        failure: (err) => console.log(err)
    });
}

export class Server {
    static start() {

        console.log('Server is runing');

        CronService.cronJob(
            '0 */10 * * * *', // Every 10 minutes
            () => {
                new CheckService(logRepository)
                    .execute('http://localhost:3003/api/')
                    .match({
                        success: () => console.log('Server up'),
                        failure: (err) => console.log(err)
                    })
            }
        )

        CronService.cronJob(
            '0 0 11 * * *',
            () => {
                sendDailyEmail();
            }
        )

    }


}
