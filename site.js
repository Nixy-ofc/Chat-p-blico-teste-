// site.js
function abrirTela(id){
  document.querySelectorAll(".tela").forEach(el=>el.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
  if(id==="fases") carregarFases();
  if(id==="jogo") atualizarTelaJogo();
}

// Botões clicando
document.querySelectorAll('.botao').forEach(botao=>{
  botao.addEventListener('click',()=>{
    const som=document.getElementById('clickSound');
    if(som){som.currentTime=0; som.play();}
    botao.classList.add('clicado');
    setTimeout(()=>botao.classList.remove('clicado'),100);
  });
});

// Jogo
let faseAtual=1; 
const totalFases=30;
const respostas=["","a noite caiu","silêncio dominou tudo","nada se move","só a verdade permaneceu","mentiras desmoronaram rápido","restou apenas poeira","invenção","ninguém entendeu o que estava ali","deltarune","calendário juliano","blox fruits","vazio","luz","perfluorcarbono","cicata","bagdá","lua","loucura","contemplação","liberdade"];

function removerAcentos(str){return str.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();}
function carregarFases(){const container=document.getElementById("fasesContainer");container.innerHTML="";
for(let i=1;i<=totalFases;i+=4){const grupo=document.createElement("div");grupo.className="grupo-fase";
for(let j=0;j<4;j++){const faseNum=i+j;if(faseNum>totalFases) break;
const botao=document.createElement("button"); botao.textContent="Fase "+faseNum; botao.className="fase-botao";
botao.disabled=faseNum>faseAtual; botao.onclick=()=>abrirFase(faseNum); grupo.appendChild(botao);}
container.appendChild(grupo);}
}
function abrirFase(num){if(num<=faseAtual){faseAtual=num; abrirTela("jogo");}}
function atualizarTelaJogo(){
  document.getElementById("numeroFase").textContent=`fase ${faseAtual}`;
  const img=document.getElementById("imagemFase"); img.src=`imagem${faseAtual}.jpg`; img.alt=`Imagem da Fase ${faseAtual}`;
  document.querySelector(".resposta-input").value="";
}
function proximaFase(){const input=document.querySelector(".resposta-input"); const respostaUser=removerAcentos(input.value.trim());
if(faseAtual<respostas.length && respostaUser===removerAcentos(respostas[faseAtual])){faseAtual++; atualizarTelaJogo();}else{alert("Resposta incorreta. Tente novamente.");}}

// Matrix de fundo
const canvas=document.getElementById("matrixCanvas"); const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth; canvas.height=window.innerHeight;
const letras="01@#$%&*".split(""); const fontSize=16; const columns=canvas.width/fontSize; const drops=Array(Math.floor(columns)).fill(1);
function draw(){ ctx.fillStyle="rgba(0,0,0,0.1)"; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.fillStyle="#0F0"; ctx.font=fontSize+"px monospace";
for(let i=0;i<drops.length;i++){const text=letras[Math.floor(Math.random()*letras.length)];ctx.fillText(text,i*fontSize,drops[i]*fontSize
