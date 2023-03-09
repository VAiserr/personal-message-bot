import Command from "../Command";
import { Scenes } from "telegraf";
import { configService } from "../../config";

export default class MessagesListener extends Command {
    handler(): void {
        try {
            this.context.hears(/^((?!^\/).)*$/gm, this.messageHandler);
        } catch (error) {
            console.log(error)
        }
    }

    async messageHandler(ctx: Scenes.SceneContext) {
        try {
            // console.log(ctx.message)
            await ctx.forwardMessage(configService.get('ADMIN_ID'));

        } catch (error) {
            console.log(error)
        }
    }
}