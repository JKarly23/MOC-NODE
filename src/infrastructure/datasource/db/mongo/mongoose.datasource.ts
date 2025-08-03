import mongoose from "mongoose";
import { LogEntity, LogSeverityLevel } from "../../../../domain/entities/log.entity";
import { LogDataSource } from "../../../../domain/datasource/log.datasource";
process.loadEnvFile();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase');

const LogSchema = new mongoose.Schema({
    levelLog: {
        type: String,
        enum: Object.values(LogSeverityLevel),
        required: true,
    },
    message: { type: String, required: true },
    origin: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export class MongoDatasource extends LogDataSource {

    private logModel = mongoose.model<LogEntity>('Logs', LogSchema);

    async saveLog(log: LogEntity): Promise<void> {

        const logDocument = new this.logModel({
            levelLog: log.levelLog,
            message: log.message,
            origin: log.origin,
            createdAt: log.createdAt
        });

        console.log(`Saving log: ${JSON.stringify(logDocument)}`);
        await logDocument.save();
    }

    async getLogs(severityLog: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await this.logModel.find({ levelLog: severityLog }).exec();
        console.log(`Found ${logs.length} logs with severity ${severityLog}`);
        return logs.map(log => LogEntity.fromJson(JSON.stringify(log)));
    }

}