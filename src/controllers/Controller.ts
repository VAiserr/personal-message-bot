import { Scenes, Context } from "telegraf";
import Command from "../commands/Command";
import ITelegrafContext from "../types/telegrafContext";

export default abstract class Controller {
    private scene: Scenes.BaseScene<Scenes.SceneContext>;
    private commands: Command[];

    constructor() {
        this.scene = this.setScene();
        this.commands = this.setCommands();

        this.init();
    }

    abstract setScene(): Scenes.BaseScene<Scenes.SceneContext>;
    abstract enterHandler(ctx: Scenes.SceneContext): void;
    abstract leaveHandler(ctx: Scenes.SceneContext): void;
    abstract setCommands(): Command[];
    private commandsInit(): void {
        for (const command of this.commands) {
            command.handler();
        }
    }
    init(): void {
        this.commandsInit();
        this.scene.enter(this.enterHandler);
        this.scene.leave(this.leaveHandler);
    }
    
    getScene(): Scenes.BaseScene<Scenes.SceneContext> {
        return this.scene;
    }
}