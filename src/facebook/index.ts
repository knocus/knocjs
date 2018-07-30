import * as Axios from 'axios';
const qs = require('querystring');

const axios = Axios.default;

export interface FacebookConfig {
    clientId: string,
    clientSecret: string,
    grantType: string,
    redirectUri: string
}

export class Fb {

    private static GRAPH_URL = "https://graph.facebook.com";
    private static DEBUG_TOKEN_PATH = "debug_token";
    private static APP_TOKEN_PATH = "oauth/access_token";

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

    public validate = async (token: string, fbConfig: FacebookConfig)  => {
        return await this.inspectToken(token, fbConfig)
    }

    private inspectToken = async (token: string, fbConfig: FacebookConfig) => {

        const app_access_token = await this.getAppAccessToken(fbConfig);
        if (app_access_token === '') {
            return null;
        }

        const params = {
            input_token: token,
            access_token: app_access_token
        }

        const url = this.inspectUrl(params);
        const response = await axios.get(url);
        const fbresponse= response.data;

        return fbresponse;
    }

    private getAppAccessToken = async (fbConfig: FacebookConfig) => {
        const params = {
            client_id: fbConfig.clientId,
            client_secret: fbConfig.clientSecret,
            grant_type: fbConfig.grantType,
            redirect_uri: fbConfig.redirectUri
        }
        const url = this.appTokenUrl(params);

        const response = await axios.get(url);
        const token = response.data.access_token;

        return token;
    }
}

const fb = new Fb();
export { fb };