import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasorce";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepository } from "../domain/repository/log.repository";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource()); // grabamos en el file system

const postgresLogRepository = new LogRepositoryImpl( // grabamos en la base de datos postgres
  new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started");

    //Llamando desde el use case y no desde el servicio
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "dixon@wisser.dev",
    //   "d.anatoascencio@gmail.com",
    // ]);

    //todo: Mandar Email
    // const emailService = new EmailService(fileSystemLogRepository); //inyectamos la dependencia
    // emailService.sendEmailWithFileSystemLogs([
    //   "dixon@wisser.dev",
    //   "d.anatoascencio@gmail.com",
    // ]);

    //Mandar Email
    //  const emailService = new EmailService();
    //  emailService.sendEmailWithFileSystemLogs([
    //   "dixon@wisser.dev",
    //    "d.anatoascencio@gmail.com",
    // ]);

    //**Cron job
    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckServiceMultiple(
        [fsLogRepository, postgresLogRepository],
        () => console.log(` ${url} is OK`),
        (error) => console.log(error),
      ).execute(url);
      //new CheckService().execute("http://localhost:3000"); //json-server
    });
  }
}
