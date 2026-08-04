const botao = document.getElementById('botao-tema');
const body = document.body;

// Persistência do tema
const temasalvo = localStorage.getItem('tema');
temaEscuro(temasalvo === 'escuro');

// Função para alternar entre tema claro e escuro
function temaEscuro(tipo) {
  if (tipo == true) {
    body.classList.add('escuro');
    botao.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove('escuro');
    botao.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

botao.addEventListener('click', () => {
  const isescuro = body.classList.toggle('escuro');
  temaEscuro(isescuro);
  localStorage.setItem('tema', isescuro ? 'escuro' : 'claro');
});

// Scroll suave para links de navegação
const navLinks = document.querySelectorAll('#menu ul a.link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


const API_URL = "https://yellow-hall-a546.theu2016psn.workers.dev";


// registra a visita atual
async function registrarVisita() {

    try {

        await fetch(`${API_URL}/visit`);

    } catch (erro) {

        console.log("Erro ao registrar visita:", erro);

    }

}


// carrega estatísticas
async function carregarDashboard() {

    try {

        const resposta = await fetch(`${API_URL}/stats`);

        const dados = await resposta.json();


        // total
        document.getElementById("total-visitas").textContent = dados.total;


        // hoje
        document.getElementById("visitas-hoje").textContent = dados.today;


        // última visita
        if (dados.lastVisit) {

            const data = new Date(dados.lastVisit);

            document.getElementById("ultima-visita").textContent =
                data.toLocaleString("pt-BR");

        }


        // países
        const total = dados.total;


        const paises = dados.countries
            .filter(pais => pais.country !== null)
            .map(pais => {

                const porcentagem =
                    ((pais.count / total) * 100).toFixed(0);

                return `${pais.country}: ${porcentagem}%`;

            })
            .join(" | ");


        document.getElementById("paises").textContent =
            paises || "Sem dados";


    } catch (erro) {

        console.log("Erro ao carregar dashboard:", erro);

    }

}


// executa quando página abre
window.onload = () => {

    registrarVisita();

    carregarDashboard();

};
