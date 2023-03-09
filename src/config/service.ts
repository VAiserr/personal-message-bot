import { DotenvParseOutput, config } from "dotenv";
import { IConfigService } from "./interface";

export class ConfigService implements IConfigService {
    private config: DotenvParseOutput;

    constructor() {
        const { error, parsed } = config();
        if (error) {
            throw new Error(".env doesnt exist");
        }
        if (!parsed) {
            throw new Error(".env is empty");
        }
        this.config = parsed;
    }

    get(key: string): string {
        const result = this.config[key];
        if (!result) throw new Error("value not found");
        return result;
    }
}
