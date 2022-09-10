import Head from "next/head";
import Link from "next/link";

export default function firstPost() {
  return (
    <div>
      <Head>
        <title>最初の投稿</title>
      </Head>
      <h1>最初の投稿です</h1>
      
        <Link href="/"><h1>ホームへ戻る</h1></Link>
    </div>
  );
}
