export type User = {
  createdAt: string;
  display_name: string;
  email: string;
  href: string;
  id: number;
  images: string[];
  spotifyId: string;
  updatedAt: string;
};
export type Match = {
  approved: boolean;
  createdAt: string;
  matchedUserId: number;
  updatedAt: string;
  userId: number;
}
export type MyMatch = User & {
  match: Match;
}
export type MatchedMe = User & {
  matchedUser: MyMatch[];
}
export type Song = {
  album: string;
  artists: string;
  createdAt: string;
  id: number;
  images: string[];
  name: string;
  popularity: number;
  spotifyId: string;
  updatedAt: string;
}
export type Artist = {
  createdAt: string;
  genres: string[];
  id: number;
  images: string[];
  name: string;
  popularity: number;
  spotifyId: string;
  updatedAt: string;
}
export type History = any[];

export type Matches = {
  approvedMatches: (MyMatch | MatchedMe)[];
  approvedMatchesRows: (MyMatch | MatchedMe)[][];
  matchedMeUnapproved: MatchedMe[];
  matchedMeUnapprovedRows: MatchedMe[][];
  myMatchesUnapprovedRows: MyMatch[];
  numberMatches: number;
}
export type SongHighlight =  Song;
export type Token = any;
export type TopArtists = Artist[];
export type TopSongs = Song[];

export type AppState = {
  matches: Matches;
  user: User;
  topSongs: TopSongs;
  topArtists: TopArtists;
}
