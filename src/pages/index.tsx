import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {
  userAgent: string
}

const RootIndex: NextPage<Props> = ({ userAgent }) => (
  <div>
    <p>user agent: {userAgent}</p>

    <div>
      <Link href="/tracks/[id]" as="/tracks/1">
        <a>id: 1</a>
      </Link>
    </div>
  </div>
)

RootIndex.getInitialProps = async ({ req }): Promise<Props> => {
  const userAgent = req ? req.headers['user-agent'] ?? '' : navigator.userAgent
  return { userAgent }
}

export default RootIndex
