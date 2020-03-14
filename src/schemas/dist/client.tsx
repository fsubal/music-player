import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Album = {
  __typename?: 'Album'
  id?: Maybe<Scalars['ID']>
  albumTitle?: Maybe<Scalars['String']>
  albumCovers: Array<Attachment>
  tracks: Array<Maybe<Scalars['ID']>>
}

export type Attachment = {
  __typename?: 'Attachment'
  id: Scalars['String']
  url: Scalars['String']
  filename: Scalars['String']
  size: Scalars['Int']
  type: Scalars['String']
  thumbnails?: Maybe<Thumbnails>
}

export type Query = {
  __typename?: 'Query'
  albums: Array<Album>
  album?: Maybe<Album>
}

export type QueryAlbumArgs = {
  id: Scalars['ID']
}

export enum Side {
  A = 'A',
  B = 'B',
}

export type Thumbnail = {
  __typename?: 'Thumbnail'
  url: Scalars['String']
  width: Scalars['Int']
  height: Scalars['Int']
}

export type Thumbnails = {
  __typename?: 'Thumbnails'
  small?: Maybe<Thumbnail>
  large?: Maybe<Thumbnail>
  full?: Maybe<Thumbnail>
}

export type Track = {
  __typename?: 'Track'
  id?: Maybe<Scalars['ID']>
  name: Scalars['String']
  albums: Array<Maybe<Scalars['ID']>>
  track: Scalars['String']
  side: Side
  mustHearTracks?: Maybe<Scalars['Boolean']>
  specificInstrumentalCredit?: Maybe<Scalars['String']>
}

export type IndexQueryVariables = {}

export type IndexQuery = { __typename?: 'Query' } & {
  albums: Array<
    { __typename?: 'Album' } & Pick<Album, 'id' | 'albumTitle'> & {
        albumCovers: Array<{ __typename?: 'Attachment' } & Pick<Attachment, 'url'>>
      }
  >
}

export const IndexDocument = gql`
  query Index {
    albums {
      id
      albumTitle
      albumCovers {
        url
      }
    }
  }
`

/**
 * __useIndexQuery__
 *
 * To run a query within a React component, call `useIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexQuery({
 *   variables: {
 *   },
 * });
 */
export function useIndexQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IndexQuery, IndexQueryVariables>) {
  return ApolloReactHooks.useQuery<IndexQuery, IndexQueryVariables>(IndexDocument, baseOptions)
}
export function useIndexLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IndexQuery, IndexQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<IndexQuery, IndexQueryVariables>(IndexDocument, baseOptions)
}
export type IndexQueryHookResult = ReturnType<typeof useIndexQuery>
export type IndexLazyQueryHookResult = ReturnType<typeof useIndexLazyQuery>
export type IndexQueryResult = ApolloReactCommon.QueryResult<IndexQuery, IndexQueryVariables>
