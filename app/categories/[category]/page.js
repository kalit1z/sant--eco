import config from "@config/config.json";
import SeoMeta from "@layouts/partials/SeoMeta";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { slugify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const { blog_folder } = config.settings;

const categoryMapping = {
  "bien-etre": "bien-être",
  "Bien-etre": "Bien-être",
  "biodiversite": "biodiversité",
};

const formatCategoryName = (category) => {
  return category
    .split('-')
    .map(word => categoryMapping[word] || word)
    .map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
    .join(' ');
};

const NewsletterCTA = () => (
  <div style={{textAlign: "center", backgroundColor: "#f0f8f0", padding: "20px", margin: "30px 0", borderRadius: "8px"}}>
    <p style={{fontSize: "24px", color: "#333333", marginBottom: "15px"}}>
      <strong>Adoptez un mode de vie durable avec Éco Vrac !</strong>
    </p>
    <p style={{fontSize: "16px", color: "#555555", marginBottom: "20px"}}>
      Recevez chaque semaine nos meilleurs conseils pour consommer de manière plus responsable et respectueuse de l'environnement.
    </p>
    <a href="https://www.eco-vrac.fr/eco" target="_blank" rel="noopener noreferrer" style={{display: "inline-block", backgroundColor: "#8FC147", color: "white", padding: "10px 20px", textDecoration: "none", borderRadius: "5px", fontWeight: "bold"}}>
      Oui, je rejoins la communauté Éco Vrac !
    </a>
  </div>
);

const Category = ({ params }) => {
  const category = formatCategoryName(params.category);
  
  const categoryFilePath = path.join(process.cwd(), 'content', 'categories', `${params.category}.md`);
  let categoryContent = '';
  let categoryData = {
    title: category,
    description: `Articles dans la catégorie ${category}`,
    image: '',
    noindex: false,
    nofollow: false
  };
  
  if (fs.existsSync(categoryFilePath)) {
    const fileContents = fs.readFileSync(categoryFilePath, 'utf8');
    const { data, content } = matter(fileContents);
    categoryContent = marked(content);
    categoryData = { ...categoryData, ...data };
  }

  const posts = getSinglePage(`content/${blog_folder}`);
  const filterPosts = posts.filter((post) =>
    post.frontmatter.categories.find((cat) =>
      slugify(cat).includes(params.category)
    )
  );
  const authors = getSinglePage("content/authors");

  return (
    <>
      <SeoMeta
        title={categoryData.title}
        description={categoryData.description}
        image={categoryData.image}
        noindex={categoryData.noindex}
        nofollow={categoryData.nofollow}
      />
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            {categoryData.title}
          </h1>
          {categoryContent && <div dangerouslySetInnerHTML={{ __html: categoryContent }} />}
          <Posts posts={filterPosts} authors={authors} />
          <NewsletterCTA />
        </div>
      </div>
    </>
  );
};

export default Category;

export async function generateStaticParams() {
  const allCategories = getTaxonomy(`content/${blog_folder}`, "categories");
  
  const paths = allCategories.map((category) => ({
    category: category,
  }));

  return paths;
}