// chat.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// === Configuração do Firebase ===
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

// Elementos HTML
const loginDiv = document.getElementById("login");
const chatDiv = document.getElementById("chat");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const currentUserSpan = document.getElementById("currentUser");

loginDiv.style.display = "block";

let currentUser = "";

// Login ou registro
loginBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  loginError.textContent = "";

  if (!username || !password) return;

  const userRef = ref(db, "users/" + username);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    if (snapshot.val().password === password) {
      loginSuccess(username);
    } else {
      loginError.textContent = "Senha incorreta!";
    }
  } else {
    // Cria usuário novo
    await push(ref(db, "users/" + username), { password });
    loginSuccess(username);
  }
});

function loginSuccess(username) {
  currentUser = username;
  currentUserSpan.textContent = currentUser;
  loginDiv.style.display = "none";
  chatDiv.style.display = "block";
  listenMessages();
}

// Enviar mensagem
sendBtn.addEventListener("click", () => {
  const text = messageInput.value.trim();
  if (text) {
    push(ref(db, "chat"), { user: currentUser, text: text });
    messageInput.value = "";
  }
});

// Receber mensagens
function listenMessages() {
  const messagesRef = ref(db, "chat");
  onChildAdded(messagesRef, (snapshot) => {
    const msg = snapshot.val();
    const p = document.createElement("p");
    p.textContent = `${msg.user}: ${msg.text}`;
    messagesDiv.appendChild(p);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
  }
