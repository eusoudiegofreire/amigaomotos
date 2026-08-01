/**
 * Fonte única de informações de contato — reaproveitada em Nav, Contato,
 * Localizacao, Footer e no JSON-LD de layout.tsx. Edite aqui, propaga pra todo
 * o site.
 */
export const CONTACT = {
  // TODO: número real em formato internacional só com dígitos, ex. "5569900000000"
  whatsappNumber: "55TODO",
  // TODO: telefone formatado pra exibição, ex. "(69) 90000-0000"
  phoneDisplay: "TODO: telefone",
  // TODO: mesmo número do whatsappNumber, em formato tel:
  phoneHref: "tel:+55TODO",
  addressLine: "Av. Jamari, 3832 - Setor 2",
  addressCity: "Ariquemes - RO",
  hours: {
    // TODO: horário real, ex. "08h às 18h"
    weekdays: "TODO: horário de segunda a sexta",
    // TODO: horário real, ex. "08h às 12h"
    saturday: "TODO: horário de sábado",
  },
} as const;

const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vim pelo site da Amigão Motos e gostaria de agendar um horário.";

export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
