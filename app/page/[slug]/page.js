import Pagination from "@components/Pagination";
import config from "@config/config.json";
import SeoMeta from "@layouts/partials/SeoMeta";
import { getSinglePage } from "@lib/contentParser";
import Posts from "@partials/Posts";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const { blog_folder } = config.settings;

const BlogPagination = async ({ params }) => {
  const currentPage = parseInt(params.slug) || 1;
  const { pagination } = config.settings;
  const posts = await getSinglePage(`content/${blog_folder}`);
  const authors = await getSinglePage("content/authors");

  const postsPerPage = Math.max(5, pagination);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Récupérer les données de la page d'accueil
  const homePageData = await getSinglePage("content");
  const homePage = homePageData.find(page => page.slug === "home");
  const { frontmatter, content } = homePage || {};
  const { title, image, imageAlt } = frontmatter || {};

  // Canonical URL
  const canonicalURL = "https://www.jardins-passion.fr/";

  // CTA de newsletter
  const NewsletterCTA = () => (
    <div style={{textAlign: "center", backgroundColor: "#f0f8f0", padding: "20px", margin: "30px 0", borderRadius: "8px"}}>
      <p style={{fontSize: "24px", color: "#333333", marginBottom: "15px"}}>
        <strong>Cultivez votre passion du jardinage !</strong>
      </p>
      <p style={{fontSize: "16px", color: "#555555", marginBottom: "20px"}}>
        Recevez nos meilleurs conseils de jardinage directement dans votre boîte mail.
      </p>
      <a href="https://www.fastercook.fr/letter-potager" target="_blank" rel="noopener noreferrer" style={{display: "inline-block", backgroundColor: "#099141", color: "white", padding: "10px 20px", textDecoration: "none", borderRadius: "5px", fontWeight: "bold"}}>
        S'inscrire à la newsletter
      </a>
    </div>
  );

  // Fonction pour modifier le contenu
  const modifyContent = (content) => {
    // Modifier les images dans le contenu
    content = content.replace(/<img(.+?)>/g, '<img$1 width="500" height="300" style="display: block; margin: auto; border-radius: 10px;" />');
    
    // Modifier les liens dans le contenu
    content = content.replace(/<a(.+?)>(.*?)<\/a>/g, '<div style="text-align: center;"><a$1 style="color: green; font-weight: bold;">$2</a></div>');
    
    return content;
  };

  return (
    <>
      <SeoMeta 
        title={currentPage === 1 ? title : `Page ${currentPage}`} 
        canonical={canonicalURL}
      />
      <section className="section">
        <div className="container">
          {currentPage === 1 && (
            <div className="text-left mb-16">
              {title && markdownify(title, "h1", "mb-8")}
              {image && (
                <div className="mb-8">
                  <div className="flex justify-center mb-8">
                    <Image
                      src={image}
                      alt={imageAlt}
                      width={800}
                      height={300}
                      layout="intrinsic"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}
              <div className="content" style={{textAlign: "left"}} dangerouslySetInnerHTML={{ __html: modifyContent(content) }} />
            </div>
          )}
          <NewsletterCTA />
          <Posts className="mb-16" posts={currentPosts} authors={authors} />
          <Pagination totalPages={totalPages} currentPage={currentPage} />
          <NewsletterCTA />
        </div>
      </section>
    </>
  );
};

export default BlogPagination;

export async function generateStaticParams() {
  const posts = await getSinglePage(`content/${blog_folder}`);
  const { pagination } = config.settings;
  const postsPerPage = Math.max(5, pagination);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  let paths = [];
  for (let i = 1; i <= totalPages; i++) {
    paths.push({ slug: i.toString() });
  }
  
  return paths;
}