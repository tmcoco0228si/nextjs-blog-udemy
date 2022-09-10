import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

//ビルトイン関数getStaticPaths
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    //fallback、取得したパス以外のURLが来た場合404
    fallback: false,
  };
}
//ビルトイン関数getStaticProps
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

/*
[]を使用することで、任意のURLを指定することができる。
*/
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1 className={utilStyles.headingX1}> {postData.title}</h1>
      <div className={utilStyles.lightText}> {postData.date}</div>
      {/*  サニタイズが必要  以下の記載を記載することでmarkdawnも使用できる*/}
      <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
    </Layout>
  );
}
