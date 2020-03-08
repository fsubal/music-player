import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import apolloClient from '../lib/apollo-client'

export default class MyDocument extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}
