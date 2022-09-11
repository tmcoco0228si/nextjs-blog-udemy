import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");



//mdファイルのデータを取り出す。
export function getPostsData() {
  // const fetchData = await fetch("endpoint");
  //postsディレクトリのファイル名をオブジェクトとしてとりだす
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    //ファイルの拡張子を取り除く
    const id = fileName.replace(/\.md$/, ""); //ファイル名(id)
    //マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    //ファイルの中身を見ることができる
    const fileContents = fs.readFileSync(fullPath, "utf8");
    //metaデータを読み込む関数
    const matterResult = matter(fileContents);
    //idとデータを返す
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;
}

//getStaticPathのreturnで使用するpathを取得する
export function getAllPostIds() {
  //postsフォルダのmarkdown拡張子付きのファイル名が変数に格納される
  const fileNames = fs.readdirSync(postsDirectory);
  //ファイルの名前を取り出す
  return fileNames.map((fileName) => {
    return {
      params: {
        //idはファイル名に相当
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });

  /*
  [
    {
      params: {
        id: "ssg-ssr"
      }
    }
  ]
  */
}

//idに基づいてブログ投稿データを返す関数
export async function getPostData(id) {
  //フルパス取得
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContent);
  //mdの文字列取得(html)
  //htmlに変換
  const blogContent = await remark().use(html).process(matterResult.content);

  const blogContentHTML = blogContent.toString();
  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  };
}
