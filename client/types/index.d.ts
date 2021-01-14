import { Action } from 'redux';

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
export type Token = {
  access_token: string;
  refresh_token: string;
}

export type TopArtists = Artist[];
export type TopSongs = Song[];
export type MatchArtists = Artist[]
export type MatchSongs = Song[]

export type AppState = {
  matches: Matches;
  user: User;
  topSongs: TopSongs;
  topArtists: TopArtists;
  matchArtists: MatchArtists;
  matchSongs: MatchSongs;
  artistHighlight: Artist;
  songHighlight: Song;
  matchHighlight: Match;
}

export type ActionType = 'GET_TOP_SONGS' | 'GET_TOP_ARTISTS' | 'GOT_HISTORY' | 'GET_MATCH_ARTISTS' |
'GET_MATCHES' |
'GET_MATCH_SONGS' |
'SET_TOKEN' |
'GET_USER' |
'REMOVE_USER'

export type ArtistsAction = Action<ActionType> & {artists: Artist[]}

export type MatchesAction = Action<ActionType> & {
  matches: Matches;
}
export type SongsAction = Action<ActionType> & {
  songs: Song[]
}
export type TokenAction = Action<ActionType> & {token: Token}

export type UserAction = Action<ActionType> & {
  user: User
}
