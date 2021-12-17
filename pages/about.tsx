import React, { useState, useEffect } from "react";
import Header from "@/components/common/header";
// import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { MainLayout } from "@/components/layout";

// dynamic components sẽ giúp component đó chỉ render ở client và ko render trên server
// const Header = dynamic(() => import('@/components/common/header'), { ssr: false });

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const router = useRouter();
  const [postList, setpostList] = useState([]);
  // console.log("router.query", router.query);
  const page = router.query?.page;
  function handelNextClick() {
    router.push(
      {
        pathname: "/about",
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
    );
  }
  // shallow : false thì server sẽ rerender
  // shallow : true thì client sẽ rerender mà server ko rereder
  useEffect(() => {
    if (!page) return;
    (async () => {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
      const data = await response.json();
      setpostList(data.data);
    })();
  }, [page]);

  return (
    <>
      <h1>About Page</h1>
      <Header />
      <ul className="post-list">
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={handelNextClick}>Next page</button>
    </>
  );
}
AboutPage.Layout = MainLayout;

export async function getStaticProps() {
  // console.log("get static props");
  return {
    props: {},
  };
}
