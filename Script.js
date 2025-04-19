let coresIniciais = {
    box1: '#777777',
    box2: '#ffffff',
    text: '#000000' // Esta propriedade não será diretamente usada para os textos agora
  };
  let novasCores = {
    box1: '#0f0f0f',
    box2: '#252525',
    text: '#ffffff'
  };
  
  let initialTextColors = {}; // Objeto para armazenar as cores iniciais dos textos
  
  function mudaracor() {
    const box1 = document.querySelector('.box1');
    const box2 = document.querySelector('.box2');
    const textos = document.querySelectorAll('.texto'); // Seleciona todos os elementos com a classe "texto"
    const chaveSeletora = document.getElementById('switch-shadow');
  
    if (!coresIniciais.box1) {
        coresIniciais.box1 = box1.style.backgroundColor;
        coresIniciais.box2 = box2.style.backgroundColor;
  
        // Captura as cores iniciais dos textos na primeira vez
        textos.forEach(texto => {
            initialTextColors[texto] = window.getComputedStyle(texto).color;
        });
    }
  
    if (chaveSeletora.checked) {
        box1.style.backgroundColor = novasCores.box1;
        box2.style.backgroundColor = novasCores.box2;
        textos.forEach(texto => {
            texto.style.color = novasCores.text;
        });
    } else {
        box1.style.backgroundColor = coresIniciais.box1;
        box2.style.backgroundColor = coresIniciais.box2;
        textos.forEach(texto => {
            // Restaura a cor inicial capturada
            texto.style.color = initialTextColors[texto] || coresIniciais.text; // Se não houver cor capturada, usa a cor preta
        });
    }
  }
  
  // Adiciona um ouvinte de eventos para o switch
  const switchShadow = document.getElementById('switch-shadow');
  if (switchShadow) {
    switchShadow.addEventListener('change', mudaracor);
  }
  

function escolherImagem() {
  const inputImagem = document.createElement('input');
  inputImagem.type = 'file';
  inputImagem.accept = 'image/*';

  inputImagem.onchange = function(event) {
    const arquivo = event.target.files[0];

    if (arquivo) {
      const reader = new FileReader();

      reader.onload = function(e) {
        const urlImagem = e.target.result;
        const ft_perfil = document.getElementById('ft_perfil');
        ft_perfil.style.backgroundImage = `url('${urlImagem}')`;
      };

      reader.readAsDataURL(arquivo);
    }
  };

  inputImagem.click();
}

function apagarImagem() {

        const ft_perfil = document.getElementById('ft_perfil');
        ft_perfil.style.backgroundImage = `url(img/img_user.jpg)`;
}

const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItems = document.querySelectorAll('.dropdown-item');

dropdownToggle.addEventListener('click', () => {
  dropdown.classList.toggle('open');
});

dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    dropdownToggle.textContent = item.textContent;
    dropdown.classList.remove('open');
  });
});

// Fechar o dropdown quando clicar fora
document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('open');
  }
});

const editarBioBtn = document.getElementById('editarBioBtn');
const salvarBioBtn = document.getElementById('salvarBioBtn');
const bioIdade = document.getElementById('idade_bio');
const bioVida = document.getElementById('vida_bio');
const bioCarreira = document.getElementById('carreira_bio');
const bioFormacao = document.getElementById('formacao_bio');
const generoContainer = document.getElementById('bio_genero_container');
const estadoCivilContainer = document.getElementById('bio_estadocivil_container');

let currentGenero = "Gênero";
let currentEstadoCivil = "Est. Cívil";

function enableBioEdit() {
  bioIdade.contentEditable = true;
  bioVida.contentEditable = true;
  bioCarreira.contentEditable = true;
  bioFormacao.contentEditable = true;

  generoContainer.innerHTML = `
    <select id="genero_select" name="genero" class="year-select">
      <option value="" disabled ${currentGenero === 'Gênero' ? 'selected' : ''}>Gênero</option>
      <option value="Masculino" ${currentGenero === 'Masculino' ? 'selected' : ''}>Masculino</option>
      <option value="Feminino" ${currentGenero === 'Feminino' ? 'selected' : ''}>Feminino</option>
    </select>
  `;

  estadoCivilContainer.innerHTML = `
    <select id="estadocivil_select" name="estado_civil" class="year-select">
      <option value="" disabled ${currentEstadoCivil === 'Est. Cívil' ? 'selected' : ''}>Est. Cívil</option>
      <option value="Solteiro" ${currentEstadoCivil === 'Solteiro' ? 'selected' : ''}>Solteiro</option>
      <option value="Casado" ${currentEstadoCivil === 'Casado' ? 'selected' : ''}>Casado</option>
    </select>
  `;

  editarBioBtn.style.display = 'none';
  salvarBioBtn.style.display = 'inline-block';
}

function disableBioEdit() {
  bioIdade.contentEditable = false;
  bioVida.contentEditable = false;
  bioCarreira.contentEditable = false;
  bioFormacao.contentEditable = false;

  const generoSelect = document.getElementById('genero_select');
  const estadoCivilSelect = document.getElementById('estadocivil_select');

  if (generoSelect) {
    currentGenero = generoSelect.value || "Gênero";
    generoContainer.innerHTML = `<p id="genero_bio" class="texto" data-bio-type="genero">${generoSelect.options[generoSelect.selectedIndex]?.text || "Gênero"}</p>`;
  }

  if (estadoCivilSelect) {
    currentEstadoCivil = estadoCivilSelect.value || "Est. Cívil";
    estadoCivilContainer.innerHTML = `<p id="estadocivil_bio" class="texto" data-bio-type="estado_civil">${estadoCivilSelect.options[estadoCivilSelect.selectedIndex]?.text || "Est. Cívil"}</p>`;
  }

  editarBioBtn.style.display = 'inline-block';
  salvarBioBtn.style.display = 'none';

  // Here you would typically save the updated bio data
  console.log('Bio Salva!');
  console.log('Idade:', bioIdade.textContent);
  console.log('Vida:', bioVida.textContent);
  console.log('Carreira:', bioCarreira.textContent);
  console.log('Formação:', bioFormacao.textContent);
  console.log('Gênero:', currentGenero);
  console.log('Estado Civil:', currentEstadoCivil);
}

editarBioBtn.addEventListener('click', enableBioEdit);
salvarBioBtn.addEventListener('click', disableBioEdit);

window.onload = function () {
  // Seleciona todas as imagens com a classe "img_destaque"
  const imagens = document.querySelectorAll('.img_destaque');

  imagens.forEach((img, index) => {
    // Adiciona um evento de clique a cada imagem
    img.addEventListener('click', () => {
      // Cria dinamicamente um input do tipo file
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      // Quando o usuário escolher um arquivo
      input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            // Substitui o src da imagem clicada com o conteúdo do arquivo
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

      // Dispara o clique no input
      input.click();
    });
  });
};