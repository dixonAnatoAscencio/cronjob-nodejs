import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";
import { PrismaClient } from "@prisma/client";

(async () => {
  main();
})();

function main() {
  Server.start();
  //console.log(envs.PORT);
}
