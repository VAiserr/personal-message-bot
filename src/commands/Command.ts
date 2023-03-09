import { Scenes, Telegraf } from "telegraf";
import { BaseScene } from "telegraf/typings/scenes";

export default abstract class Command<T = Scenes.BaseScene<Scenes.SceneContext>> {
    context: T;

    constructor(context: T) {
        this.context = context;
    }

    abstract handler(): void;
}