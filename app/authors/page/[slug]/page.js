import Pagination from "@components/Pagination";
import config from "@config/config.json";
import SeoMeta from "@layouts/partials/SeoMeta";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { markdownify } from "@lib/utils/textConverter";
import Authors from "@partials/Authors";

// Function to count words in a string
const countWords = (str) => {
  return str.trim().split(/\s+/).length;
};

// blog pagination
const AuthorPagination = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const authors = getSinglePage("content/authors");
  const authorIndex = await getListPage("content/authors/_index.md");

  const indexOfLastAuthor = currentPage * pagination;
  const indexOfFirstAuthor = indexOfLastAuthor - pagination;
  const totalPages = Math.ceil(authors.length / pagination);
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);
  const { frontmatter, content } = authorIndex;
  const { title, meta_title, description } = frontmatter;

  // Generate SEO title
  const seoTitle = meta_title 
    ? meta_title 
    : `${title} - Page ${currentPage} sur ${totalPages}`;

  // Generate meta description
  const metaDescription = description 
    ? description 
    : `Liste des auteurs - Page ${currentPage} sur ${totalPages}. ${content.slice(0, 150)}...`;
  const wordCount = countWords(metaDescription);

  // Generate canonical URL
  const baseUrl = config.site.base_url;
  const canonicalUrl = currentPage === 1 
    ? `${baseUrl}/authors/` 
    : `${baseUrl}/authors/page/${currentPage}/`;

  return (
    <>
      <SeoMeta 
        title={seoTitle}
        meta_title={meta_title}
        description={`${metaDescription} (${wordCount} mots)`}
        canonical={canonicalUrl}
      />
      <section className="section">
        <div className="container text-center">
          {markdownify(title, "h1", "h2 mb-16")}
          <Authors authors={currentAuthors} />
          <Pagination
            section="authors"
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </>
  );
};

export default AuthorPagination;

// get authors pagination slug
export const generateStaticParams = () => {
  const getAllSlug = getSinglePage("content/authors");
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      slug: (i + 1).toString(),
    });
  }

  return paths;
};