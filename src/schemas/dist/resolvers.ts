import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  albumTitle?: Maybe<Scalars['String']>,
  albumCovers: Array<Attachment>,
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
  albums: Array<Album>,
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Album: ResolverTypeWrapper<Album>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Attachment: ResolverTypeWrapper<Attachment>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Thumbnails: ResolverTypeWrapper<Thumbnails>,
  Thumbnail: ResolverTypeWrapper<Thumbnail>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Side: Side,
  Track: ResolverTypeWrapper<Track>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Album: Album,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Attachment: Attachment,
  Int: Scalars['Int'],
  Thumbnails: Thumbnails,
  Thumbnail: Thumbnail,
  Boolean: Scalars['Boolean'],
  Side: Side,
  Track: Track,
};

export type AlbumResolvers<ContextType = any, ParentType extends ResolversParentTypes['Album'] = ResolversParentTypes['Album']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  albumTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  albumCovers?: Resolver<Array<ResolversTypes['Attachment']>, ParentType, ContextType>,
  tracks?: Resolver<Array<Maybe<ResolversTypes['ID']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AttachmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attachment'] = ResolversParentTypes['Attachment']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  thumbnails?: Resolver<Maybe<ResolversTypes['Thumbnails']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  albums?: Resolver<Array<ResolversTypes['Album']>, ParentType, ContextType>,
  album?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType, RequireFields<QueryAlbumArgs, 'id'>>,
};

export type ThumbnailResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thumbnail'] = ResolversParentTypes['Thumbnail']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ThumbnailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thumbnails'] = ResolversParentTypes['Thumbnails']> = {
  small?: Resolver<Maybe<ResolversTypes['Thumbnail']>, ParentType, ContextType>,
  large?: Resolver<Maybe<ResolversTypes['Thumbnail']>, ParentType, ContextType>,
  full?: Resolver<Maybe<ResolversTypes['Thumbnail']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TrackResolvers<ContextType = any, ParentType extends ResolversParentTypes['Track'] = ResolversParentTypes['Track']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  albums?: Resolver<Array<Maybe<ResolversTypes['ID']>>, ParentType, ContextType>,
  track?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  side?: Resolver<ResolversTypes['Side'], ParentType, ContextType>,
  mustHearTracks?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  specificInstrumentalCredit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  Album?: AlbumResolvers<ContextType>,
  Attachment?: AttachmentResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Thumbnail?: ThumbnailResolvers<ContextType>,
  Thumbnails?: ThumbnailsResolvers<ContextType>,
  Track?: TrackResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
