import { MockTranscription } from "../types";

/**
 * 5 realistic mock transcriptions of B2B sales conversations in Portuguese.
 * Each one has a different qualification profile to produce varied scores.
 */
export const mockTranscriptions: MockTranscription[] = [
  // -------------------------------------------------------
  // #1 — Lead Quente (HOT) — Score esperado: ~90-95
  // -------------------------------------------------------
  {
    id: "mock-1-hot",
    companyName: "TechFlow Soluções",
    contactName: "Rafael Mendes",
    role: "CEO",
    source: "meeting",
    description:
      "Lead ideal: CEO com budget aprovado, necessidade urgente e prazo curto. Todos os sinais BANT presentes.",
    transcription: `[SDR - Ana]: Olá, Rafael! Tudo bem? Obrigada por agendar essa conversa. Vi que vocês preencheram nosso formulário pedindo uma demo. Me conta, o que motivou vocês a procurarem a gente?

[Lead - Rafael, CEO TechFlow]: Opa, tudo ótimo! Então, a gente tá com um problema sério. Nosso time de vendas cresceu pra 15 pessoas e ninguém preenche o CRM direito. A gente perde informação de reunião, esquece follow-up... tá um caos. Semana passada perdemos um deal de R$ 50 mil porque o vendedor esqueceu de fazer follow-up com o cliente.

[SDR - Ana]: Nossa, que situação. E vocês já têm alguma ferramenta ou processo hoje pra lidar com isso?

[Lead - Rafael]: Usamos o HubSpot como CRM, mas o preenchimento é manual e ninguém faz. Eu mesmo já cobrei várias vezes, mas não adianta. O time reclama que leva muito tempo. Precisamos de algo que automatize isso.

[SDR - Ana]: Faz total sentido. E me diz, vocês já têm um orçamento separado pra resolver isso?

[Lead - Rafael]: Sim, sim. A gente já aprovou internamente um budget de até R$ 3.000 por mês pra uma solução que resolva isso. Já foi discutido em board e tá aprovado. Inclusive o CFO já deu o ok.

[SDR - Ana]: Ótimo. E quem toma a decisão final de contratar?

[Lead - Rafael]: Sou eu mesmo. Como CEO, eu tenho a palavra final nisso. Se a solução fizer sentido, eu fecho na hora. Não preciso consultar mais ninguém.

[SDR - Ana]: Perfeito. E vocês têm alguma urgência? Algum prazo em mente?

[Lead - Rafael]: Sim, bastante. A gente tem uma meta agressiva pro próximo trimestre e preciso que o time esteja organizado até lá. Idealmente a gente contrata algo nas próximas 2-3 semanas. Quanto antes melhor, porque cada dia que passa a gente perde oportunidade.`,
  },

  // -------------------------------------------------------
  // #2 — Lead Morno (WARM) — Score esperado: ~65-75
  // -------------------------------------------------------
  {
    id: "mock-2-warm-budget",
    companyName: "Marketplace Boa Compra",
    contactName: "Juliana Costa",
    role: "Head de Vendas",
    source: "call",
    description:
      "Lead com necessidade clara e urgência, mas budget precisa de aprovação da diretoria. Autoridade parcial.",
    transcription: `[SDR - Pedro]: Oi Juliana, tudo bem? Sou o Pedro da SalesCompany. Vi que você baixou nosso e-book sobre automação de CRM. Queria entender melhor o cenário de vocês.

[Lead - Juliana, Head de Vendas]: Oi Pedro! Sim, baixei porque a gente tá sofrendo muito com isso. Tenho 8 vendedores e a qualidade dos dados no CRM é péssima. Metade das oportunidades não tem informação suficiente pra eu fazer forecast.

[SDR - Pedro]: Entendo. E isso tá impactando os resultados de vocês?

[Lead - Juliana]: Muito. Mês passado errei o forecast em 40% porque os dados tavam incompletos. Meu diretor ficou furioso. Preciso de visibilidade real do que tá acontecendo no pipeline.

[SDR - Pedro]: E vocês já olharam alguma solução pra isso? Têm orçamento disponível?

[Lead - Juliana]: Olha, eu sei que preciso resolver, mas orçamento é complicado. Vou ter que montar um business case e aprovar com a diretoria. Provavelmente consigo algo na faixa de R$ 1.500 a R$ 2.000, mas não posso garantir agora. Preciso do ok do meu diretor financeiro.

[SDR - Pedro]: Entendi. E você seria a pessoa que decide qual ferramenta usar?

[Lead - Juliana]: Eu escolho a ferramenta e faço a recomendação, mas a decisão final de compra é do meu diretor, o Marcos. Ele que assina. Mas ele confia bastante na minha opinião.

[SDR - Pedro]: E vocês têm algum prazo pra resolver isso?

[Lead - Juliana]: A gente tem revisão de OKRs no próximo mês e quero chegar com uma solução. Então idealmente eu precisaria ter uma proposta aprovada nas próximas 3-4 semanas.`,
  },

  // -------------------------------------------------------
  // #3 — Lead Frio (COLD) — Score esperado: ~15-25
  // -------------------------------------------------------
  {
    id: "mock-3-cold",
    companyName: "Construtora Horizonte",
    contactName: "Lucas Almeida",
    role: "Estagiário de Marketing",
    source: "whatsapp",
    description:
      "Lead não qualificado: estagiário pesquisando, sem budget, sem poder de decisão, sem urgência.",
    transcription: `[SDR - Mariana]: Oi Lucas! Vi que você mandou mensagem perguntando sobre a SalesCompany. Como posso te ajudar?

[Lead - Lucas, Estagiário]: Oi! Então, estou fazendo um levantamento de ferramentas de CRM pro meu TCC da faculdade. Queria entender como funciona a plataforma de vocês.

[SDR - Mariana]: Ah legal! E vocês usam algum CRM na construtora?

[Lead - Lucas]: Acho que usam uma planilha de Excel, mas não tenho certeza. Eu sou do marketing, não tenho muito contato com o time de vendas. Meu chefe pediu pra eu dar uma pesquisada em ferramentas, mas é mais pra um projeto futuro.

[SDR - Mariana]: Entendi. E vocês têm algum orçamento pensado pra isso?

[Lead - Lucas]: Não que eu saiba. Acho que meu chefe só quer ter uma ideia do que existe no mercado. Não é nada urgente, é mais pra conhecimento mesmo.

[SDR - Mariana]: E quem seria a pessoa que tomaria a decisão caso fosse pra frente?

[Lead - Lucas]: Seria o diretor comercial, o Sr. Roberto. Mas ele nem sabe que eu tô pesquisando, é mais iniciativa minha pro TCC e do meu chefe do marketing. O Sr. Roberto é bem difícil de convencer pra adotar tecnologia nova.

[SDR - Mariana]: Entendi. E vocês têm algum prazo ou plano pra implementar algo?

[Lead - Lucas]: Não, sem prazo nenhum. Como disse, é mais pesquisa por enquanto. Talvez ano que vem a construtora pense em algo, mas por agora é só levantamento.`,
  },

  // -------------------------------------------------------
  // #4 — Lead Morno com objeção (WARM) — Score esperado: ~70-80
  // -------------------------------------------------------
  {
    id: "mock-4-warm-objection",
    companyName: "FinPay Pagamentos",
    contactName: "Carolina Ribeiro",
    role: "VP de Revenue",
    source: "meeting",
    description:
      "Lead com BANT forte mas usa concorrente e está parcialmente satisfeito. Objeção de troca.",
    transcription: `[SDR - Thiago]: Carolina, obrigado por aceitar a reunião. Sei que a agenda de VP é corrida. O que te motivou a conversar com a gente?

[Lead - Carolina, VP Revenue FinPay]: Oi Thiago. Então, a gente já usa o Gong pra gravação de calls, mas tô achando que tá caro demais pro que entrega. São quase R$ 8.000 por mês e a gente usa talvez 30% das funcionalidades. Quero ver se existe algo mais adequado pro nosso tamanho.

[SDR - Thiago]: Entendo. E além do custo, tem mais algum pain point com o Gong?

[Lead - Carolina]: Sim, a integração com o nosso CRM (Pipedrive) é bem fraca. A gente ainda precisa fazer muito trabalho manual de preencher campo. E o suporte deles é todo em inglês, o que complica pro meu time. Eu quero algo que funcione nativamente em português.

[SDR - Thiago]: Faz sentido. E sobre orçamento, vocês manteriam o mesmo budget que pagam no Gong?

[Lead - Carolina]: Com certeza. Se eu conseguir algo que entregue o que preciso por metade do preço, melhor ainda. O budget já existe, é só realocar. Já falei com o CFO e ele apoia a troca desde que tenha uma redução de custo.

[SDR - Thiago]: E a decisão de trocar seria sua?

[Lead - Carolina]: Sim, sou eu quem decide ferramentas de revenue. Já troquei nosso CRM ano passado, então conheço o processo. Mas preciso garantir que a migração não vai impactar a operação. Esse é meu maior medo.

[SDR - Thiago]: Entendi. E vocês têm um prazo pra fazer essa troca?

[Lead - Carolina]: O contrato do Gong renova em 3 meses. Então preciso tomar uma decisão nos próximos 2 meses pra dar tempo de migrar e dar aviso de cancelamento. Mas não tenho pressa absurda, quero fazer com calma.`,
  },

  // -------------------------------------------------------
  // #5 — Lead Morno/Frio (WARM low) — Score esperado: ~40-55
  // -------------------------------------------------------
  {
    id: "mock-5-warm-low",
    companyName: "Agência Digital Criativa",
    contactName: "Fernando Oliveira",
    role: "Sócio-fundador",
    source: "call",
    description:
      "Lead com necessidade real e é o decisor, mas sem urgência e budget não definido. Perfil 'talvez ano que vem'.",
    transcription: `[SDR - Camila]: Fernando, tudo bem? Obrigada por atender. Vi que vocês visitaram nossa página de preços duas vezes essa semana. Queria entender o que chamou atenção.

[Lead - Fernando, Sócio Agência]: Oi Camila! Então, eu tenho uma agência digital com 5 pessoas no comercial. A gente vende projetos de marketing digital pra empresas médias. Nosso processo de vendas é bem bagunçado — cada vendedor faz do jeito dele.

[SDR - Camila]: E isso tá gerando algum problema específico?

[Lead - Fernando]: Sim, nosso ciclo de vendas é muito longo. Às vezes leva 3 meses pra fechar um projeto porque os vendedores perdem o timing. Mas ao mesmo tempo a gente consegue fechar negócio, então não sei se é prioridade resolver agora. Tem coisa pegando mais fogo.

[SDR - Camila]: Entendo. E vocês teriam orçamento pra uma ferramenta que ajudasse nisso?

[Lead - Fernando]: Olha, sinceramente, agora a gente tá apertado. Acabamos de contratar mais dois designers e o caixa tá justo. Talvez no segundo semestre eu consiga alocar uns R$ 800, R$ 1.000 por mês pra isso. Mas agora não dá.

[SDR - Camila]: E quem tomaria a decisão?

[Lead - Fernando]: Eu mesmo, sou o sócio-fundador. Decido tudo que é ferramenta e investimento. Mas como disse, agora o foco é outro.

[SDR - Camila]: E se vocês fossem adotar uma ferramenta assim, seria pra quando?

[Lead - Fernando]: Realista? Segundo semestre, talvez outubro ou novembro. Eu sei que preciso organizar o processo, mas não é urgente. A gente sobrevive do jeito que tá, só não é eficiente. Quando apertar mais a gente resolve.`,
  },
];
