import Head from "next/head";
import React from "react";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

const AllPostsPage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>All my posts!</title>
        <meta name="description" content="my all posts" />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
};

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};

export default AllPostsPage;
