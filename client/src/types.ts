export interface User {
  username: string;
  passwordHash: string;
}

export interface Page {
  id: string;
  pageTitle: string;
}

export type SetStateFunction = React.Dispatch<React.SetStateAction<User | null>>;

export type VoidFunction = () => void;
