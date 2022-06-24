import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  uid: string | undefined;
  name: string | undefined;
  password: string | undefined;
  email: string | undefined;
  role: string | undefined;
  image: string | undefined;
  active: boolean | undefined;
  delete: boolean | undefined;
  // email settings
  emailSettings?: {
    emailNotification: boolean;
    sendCopyToPersonalEmail: boolean;
    activityRelatesEmail: {
      youHaveNewNotifications: boolean;
      youAreSentADirectMessage: boolean;
      someoneAddsYouAsAsAConnection: boolean;
      uponNewOrder: boolean;
      newMembershipApproval: boolean;
      memberRegistration: boolean;
    };

  };

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.uid = user.uid;
    this.name = user.name || '';
    this.password = user.password || '';
    this.email = user.email || '';
    this.image = user.image || './assets/media/users/default.jpg';
    this.role = user.role || '';
    this.active = user.active || true;
    this.delete = user.delete || false;
  }
}
