import { Module } from '@nestjs/common';
import * as convict from 'convict';
import { schema } from './schema';
import {
    CONFIG_SCHEMA_TOKEN,
    CONFIG_TOKEN,
    CONVICT_MODULE_TOKEN,
} from './config.constants';
import { configProvider } from './config.provider';

@Module({
    providers: [
        {
            provide: CONVICT_MODULE_TOKEN,
            useValue: convict,
        },
        {
            provide: CONFIG_SCHEMA_TOKEN,
            useValue: schema,
        },
        configProvider,
    ],
    exports: [CONFIG_TOKEN],
})
export class ConfigModule {
}
