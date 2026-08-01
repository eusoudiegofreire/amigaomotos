export type Service = {
  id: string;
  title: string;
  description: string;
};

/**
 * Serviços da oficina. Cada item aqui vira automaticamente um card na seção
 * "Serviços" (src/components/Servicos.tsx) e uma entrada em `makesOffer` no
 * JSON-LD (src/app/layout.tsx) — pra adicionar um serviço novo, basta adicionar
 * um objeto aqui. Se o novo serviço precisar de um ícone próprio, adicione a
 * chave correspondente em `SERVICE_ICONS` dentro de Servicos.tsx (o fallback já
 * cobre ids sem ícone dedicado).
 */
export const SERVICES: Service[] = [
  {
    id: "revisao-geral",
    title: "Revisão Geral",
    description: "Checklist completo de segurança e desempenho antes de qualquer viagem ou trilha.",
  },
  {
    id: "motor",
    title: "Motor",
    description: "Diagnóstico, manutenção e reparo de motor com peças e mão de obra que você acompanha.",
  },
  {
    id: "eletrica",
    title: "Parte Elétrica",
    description: "Sistema elétrico, injeção eletrônica e diagnóstico de falhas com equipamento próprio.",
  },
  {
    id: "pneus",
    title: "Troca de Pneus",
    description: "Montagem, balanceamento e recomendação de pneu certo pro seu tipo de pilotagem.",
  },
];
