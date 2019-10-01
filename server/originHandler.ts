import * as dotenv from "dotenv";
dotenv.config({path: __dirname + "/.env"});

export default class OriginHandler {
    public origin: string;

    public initCorsOptions(): any {
        const whitelist = ["http://localhost:3000", "http://dev.loukoum.io", "https://dev.loukoum.io",
        "http://loukoum.io", "https://loukoum.io", "chrome-extension://obeejmljgfhbmhngkoopbhcchdjicebk",
        "chrome-extension://jhdanjahcoaljodnfjfmmejjfedpmmjp", "http://admin.loukoum.io", "https://admin.loukoum.io"];
        const corsOptions = {
            credentials: true,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            origin: (origin, callback) => {
            if (origin) {
                this.setOrigin(origin);
            }
            if (!origin) {
                return callback(null, true);
            }
            if (whitelist.indexOf(origin) === -1) {
                const msg = "The CORS policy for this site does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
            },
        };
        return corsOptions;
    }

    public setOrigin(origin: string) {
        this.origin = origin;
    }

    public getOrigin() {
        return this.origin;
    }
}
