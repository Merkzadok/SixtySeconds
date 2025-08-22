// types.d.ts

// Generic JSON module typing
declare module "*.json" {
  const value: Record<string, unknown>;
  export default value;
}

// Specifically for Lottie animations
declare module "/Meditating-Brain.json" {
  const value: Record<string, unknown>;
  export default value;
}

declare module "/Rank.json" {
  const value: Record<string, unknown>;
  export default value;
}

declare module "/game-app.json" {
  const value: Record<string, unknown>;
  export default value;
}

// User type
export type UserType = {
  avatarImage: string;
  name: string;
  id: number;
  email: string;
  phone: string;
  birthDate: Date;
  location: string;
  username: string;
  password: string;
  profile: {
    id: number;
    name: string;
    about: string;
  };
  profileId: number;
};
