// ============================================================
// CONFIGURAÇÃO DO FIREBASE
// ============================================================
// 1. Vai a https://console.firebase.google.com e cria um projeto.
// 2. Dentro do projeto: "Criar app" > ícone Web (</>) > regista a app.
// 3. O Firebase mostra-te um objeto firebaseConfig — copia-o
//    e substitui os valores abaixo pelos teus.
// 4. Ativa em "Build":
//      - Authentication > Sign-in method > Email/Password (ativar)
//      - Firestore Database > Criar base de dados (modo produção ou teste)
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyBDrNtKhOo26nYOMM8Z6jpXrJYequA3blE",
  authDomain: "level2-9fc35.firebaseapp.com",
  projectId: "level2-9fc35",
  storageBucket: "level2-9fc35.firebasestorage.app",
  messagingSenderId: "207685256571",
  appId: "1:207685256571:web:1e60394c3adce64b13a9de"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
