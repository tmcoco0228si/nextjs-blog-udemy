import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const siteTitle = "next.js blog";

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link
          rel="i
        con"
          href="/favicon.ico"
        />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.png"
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
            />
            <h1 className={styles.container}>{siteTitle}</h1>
          </>
        ) : (
          <>
            <img
              src="/images/profile.png"
              className={`${utilStyles.borderCircle}`}
            />
            <h1 className={styles.container}>{siteTitle}</h1>
          </>
        )}
      </header>
      <main>
        <h1 className={utilStyles.heading2Xl}></h1>
        <h2>{children}</h2>
      </main>
      {!home && (
        <footer>
          <Link href="/">homeへ戻る</Link>
        </footer>
      )}
    </div>
  );
}

export default Layout;
