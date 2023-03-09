import { Telegraf, session, Scenes } from "telegraf";
import Command from "../commands/Command";
import GetMeCommand from "../commands/GetMeCommand";
import { IConfigService, configService } from "../config";
import Controller from "../controllers/Controller";

export default class Bot {
    private readonly config: IConfigService;
    private bot: Telegraf<Scenes.SceneContext>;
    private commands: Command<Telegraf<Scenes.SceneContext>>[];

    constructor(controllers: Controller[], config: IConfigService) {
        this.config = config;
        this.bot = new Telegraf<Scenes.SceneContext>(this.config.get("BOT_TOKEN"));
        this.commands = this.setCommands();
        const scenes = this.getScenes(controllers);
        const stage = new Scenes.Stage<Scenes.SceneContext>(scenes);

        this.bot.use(session());
        this.bot.use(stage.middleware())
    }

    private getScenes(controllers: Controller[]): Scenes.BaseScene<Scenes.SceneContext>[] {
        const scenes: Scenes.BaseScene<Scenes.SceneContext>[] = [];
        for (const controller of controllers) {
            scenes.push(controller.getScene());
        }
        return scenes;
    }

    private async startCommand(ctx: Scenes.SceneContext) {
        try {
            if (String(ctx.from?.id) == configService.get("ADMIN_ID")) {
                await ctx.scene.enter('admin');
            } else {
                await ctx.scene.enter('start');
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    private setCommands(): Command<Telegraf<Scenes.SceneContext>>[] {
        const commands: Command<Telegraf<Scenes.SceneContext>>[] = [
            new GetMeCommand(this.bot)
        ];
        return commands;
    }

    private initCommands(): void {
        for (const command of this.commands) {
            command.handler();
        }
    }

    init(): void {
        this.bot.start(this.startCommand)
        this.initCommands()

        this.bot.launch();
    }
}
