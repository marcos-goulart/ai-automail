document.addEventListener("DOMContentLoaded", () => {

  // Splash
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("main").classList.remove("hidden");
  }, 2000);

  // Intersection Observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const form = document.getElementById("form");
  const output = document.getElementById("output");
  const card = document.getElementById("result-card");
  const copyBtn = document.getElementById("copy-btn");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(form);
    const text = formData.get("text")?.trim();
    const file = formData.get("file");

    //  VALIDAÇÃO ANTES DO FETCH
    if (!text && (!file || file.size === 0)) {
      output.innerText = "Preencha o campo de texto ou anexe um arquivo.";
      card.classList.remove("hidden");
      return;
    }

    output.innerText = "Processando...";
    card.classList.remove("hidden");

    try {
      const res = await fetch("/process", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      output.innerText = data.result;

    } catch (err) {
      output.innerText = err.message || "Erro ao processar o email.";
    }
  });

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(output.innerText);
    copyBtn.innerText = "Copiado!";
    setTimeout(() => copyBtn.innerText = "Copiar resposta", 2000);
  });

});
