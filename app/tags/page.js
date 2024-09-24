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

const NewsletterCTA = () => (
  <div style={{textAlign: "center", backgroundColor: "#f0f8f0", padding: "20px", margin: "30px 0", borderRadius: "8px"}}>
    <p style={{fontSize: "24px", color: "#333333", marginBottom: "15px"}}>
      <strong>Adoptez un mode de vie durable avec Éco Vrac !</strong>
    </p>
    <p style={{fontSize: "16px", color: "#555555", marginBottom: "20px"}}>
      Recevez chaque semaine nos meilleurs conseils pour consommer de manière plus responsable et respectueuse de l'environnement.
    </p>
    <a href="https://www.fastercook.fr/eco" target="_blank" rel="noopener noreferrer" style={{display: "inline-block", backgroundColor: "#8FC147", color: "white", padding: "10px 20px", textDecoration: "none", borderRadius: "5px", fontWeight: "bold"}}>
      Oui, je rejoins la communauté Éco Vrac !
    </a>
  </div>
);

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
          <NewsletterCTA />
        </div>
      </section>
    </>
  );
};

export default Tags;