import { LogSeverityLevel } from "./domain/entities/log.entity";
import { LogRepository } from "./domain/repository/log.repository";
import { MongoDatasource } from "./infrastructure/datasource/db/mongo/mongoose.datasource";
import { LogRepositoryImp } from "./infrastructure/repositories/log.repository.imp";
import { Server } from "./presentation/server";

const mongoClient = new MongoDatasource();
const logRepository = new LogRepositoryImp(mongoClient);

(async () => main())()

async function main() {
    Server.start();
    // console.log(await logRepository.getLogs(LogSeverityLevel.high));


}
