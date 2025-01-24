import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Social from "./components/Social";
import MDXContent from "./partials/MDXContent";
import SeoMeta from "./partials/SeoMeta";



const AuthorSingle = ({ frontmatter, content }) => {
  const { description, social, title, meta_title, image } = frontmatter;

  return (
    <>
      <SeoMeta
        title={meta_title || title}
        description={description ? description : content.slice(0, 120)}
      />
      <section className="section">
        <div className="container">
          <div className="md:px-24">
            {/* Image, titre et icônes sociales centrés */}
            <div className="mb-8 text-center">
              {image && (
                <div className="mb-4">
                  <Image
                    src={image}
                    className="mx-auto rounded-lg"
                    height={250}
                    width={250}
                    alt={title}
                  />
                </div>
              )}
              {markdownify(title, "h1", "h2 mb-4")}
              <Social source={social} className="social-icons-simple" />
            </div>
            {/* Contenu aligné à gauche */}
            <div className="content text-left">
              <MDXContent content={content} />
            </div>
            {/* CTA Newsletter */}
            
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthorSingle;