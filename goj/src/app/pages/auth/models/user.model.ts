import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
  id: string = '';
  name: string = '';
  password: string = '';
  currentPassword:string = '';
  phone: string = '';
  email: string = '';
  role: string = '';
  image: string = '';
  country: string = '';
  active: boolean = false;
  delete: boolean = false;
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
    this.id = user.id;
    this.name = user.name || '';
    this.password = user.password || '';
    this.currentPassword = user.currentPassword || '';
    this.phone = user.phone || '';
    this.email = user.email || '';
    this.image = user.image || '';
    this.country = user.country || '';
    this.role = user.role || '';
    this.active = user.active || true;
    this.delete = user.delete || false;
  }
}
