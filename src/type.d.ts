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

export type ProfileType = {
  id: number;
  username: string;
  about?: string;
  avatarImage: string;
  age: number;
};

export type UserType = {
  id: number;
  email: string;
  username:string,
  profile: ProfileType;
  profileId?: number;
};