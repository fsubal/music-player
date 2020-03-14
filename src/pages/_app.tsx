import React from 'react'
import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import apolloClient from '../lib/apollo-client'

export default class MyDocument extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}
