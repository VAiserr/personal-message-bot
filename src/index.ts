import Bot from "./bot";
import {} from "typegram";
import StartController from "./controllers/StartController";
import AdminController from "./controllers/AdminController";
import { configService } from "./config";

const bot = new Bot(
    [
        new StartController(), 
        new AdminController()
    ],
    configService
);

bot.init();
