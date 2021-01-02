export type User = any;
export type TopSongs = any[];
export type Matches = {
  matchedMeUnapprovedRows: any[];
}
export type AppState = {
  matches: Matches;
  user: User;
  topSongs: TopSongs;
}
