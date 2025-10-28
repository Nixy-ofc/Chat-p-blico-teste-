// ======== Variáveis ========
let faseAtual = 1;
const totalFases = 30;
const respostas = ["","a noite caiu","silêncio dominou tudo","nada se move","só a verdade permaneceu","mentiras desmoronaram rápido","restou apenas poeira","invenção","ninguém entendeu o que estava ali","deltarune","calendário juliano","blox fruits","vazio","luz","perfluorcarbono","cicata","bagdá","lua","loucura","contemplação","liberdade"];

function removerAcentos(str){
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
}

// ======== Controle de telas ========
function abrirTela(id){
  document.querySelectorAll(".tela").forEach(el=>el.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
  if(id==="fases") carregarFases();
  if(id==="jogo") atualizarTelaJogo();
}

// ======== Fases ========
function carregarFases(){
  const container = document.getElementById("fasesContainer");
  container.innerHTML = "";
  for(let i=1;i<=totalFases;i+=4){
    const grupo = document.createElement("div");
    grupo.className = "grupo-fase";
    for(let j=0;j<4;j++){
      const faseNum = i+j;
      if(faseNum>totalFases) break;
      const botao = document.createElement("button");
      botao.textContent = "Fase " + faseNum;
      botao.className = "fase-botao";
      botao.disabled = faseNum > faseAtual;
      botao.addEventListener("click", ()=> abrirFase(faseNum));
      grupo.appendChild(botao);
    }
    container.appendChild(grupo);
  }
}

function abrirFase(num){
  if(num <= faseAtual){ faseAtual = num; abrirTela("jogo"); }
}

function atualizarTelaJogo(){
  document.getElementById("numeroFase").textContent = `fase ${faseAtual}`;
  const img = document.getElementById("imagemFase");
  img.src = `imagem${faseAtual}.jpg`;
  img.alt = `Imagem da Fase ${faseAtual}`;
  document.querySelector(".resposta-input").value = "";
}

function proximaFase(){
  const input = document.querySelector(".resposta-input");
  const respostaUser = removerAcentos(input.value.trim());
  if(faseAtual < respostas.length && respostaUser === removerAcentos(respostas[faseAtual])){
    faseAtual++;
    atualizarTelaJogo();
  } else {
    alert("Resposta incorreta. Tente novamente.");
  }
}

// ======== Botões ========
const clickSound = document.getElementById("clickSound");

document.querySelectorAll(".botao").forEach(botao=>{
  botao.addEventListener("click", ()=>{
    if(clickSound){ clickSound.currentTime=0; clickSound.play(); }
    botao.classList.add("clicado");
    setTimeout(()=>botao.classList.remove("clicado"),100);
  });
});

document.querySelector(".botao-jogar").addEventListener("click", ()=> abrirTela("jogo"));
document.querySelector(".botao-fases").addEventListener("click", ()=> abrirTela("fases"));
document.querySelector(".botao-config").addEventListener("click", ()=> abrirTela("config"));
document.querySelector(".botao-chat").addEventListener("click", ()=> abrirTela("chat"));
document.querySelectorAll(".botao-voltar").forEach(b=> b.addEventListener("click", ()=> abrirTela("inicio")));
document.querySelector(".botao-responder").addEventListener("click", proximaFase);

// ======== Matrix (opcional) ========
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
