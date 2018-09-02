export interface FacebookConfig {
    token: string;
    clientId: string;
    clientSecret: string;
    grantType: string;
    redirectUri: string;
    scope?: string;
}
export declare class Fb {
    private static GRAPH_URL;
    private static DEBUG_TOKEN_PATH;
    private static APP_TOKEN_PATH;
    private url;
    private inspectUrl;
    private appTokenUrl;
    authenticate: (config: FacebookConfig) => Promise<any>;
    private inspectToken;
    private getAppAccessToken;
}
declare const fb: Fb;
export { fb };
