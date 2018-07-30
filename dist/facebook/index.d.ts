import { FacebookData } from './response';
export interface FacebookConfig {
    clientId: string;
    clientSecret: string;
    grantType: string;
    redirectUri: string;
}
export declare class Fb {
    private static GRAPH_URL;
    private static DEBUG_TOKEN_PATH;
    private static APP_TOKEN_PATH;
    private url;
    private inspectUrl;
    private appTokenUrl;
    validate: (token: string, fbConfig: FacebookConfig) => Promise<FacebookData>;
    private inspectToken;
    private getAppAccessToken;
}
declare const fb: Fb;
export { fb, FacebookData };
