import React from 'react'
import { NextPage } from 'next'

interface Props {
  userAgent: string
}

const RootIndex: NextPage<Props> = ({ userAgent }) => <h1>Hello world! - user agent: {userAgent}</h1>

RootIndex.getInitialProps = async ({ req }): Promise<Props> => {
  const userAgent = req ? req.headers['user-agent'] ?? '' : navigator.userAgent
  return { userAgent }
}

export default RootIndex
