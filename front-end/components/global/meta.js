import Head from 'next/head'

export default function Meta({ pageName, description }) {

    return (
        <Head>
          <title>{pageName}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}