import config from "@config/config.json";
import SeoMeta from "@layouts/partials/SeoMeta";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { slugify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
const { blog_folder } = config.settings;

// Mapping pour les accents et les corrections orthographiques
const tagMapping = {
  "bien-etre": "bien-être",
  "biodiversite": "biodiversité",
  "legumes": "légumes",
  "sante": "santé",
  "zero dechet": "zéro déchet",
  // Ajoutez d'autres mots selon vos besoins
};

// Fonction pour formater le nom du tag
const formatTagName = (tag) => {
  return tag
    .split('-')
    .map(word => tagMapping[word] || word)
    .map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
    .join(' ');
};



// tag page
const Tag = ({ params }) => {
  const tag = formatTagName(params.tag);
  const posts = getSinglePage(`content/${blog_folder}`);
  const filterPosts = posts.filter((post) =>
    post.frontmatter.tags.find((t) => slugify(t).includes(params.tag))
  );
  const authors = getSinglePage("content/authors");

  return (
    <>
      <SeoMeta 
        title={`Tag: ${tag}`}
        noindex={true}
        nofollow={true}
      />
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Publications filtrées sous le tag<br />
            <span className="text-primary">'{tag}'</span>
          </h1>
          <Posts posts={filterPosts} authors={authors} />
          
        </div>
      </div>
    </>
  );
};

export default Tag;

// tag page routes
export const generateStaticParams = () => {
  const allTags = getTaxonomy(`content/${blog_folder}`, "tags");

  const paths = allTags.map((tag) => ({
    tag: tag,
  }));

  return paths;
};