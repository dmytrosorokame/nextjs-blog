import React from "react";
import Image from "next/image";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";

SyntaxHighlighter.registerLanguage("js", js);

const PostContent = ({ post }) => {
  const imagePath = `/images/posts/${post.image}`;

  const customRenderers = {
    img: (image) => {
      return (
        <Image
          src={`/images/posts/${image.src}`}
          alt={image.alt}
          width={600}
          height={300}
        />
      );
    },
    code: (code) => {
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={code.className.split("-")[1]}
          children={code.children[0]}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers} children={post.content} />
    </article>
  );
};

export default PostContent;
