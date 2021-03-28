export const schema = {
    auth: {
        secret: {
            format: String,
            default: 'secret',
            env: 'AUTH_TOKEN_SECRET',
        },
        expirationTimeSeconds: {
            format: Number,
            default: 60 * 60,
            env: 'AUTH_TOKEN_EXPIRATION_TIME_SECONDS',
        },
    },
};
