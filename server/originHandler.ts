import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/.env'})

export default class OriginHandler {
    public origin: string;

    constructor() {
    }

    public initCorsOptions() : any {
      let whitelist = ['http://localhost:8000' ];
      var corsOptions = {
      origin: (origin, callback) => {
          if (origin) {
              this.setOrigin(origin);   
          }
          if(!origin) return callback(null, true);
              if(whitelist.indexOf(origin) === -1){
                  var msg = 'The CORS policy for this site does not ' +
                              'allow access from the specified Origin.';
                  return callback(new Error(msg), false);
              }
              return callback(null, true);
        },
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "credentials": true
      }
      return corsOptions;
    }

    public setOrigin(origin: string) {
        this.origin = origin;
    }

    public getOrigin() {
        return this.origin;
    }
}
