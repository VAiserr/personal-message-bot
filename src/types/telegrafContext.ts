import {Context, Scenes} from 'telegraf'
import SessionData from './sessionData'

export default interface ITelegrafContext extends Scenes.SceneContext {
    test?: string
}