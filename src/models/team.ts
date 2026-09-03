export interface Team {
  id?: number;
  name: string;
  tag: string
  players: Player[];
  teamPic?: string;
  church?: ChurchInfo;
}

export interface Player {
  id?: number;
  nickname: string;
  profilePic?: string;
}

export interface ChurchInfo {
  name: string;
  picture?: string;
}

export const createEmptyTeam = (): Team => ({
  name: "",
  tag: "",
  teamPic: "",
  players: Array.from({ length: 5 }, (_) => ({
    nickname: "",
  })),
  church: {
    name: "",
  },
});
