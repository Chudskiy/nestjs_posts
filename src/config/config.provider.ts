import {
    CONFIG_SCHEMA_TOKEN,
    CONFIG_TOKEN,
    CONVICT_MODULE_TOKEN,
} from './config.constants';
import { Config, Schema } from 'convict';
import { IConfigSchema } from './schema.interface';

export const configProvider = {
    provide: CONFIG_TOKEN,
    useFactory: (
        convictModule,
        schema: Schema<IConfigSchema>,
    ): IConfigSchema => {
        const config: Config<IConfigSchema> = convictModule(schema);
        config.validate();

        return config.getProperties();
    },
    inject: [CONVICT_MODULE_TOKEN, CONFIG_SCHEMA_TOKEN],
};
