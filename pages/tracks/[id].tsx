import React from 'react'
import { NextPage } from 'next'

interface Props {
  id: number
}

const TracksShow: NextPage<Props> = ({ id }) => {
  return (
    <div>
      <h1>Hello world!</h1>
      <p>id: {id}</p>
      <footer>&copy; nothing</footer>
    </div>
  )
}

TracksShow.getInitialProps = async ({ query }): Promise<Props> => {
  return { id: Number(query.id) }
}

export default TracksShow
