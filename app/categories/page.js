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
          
        </div>
      </section>
    </>
  );
};

export default Categories;