import Image from "next/image";
export const metadata = {
  title: "Elventex Technology — Web & Software Studio",
  description:
    "Elventex Technology builds websites, handles SEO, and provides web design and development services in Ghaziabad, Delhi NCR.",
};

const SERVICES = [
  {
    title: "Website Designing",
    description:
      "Custom website design built around your business goals, from first concept to finished layout.",
  },
  {
    title: "Website Health Check",
    description:
      "A full review of your existing site's speed, SEO, security, and usability, with a clear report of what to fix.",
  },
  {
    title: "SEO Optimization",
    description:
      "Technical and content SEO work to improve your visibility and ranking on search engines like Google.",
  },
  {
    title: "Graphic Designing",
    description:
      "Visual design for branding, marketing materials, social media, and anything your business needs to look sharp.",
  },
  {
    title: "Logo Designing",
    description:
      "A distinct, memorable logo that represents your business and works across print, web, and social media.",
  },
  {
    title: "Website Updating",
    description:
      "Ongoing updates, content changes, and improvements to keep your existing site current and running smoothly.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Delivered exactly what we needed, ahead of schedule.",
    author: "R. Sharma",
  },
  {
    quote: "Clean work, clear communication, no surprises along the way.",
    author: "A. Verma",
  },
  {
    quote: "Felt like working with an in-house team, not an outside vendor.",
    author: "N. Kapoor",
  },
];

export default function Home() {
  return (
    <main>
      <section>
        <Image
           src="/logo.png"
           alt="Elventex Technology Logo"
           width={80}
           height={80}
           style={{ width: "auto", height: "auto", maxWidth: "80px" }}
        />
        <h1>Elventex Technology</h1>
        <p>We build the digital work your business deserves.</p>
        <p>
          From first sketch to shipped product — websites, SEO, and the
          systems that bring people to your door.
        </p>
        <a href="/login">Get started</a>
      </section>

      <section>
        <h2>Our Services</h2>
        <ul>
          {SERVICES.map((service) => (
            <li key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>What Clients Say</h2>
        <ul>
          {TESTIMONIALS.map((t) => (
            <li key={t.author}>
              <p>&quot;{t.quote}&quot;</p>
              <p>— {t.author}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>About Elventex Technology</h2>
        <p>
          Elventex Technology is a web and software services company based in
          Ghaziabad, Delhi NCR. We work with businesses to design, build, and
          maintain the digital presence they need to grow — from a single
          landing page to a full custom platform.
        </p>
      </section>

      <section>
        <h2>Get in Touch</h2>
        <p>Phone: 7985717242</p>
        <p>Email: hello@elventex.tech</p>
        <p>Location: Ghaziabad, Delhi NCR</p>
        <a href="/login">Log in or sign up</a>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Elventex Technology. All rights reserved.</p>
      </footer>
    </main>
  );
}