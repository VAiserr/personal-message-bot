import Command from "../Command";
import { Scenes } from "telegraf";
import { message } from 'telegraf/filters'
import { Message } from "typegram";

export default class ReplyListaner extends Command {
    handler(): void {
        this.context.on(message('reply_to_message'), this.replyHandler)
    }
    
    async replyHandler(ctx: Scenes.SceneContext & {message: Message.CommonMessage | undefined}) {
        try {
            const message = ctx.message?.reply_to_message as Message.CommonMessage;
            // console.log(ctx.message);
            ctx.copyMessage(String(message.forward_from?.id), {reply_to_message_id: Number(message.message_id) - 1});
        } catch (error) {
            console.log(error);
        }
    }
}