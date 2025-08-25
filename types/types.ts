export type Reading = {
  averageAccuracy: number;
  averageDuration: number;
  count: number;
};
export interface User {
  id: number;
  name: string;
  avatar: string;
  lessons: number;
  streak: number;
  points: number;
  language?: string;
  isCurrentUser?: boolean;
}

export interface WeeklyChampion {
  id: number;
  name: string;
  avatar: string;
  points: number;
  language: string;
  position: number;
}

export interface Statistics {
  activelearners: number;
  languagesAvailable: number;
}
export type ProfileType = {
  id: number;
  name: string;
  about?: string;
  avatarImage: string;
  age: number;
};

export type UserType = {
  id: number;
  email: string;
  profile: ProfileType;
};
