import * as Axios from 'axios';
const qs = require('querystring');

const axios = Axios.default;

export interface FacebookConfig {
    token:string,
    clientId: string,
    clientSecret: string,
    grantType: string,
    redirectUri: string,
    scope?:string
}

export class Fb {

    private static GRAPH_URL = "https://graph.facebook.com";
    private static DEBUG_TOKEN_PATH = "debug_token";
    private static APP_TOKEN_PATH = "oauth/access_token";
    private static version = "v3.1";

    private url = (path: string, params: Object) => {
        const baseUrl: string = [Fb.GRAPH_URL, path].join('/');
        return [baseUrl, qs.stringify(params)].join('?');
    }

    private inspectUrl = (params: Object) => {
        return this.url(Fb.DEBUG_TOKEN_PATH, params);
    }

    private appTokenUrl = (params: Object) => {
        return this.url(Fb.APP_TOKEN_PATH, params);
    }

    private inspectToken = async (config: FacebookConfig) => {

        const app_access_token = await this.getAppAccessToken(config);
        if (app_access_token === '') {
            return null;
        }

        const params = {
            input_token: config.token,
            access_token: app_access_token
        }

        const url = this.inspectUrl(params);
        const response = await axios.get(url);
        const fbresponse= response.data;

        return fbresponse;
    }

    private getAppAccessToken = async (config: FacebookConfig) => {
        const params = {
            client_id: config.clientId,
            client_secret: config.clientSecret,
            grant_type: config.grantType,
            redirect_uri: config.redirectUri
        }
        const url = this.appTokenUrl(params);

        const response = await axios.get(url);
        const token = response.data.access_token;

        return token;
    }

    private getProfile = async (token, userId) => {
        const url = this.url([Fb.version, userId].join('/'), {access_token: token})
        const response = await axios.get(url);
        return response;
    }

    public authenticate = async (config: FacebookConfig) => {
        return await this.inspectToken(config)
    }

    public profile = async (token, userId) => {
        return await this.getProfile(token, userId);
    }


}

const fb = new Fb();
export { fb };
