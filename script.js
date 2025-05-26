async function buscarRepositorios() {
  const container = document.getElementById('container-projetos');

  try {
    const resposta = await fetch('https://api.github.com/users/Vinizx-carv/repos', {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json' // necessário para acessar topics
      }
    });

    const repositorios = await resposta.json();

    const filtrados = repositorios.filter(repo =>
      repo.topics && repo.topics.includes('portifolio')
    );

    filtrados.forEach(repo => {
      const card = document.createElement('div');
      card.classList.add('card');

      const imagem = `https://via.placeholder.com/400x200?text=${encodeURIComponent(repo.name)}`;

      card.innerHTML = `
       
        <div class="card-content">
          <h3>${repo.name}</h3>
          <p>${repo.description || 'Sem descrição'}</p>
          <a href="${repo.html_url}" target="_blank">Saber mais</a>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (erro) {
    console.error('Erro ao buscar repositórios:', erro);
    container.innerHTML = '<p>Erro ao carregar os projetos.</p>';
  }
}

buscarRepositorios();
