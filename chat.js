// ===================== CHAT.JS =====================

// Importa Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, push, onChildAdded, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// ======== Configuração Firebase ========
const firebaseConfig = {
  apiKey: "AIzaSyD4PrkEaK0aOx14YR7JgYqcRpe2GaFxPRE",
  authDomain: "chat-publico-enibs.firebaseapp.com",
  databaseURL: "https://chat-publico-enibs-default-rtdb.firebaseio.com",
  projectId: "chat-publico-enibs",
  storageBucket: "chat-publico-enibs.firebasestorage.app",
  messagingSenderId: "945844062871",
  appId: "1:945844062871:web:fd185925432b2de831f7d2",
  measurementId: "G-Z2R3ZLGGZN"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let usuarioAtual = null;

// ======== Botão de Login ========
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", async () => {
  const nome = document.getElementById("nome").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !senha) { alert("Preencha todos os campos!"); return; }

  const userRef = ref(db, "usuarios/" + nome);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    if (snapshot.val().senha === senha) {
      usuarioAtual = nome;
      alert("Login realizado como " + nome);
      abrirTela("chat");
    } else {
      alert("Senha incorreta!");
    }
  } else {
    await set(userRef, { senha });
    usuarioAtual = nome;
    alert("Conta criada com sucesso!");
    abrirTela("chat");
  }
});

// ======== Enviar Mensagem ========
const enviarBtn = document.getElementById("enviarBtn");
enviarBtn.addEventListener("click", async () => {
  if (!usuarioAtual) { alert("Entre antes de enviar mensagens"); return; }

  const msgInput = document.getElementById("mensagemInput");
  const texto = msgInput.value.trim();
  if (!texto) return;

  await push(ref(db, "mensagens"), { usuario: usuarioAtual, texto });
  msgInput.value = "";
});

// ======== Receber Mensagens ========
const mensagensDiv = document.getElementById("mensagens");
const mensagensRef = ref(db, "mensagens");

onChildAdded(mensagensRef, (data) => {
  const msg = data.val();
  const div = document.createElement("div");
  div.textContent = `${msg.usuario}: ${msg.texto}`;
  mensagensDiv.appendChild(div);
  mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
});
