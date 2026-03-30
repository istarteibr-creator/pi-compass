export interface SurveyQuestion {
  id: string;
  block: number;
  blockTitle: string;
  blockDescription: string;
  question: string;
  helpText?: string;
  options: { value: string; label: string }[];
  conditionalOn?: { questionId: string; values: string[] };
}

export const surveyQuestions: SurveyQuestion[] = [
  // BLOCO 1
  {
    id: "q1_porte",
    block: 1,
    blockTitle: "Perfil da Empresa",
    blockDescription: "Vamos conhecer um pouco sobre a sua empresa para personalizar o diagnóstico.",
    question: "Qual o porte da sua empresa?",
    options: [
      { value: "mei", label: "Microempreendedor Individual (MEI)" },
      { value: "me", label: "Microempresa (ME)" },
      { value: "epp", label: "Empresa de Pequeno Porte (EPP)" },
      { value: "media_grande", label: "Média ou Grande Empresa" },
    ],
  },
  {
    id: "q2_setor",
    block: 1,
    blockTitle: "Perfil da Empresa",
    blockDescription: "Vamos conhecer um pouco sobre a sua empresa para personalizar o diagnóstico.",
    question: "Qual o setor de atuação principal?",
    options: [
      { value: "comercio", label: "Comércio" },
      { value: "servicos", label: "Serviços" },
      { value: "industria", label: "Indústria / Transformação" },
      { value: "agronegocio", label: "Agronegócio" },
      { value: "tecnologia", label: "Tecnologia / Startups" },
    ],
  },
  {
    id: "q3_tempo",
    block: 1,
    blockTitle: "Perfil da Empresa",
    blockDescription: "Vamos conhecer um pouco sobre a sua empresa para personalizar o diagnóstico.",
    question: "Há quanto tempo a empresa atua no mercado?",
    options: [
      { value: "menos_2", label: "Menos de 2 anos" },
      { value: "2_a_5", label: "Entre 2 e 5 anos" },
      { value: "mais_5", label: "Mais de 5 anos" },
    ],
  },
  // BLOCO 2
  {
    id: "q4_conhecimento",
    block: 2,
    blockTitle: "Conhecimento em PI",
    blockDescription: "Avalie seu nível de conhecimento e conscientização sobre Propriedade Intelectual.",
    question: "Como você avalia o seu conhecimento sobre Propriedade Intelectual (Marcas, Patentes, etc.)?",
    options: [
      { value: "nulo", label: "Nulo — Nunca ouvi falar ou não sei o que é" },
      { value: "basico", label: "Básico — Já ouvi falar, mas não sei como aplicar" },
      { value: "intermediario", label: "Intermediário — Conheço os conceitos principais e sua importância" },
      { value: "avancado", label: "Avançado — Já protegi ativos e utilizo estrategicamente" },
    ],
  },
  {
    id: "q5_junta_vs_inpi",
    block: 2,
    blockTitle: "Conhecimento em PI",
    blockDescription: "Avalie seu nível de conhecimento e conscientização sobre Propriedade Intelectual.",
    question: "Você sabe a diferença entre o registro na Junta Comercial (Razão Social) e o registro de Marca no INPI?",
    helpText: "Muitos empresários acreditam que ter CNPJ já protege a marca — mas são coisas diferentes.",
    options: [
      { value: "sim", label: "Sim, sei a diferença" },
      { value: "nao", label: "Não, achava que era a mesma coisa" },
      { value: "duvidas", label: "Tenho dúvidas" },
    ],
  },
  {
    id: "q6_busca_info",
    block: 2,
    blockTitle: "Conhecimento em PI",
    blockDescription: "Avalie seu nível de conhecimento e conscientização sobre Propriedade Intelectual.",
    question: "A sua empresa já buscou, em algum momento, informações sobre como proteger uma marca ou produto?",
    options: [
      { value: "sim", label: "Sim, buscamos ativamente" },
      { value: "nao", label: "Não, nunca buscamos" },
      { value: "nao_caro", label: "Não, porque achamos que seria muito caro/burocrático" },
    ],
  },
  // BLOCO 3
  {
    id: "q7_marca_inpi",
    block: 3,
    blockTitle: "Práticas de Proteção e Inovação",
    blockDescription: "Vamos avaliar as práticas reais de proteção e inovação da sua empresa.",
    question: "A marca da sua empresa está registrada no INPI (Instituto Nacional da Propriedade Industrial)?",
    options: [
      { value: "concedido", label: "Sim, o registro já foi concedido (tenho o certificado)" },
      { value: "andamento", label: "O processo está em andamento" },
      { value: "pretendo", label: "Não, mas pretendo registrar" },
      { value: "nao_pretendo", label: "Não, e não pretendo registrar no momento" },
    ],
  },
  {
    id: "q8_segredo",
    block: 3,
    blockTitle: "Práticas de Proteção e Inovação",
    blockDescription: "Vamos avaliar as práticas reais de proteção e inovação da sua empresa.",
    question: "Sua empresa possui algum segredo de negócio (receita, lista de clientes, método exclusivo) que precisa ser mantido confidencial?",
    options: [
      { value: "sim", label: "Sim" },
      { value: "nao", label: "Não" },
      { value: "nao_sei", label: "Não sei identificar" },
    ],
  },
  {
    id: "q9_nda",
    block: 3,
    blockTitle: "Práticas de Proteção e Inovação",
    blockDescription: "Vamos avaliar as práticas reais de proteção e inovação da sua empresa.",
    question: "Você utiliza contratos de confidencialidade (NDA) com funcionários ou parceiros para proteger esses segredos?",
    conditionalOn: { questionId: "q8_segredo", values: ["sim"] },
    options: [
      { value: "sempre", label: "Sim, sempre" },
      { value: "as_vezes", label: "Às vezes" },
      { value: "nunca", label: "Não, nunca utilizamos" },
    ],
  },
  {
    id: "q10_inovacao",
    block: 3,
    blockTitle: "Práticas de Proteção e Inovação",
    blockDescription: "Vamos avaliar as práticas reais de proteção e inovação da sua empresa.",
    question: "A empresa lançou algum produto, serviço ou melhoria significativa nos últimos 2 anos?",
    options: [
      { value: "sim", label: "Sim" },
      { value: "nao", label: "Não" },
    ],
  },
  {
    id: "q11_pesquisa_previa",
    block: 3,
    blockTitle: "Práticas de Proteção e Inovação",
    blockDescription: "Vamos avaliar as práticas reais de proteção e inovação da sua empresa.",
    question: "Antes de lançar esse produto/serviço, ou de criar a marca, vocês pesquisaram se já existia algo igual no mercado ou no INPI?",
    helpText: "Avalia a capacidade de monitoramento (Sensing).",
    conditionalOn: { questionId: "q10_inovacao", values: ["sim"] },
    options: [
      { value: "google_inpi", label: "Sim, pesquisamos no Google e no INPI" },
      { value: "google_apenas", label: "Pesquisamos apenas no Google/Redes Sociais" },
      { value: "nao", label: "Não fizemos pesquisa prévia" },
    ],
  },
  // BLOCO 4
  {
    id: "q12_planejamento",
    block: 4,
    blockTitle: "Gestão Estratégica",
    blockDescription: "Avalie como a PI se integra ao planejamento estratégico da sua empresa.",
    question: "A Propriedade Intelectual (ex: proteção da marca, exclusividade de produto) é discutida nas reuniões de planejamento da empresa?",
    options: [
      { value: "sim_estrategia", label: "Sim, é parte da estratégia" },
      { value: "raramente", label: "Raramente" },
      { value: "nunca", label: "Nunca" },
    ],
  },
  {
    id: "q13_valor",
    block: 4,
    blockTitle: "Gestão Estratégica",
    blockDescription: "Avalie como a PI se integra ao planejamento estratégico da sua empresa.",
    question: "Você acredita que proteger a Propriedade Intelectual aumentaria o valor ou a competitividade do seu negócio?",
    options: [
      { value: "sim", label: "Sim, totalmente" },
      { value: "talvez", label: "Talvez / Parcialmente" },
      { value: "nao", label: "Não, no meu setor não faz diferença" },
    ],
  },
];

export const blockInfo: Record<number, { title: string; icon: string; color: string }> = {
  1: { title: "Perfil da Empresa", icon: "Building2", color: "primary" },
  2: { title: "Conhecimento em PI", icon: "Brain", color: "survey-highlight" },
  3: { title: "Práticas de Proteção", icon: "Shield", color: "survey-success" },
  4: { title: "Gestão Estratégica", icon: "Target", color: "primary" },
};
