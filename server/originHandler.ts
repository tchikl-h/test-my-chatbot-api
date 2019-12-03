export default class OriginHandler {
    public origin: string;

    public initCorsOptions(): any {
        const whitelist = ["http://localhost:3000", "https://staging.dashboard.test-my-chatbot.com", "http://staging.dashboard.test-my-chatbot.com", "https://dashboard.test-my-chatbot.com", "http://dashboard.test-my-chatbot.com", "http://chatbot.herve-tchikladze.com", "https://chatbot.herve-tchikladze.com"];
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
