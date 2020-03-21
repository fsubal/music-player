import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
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
  id?: Maybe<Scalars['ID']>,
  albumTitle: Scalars['String'],
  albumCovers: Array<Attachment>,
  year: Scalars['Int'],
  shouldListenAlbum: Scalars['String'],
  tracks?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export type Artist = {
   __typename?: 'Artist',
  name: Scalars['String'],
  albums: Array<Album>,
};

export type Attachment = {
   __typename?: 'Attachment',
  id?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  filename?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Int']>,
  type?: Maybe<Scalars['String']>,
  thumbnails?: Maybe<Thumbnails>,
};

export type Query = {
   __typename?: 'Query',
  artist?: Maybe<Artist>,
  album?: Maybe<Album>,
};


export type QueryAlbumArgs = {
  id: Scalars['ID']
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
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  albums: Array<Maybe<Scalars['ID']>>,
  track: Scalars['String'],
  side: Side,
  mustHearTracks?: Maybe<Scalars['Boolean']>,
  specificInstrumentalCredit?: Maybe<Scalars['String']>,
};

export type RootIndexQueryVariables = {};


export type RootIndexQuery = (
  { __typename?: 'Query' }
  & { artist: Maybe<(
    { __typename?: 'Artist' }
    & Pick<Artist, 'name'>
    & { albums: Array<(
      { __typename?: 'Album' }
      & Pick<Album, 'id' | 'albumTitle' | 'year' | 'shouldListenAlbum'>
      & { albumCovers: Array<(
        { __typename?: 'Attachment' }
        & Pick<Attachment, 'url'>
      )> }
    )> }
  )> }
);


export const RootIndexDocument = gql`
    query RootIndex {
  artist {
    name
    albums {
      id
      albumTitle
      year
      shouldListenAlbum
      albumCovers {
        url
      }
    }
  }
}
    `;

/**
 * __useRootIndexQuery__
 *
 * To run a query within a React component, call `useRootIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useRootIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRootIndexQuery({
 *   variables: {
 *   },
 * });
 */
export function useRootIndexQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RootIndexQuery, RootIndexQueryVariables>) {
        return ApolloReactHooks.useQuery<RootIndexQuery, RootIndexQueryVariables>(RootIndexDocument, baseOptions);
      }
export function useRootIndexLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RootIndexQuery, RootIndexQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RootIndexQuery, RootIndexQueryVariables>(RootIndexDocument, baseOptions);
        }
export type RootIndexQueryHookResult = ReturnType<typeof useRootIndexQuery>;
export type RootIndexLazyQueryHookResult = ReturnType<typeof useRootIndexLazyQuery>;
export type RootIndexQueryResult = ApolloReactCommon.QueryResult<RootIndexQuery, RootIndexQueryVariables>;