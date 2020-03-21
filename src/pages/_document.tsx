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
          <link rel="stylesheet" href="/marx.min.css" />
        </Head>
        <body>
          <main>
            <Main />
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
          <NextScript />
        </body>
      </Html>
    )
  }
}
