const legenda = document.getElementById('legenda');
const imagem = document.getElementById('imagem');
const novaLegenda = document.querySelector('.nova-legenda');
const legenda1 = document.getElementById('legenda1');
const legenda2 = document.getElementById('legenda2');
const legenda3 = document.getElementById('legenda3');

const texto = [
  "Seja bem-vindo guerreiro, pensei que ninguém mais entraria nessa sala sombria",
  "Eu estou vivo por muito tempo porque a radiação causou uma mutação em mim e não me deixa morrer, estou passando por um sofrimento há anos",
  "Você parece confuso, que estranho, pensei que a pessoa que te controla por trás das telas saberia quem eu sou, mas parece que cortaram meu nome da história",
  "Então prazer, eu sou o Dr. Salocin, o criador do plástico MAZE, já que você veio até aqui, por que não te mostro minha história ?...",
];

let indice = 0;

function atualizarLegenda() {
  legenda.textContent = texto[indice];
  legenda.style.opacity = 0; // Começa apagada
  setTimeout(() => {
    legenda.style.opacity = 1; // Aumenta o brilho
  }, 100); // Leve atraso para permitir que o fade-in funcione
  indice++;
  
  if (indice < texto.length) {
    setTimeout(atualizarLegenda, 3000); // Troca de legenda a cada 3 segundos
  } else {
    setTimeout(mostrarImagem, 1000); // Mostra a imagem após as legendas
  }
}

function mostrarImagem() {
  imagem.style.display = 'block';
}

imagem.addEventListener('click', () => {
  legenda.style.display = 'none'; // Oculta as legendas iniciais
  imagem.style.display = 'none'; // Oculta a imagem
  novaLegenda.style.display = 'block'; // Mostra as novas legendas
  atualizarNovasLegendas();
  
  // Inicia a contagem para redirecionar após a última legenda
  setTimeout(() => {
    finalizarHistoria(); // Chama a função para finalizar a história
  }, 600000); // 10 minutos
});

const novasTextos = [
  "Em um laboratório no Butão...",
  "Voz 1 - O experimento 1578 foi quase um sucesso, a ideia de juntar tantos plásticos e adicionar plutônio para lhe dar uma resistência que dure até os fins dos tempos foi algo bem pensado pelos superiores, mas ainda falta um toque especial, ele ainda não pode ser moldado e está muito rígido, o que atrapalha na criação de produtos usando ele, então teremos que refazer.",
  "Voz 2 - Mas senhor, esse foi o 20° experimento só hoje, vamos encerrar o dia e recomeçar amanhã!",
  "Voz 1 - Se sairmos agora, perderemos toda a concentração que tivemos até agora, e eu já sei como podemos corrigir isso, o plutônio, apesar de dar liga, ainda não é o suficiente, então vamos colocar ósmio, que em teoria é até mais rígido que o plutônio, porém, ao misturar com urânio, ele corrige essa falha e confere a flexibilidade e resistência que precisamos no nosso produto.",
  "Voz 2 - Entendo… Mas essa mistura não é considerada tóxica senhor? Não tem o risco de, se der errado, explodir toda a base?",
  "Voz 1 - Certamente, mas já tenho a solução, vamos para a sala OB, lá não terá esse problema.",
  "Voz 2 - Mas os chefes permitiram, senhor? A sala OB é só usada em casos extremos.",
  "Voz 1 - Permitir eles não permitiram, mas quem se importa, o MAZE pode revolucionar o mercado de plásticos, e consequentemente de embalagens, produtos, e muito mais, seremos o top 1 do mercado.",
  "Voz 2 - Então está bom, eu irei com você nessa missão senhor",
  "(após 5 horas de testes)",
  "Voz 1 - Heh, e não é que funcionou mesmo, aí está parceiro, o experimento 1579 é um sucesso.",
  "Voz 2 - Senhor, de acordo com o maquinário, o nível de radiação dele está acima da média, pessoas mais sensíveis terão grandes problemas com isso.",
  "Voz 1 - Entenda, é um avanço absurdo para a humanidade, de algumas pessoas morrerem, eu não me importo.",
  "Voz 2 - Senhor, isso é loucura, se não sairmos daqui, nós mesmos podemos acabar morrendo em pouco tempo, vamos embora.",
  "Voz 1 - Se essa for a vontade da ciência, que morramos, eu não sairei daqui até amanhã.",
  "Voz 2 - Que assim seja, eu aceitei te ajudar até aqui, mas não irei prosseguir, eu estou me retirando daqui.",
  "Voz 1 - Fraco e insolente, vá embora e nunca mais chegue perto de mim, vou comemorar o sucesso da minha criação",
  "Fim",
];

let novaIndice = 0;

function atualizarNovasLegendas() {
  if (novaIndice >= novasTextos.length) {
    finalizarHistoria(); // Se atingiu o fim, chama a função
    return; // Sai da função
  }

  legenda1.textContent = novasTextos[novaIndice % novasTextos.length];
  legenda2.textContent = novasTextos[(novaIndice + 1) % novasTextos.length];
  legenda3.textContent = novasTextos[(novaIndice + 2) % novasTextos.length];
  
  novaIndice += 3; // Incrementa o índice para as próximas 3 legendas

  setTimeout(() => {
    atualizarNovasLegendas();
  }, 10000); // Troca as legendas a cada 10 segundos
}

function finalizarHistoria() {
  // Oculta as novas legendas
  novaLegenda.style.display = 'none';

  // Mostra a letra "E" e a mensagem
  setTimeout(() => {
    const mensagem = document.getElementById('mensagem');
    mensagem.style.display = 'block'; // Mostra a mensagem
    mensagem.style.opacity = 0; // Começa apagada
    setTimeout(() => {
      mensagem.style.opacity = 1; // Aumenta o brilho
    }, 100); // Leve atraso para permitir que o fade-in funcione

    // Redireciona após 10 segundos
    setTimeout(() => {
      window.location.href = "../Projeto MAZE.html"; // Redireciona para o menu principal
    }, 10000);
  }, 5000); // Espera 5 segundos após a última legenda
}

atualizarLegenda(); // Inicia o processo