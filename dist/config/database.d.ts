export declare const databaseConfig: {
    mongodb: {
        uri: string;
        host: string;
        port: number;
        database: string;
        options: {
            maxPoolSize: number;
            serverSelectionTimeoutMS: number;
            socketTimeoutMS: number;
            family: number;
        };
    };
    app: {
        port: number;
        nodeEnv: string;
        corsOrigin: string;
        baseUrl: string;
    };
};
export default databaseConfig;
//# sourceMappingURL=database.d.ts.map