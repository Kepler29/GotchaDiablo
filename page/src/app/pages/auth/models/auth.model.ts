import {UserModel} from "./user.model";

export class AuthModel {
  authToken: string | undefined;

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
  }
}


