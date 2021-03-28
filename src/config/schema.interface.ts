export interface IConfigSchema {
    port: number;
    auth: {
        secret: string,
        expirationTimeSeconds: number,
    },
}
