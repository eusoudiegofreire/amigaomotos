import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { SERVICES } from "@/lib/services";
import "./globals.css";

// Fonte de display: condensada, industrial, caixa alta — usada nos títulos do hero
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

// Fonte de corpo: limpa, legível em labels técnicos e textos longos
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// TODO: atualizar para o domínio definitivo assim que estiver configurado
const SITE_URL = "https://amigaomotos.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Amigão Motos | Oficina Especializada em Motos Esportivas e Naked — Ariquemes/RO",
    template: "%s | Amigão Motos",
  },
  description:
    "Oficina especializada em motos esportivas e naked em Ariquemes, RO. Manutenção, preparação e performance para quem vive de duas rodas.",
  keywords: [
    "oficina de motos Ariquemes",
    "moto esportiva Ariquemes",
    "moto naked Ariquemes",
    "manutenção de moto Ariquemes",
    "oficina de moto RO",
    "Amigão Motos",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Amigão Motos | Oficina Especializada em Motos Esportivas e Naked",
    description:
      "Oficina especializada em motos esportivas e naked em Ariquemes, RO. Manutenção, preparação e performance para quem vive de duas rodas.",
    url: SITE_URL,
    siteName: "Amigão Motos",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amigão Motos",
    description: "Oficina especializada em motos esportivas e naked em Ariquemes, RO.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Dados estruturados (AutoRepair) para SEO local
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${SITE_URL}/#organization`,
  name: "Amigão Motos",
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: "+55-69-0000-0000", // TODO: telefone real
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Jamari, 3832 - Setor 2",
    addressLocality: "Ariquemes",
    addressRegion: "RO",
    addressCountry: "BR",
  },
  // TODO: coordenadas ainda são o centroide de Ariquemes — geocodificar o endereço
  // exato (Av. Jamari, 3832 - Setor 2) e substituir por lat/long precisos
  geo: {
    "@type": "GeoCoordinates",
    latitude: -9.9133,
    longitude: -63.0406,
  },
  // gerado a partir de src/lib/services.ts — adicionar um serviço lá já reflete aqui
  makesOffer: SERVICES.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.description,
    },
  })),
  // TODO: adicionar openingHoursSpecification quando o horário real for confirmado
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink text-paper antialiased">{children}</body>
    </html>
  );
}
