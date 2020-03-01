import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {
  userAgent: string
}

const RootIndex: NextPage<Props> = ({ userAgent }) => (
  <div>
    <h1>Hello world!</h1>
    <p>user agent: {userAgent}</p>

    <div>
      <Link href="/tracks/[id]" as="/tracks/1">
        id: 1
      </Link>
    </div>

    <footer>&copy; nothing</footer>
  </div>
)

RootIndex.getInitialProps = async ({ req }): Promise<Props> => {
  const userAgent = req ? req.headers['user-agent'] ?? '' : navigator.userAgent
  return { userAgent }
}

export default RootIndex
