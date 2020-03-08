export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Album = {
   __typename?: 'Album',
  albumTitle?: Maybe<Scalars['String']>,
  albumCovers: Array<Maybe<Attachment>>,
  tracks: Array<Maybe<Scalars['ID']>>,
};

export type Attachment = {
   __typename?: 'Attachment',
  id: Scalars['String'],
  url: Scalars['String'],
  filename: Scalars['String'],
  size: Scalars['Int'],
  type: Scalars['String'],
  thumbnails?: Maybe<Thumbnails>,
};

export type Query = {
   __typename?: 'Query',
  albums: Array<Maybe<Album>>,
};

export enum Side {
  A = 'A',
  B = 'B'
}

export type Thumbnail = {
   __typename?: 'Thumbnail',
  url: Scalars['String'],
  width: Scalars['Int'],
  height: Scalars['Int'],
};

export type Thumbnails = {
   __typename?: 'Thumbnails',
  small?: Maybe<Thumbnail>,
  large?: Maybe<Thumbnail>,
  full?: Maybe<Thumbnail>,
};

export type Track = {
   __typename?: 'Track',
  name: Scalars['String'],
  albums: Array<Maybe<Scalars['ID']>>,
  track: Scalars['String'],
  side: Side,
  mustHearTracks?: Maybe<Scalars['Boolean']>,
  specificInstrumentalCredit?: Maybe<Scalars['String']>,
};
