import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";
import { PrismaClient } from "@prisma/client";

(async () => {
  main();
})();

function main() {
  const prisma = new PrismaClient();
  const newLog = prisma.logModel.create({
    data: {
      level: "HIGH",
      message: "Test message",
      origin: "App.ts",
    },
  });
  console.log({ newLog });

  const logs = prisma.logModel.findMany({
    //busca solo por los logs en high
    where: {
      level: "HIGH",
    },
  });
  console.log({ logs });

  Server.start();
  //console.log(envs.PORT);
}
