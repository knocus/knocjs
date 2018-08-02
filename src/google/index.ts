import {OAuth2Client} from 'google-auth-library';

export interface GoogleConfig {
  clientId:string,
  idToken:any
}

export class Google {
  public authenticate = async (config: GoogleConfig) => {
    const client = new OAuth2Client(config.clientId);
    try {
      const ticket = await client.verifyIdToken({
        idToken: config.idToken,
        audience: config.clientId,
      });
      return ticket.getPayload();
    } catch (err) {
      throw err;
    }
  }
}
