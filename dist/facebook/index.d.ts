import * as Axios from 'axios';
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
    private static version;
    private url;
    private inspectUrl;
    private appTokenUrl;
    private inspectToken;
    private getAppAccessToken;
    private getProfile;
    private getPicture;
    authenticate: (config: FacebookConfig) => Promise<any>;
    profile: (token: any, userId: any) => Promise<Axios.AxiosResponse<any>>;
    picture: (token: any, userId: any, height: any, redirect?: any) => Promise<any>;
}
declare const fb: Fb;
export { fb };
