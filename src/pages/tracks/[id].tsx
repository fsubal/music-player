import React from 'react'
import { NextPage } from 'next'

interface Props {
  id: string
}

const TracksShow: NextPage<Props> = ({ id }) => {
  return (
    <div>
      <p>id: {id}</p>
    </div>
  )
}

TracksShow.getInitialProps = async ({ query }): Promise<Props> => {
  return { id: String(query.id) }
}

export default TracksShow
