export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mrizalbasri.vercel.app';
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "M. Rizal Basri",
    "alternateName": "Rizal Basri",
    "jobTitle": "Full Stack Developer",
    "description": "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies",
    "url": baseUrl,
    "image": `${baseUrl}/logo.png`,
    "sameAs": [
      "https://github.com/mrizalbasri",
      "https://www.linkedin.com/in/m-rizal-basri/",
      "mailto:rizalbasri800@gmail.com"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pekanbaru",
      "addressRegion": "Riau",
      "addressCountry": "Indonesia"
    },
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "JavaScript",
      "Web Development",
      "Mobile Development",
      "UI/UX Design",
      "Full Stack Development"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
