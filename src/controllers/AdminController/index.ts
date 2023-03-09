import { Scenes } from "telegraf";
import { BaseScene, SceneContext, SceneSessionData } from "telegraf/typings/scenes";
import Command from "../../commands/Command";
import ReplyListaner from "../../commands/ReplyListaner";
import Controller from "../Controller";

export default class AdminController extends Controller {
    setScene(): BaseScene<SceneContext<SceneSessionData>> {
        return new Scenes.BaseScene<Scenes.SceneContext>('admin');
    }
    setCommands(): Command[] {
        const scene = this.getScene();
        return [
            new ReplyListaner(scene)
        ];
    }
    enterHandler(ctx: SceneContext<SceneSessionData>): void {
        ctx.reply(`Здарова, ${ctx.from?.username}`);
    }
    leaveHandler(ctx: SceneContext<SceneSessionData>): void {
        console.log("user leaved");
    }
    
}