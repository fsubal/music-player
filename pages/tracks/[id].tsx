import React from 'react'
import { NextPage } from 'next'

interface Props {
  id: number
}

const TracksShow: NextPage<Props> = ({ id }) => {
  return (
    <div>
      <p>id: {id}</p>
    </div>
  )
}

TracksShow.getInitialProps = async ({ query }): Promise<Props> => {
  return { id: Number(query.id) }
}

export default TracksShow
