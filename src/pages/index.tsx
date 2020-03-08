import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

interface Props {
  rows: any
}

const RootIndex: NextPage<Props> = ({ rows }) => (
  <div>
    <pre>dump: {JSON.stringify(rows)}</pre>

    <div>
      <Link href="/tracks/[id]" as="/tracks/1">
        <a>id: 1</a>
      </Link>
    </div>
  </div>
)

RootIndex.getInitialProps = async (): Promise<Props> => {
  const rows = await fetch('http://localhost:3000/api/test').then(r => r.json())

  return { rows }
}

export default RootIndex
