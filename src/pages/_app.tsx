import React from 'react'
import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import apolloClient from '../lib/apollo-client'
import SoundPlayer from '../components/SoundPlayer'

export default class MyDocument extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ApolloProvider client={apolloClient}>
        <SoundPlayer>
          <Component {...pageProps} />
        </SoundPlayer>
      </ApolloProvider>
    )
  }
}
