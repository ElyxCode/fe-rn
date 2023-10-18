import { atom } from 'recoil';

// import { persistAtom, persistSecurityAtom } from './effects';
import { UserClass } from '../model/User';

const StoreKeys = {
    Token: 'token',
    UserProfile: 'userProfile',
};

export const tokenState = atom<string | undefined>({
    key: StoreKeys.Token,
    default: '',
    // effects: [persistSecurityAtom()],
});
  
export const userProfileState = atom<UserClass | undefined>({
    key: StoreKeys.UserProfile,
    // default: {},
});