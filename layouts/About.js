import Social from "@components/Social";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import MDXContent from "./partials/MDXContent";

const About = ({ data }) => {
  const { frontmatter, content } = data;
  const { title, image, social } = frontmatter;

  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        {image && (
          <div className="img-cover mb-8" style={{ display: 'inline-block' }}>
            <Image
              src={image}
              width={600}
              height={515}
              alt={title}
              className="rounded-lg"
            />
          </div>
        )}
        {/* Titre masqué */}
        {/* <div style={{ textAlign: 'center' }}>
          {markdownify(title, "h1", "h2")}
        </div> */}
        <Social source={social} className="social-icons-simple my-8" />

        {/* Aligner le texte au centre de l'image */}
        <div className="content" style={{ display: 'inline-block', textAlign: 'left', verticalAlign: 'middle' }}>
          <MDXContent content={content} />
        </div>
      </div>
    </section>
  );
};

export default About;
