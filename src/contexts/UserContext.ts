import { createContext } from 'react';

interface UserProps {
  id: string;
  displayName: string;
}
export interface UserDataProps {
  token: undefined | string;
  user: undefined | UserProps;
}

export default createContext<{
  userData: UserDataProps;
  setUserData: React.Dispatch<React.SetStateAction<UserDataProps>> | null;
}>({
  userData: {
    token: undefined,
    user: undefined,
  },
  setUserData: null,
});
