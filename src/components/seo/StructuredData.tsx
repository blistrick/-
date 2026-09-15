import { clinic } from "@/data/clinic";
import { doctors } from "@/data/doctors";
import { faq } from "@/data/content";
import { services } from "@/data/services";

/**
 * JSON-LD for the clinic, its services, the team and the FAQ block.
 * Only facts published by the clinic are exposed here.
 */
export function StructuredData() {
  const dentist = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${clinic.site}/#clinic`,
    name: clinic.name,
    alternateName: clinic.legalName,
    description:
      "Современная стоматология в Алматы: лечение зубов под микроскопом, имплантация, ортодонтия, протезирование и эстетическая стоматология.",
    url: clinic.site,
    telephone: clinic.phone.display,
    email: clinic.email,
    image: `${clinic.site}/images/photos/smile.webp`,
    priceRange: "₸₸",
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: "Алматы",
      addressCountry: "KZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.address.lat,
      longitude: clinic.address.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: clinic.hours.opens,
        closes: "23:59",
      },
    ],
    sameAs: [clinic.instagram, clinic.telegram, clinic.address.map2gis],
    employee: doctors.map((doctor) => ({
      "@type": "Person",
      name: doctor.name,
      jobTitle: doctor.role,
      image: `${clinic.site}${doctor.photo}`,
    })),
    availableService: services.map((service) => ({
      "@type": "MedicalProcedure",
      name: service.title,
      description: service.short,
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentist) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
