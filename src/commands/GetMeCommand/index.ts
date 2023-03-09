import Command from "../Command";
import { Scenes, Telegraf } from 'telegraf'

export default class GetMeCommand extends Command<Telegraf<Scenes.SceneContext>> {
    handler(): void {
        this.context.command('me', this.getMe)
    }
    
    private async getMe(ctx: Scenes.SceneContext) {
        try {
            await ctx.reply(`Твой ID: ${ctx.from?.id}`);
        } catch (error) {
            console.log(error);
        }
    }
}