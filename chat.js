// Importa Firebase App e Realtime Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, push, onChildAdded, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Configuração do Firebase
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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ================= LOGIN =================
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  const nome = document.getElementById("nome").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const userRef = ref(db, "usuarios/" + nome);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    const dados = snapshot.val();
    if (dados.senha === senha) {
      iniciarChat(nome);
    } else {
      alert("Senha incorreta!");
    }
  } else {
    await set(userRef, { senha });
    alert("Conta criada com sucesso!");
    iniciarChat(nome);
  }
});

// ================= CHAT =================
function iniciarChat(nome) {
  document.getElementById("login").style.display = "none";
  document.getElementById("chat").style.display = "block";
  document.getElementById("userName").innerText = nome;

  const mensagensRef = ref(db, "mensagens");
  const mensagensDiv = document.getElementById("mensagens");

  // Recebe mensagens em tempo real
  onChildAdded(mensagensRef, (data) => {
    const msg = data.val();
    const div = document.createElement("div");
    div.textContent = `${msg.nome}: ${msg.texto}`;
    mensagensDiv.appendChild(div);
    mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
  });

  // Envia mensagem
  document.getElementById("enviarBtn").addEventListener("click", () => {
    const msgInput = document.getElementById("mensagemInput");
    const texto = msgInput.value.trim();
    if (texto) {
      push(mensagensRef, { nome, texto });
      msgInput.value = "";
    }
  });
  }
