import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://unpkg.com/marx-css/css/marx.min.css" />
        </Head>
        <body>
          <main>
            <Main />
          </main>
          <NextScript />
        </body>
      </Html>
    )
  }
}
