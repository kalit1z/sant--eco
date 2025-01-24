import config from "@config/config.json";
import SeoMeta from "@layouts/partials/SeoMeta";
import { getTaxonomy } from "@lib/taxonomyParser";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
const { blog_folder } = config.settings;

// Fonction pour formater le nom du tag
const formatTagName = (str) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};



const Tags = async () => {
  const tags = await getTaxonomy(`content/${blog_folder}`, "tags");

  return (
    <>
      <SeoMeta 
        title={"Tags - Explorez nos sujets sur le bien-être naturel"}
        description="Découvrez tous les sujets abordés dans notre blog dédié au bien-être naturel et à l'éco-responsabilité. Des astuces quotidiennes aux pratiques plus avancées, trouvez l'inspiration pour une vie équilibrée et respectueuse de l'environnement."
        noindex={true}
        nofollow={true}
      />
      <section className="section">
        <div className="container text-center">
          {markdownify("Explorez nos sujets de bien-être naturel", "h1", "h2 mb-16")}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {tags.map((tag, i) => (
              <li key={`tag-${i}`} className="mb-4">
                <Link
                  href={`/tags/${tag}`}
                  className="block rounded-lg bg-theme-light px-4 py-2 text-dark transition hover:bg-primary hover:text-white"
                >
                  {formatTagName(tag)}
                </Link>
              </li>
            ))}
          </ul>
          
        </div>
      </section>
    </>
  );
};

export default Tags;