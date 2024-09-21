import config from "@config/config.json";
import SeoMeta from "@layouts/partials/SeoMeta";
import { getTaxonomy } from "@lib/taxonomyParser";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
const { blog_folder } = config.settings;

// Fonction pour formater le nom de la catégorie
const formatCategoryName = (str) => {
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
    <a href="https://www.eco-vrac.fr/eco" target="_blank" rel="noopener noreferrer" style={{display: "inline-block", backgroundColor: "#8FC147", color: "white", padding: "10px 20px", textDecoration: "none", borderRadius: "5px", fontWeight: "bold"}}>
      Oui, je rejoins la communauté Éco Vrac !
    </a>
  </div>
);

const Categories = async () => {
  const categories = await getTaxonomy(`content/${blog_folder}`, "categories");
  return (
    <>
      <SeoMeta 
        title="Catégories - Explorez nos thèmes pour un mode de vie éco-responsable"
        description="Découvrez toutes les catégories de notre blog sur l'éco-responsabilité. Du bien-être naturel à l'alimentation durable, en passant par le jardinage écologique, trouvez l'inspiration pour chaque aspect d'une vie plus verte et consciente."
        noindex={true}
        nofollow={true}
      />
      <section className="section">
        <div className="container text-center">
          {markdownify("Explorez nos thèmes de jardinage", "h1", "h2 mb-16")}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {categories.map((category, i) => (
              <li key={`category-${i}`} className="mb-4">
                <Link
                  href={`/categories/${category}`}
                  className="block rounded-lg bg-theme-light px-4 py-2 text-dark transition hover:bg-primary hover:text-white"
                >
                  {formatCategoryName(category)}
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

export default Categories;