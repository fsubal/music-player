import React from 'react'
import { NextPage } from 'next'

interface Props {
  userAgent: string
}

const RootIndex: NextPage<Props> = ({ userAgent }) => (
  <main>
    <h1>Hello world!</h1>
    <p>user agent: {userAgent}</p>
    <footer>&copy; nothing</footer>
  </main>
)

RootIndex.getInitialProps = async ({ req }): Promise<Props> => {
  const userAgent = req ? req.headers['user-agent'] ?? '' : navigator.userAgent
  return { userAgent }
}

export default RootIndex
