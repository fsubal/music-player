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
          <main>
            <Component {...pageProps} />
            <footer>
              Powered by:&nbsp;
              <a
                href="https://airtable.com/universe/expgUKB29QrEDV4AT/david-bowie-1969-1983-the-golden-years"
                target="_blank"
                rel="noopener noreferrer"
              >
                "David Bowie 1969-1983: The Golden Years" - Airtable Universe
              </a>
            </footer>
          </main>
        </SoundPlayer>
      </ApolloProvider>
    )
  }
}
