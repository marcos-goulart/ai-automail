document.addEventListener("DOMContentLoaded", () => {

  // Gerencia a tela de Splash (tela de apresentação inicial) ocultando-a após 2 segundos.
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("main").classList.remove("hidden");
  }, 2000);

  // Inicializa o Intersection Observer para animar e revelar seções da página conforme são visualizadas.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.2 });

  // Aplica o observador em todos os elementos que possuem a classe '.reveal' para efeito de transição.
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Seleciona referências dos elementos da interface gráfica (DOM) para manipulação.
  const form = document.getElementById("form");
  const output = document.getElementById("output");
  const card = document.getElementById("result-card");
  const copyBtn = document.getElementById("copy-btn");
  const fileInput = document.getElementById("file-input");
  const fileNameDisplay = document.getElementById("file-name-display");
  const dragOverlay = document.getElementById("drag-overlay");

  const revealResultCard = () => {
    const shouldAnimate = card.classList.contains("hidden");

    card.classList.remove("hidden");
    if (!shouldAnimate) return;

    card.classList.remove("result-card-enter");
    void card.offsetWidth;
    card.classList.add("result-card-enter");
  };

  // Escuta as alterações no input de arquivos para atualizar o texto com o nome do arquivo selecionado.
  fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files.length > 0) {
      fileNameDisplay.innerText = fileInput.files[0].name;
    } else {
      fileNameDisplay.innerText = "Nenhum arquivo selecionado";
    }
  });

  // Controle de estados do Drag and Drop (arrastar e soltar arquivos na tela).
  let dragCounter = 0;

  // Mostra a tela de sobreposição de arraste quando um arquivo entra nos limites da janela do navegador.
  window.addEventListener("dragenter", e => {
    e.preventDefault();
    dragCounter++;
    if (dragCounter === 1) {
      dragOverlay.classList.add("active");
    }
  });

  // Mantém o comportamento de arraste ativo enquanto o arquivo se move sobre a janela.
  window.addEventListener("dragover", e => {
    e.preventDefault();
  });

  // Remove a sobreposição quando o cursor com o arquivo sai dos limites da janela.
  window.addEventListener("dragleave", e => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter === 0) {
      dragOverlay.classList.remove("active");
    }
  });

  // Captura o arquivo solto na janela, valida a extensão (.txt ou .pdf) e atualiza o campo de upload.
  window.addEventListener("drop", e => {
    e.preventDefault();
    dragCounter = 0;
    dragOverlay.classList.remove("active");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const ext = file.name.split('.').pop().toLowerCase();
      if (ext === "pdf" || ext === "txt") {
        fileInput.files = files;
        // Força o disparo do evento 'change' para atualizar o nome do arquivo no painel de visualização.
        fileInput.dispatchEvent(new Event("change"));
      } else {
        alert("Apenas arquivos .txt ou .pdf são aceitos!");
      }
    }
  });

  // Escuta o evento de submissão do formulário para classificar e responder o e-mail de forma assíncrona.
  form.addEventListener("submit", async e => {
    e.preventDefault();
    output.classList.remove("error"); // Remove qualquer estilo de erro de requisições anteriores.

    const formData = new FormData(form);
    const text = formData.get("text")?.trim();
    const file = formData.get("file");

    // Validação preventiva no frontend: impede a requisição caso não haja texto nem arquivo anexado.
    if (!text && (!file || file.size === 0)) {
      output.classList.add("error");
      output.innerText = "Erro: Preencha o campo de texto ou anexe um arquivo.";
      revealResultCard();
      return;
    }

    // Exibe o feedback visual de processamento em andamento utilizando animação de reticências.
    output.innerHTML = 'Processando<span class="dots"><span>.</span><span>.</span><span>.</span></span>';
    revealResultCard();

    try {
      // Determina a URL do servidor backend com base em como o site está sendo visualizado (FastAPI ou Live Server).
      const apiOrigin = (window.location.protocol === "file:" || window.location.port === "5500")
        ? "http://127.0.0.1:8000"
        : "";

      // Realiza a chamada HTTP POST enviando o formulário contendo o texto ou arquivo.
      const res = await fetch(`${apiOrigin}/process`, {
        method: "POST",
        body: formData
      });

      // Valida se a resposta HTTP é bem sucedida. Se falhar, extrai a mensagem de erro retornada pelo backend.
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Servidor retornou um erro (Status: ${res.status})`);
      }

      // Converte o retorno para JSON e valida se o processo foi executado com sucesso no backend.
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      // Exibe a resposta automática inteligente gerada pela IA na tela.
      output.innerText = data.result;

    } catch (err) {
      let errMsg = err.message || "Erro desconhecido ao processar o email.";

      // Traduz e amacia erros de rede nativos do navegador (ex: servidor backend desligado ou falha de CORS).
      if (errMsg.includes("Failed to fetch") || errMsg.includes("NetworkError") || errMsg.includes("Load failed")) {
        errMsg = "Não foi possível conectar ao servidor de processamento. Verifique se o servidor backend FastAPI está rodando na porta 8000 e se as conexões de rede estão ativas.";
      }

      output.classList.add("error");
      output.innerText = `Erro: ${errMsg}`;
    }
  });

  // Copia o conteúdo gerado do e-mail no painel de resultados para a área de transferência do usuário.
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(output.innerText);
    copyBtn.innerText = "Copiado!";
    setTimeout(() => copyBtn.innerText = "Copiar resposta", 2000);
  });

});
