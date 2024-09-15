import shortcodes from "@layouts/shortcodes/all";
import "highlight.js/styles/atom-one-dark.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const MDXContent = ({ content }) => {
  const mdxOptions = {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  };

  // Définir un composant personnalisé pour les liens
  const customComponents = {
    ...shortcodes,
    a: (props) => <a {...props} className="text-green-500 hover:text-green-700" />,
  };

  return (
    <div className="mdx-content">
      {/* @ts-ignore */}
      <MDXRemote
        source={content}
        components={customComponents}
        options={{ mdxOptions }}
      />
    </div>
  );
};

export default MDXContent;