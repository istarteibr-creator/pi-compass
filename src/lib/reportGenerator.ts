export interface DiagnosticResult {
  overallScore: number; // 0-100
  maturityLevel: "Inicial" | "Básico" | "Intermediário" | "Avançado";
  sensingScore: number;
  seizingScore: number;
  transformingScore: number;
  recommendations: Recommendation[];
  profileSummary: ProfileSummary;
}

export interface Recommendation {
  priority: "alta" | "media" | "baixa";
  title: string;
  description: string;
  action: string;
}

export interface ProfileSummary {
  porte: string;
  setor: string;
  tempo: string;
}

const porteLabels: Record<string, string> = {
  mei: "MEI",
  me: "Microempresa",
  epp: "Empresa de Pequeno Porte",
  media_grande: "Média/Grande Empresa",
};

const setorLabels: Record<string, string> = {
  comercio: "Comércio",
  servicos: "Serviços",
  industria: "Indústria / Transformação",
  agronegocio: "Agronegócio",
  tecnologia: "Tecnologia / Startups",
};

const tempoLabels: Record<string, string> = {
  menos_2: "Menos de 2 anos",
  "2_a_5": "Entre 2 e 5 anos",
  mais_5: "Mais de 5 anos",
};

export function generateReport(answers: Record<string, string>): DiagnosticResult {
  const recommendations: Recommendation[] = [];
  let totalPoints = 0;
  let maxPoints = 0;

  // Sensing score (q4, q5, q6, q11)
  let sensingPts = 0;
  let sensingMax = 0;

  // q4 - conhecimento
  sensingMax += 3;
  if (answers.q4_conhecimento === "avancado") sensingPts += 3;
  else if (answers.q4_conhecimento === "intermediario") sensingPts += 2;
  else if (answers.q4_conhecimento === "basico") sensingPts += 1;
  else {
    recommendations.push({
      priority: "alta",
      title: "Capacitação Urgente em PI",
      description: "Seu nível de conhecimento em Propriedade Intelectual foi identificado como nulo.",
      action: "Consulte o Manual de Gestão da ACES — Capítulo 1: Introdução à Propriedade Intelectual para MPMEs.",
    });
  }

  // q5 - junta vs inpi
  sensingMax += 2;
  if (answers.q5_junta_vs_inpi === "sim") sensingPts += 2;
  else if (answers.q5_junta_vs_inpi === "duvidas") sensingPts += 1;
  else {
    recommendations.push({
      priority: "alta",
      title: "Entenda a diferença: CNPJ ≠ Marca registrada",
      description: "O registro na Junta Comercial (CNPJ/Razão Social) NÃO protege sua marca. Apenas o registro no INPI garante exclusividade.",
      action: "Consulte o POP 01 do Manual — Diferença entre Razão Social e Marca Registrada.",
    });
  }

  // q6 - busca info
  sensingMax += 2;
  if (answers.q6_busca_info === "sim") sensingPts += 2;
  else if (answers.q6_busca_info === "nao_caro") {
    sensingPts += 0;
    recommendations.push({
      priority: "media",
      title: "Desmistifique os custos de PI",
      description: "Registrar uma marca no INPI pode custar a partir de R$ 142,00 para MEIs com desconto.",
      action: "Acesse o site do INPI (gov.br/inpi) e consulte a tabela de retribuições com desconto para MPMEs.",
    });
  }

  // q11 - pesquisa prévia (sensing)
  if (answers.q10_inovacao === "sim") {
    sensingMax += 3;
    if (answers.q11_pesquisa_previa === "google_inpi") sensingPts += 3;
    else if (answers.q11_pesquisa_previa === "google_apenas") {
      sensingPts += 1;
      recommendations.push({
        priority: "media",
        title: "Amplie sua pesquisa de anterioridade",
        description: "Pesquisar apenas no Google não é suficiente. É fundamental consultar a base do INPI.",
        action: "Utilize a ferramenta de busca de marcas do INPI (busca.inpi.gov.br) antes de lançar novos produtos.",
      });
    } else {
      recommendations.push({
        priority: "alta",
        title: "Pesquisa prévia é essencial",
        description: "Lançar produtos sem pesquisa de anterioridade pode resultar em conflitos de marca e ações judiciais.",
        action: "Consulte o POP 03 do Manual — Como realizar pesquisa de anterioridade no INPI.",
      });
    }
  }

  // Seizing score (q7, q8, q9)
  let seizingPts = 0;
  let seizingMax = 0;

  // q7 - marca registrada
  seizingMax += 4;
  if (answers.q7_marca_inpi === "concedido") seizingPts += 4;
  else if (answers.q7_marca_inpi === "andamento") seizingPts += 2;
  else if (answers.q7_marca_inpi === "pretendo") {
    seizingPts += 1;
    recommendations.push({
      priority: "alta",
      title: "Registre sua marca no INPI",
      description: "Sua marca ainda não está protegida. Enquanto não registrada, qualquer concorrente pode utilizá-la.",
      action: "Consulte o POP 01 do Manual da ACES — Passo a passo para Registro de Marca no INPI.",
    });
  } else {
    recommendations.push({
      priority: "alta",
      title: "⚠️ Recomendação Prioritária: Sua marca está em risco",
      description: "Sem registro no INPI, você não tem exclusividade sobre sua marca. Outro empresário pode registrá-la.",
      action: "Consulte URGENTEMENTE o POP 01 do Manual da ACES sobre Registro de Marca.",
    });
  }

  // q8/q9 - segredo de negócio + NDA
  seizingMax += 3;
  if (answers.q8_segredo === "sim") {
    if (answers.q9_nda === "sempre") seizingPts += 3;
    else if (answers.q9_nda === "as_vezes") {
      seizingPts += 1;
      recommendations.push({
        priority: "media",
        title: "Formalize seus contratos de confidencialidade",
        description: "Usar NDAs apenas ocasionalmente deixa lacunas na proteção dos seus segredos de negócio.",
        action: "Consulte o POP 02 do Manual — Modelo de Contrato de Confidencialidade (NDA).",
      });
    } else {
      recommendations.push({
        priority: "alta",
        title: "Proteja seus segredos de negócio",
        description: "Você possui segredos de negócio mas não utiliza contratos de confidencialidade.",
        action: "Implemente NDAs imediatamente. Consulte o POP 02 do Manual da ACES.",
      });
    }
  } else if (answers.q8_segredo === "nao_sei") {
    seizingPts += 0;
    recommendations.push({
      priority: "media",
      title: "Identifique seus ativos intangíveis",
      description: "Toda empresa possui algum tipo de conhecimento que pode ser considerado segredo de negócio.",
      action: "Consulte o Capítulo 3 do Manual — Como mapear ativos intangíveis na sua empresa.",
    });
  } else {
    seizingPts += 1;
  }

  // Transforming score (q10, q12, q13)
  let transformingPts = 0;
  let transformingMax = 0;

  // q10 - inovação
  transformingMax += 2;
  if (answers.q10_inovacao === "sim") transformingPts += 2;
  else {
    recommendations.push({
      priority: "baixa",
      title: "Invista em inovação incremental",
      description: "Inovar não significa inventar algo totalmente novo. Melhorias em processos e serviços também contam.",
      action: "Consulte o Capítulo 4 do Manual — Inovação Incremental para MPMEs.",
    });
  }

  // q12 - planejamento estratégico
  transformingMax += 3;
  if (answers.q12_planejamento === "sim_estrategia") transformingPts += 3;
  else if (answers.q12_planejamento === "raramente") {
    transformingPts += 1;
    recommendations.push({
      priority: "media",
      title: "Integre PI ao planejamento estratégico",
      description: "A Propriedade Intelectual deve ser pauta regular nas reuniões de estratégia da empresa.",
      action: "Consulte o Capítulo 5 do Manual — Gestão Estratégica de PI para MPMEs.",
    });
  } else {
    recommendations.push({
      priority: "alta",
      title: "PI precisa entrar na estratégia",
      description: "A Propriedade Intelectual nunca é discutida no planejamento. Isso representa um risco estratégico.",
      action: "Agende uma reunião dedicada para discutir proteção de marca e ativos intangíveis.",
    });
  }

  // q13 - percepção de valor
  transformingMax += 2;
  if (answers.q13_valor === "sim") transformingPts += 2;
  else if (answers.q13_valor === "talvez") transformingPts += 1;
  else {
    recommendations.push({
      priority: "baixa",
      title: "Reavalie o valor da PI para seu setor",
      description: "A proteção de PI gera valor em todos os setores — desde a fidelização de clientes até a valoração da empresa.",
      action: "Consulte o Capítulo 6 do Manual — Casos de Sucesso de PI em diferentes setores.",
    });
  }

  totalPoints = sensingPts + seizingPts + transformingPts;
  maxPoints = sensingMax + seizingMax + transformingMax;

  const overallScore = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

  const sensingScore = sensingMax > 0 ? Math.round((sensingPts / sensingMax) * 100) : 0;
  const seizingScore = seizingMax > 0 ? Math.round((seizingPts / seizingMax) * 100) : 0;
  const transformingScore = transformingMax > 0 ? Math.round((transformingPts / transformingMax) * 100) : 0;

  let maturityLevel: DiagnosticResult["maturityLevel"];
  if (overallScore >= 75) maturityLevel = "Avançado";
  else if (overallScore >= 50) maturityLevel = "Intermediário";
  else if (overallScore >= 25) maturityLevel = "Básico";
  else maturityLevel = "Inicial";

  // Sort recommendations by priority
  const priorityOrder = { alta: 0, media: 1, baixa: 2 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return {
    overallScore,
    maturityLevel,
    sensingScore,
    seizingScore,
    transformingScore,
    recommendations,
    profileSummary: {
      porte: porteLabels[answers.q1_porte] || "—",
      setor: setorLabels[answers.q2_setor] || "—",
      tempo: tempoLabels[answers.q3_tempo] || "—",
    },
  };
}
