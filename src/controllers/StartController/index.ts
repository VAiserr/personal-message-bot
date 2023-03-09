import { Scenes } from "telegraf";
import Command from "../../commands/Command";
import MessagesListener from "../../commands/MessagesListaner";
import Controller from "../Controller";

export default class StartController extends Controller {
    enterHandler(ctx: Scenes.SceneContext): void {
        // console.log("user entered");
        ctx.reply(`Приветствую тебя, друг! \nНапиши сюда любое сообщение, \nи я сразу же его получу и отвечу(если время найдется).`);
    }
    leaveHandler(ctx: Scenes.SceneContext): void {
        console.log("user leaved");
    }
    setCommands(): Command[] {
        const scene = this.getScene();
        return [
            new MessagesListener(scene)
        ];
    }
    setScene(): Scenes.BaseScene<Scenes.SceneContext> {
        return new Scenes.BaseScene<Scenes.SceneContext>("start");
    }
}
