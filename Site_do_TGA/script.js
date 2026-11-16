/* ======================================================================
    MODO CLARO / ESCURO
    ====================================================================== */
const btnTema = document.getElementById("pietro_btn_tema");

function alternarTemaGlobal() {
    document.body.classList.toggle("bruno_modo_claro");

    if (document.body.classList.contains("bruno_modo_claro")) {
        btnTema.textContent = "Ativar Modo Escuro";
    } else {
        btnTema.textContent = "Ativar Modo Claro";
    }
}

btnTema.addEventListener("click", alternarTemaGlobal);


/* ======================================================================
    SISTEMA DE ABAS + CADASTRO DINÂMICO DE CONTEÚDO
    ====================================================================== */
const botoesAbas = document.querySelectorAll(".pietro_aba_btn");
const paineisAbas = document.querySelectorAll(".bruno_aba_painel");

// Arrow function percorrendo os botões das 5 abas
botoesAbas.forEach((botao) => {
    botao.addEventListener("click", () => {
        botoesAbas.forEach((b) => b.classList.remove("pietro_aba_ativa"));
        paineisAbas.forEach((p) => p.classList.remove("bruno_aba_visivel"));

        botao.classList.add("pietro_aba_ativa");

        const idAlvo = botao.getAttribute("data-alvo");
        const painelAlvo = document.getElementById(idAlvo);
        if (painelAlvo) {
            painelAlvo.classList.add("bruno_aba_visivel");
        }
    });
});

// Inclusão dinâmica de conteúdo dentro da aba GOTY
const inputNovoItemAba = document.getElementById("bruno_input_novo_item");
const btnAddAba = document.getElementById("pietro_btn_add_aba");
const listaDinamicaAba = document.getElementById("bruno_lista_dinamica_aba");

function adicionarItemNaAba() {
    const textoDigitado = inputNovoItemAba.value.trim();

    if (textoDigitado === "") {
        alert("Digite um texto ou indicação antes de clicar em Adicionar.");
        return;
    }

    const novoLi = document.createElement("li");
    novoLi.textContent = textoDigitado;
    listaDinamicaAba.appendChild(novoLi);

    inputNovoItemAba.value = "";
    inputNovoItemAba.focus();
}

btnAddAba.addEventListener("click", adicionarItemNaAba);


/* ======================================================================
    CARROSSEL COM INCLUSÃO DE IMAGEM DO COMPUTADOR
    ====================================================================== */
const itensCarrossel = [
    { src: "img/evento1.png", legenda: "Cerimônia oficial Ao Vivo" },
    { src: "img/evento2.png", legenda: "Apresentação ao vivo da The Game Awards Orchestra" },
    { src: "img/evento3.png", legenda: "Momento da entrega do troféu de Jogo do Ano (GOTY)" },
    { src: "img/evento4.png", legenda: "Grandes Anúncios Ao Vivo" }
];

let indiceSlide = 0;

const imgCarrossel = document.getElementById("pietro_img_carrossel");
const legendaCarrossel = document.getElementById("bruno_legenda_carrossel");
const contadorCarrossel = document.getElementById("pietro_contador_carrossel");
const btnAnterior = document.getElementById("bruno_btn_anterior");
const btnProximo = document.getElementById("bruno_btn_proximo");

function renderizarSlide() {
    const atual = itensCarrossel[indiceSlide];
    imgCarrossel.src = atual.src;
    legendaCarrossel.textContent = atual.legenda;
    contadorCarrossel.textContent = `Imagem ${indiceSlide + 1} de ${itensCarrossel.length}`;
}

btnAnterior.addEventListener("click", () => {
    if (indiceSlide > 0) {
        indiceSlide = indiceSlide - 1;
    } else {
        indiceSlide = itensCarrossel.length - 1;
    }
    renderizarSlide();
});

btnProximo.addEventListener("click", () => {
    if (indiceSlide < itensCarrossel.length - 1) {
        indiceSlide = indiceSlide + 1;
    } else {
        indiceSlide = 0;
    }
    renderizarSlide();
});

// Inclusão de nova imagem selecionada do computador
const inputArquivo = document.getElementById("bruno_input_arquivo");
const inputLegenda = document.getElementById("pietro_input_legenda");
const btnAddImagem = document.getElementById("bruno_btn_add_imagem");

function adicionarImagemCarrossel() {
    const arquivo = inputArquivo.files[0];
    const textoLegenda = inputLegenda.value.trim();

    if (!arquivo) {
        alert("Selecione um arquivo de imagem do seu computador.");
        return;
    }

    if (textoLegenda === "") {
        alert("Escreva uma legenda para a nova imagem.");
        return;
    }

    const urlTemporaria = URL.createObjectURL(arquivo);

    itensCarrossel.push({
        src: urlTemporaria,
        legenda: textoLegenda
    });

    indiceSlide = itensCarrossel.length - 1;
    renderizarSlide();

    inputArquivo.value = "";
    inputLegenda.value = "";
}

btnAddImagem.addEventListener("click", adicionarImagemCarrossel);


/* ======================================================================
    VALIDAÇÃO DE FORMULÁRIO (ALERT)
    ====================================================================== */
const formTga = document.getElementById("pietro_form_tga");

function validarFormularioTga(evento) {
    evento.preventDefault();

    const nome = document.getElementById("bruno_nome").value.trim();
    const email = document.getElementById("pietro_email").value.trim();
    const idadeTexto = document.getElementById("bruno_idade").value.trim();
    const idadeNumero = Number(idadeTexto);
    const pais = document.getElementById("pietro_pais").value.trim();

    const radioOuviuFalar = document.querySelector('input[name="ouviu_falar"]:checked');
    const acompanha = document.getElementById("bruno_acompanha").value;
    const edicoesTexto = document.getElementById("pietro_edicoes_vistas").value.trim();
    const edicoesNumero = Number(edicoesTexto);
    const opiniaoGeral = document.getElementById("bruno_opiniao_geral").value;

    const maisGostou = document.getElementById("pietro_mais_gostou").value;
    const maisDetesta = document.getElementById("bruno_mais_detesta").value.trim();
    const receberConteudo = document.getElementById("pietro_receber_conteudo").checked;
    const comentario = document.getElementById("bruno_comentario").value.trim();

    if (nome === "" || nome.length < 3) {
        alert("Erro no Campo 1: Informe seu nome completo com pelo menos 3 caracteres.");
    } else if (email === "" || !email.includes("@gmail.com")) {
        alert("Erro no Campo 2: Digite um endereço de e-mail válido (contendo '@' e '.').");
    } else if (idadeTexto === "" || isNaN(idadeNumero) || idadeNumero < 10 || idadeNumero > 120) {
        alert("Erro no Campo 3: Informe uma idade numérica válida entre 10 e 120 anos.");
    } else if (pais === "" || pais.length < 3) {
        alert("Erro no Campo 4: Informe seu País corretamente.");
    } else if (!radioOuviuFalar) {
        alert("Erro no Campo 5: Selecione uma opção informando se você já ouviu falar do TGA.");
    } else if (acompanha === "") {
        alert("Erro no Campo 6: Escolha como você costuma acompanhar o evento.");
    } else if (edicoesTexto === "" || isNaN(edicoesNumero) || edicoesNumero < 0 || edicoesNumero > 10) {
        alert("Erro no Campo 7: Digite um número válido entre 0 e 10 para as edições acompanhadas.");
    } else if (opiniaoGeral === "") {
        alert("Erro no Campo 8: Selecione sua avaliação geral sobre o The Game Awards.");
    } else if (maisGostou === "") {
        alert("Erro no Campo 9: Selecione o que você mais gosta no evento.");
    } else if (maisDetesta === "" || maisDetesta.length < 5) {
        alert("Erro no Campo 10: Descreva o que você mais detesta ou melhoraria (mínimo 5 caracteres).");
    } else if (!receberConteudo) {
        alert("Erro no Campo 11: Marque a caixa confirmando o interesse em receber mais conteúdos do TGA.");
    } else if (comentario === "" || comentario.length < 15) {
        alert("Erro no Campo 12: Escreva sua justificativa sobre o GOTY com pelo menos 15 caracteres.");
    } else {
        alert("Pesquisa enviada com sucesso! Obrigado por compartilhar sua opinião sobre o The Game Awards.");
        formTga.reset();
    }
}

formTga.addEventListener("submit", validarFormularioTga);
