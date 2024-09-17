import AuthorSingle from "@layouts/AuthorSingle";
import { getSinglePage } from "@lib/contentParser";
import SeoMeta from "@layouts/partials/SeoMeta";

// post single layout
const Article = async ({ params }) => {
  const { single } = params;
  const getAuthors = getSinglePage("content/authors");
  const author = getAuthors.filter((author) => author.slug == single);
  
  if (author.length === 0) {
    return <div>Auteur non trouvé</div>;
  }

  const { frontmatter, content } = author[0];

  // Préparer les métadonnées SEO
  const seoTitle = frontmatter.meta_title || frontmatter.title;
  const description = frontmatter.description || `Profil et articles de ${frontmatter.title}.`;

  return (
    <>
      <SeoMeta
        title={seoTitle}
        description={description}
        image={frontmatter.image}
        canonical={`/authors/${single}`}
      />
      <AuthorSingle frontmatter={frontmatter} content={content} />
    </>
  );
};

// get authors single slug
export const generateStaticParams = () => {
  const allSlug = getSinglePage("content/authors");
  const paths = allSlug.map((item) => ({
    single: item.slug,
  }));

  return paths;
};

export default Article;