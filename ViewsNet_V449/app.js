// ============================================================
// VIEWSNET · Chat em tempo real (Firebase Auth + Firestore)
// Nomes de utilizador únicos + verificação de email + conversas 1-para-1
// ============================================================

// ---------- Ícones (SVG) — substituem os antigos emojis ----------
const iconCheck = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const iconX = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
const iconTrash = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6h12Z"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';
const iconForward = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 10 20 15 15 20"/><path d="M4 4v6a4 4 0 0 0 4 4h12"/></svg>';
const iconLock = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
const iconGlobe = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3c3.2 3.4 3.2 14.6 0 18M12 3c-3.2 3.4-3.2 14.6 0 18"/></svg>';
const iconHeart = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.7-4.35-9.5-8.5C.7 9 2.3 5 5.8 5c2 0 3.5 1.2 4.5 2.8C11.3 6.2 12.8 5 14.8 5c3.5 0 5.1 4 3.3 7.5C15.3 16.65 12 21 12 21Z"/></svg>';
const iconEye = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
// Ícone padrão de perfil (mostrado no ecrã de perfil quando não há foto)
const iconUserDefault = '<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.2" r="3.6"/><path d="M4.7 20c0-3.9 3.27-7 7.3-7s7.3 3.1 7.3 7"/></svg>';

// ---------- Elementos: auth ----------
const authScreen = document.getElementById('auth-screen');
const verifyScreen = document.getElementById('verify-screen');
const chatScreen = document.getElementById('chat-screen');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

// ---------- Elementos: login/registo com Google ----------
const googleLoginBtn = document.getElementById('google-login-btn');
const googleRegisterBtn = document.getElementById('google-register-btn');
const googleProvider = new firebase.auth.GoogleAuthProvider();

// ---------- Elementos: redefinir palavra-passe ----------
const forgotPasswordLink = document.getElementById('forgot-password-link');
const resetPasswordModal = document.getElementById('reset-password-modal');
const resetPasswordClose = document.getElementById('reset-password-close');
const resetPasswordEmailInput = document.getElementById('reset-password-email');
const resetPasswordError = document.getElementById('reset-password-error');
const resetPasswordSuccess = document.getElementById('reset-password-success');
const resetPasswordSubmitBtn = document.getElementById('reset-password-submit');

// ---------- Elementos: política de privacidade ----------
const privacyModal = document.getElementById('privacy-modal');
const privacyCloseBtn = document.getElementById('privacy-close');
const loginPrivacyLink = document.getElementById('login-privacy-link');

// ---------- Elementos: escolher nome de utilizador (1ª vez com Google) ----------
const usernameScreen = document.getElementById('username-screen');
const usernameForm = document.getElementById('username-form');
const usernameSetupError = document.getElementById('username-setup-error');
const usernameSetupLogout = document.getElementById('username-setup-logout');

// ---------- Elementos: verificação ----------
const verifyEmailEl = document.getElementById('verify-email');
const verifyError = document.getElementById('verify-error');
const verifySuccess = document.getElementById('verify-success');
const checkVerifiedBtn = document.getElementById('check-verified-btn');
const resendBtn = document.getElementById('resend-btn');
const verifyLogoutLink = document.getElementById('verify-logout');

// ---------- Elementos: chat ----------
const findForm = document.getElementById('find-form');
const findInput = document.getElementById('find-input');
const findResult = document.getElementById('find-result');
const conversationsListEl = document.getElementById('conversations-list');
const messagesEl = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const meAvatar = document.getElementById('me-avatar');
const meName = document.getElementById('me-name');
const logoutBtn = document.getElementById('logout-btn');
const chatTitle = document.getElementById('chat-title');
const chatSub = document.getElementById('chat-sub');
const chatHeaderInfo = document.getElementById('chat-header-info');
const chatFriendAvatar = document.getElementById('chat-friend-avatar');
const chatFriendStatusDot = document.getElementById('chat-friend-status-dot');
const meStatusDot = document.getElementById('me-status-dot');
const meProfileBtn = document.getElementById('me-profile-btn');

// ---------- Elementos: modal de perfil ----------
const profileModal = document.getElementById('profile-modal');
const profileCloseBtn = document.getElementById('profile-close');
const profileAvatarBig = document.getElementById('profile-avatar-big');
const profileStatusDot = document.getElementById('profile-status-dot');
const profileNameEl = document.getElementById('profile-name');
const profileUsernameEl = document.getElementById('profile-username');
const profileExtraEl = document.getElementById('profile-extra');

// ---------- Elementos: modal de reencaminhar ----------
const forwardModal = document.getElementById('forward-modal');
const forwardCloseBtn = document.getElementById('forward-close');
const forwardListEl = document.getElementById('forward-list');

// ---------- Elementos: modal de imagem grande ----------
const imageModal = document.getElementById('image-modal');
const imageModalClose = document.getElementById('image-modal-close');
const imageModalImg = document.getElementById('image-modal-img');

// ---------- Elementos: navegação mobile (voltar à lista) ----------
const chatBackBtn = document.getElementById('chat-back-btn');

// ---------- Elementos: áudio (gravar e enviar) ----------
const micBtn = document.getElementById('mic-btn');
const inputArea = document.getElementById('input-area');
const recordingArea = document.getElementById('recording-area');
const recordingTimeEl = document.getElementById('recording-time');
const recordingCancelBtn = document.getElementById('recording-cancel-btn');

// ---------- Elementos: stories (fotos, duram 24h) ----------
const myStoryItem = document.getElementById('my-story-item');
const myStoryAvatar = document.getElementById('my-story-avatar');
const myStoryRing = document.getElementById('my-story-ring');
const myStoryBadge = document.getElementById('my-story-badge');
const storiesListEl = document.getElementById('stories-list');
const storyInput = document.getElementById('story-input');
const storyModal = document.getElementById('story-modal');
const storyCloseBtn = document.getElementById('story-close-btn');
const storyDeleteBtn = document.getElementById('story-delete-btn');
const storyViewImg = document.getElementById('story-view-img');
const storyViewAvatar = document.getElementById('story-view-avatar');
const storyViewName = document.getElementById('story-view-name');
const storyViewTime = document.getElementById('story-view-time');
const storyProgressFill = document.getElementById('story-progress-fill');
const storyPrevBtn = document.getElementById('story-prev-btn');
const storyNextBtn = document.getElementById('story-next-btn');
const storyLikeBtn = document.getElementById('story-like-btn');
const storyViewsBtn = document.getElementById('story-views-btn');
const storyViewsCount = document.getElementById('story-views-count');
const storyViewersPanel = document.getElementById('story-viewers-panel');
const storyViewersList = document.getElementById('story-viewers-list');
const storyViewersClose = document.getElementById('story-viewers-close');

let ultimaListaConversas = [];
let forwardMessageId = null;
let forwardMessageData = null;

let unsubscribeMessages = null;
let unsubscribeConversations = null;
let currentConversationId = null;
let currentFriend = null; // { uid, name }
let presenceAtiva = false;

// ---------- Estado: mensagens não lidas / entregues (badge na sidebar) ----------
let unreadCounts = {}; // convId -> nº de mensagens não lidas recebidas
let unreadListeners = {}; // convId -> função para cancelar o listener

// ---------- Estado: seguir / seguidores ----------
let seguindoCache = {}; // uid -> true/false (se EU sigo esse uid)

// ---------- Estado: acesso a perfis privados (código de perfil) ----------
let acessoPerfilCache = {}; // uid do dono -> true/false (se EU já tenho acesso)
let acessoPerfilEmVerificacao = new Set(); // uids cujo acesso já está a ser verificado (evita pedidos repetidos)

// ---------- Estado: visualizações e gostos do story em exibição ----------
let unsubscribeStoryViews = null;
let unsubscribeStoryLike = null;

// ---------- Estado: gravação de áudio ----------
let mediaRecorder = null;
let mediaStream = null;
let audioChunks = [];
let isRecording = false;
let recordingSeconds = 0;
let recordingTimerId = null;
const RECORDING_MAX_SECONDS = 90; // limite para o ficheiro caber no Firestore (1MB/doc)

// ---------- Estado: stories ----------
const STORY_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas
let unsubscribeStories = null;
let storiesPorUtilizador = {}; // uid -> [stories ordenadas por data, mais antiga primeiro]
let storiesVistas = {}; // uid -> true (já vistas nesta sessão)
let storyViewerFila = []; // lista de uids a ver em sequência
let storyViewerIndex = 0;
let storyItemIndex = 0; // índice dentro dos stories da pessoa atual
let storyAutoTimerId = null;
const STORY_VIEW_MS = 5000; // duração de cada foto no visualizador

// ============================================================
// Ver imagem em tamanho grande (em vez de abrir noutra página)
// ============================================================
function abrirImagemGrande(url) {
  imageModalImg.src = url;
  imageModal.classList.remove('hidden');
}
function fecharImagemGrande() {
  imageModal.classList.add('hidden');
  imageModalImg.src = '';
}
imageModalClose.addEventListener('click', fecharImagemGrande);
imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) fecharImagemGrande();
});

// ============================================================
// Navegação em telemóvel: botão "voltar" no cabeçalho do chat
// volta a mostrar a lista de conversas (a sidebar).
// ============================================================
chatBackBtn.addEventListener('click', () => {
  chatScreen.classList.remove('chat-open');
});

// ============================================================
// Alternar Entrar / Criar conta
// ============================================================
showRegisterLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
});
showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// ============================================================
// Registo — nome de utilizador único + email + senha
// ============================================================
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  registerError.textContent = '';

  const nomeOriginal = document.getElementById('register-name').value.trim();
  const usernameLower = nomeOriginal.toLowerCase();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;

  if (!/^[a-z0-9_]+$/.test(usernameLower)) {
    registerError.textContent = 'O nome de utilizador só pode ter letras, números e underscore.';
    return;
  }

  const submitBtn = registerForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  const usernameRef = db.collection('usernames').doc(usernameLower);

  try {
    // 1. Cria a conta no Firebase Authentication primeiro — as regras do
    //    Firestore exigem estar autenticado para ler/escrever "usernames",
    //    por isso a verificação de disponibilidade só pode acontecer depois.
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    const user = cred.user;
    await user.updateProfile({ displayName: nomeOriginal });

    // 2. Verifica e reserva o nome de utilizador + cria o perfil (transação atómica)
    try {
      await db.runTransaction(async (tx) => {
        const check = await tx.get(usernameRef);
        if (check.exists) throw new Error('username-taken');
        tx.set(usernameRef, { uid: user.uid, name: nomeOriginal });
        tx.set(db.collection('users').doc(user.uid), {
          name: nomeOriginal,
          usernameLower,
          email,
          photoURL: null
        });
      });
    } catch (txErr) {
      // alguém ficou com o nome entretanto: desfaz a conta criada
      await user.delete().catch(() => {});
      registerError.textContent = 'Esse nome de utilizador acabou de ser ocupado. Tenta outro.';
      submitBtn.disabled = false;
      return;
    }

    // 4. Envia o email de verificação
    await user.sendEmailVerification();
    // onAuthStateChanged trata da transição para o ecrã de verificação

  } catch (err) {
    console.error('Erro no registo:', err);
    registerError.textContent = traduzErro(err);
  }
  submitBtn.disabled = false;
});

// ============================================================
// Login
// ============================================================
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.textContent = '';
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    loginError.textContent = traduzErro(err);
  }
});

// ============================================================
// Login / registo automático com conta Google
// ============================================================
async function entrarComGoogle(errorEl, btn) {
  errorEl.textContent = '';
  if (btn) btn.disabled = true;
  try {
    // Cria a conta automaticamente se ainda não existir, ou entra se já existir.
    // onAuthStateChanged trata do resto (verificação de email, se falta
    // escolher nome de utilizador, ou ir direto para o chat).
    await auth.signInWithPopup(googleProvider);
  } catch (err) {
    if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
      errorEl.textContent = traduzErro(err);
    }
  }
  if (btn) btn.disabled = false;
}

googleLoginBtn.addEventListener('click', () => entrarComGoogle(loginError, googleLoginBtn));
googleRegisterBtn.addEventListener('click', () => entrarComGoogle(registerError, googleRegisterBtn));

// ============================================================
// Escolher nome de utilizador (1ª vez a entrar com uma conta Google)
// ============================================================
usernameForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  usernameSetupError.textContent = '';
  const user = auth.currentUser;
  if (!user) return;

  const nomeOriginal = document.getElementById('username-setup-input').value.trim();
  const usernameLower = nomeOriginal.toLowerCase();

  if (!/^[a-z0-9_]+$/.test(usernameLower)) {
    usernameSetupError.textContent = 'O nome de utilizador só pode ter letras, números e underscore.';
    return;
  }

  const submitBtn = usernameForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  const usernameRef = db.collection('usernames').doc(usernameLower);

  try {
    await db.runTransaction(async (tx) => {
      const check = await tx.get(usernameRef);
      if (check.exists) throw new Error('username-taken');
      const nomeExibido = user.displayName || nomeOriginal;
      tx.set(usernameRef, { uid: user.uid, name: nomeExibido });
      tx.set(db.collection('users').doc(user.uid), {
        name: nomeExibido,
        usernameLower,
        email: user.email || null,
        photoURL: user.photoURL || null
      });
    });
    mostrarChat(user);
  } catch (err) {
    if (err.message === 'username-taken') {
      usernameSetupError.textContent = 'Esse nome de utilizador já está a ser usado. Tenta outro.';
    } else {
      console.error('Erro ao criar nome de utilizador:', err);
      usernameSetupError.textContent = traduzErro(err);
    }
  }
  submitBtn.disabled = false;
});

usernameSetupLogout.addEventListener('click', async (e) => {
  e.preventDefault();
  await auth.signOut();
});

// ============================================================
// Redefinir palavra-passe (recebe email do Firebase)
// ============================================================
forgotPasswordLink.addEventListener('click', (e) => {
  e.preventDefault();
  resetPasswordError.textContent = '';
  resetPasswordSuccess.textContent = '';
  resetPasswordEmailInput.value = document.getElementById('login-email').value.trim();
  resetPasswordModal.classList.remove('hidden');
});

resetPasswordClose.addEventListener('click', () => resetPasswordModal.classList.add('hidden'));
resetPasswordModal.addEventListener('click', (e) => {
  if (e.target === resetPasswordModal) resetPasswordModal.classList.add('hidden');
});

resetPasswordSubmitBtn.addEventListener('click', async () => {
  resetPasswordError.textContent = '';
  resetPasswordSuccess.textContent = '';
  const email = resetPasswordEmailInput.value.trim();
  if (!email) {
    resetPasswordError.textContent = 'Introduz o teu email.';
    return;
  }
  resetPasswordSubmitBtn.disabled = true;
  try {
    await auth.sendPasswordResetEmail(email);
    resetPasswordSuccess.textContent = 'Se existir uma conta com esse email, vais receber uma mensagem do Firebase com um link para escolheres uma nova palavra-passe.';
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      // Não revela se a conta existe ou não, por segurança.
      resetPasswordSuccess.textContent = 'Se existir uma conta com esse email, vais receber uma mensagem do Firebase com um link para escolheres uma nova palavra-passe.';
    } else {
      resetPasswordError.textContent = traduzErro(err);
    }
  }
  resetPasswordSubmitBtn.disabled = false;
});

// ============================================================
// Política de privacidade
// ============================================================
loginPrivacyLink.addEventListener('click', (e) => {
  e.preventDefault();
  privacyModal.classList.remove('hidden');
});
privacyCloseBtn.addEventListener('click', () => privacyModal.classList.add('hidden'));
privacyModal.addEventListener('click', (e) => {
  if (e.target === privacyModal) privacyModal.classList.add('hidden');
});

// ============================================================
// Ecrã de verificação de email
// ============================================================
checkVerifiedBtn.addEventListener('click', async () => {
  verifyError.textContent = '';
  verifySuccess.textContent = '';
  const user = auth.currentUser;
  if (!user) return;
  await user.reload();
  if (user.emailVerified) {
    mostrarChat(user);
  } else {
    verifyError.textContent = 'Ainda não confirmámos o teu email. Verifica a caixa de entrada (e o spam).';
  }
});

resendBtn.addEventListener('click', async () => {
  verifyError.textContent = '';
  verifySuccess.textContent = '';
  const user = auth.currentUser;
  if (!user) return;
  try {
    await user.sendEmailVerification();
    verifySuccess.textContent = 'Email reenviado! Verifica também a pasta de spam.';
  } catch (err) {
    verifyError.textContent = traduzErro(err);
  }
});

verifyLogoutLink.addEventListener('click', async (e) => {
  e.preventDefault();
  await auth.signOut();
});

// ============================================================
// Logout (a partir do chat)
// ============================================================
logoutBtn.addEventListener('click', async () => {
  await ficarOffline();
  await auth.signOut();
});

// ============================================================
// Estado de autenticação — decide qual ecrã mostrar
// ============================================================
auth.onAuthStateChanged(async (user) => {
  esconderTudo();
  if (!user) {
    authScreen.classList.remove('hidden');
    pararListeners();
    return;
  }

  await user.reload();
  if (!user.emailVerified) {
    verifyEmailEl.textContent = user.email;
    verifyScreen.classList.remove('hidden');
    return;
  }

  // Utilizadores que entraram com Google pela 1ª vez ainda não têm um
  // documento em "users" (nem nome de utilizador reservado) — pede-se
  // antes de avançar para o chat.
  try {
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (!userDoc.exists) {
      usernameScreen.classList.remove('hidden');
      return;
    }
  } catch (err) {
    console.error('Erro ao verificar perfil:', err);
  }

  mostrarChat(user);
});

function esconderTudo() {
  authScreen.classList.add('hidden');
  verifyScreen.classList.add('hidden');
  usernameScreen.classList.add('hidden');
  chatScreen.classList.add('hidden');
}

function mostrarChat(user) {
  esconderTudo();
  chatScreen.classList.remove('hidden');

  const nome = user.displayName || user.email;
  meAvatar.dataset.avatarUid = user.uid;
  meName.dataset.nameUid = user.uid;
  meStatusDot.dataset.statusUid = user.uid;
  meName.textContent = nome;
  meAvatar.textContent = nome.charAt(0);

  observarUsuario(user.uid);
  escutarConversas(user);
  escutarStories(user);
  iniciarPresenca(user.uid);
}

function pararListeners() {
  if (unsubscribeMessages) unsubscribeMessages();
  if (unsubscribeConversations) unsubscribeConversations();
  if (unsubscribeStories) unsubscribeStories();
  if (unsubscribeStoryViews) unsubscribeStoryViews();
  if (unsubscribeStoryLike) unsubscribeStoryLike();
  Object.values(usersListeners).forEach((unsub) => unsub());
  Object.keys(usersListeners).forEach((k) => delete usersListeners[k]);
  Object.keys(usersCache).forEach((k) => delete usersCache[k]);
  Object.values(unreadListeners).forEach((unsub) => unsub());
  Object.keys(unreadListeners).forEach((k) => delete unreadListeners[k]);
  Object.keys(unreadCounts).forEach((k) => delete unreadCounts[k]);
  Object.keys(seguindoCache).forEach((k) => delete seguindoCache[k]);
  Object.keys(acessoPerfilCache).forEach((k) => delete acessoPerfilCache[k]);
  acessoPerfilEmVerificacao.clear();
  currentConversationId = null;
  currentFriend = null;
  messagesEl.innerHTML = '';
  conversationsListEl.innerHTML = '';
  storiesPorUtilizador = {};
  storiesVistas = {};
  storiesListEl.innerHTML = '';
  chatScreen.classList.remove('chat-open');
  cancelarGravacao();
  pararPresenca();
}

// ============================================================
// Modo online — a própria pessoa ativa/desativa. Enquanto ativo, a
// app atualiza "online: true/false" consoante o separador está
// visível ou não; enquanto desativado, nunca aparece como online
// para ninguém.
// ============================================================
async function iniciarPresenca(uid) {
  if (presenceAtiva) return;
  presenceAtiva = true;

  try {
    const snap = await db.collection('users').doc(uid).get();
    const onlineEnabled = snap.exists && snap.data().onlineEnabled === false ? false : true;
    if (onlineEnabled) {
      await db.collection('users').doc(uid).set({
        online: true,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }
  } catch (err) {
    console.error('Erro ao iniciar presença:', err);
  }

  document.addEventListener('visibilitychange', aoMudarVisibilidade);
  window.addEventListener('beforeunload', aoFecharPagina);
}

function pararPresenca() {
  if (!presenceAtiva) return;
  presenceAtiva = false;
  document.removeEventListener('visibilitychange', aoMudarVisibilidade);
  window.removeEventListener('beforeunload', aoFecharPagina);
}

function aoMudarVisibilidade() {
  const user = auth.currentUser;
  if (!user) return;
  const info = usersCache[user.uid];
  if (info && info.onlineEnabled === false) return; // modo online desativado
  db.collection('users').doc(user.uid).set({
    online: document.visibilityState === 'visible',
    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true }).catch(() => {});
}

function aoFecharPagina() {
  const user = auth.currentUser;
  if (!user) return;
  db.collection('users').doc(user.uid).set({ online: false }, { merge: true }).catch(() => {});
}

async function ficarOffline() {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  try {
    await db.collection('users').doc(uid).set({ online: false }, { merge: true });
  } catch (err) {
    console.error('Erro ao ficar offline:', err);
  }
}

// Mostra/esconde a bolinha verde de "online" num avatar
function aplicarStatusDot(el, info) {
  if (!el) return;
  const online = !!(info && info.onlineEnabled !== false && info.online === true);
  el.classList.toggle('online', online);
}

// ============================================================
// Cache ao vivo de utilizadores (nome + foto + estado online +
// biografia + privacidade), para os avatares, nomes e indicadores
// se atualizarem sozinhos em qualquer sítio da app.
// ============================================================
const usersCache = {};
const usersListeners = {};

function observarUsuario(uid) {
  if (usersListeners[uid]) return;
  usersListeners[uid] = db.collection('users').doc(uid).onSnapshot((snap) => {
    if (!snap.exists) return;
    const d = snap.data();
    usersCache[uid] = {
      name: d.name,
      photoURL: d.photoURL || null,
      usernameLower: d.usernameLower,
      bio: d.bio || '',
      onlineEnabled: d.onlineEnabled !== false,
      online: d.online === true,
      privateProfile: d.privateProfile === true
    };
    atualizarAvataresDoUid(uid);
  });
}

function atualizarAvataresDoUid(uid) {
  const info = usersCache[uid];
  if (!info) return;

  document.querySelectorAll(`[data-avatar-uid="${uid}"]`).forEach((el) => aplicarAvatar(el, info.name, info.photoURL));
  document.querySelectorAll(`[data-name-uid="${uid}"]`).forEach((el) => { el.textContent = info.name; });
  document.querySelectorAll(`[data-status-uid="${uid}"]`).forEach((el) => aplicarStatusDot(el, info));

  if (currentFriend && currentFriend.uid === uid) {
    currentFriend.name = info.name;
    chatSub.textContent = (info.onlineEnabled && info.online)
      ? `Online agora`
      : `A conversar com @${info.usernameLower || info.name}`;
  }
}

function aplicarAvatar(el, name, photoURL) {
  if (photoURL) {
    el.style.backgroundImage = `url(${photoURL})`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.textContent = '';
  } else {
    el.style.backgroundImage = '';
    el.textContent = (name || '?').charAt(0).toUpperCase();
  }
}

// Igual ao anterior, mas usado no avatar grande do ecrã de perfil: quando
// não há foto, mostra um ícone de perfil em vez de uma letra.
function aplicarAvatarPerfil(el, name, photoURL) {
  if (photoURL) {
    el.classList.remove('avatar-icon-default');
    el.style.backgroundImage = `url(${photoURL})`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.innerHTML = '';
  } else {
    el.style.backgroundImage = '';
    el.classList.add('avatar-icon-default');
    el.innerHTML = iconUserDefault;
  }
}

// ============================================================
// Procurar um amigo por nome de utilizador
// ============================================================
findForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  findResult.className = 'find-result';
  findResult.textContent = 'A procurar...';

  let termo = findInput.value.trim().toLowerCase();
  if (termo.startsWith('@')) termo = termo.slice(1);
  if (!termo) { findResult.textContent = ''; return; }

  const me = auth.currentUser;
  if (termo === me.displayName?.toLowerCase()) {
    findResult.className = 'find-result error';
    findResult.textContent = 'Esse és tu :)';
    return;
  }

  try {
    const snap = await db.collection('usernames').doc(termo).get();
    if (!snap.exists) {
      findResult.className = 'find-result error';
      findResult.textContent = 'Nenhum utilizador encontrado com esse nome.';
      return;
    }
    const { uid, name } = snap.data();
    findResult.className = 'find-result';
    findResult.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'found';
    const nameSpan = document.createElement('span');
    nameSpan.className = 'found-name';
    nameSpan.textContent = name;
    nameSpan.style.cursor = 'pointer';
    nameSpan.addEventListener('click', () => abrirPerfil(uid, false));
    wrap.appendChild(nameSpan);

    const actions = document.createElement('div');
    actions.className = 'found-actions';
    const btn = document.createElement('button');
    btn.textContent = 'Conversar';
    btn.addEventListener('click', () => abrirConversa(uid, name));
    actions.appendChild(criarBotaoSeguir(uid, name));
    actions.appendChild(btn);
    wrap.appendChild(actions);
    findResult.appendChild(wrap);
  } catch (err) {
    findResult.className = 'find-result error';
    findResult.textContent = 'Erro ao procurar. Tenta novamente.';
  }
});

// ============================================================
// Conversas 1-para-1
// ============================================================
function idDaConversa(uidA, uidB) {
  return [uidA, uidB].sort().join('_');
}

async function abrirConversa(otherUid, otherName) {
  const me = auth.currentUser;
  const convId = idDaConversa(me.uid, otherUid);

  // Se ainda não há conversa com esta pessoa e o perfil dela está
  // trancado (privado), só abrimos o chat se já tivermos o código de
  // perfil (acesso concedido). Caso contrário, mostramos o perfil
  // trancado com o campo para introduzir o código, em vez do chat.
  const jaTemConversa = ultimaListaConversas.some((c) => c.id === convId);
  if (!jaTemConversa) {
    try {
      const otherSnap = await db.collection('users').doc(otherUid).get();
      const perfilPrivado = otherSnap.exists && otherSnap.data().privateProfile === true;
      if (perfilPrivado) {
        const temAcesso = await temAcessoPerfil(otherUid);
        if (!temAcesso) {
          findInput.value = '';
          findResult.textContent = '';
          abrirPerfil(otherUid, false);
          return;
        }
      }
    } catch (err) {
      console.error('Erro ao verificar privacidade do perfil:', err);
    }
  }

  const convRef = db.collection('conversations').doc(convId);

  // Nunca lemos o documento antes de escrever: se ainda não existir, as
  // regras de segurança não conseguem validar a leitura (não há "resource"
  // para comparar). Um set com merge funciona tanto para criar como para
  // atualizar, e não mexe em lastMessage/lastMessageAt já existentes.
  try {
    await convRef.set({
      participants: [me.uid, otherUid],
      participantNames: {
        [me.uid]: me.displayName || me.email,
        [otherUid]: otherName
      }
    }, { merge: true });
  } catch (err) {
    console.error('Erro ao abrir conversa:', err);
    findResult.className = 'find-result error';
    findResult.textContent = 'Não foi possível abrir a conversa (verifica as regras do Firestore).';
    return;
  }

  findInput.value = '';
  findResult.textContent = '';
  selecionarConversa(convId, { uid: otherUid, name: otherName });
}

// ============================================================
// Perfil privado — código de acesso
// ============================================================
// Cada perfil privado tem um código de 6 caracteres, guardado só para o
// próprio dono ver (users/{uid}/private/profile). O dono gera o código
// e passa-o, por fora da app, a quem quiser deixar entrar. Quem recebe
// o código escreve-o uma vez; a partir daí fica com acesso permanente a
// essa pessoa (conversar e ver os storys), registado em
// profileUnlocks/{donoUid}_{convidadoUid}. As regras do Firestore
// confirmam o código do lado do servidor (com "get()" dentro da regra),
// sem nunca deixar o código legível por quem está só a tentar adivinhá-lo.
function idDoDesbloqueio(donoUid, convidadoUid) {
  return `${donoUid}_${convidadoUid}`;
}

async function temAcessoPerfil(donoUid) {
  const me = auth.currentUser;
  if (!me || donoUid === me.uid) return true;
  if (acessoPerfilCache[donoUid] !== undefined) return acessoPerfilCache[donoUid];
  try {
    const doc = await db.collection('profileUnlocks').doc(idDoDesbloqueio(donoUid, me.uid)).get();
    acessoPerfilCache[donoUid] = doc.exists;
    return doc.exists;
  } catch (err) {
    console.error('Erro ao verificar acesso ao perfil privado:', err);
    return false;
  }
}

function gerarCodigoAleatorio() {
  const alfabeto = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem 0/O/1/I, para não confundir
  let codigo = '';
  for (let i = 0; i < 6; i++) codigo += alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
  return codigo;
}

async function carregarCodigoPerfil(uid) {
  try {
    const doc = await db.collection('users').doc(uid).collection('private').doc('profile').get();
    return doc.exists ? (doc.data().code || null) : null;
  } catch (err) {
    console.error('Erro ao carregar código de perfil:', err);
    return null;
  }
}

async function gerarNovoCodigoPerfil(uid) {
  const novo = gerarCodigoAleatorio();
  await db.collection('users').doc(uid).collection('private').doc('profile').set({ code: novo }, { merge: true });
  return novo;
}

async function listarAcessosConcedidos(uid) {
  try {
    const snap = await db.collection('profileUnlocks').where('owner', '==', uid).get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Erro ao listar acessos concedidos:', err);
    return [];
  }
}

async function revogarAcesso(unlockId) {
  try {
    await db.collection('profileUnlocks').doc(unlockId).delete();
  } catch (err) {
    console.error('Erro ao revogar acesso:', err);
  }
}

// Tenta desbloquear o perfil de "donoUid" com o código introduzido.
async function tentarDesbloquearComCodigo(donoUid, codigo) {
  const me = auth.currentUser;
  const codigoLimpo = (codigo || '').trim().toUpperCase();
  if (!codigoLimpo) return { ok: false, erro: 'Escreve o código que recebeste.' };
  try {
    await db.collection('profileUnlocks').doc(idDoDesbloqueio(donoUid, me.uid)).set({
      owner: donoUid,
      grantee: me.uid,
      granteeName: me.displayName || me.email,
      codeUsed: codigoLimpo,
      unlockedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    acessoPerfilCache[donoUid] = true;
    return { ok: true };
  } catch (err) {
    // As regras do Firestore recusam a escrita quando o código não bate
    // certo com o que está guardado — por isso um erro aqui normalmente
    // significa "código incorreto", não uma falha técnica.
    acessoPerfilCache[donoUid] = false;
    return { ok: false, erro: 'Código incorreto.' };
  }
}

// Mantém um listener por conversa que conta as mensagens da outra pessoa
// ainda não lidas (para o número na sidebar) e, ao mesmo tempo, marca essas
// mensagens como "entregues" (2 vs cinza) assim que chegam a este aparelho —
// mesmo sem a conversa estar aberta.
function sincronizarListenersEntrega(user, lista) {
  const idsAtuais = new Set(lista.map((c) => c.id));

  Object.keys(unreadListeners).forEach((convId) => {
    if (!idsAtuais.has(convId)) {
      unreadListeners[convId]();
      delete unreadListeners[convId];
      delete unreadCounts[convId];
    }
  });

  lista.forEach((conv) => {
    if (unreadListeners[conv.id]) return; // já há um listener para esta conversa
    const otherUid = (conv.participants || []).find((p) => p !== user.uid);
    if (!otherUid) return;

    unreadListeners[conv.id] = db.collection('conversations').doc(conv.id)
      .collection('messages')
      .where('senderId', '==', otherUid)
      .where('read', '==', false)
      .onSnapshot((snap) => {
        unreadCounts[conv.id] = snap.size;
        atualizarBadgeConversa(conv.id, snap.size);

        const batch = db.batch();
        let temAlteracoes = false;
        snap.forEach((doc) => {
          if (doc.data().delivered !== true) {
            batch.update(doc.ref, { delivered: true });
            temAlteracoes = true;
          }
        });
        if (temAlteracoes) {
          batch.commit().catch((err) => console.error('Erro ao marcar mensagens como entregues:', err));
        }
      }, (err) => console.error('Erro no listener de mensagens não lidas:', err));
  });
}

function atualizarBadgeConversa(convId, count) {
  const badge = conversationsListEl.querySelector(`[data-unread-conv="${convId}"]`);
  if (!badge) return;
  if (count > 0) {
    badge.textContent = count > 99 ? '99+' : String(count);
    badge.classList.remove('hidden');
  } else {
    badge.textContent = '';
    badge.classList.add('hidden');
  }
}

// ============================================================
// Seguir utilizadores (perfis públicos e privados)
// ============================================================
function idDoFollow(seguidorUid, seguidoUid) {
  return `${seguidorUid}_${seguidoUid}`;
}

async function estaASeguir(seguidorUid, seguidoUid) {
  if (seguindoCache[seguidoUid] !== undefined) return seguindoCache[seguidoUid];
  try {
    const doc = await db.collection('follows').doc(idDoFollow(seguidorUid, seguidoUid)).get();
    seguindoCache[seguidoUid] = doc.exists;
    return doc.exists;
  } catch (err) {
    console.error('Erro ao verificar se já segue:', err);
    return false;
  }
}

async function contarSeguidores(uid) {
  try {
    const [seguidoresSnap, aSeguirSnap] = await Promise.all([
      db.collection('follows').where('followingUid', '==', uid).get(),
      db.collection('follows').where('followerUid', '==', uid).get()
    ]);
    return { seguidores: seguidoresSnap.size, aSeguir: aSeguirSnap.size };
  } catch (err) {
    console.error('Erro ao contar seguidores:', err);
    return { seguidores: 0, aSeguir: 0 };
  }
}

// Cria um botão "Seguir" / "A seguir" que gere sozinho o próprio estado.
// Usado tanto no resultado da procura como no cartão de perfil.
function criarBotaoSeguir(alvoUid, alvoNome, aoAlterar) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-follow';

  function pintar(aSeguir) {
    btn.textContent = aSeguir ? 'A seguir' : 'Seguir';
    btn.classList.toggle('following', aSeguir);
  }

  const me = auth.currentUser;
  pintar(seguindoCache[alvoUid] === true);
  estaASeguir(me.uid, alvoUid).then(pintar);

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    const seguiaAntes = seguindoCache[alvoUid] === true;
    try {
      const ref = db.collection('follows').doc(idDoFollow(me.uid, alvoUid));
      if (seguiaAntes) {
        await ref.delete();
        seguindoCache[alvoUid] = false;
      } else {
        await ref.set({
          followerUid: me.uid,
          followerName: me.displayName || me.email,
          followingUid: alvoUid,
          followingName: alvoNome,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        seguindoCache[alvoUid] = true;
      }
      pintar(seguindoCache[alvoUid]);
      if (aoAlterar) aoAlterar(seguindoCache[alvoUid]);
    } catch (err) {
      console.error('Erro ao seguir/deixar de seguir:', err);
    } finally {
      btn.disabled = false;
    }
  });

  return btn;
}

function escutarConversas(user) {
  unsubscribeConversations = db.collection('conversations')
    .where('participants', 'array-contains', user.uid)
    .onSnapshot((snap) => {
      const lista = [];
      snap.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));
      lista.sort((a, b) => (b.lastMessageAt?.toMillis?.() || 0) - (a.lastMessageAt?.toMillis?.() || 0));
      ultimaListaConversas = lista;
      sincronizarListenersEntrega(user, lista);
      renderConversas(lista, user.uid);
    });
}

function renderConversas(lista, myUid) {
  conversationsListEl.innerHTML = '';
  if (lista.length === 0) {
    conversationsListEl.innerHTML = '<li class="conversations-empty">Ainda não tens conversas. Procura um amigo acima pelo nome de utilizador.</li>';
    return;
  }
  lista.forEach((conv) => {
    const otherUid = conv.participants.find((p) => p !== myUid);
    const otherName = conv.participantNames?.[otherUid] || 'Utilizador';
    observarUsuario(otherUid);

    const li = document.createElement('li');
    li.className = 'conversation-item' + (conv.id === currentConversationId ? ' active' : '');
    li.innerHTML = `
      <span class="avatar-wrap">
        <span class="avatar" data-avatar-uid="${otherUid}">${escapeHtml(otherName.charAt(0))}</span>
        <span class="status-dot" data-status-uid="${otherUid}"></span>
      </span>
      <span class="info">
        <span class="name" data-name-uid="${otherUid}">${escapeHtml(otherName)}</span>
      </span>
      <span class="unread-badge hidden" data-unread-conv="${conv.id}"></span>
    `;
    const cached = usersCache[otherUid];
    if (cached) {
      aplicarAvatar(li.querySelector('.avatar'), cached.name, cached.photoURL);
      li.querySelector('.name').textContent = cached.name;
      aplicarStatusDot(li.querySelector('.status-dot'), cached);
    }
    li.addEventListener('click', () => selecionarConversa(conv.id, { uid: otherUid, name: cached?.name || otherName }));
    conversationsListEl.appendChild(li);
    atualizarBadgeConversa(conv.id, unreadCounts[conv.id] || 0);
  });
}

function selecionarConversa(convId, friend) {
  currentConversationId = convId;
  currentFriend = friend;

  chatScreen.classList.add('chat-open'); // em telemóvel, mostra o painel de chat em vez da lista

  document.querySelectorAll('.conversation-item').forEach((el) => el.classList.remove('active'));

  chatTitle.textContent = friend.name;
  chatTitle.dataset.nameUid = friend.uid;
  chatSub.textContent = `A conversar com @${friend.name}`;
  chatFriendAvatar.dataset.avatarUid = friend.uid;
  chatFriendStatusDot.dataset.statusUid = friend.uid;
  chatFriendAvatar.textContent = friend.name.charAt(0).toUpperCase();
  messageForm.classList.remove('hidden');

  observarUsuario(friend.uid);
  const cached = usersCache[friend.uid];
  if (cached) {
    aplicarAvatar(chatFriendAvatar, cached.name, cached.photoURL);
    aplicarStatusDot(chatFriendStatusDot, cached);
    chatSub.textContent = (cached.onlineEnabled && cached.online) ? 'Online agora' : `A conversar com @${cached.usernameLower || friend.name}`;
  }

  escutarMensagens(convId);
}

// ============================================================
// Mensagens em tempo real
// ============================================================
function escutarMensagens(convId) {
  if (unsubscribeMessages) unsubscribeMessages();

  unsubscribeMessages = db.collection('conversations').doc(convId)
    .collection('messages')
    .orderBy('createdAt', 'asc')
    .limitToLast(200)
    .onSnapshot((snap) => {
      messagesEl.innerHTML = '';
      if (snap.empty) {
        messagesEl.innerHTML = '<p class="messages-empty">Ainda não há mensagens. Envia a primeira!</p>';
        return;
      }
      snap.forEach((doc) => renderMensagem(doc.id, doc.data()));
      messagesEl.scrollTop = messagesEl.scrollHeight;
      marcarComoLidas(snap);
    });
}

// Marca como lidas todas as mensagens do outro participante que ainda não
// tinham sido vistas — é isto que faz aparecer o segundo ícone de "lida" ao remetente.
function marcarComoLidas(snap) {
  const me = auth.currentUser;
  if (!me) return;
  const batch = db.batch();
  let temAlteracoes = false;
  snap.forEach((doc) => {
    const data = doc.data();
    if (data.senderId !== me.uid && data.read !== true) {
      batch.update(doc.ref, { read: true });
      temAlteracoes = true;
    }
  });
  if (temAlteracoes) {
    batch.commit().catch((err) => console.error('Erro ao marcar mensagens como lidas:', err));
  }
}

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const texto = messageInput.value.trim();
  if (!texto || !currentConversationId) return;
  const user = auth.currentUser;

  messageInput.value = '';

  const convRef = db.collection('conversations').doc(currentConversationId);
  await convRef.collection('messages').add({
    text: texto,
    senderId: user.uid,
    senderName: user.displayName || user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    read: false,
    delivered: false,
    forwarded: false
  });
  await convRef.set({
    lastMessage: texto,
    lastMessageAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
});

// ============================================================
// Enviar imagens
// ============================================================
const imageInput = document.getElementById('image-input');

imageInput.addEventListener('change', async () => {
  const file = imageInput.files[0];
  imageInput.value = ''; // permite escolher a mesma imagem outra vez
  if (!file || !currentConversationId) return;
  if (!file.type.startsWith('image/')) return;

  const user = auth.currentUser;
  try {
    const dataUrl = await redimensionarImagem(file, 900, 900, 0.65);
    const convRef = db.collection('conversations').doc(currentConversationId);
    await convRef.collection('messages').add({
      imageURL: dataUrl,
      senderId: user.uid,
      senderName: user.displayName || user.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      read: false,
      delivered: false,
      forwarded: false
    });
    await convRef.set({
      lastMessage: 'Imagem',
      lastMessageAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.error('Erro ao enviar imagem:', err);
    alert('Não foi possível enviar a imagem. Tenta uma imagem mais pequena.');
  }
});

// Redimensiona uma imagem no navegador antes de guardar (mantém a app sem
// precisar de Firebase Storage — a imagem fica dentro do próprio documento
// do Firestore, por isso precisa de ficar pequena).
function redimensionarImagem(file, maxWidth, maxHeight, qualidade) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read-fail'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('img-fail'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) { height = Math.round(height * (maxWidth / width)); width = maxWidth; }
        if (height > maxHeight) { width = Math.round(width * (maxHeight / height)); height = maxHeight; }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', qualidade));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// ============================================================
// Enviar áudio (mensagem de voz)
// ============================================================
micBtn.addEventListener('click', async () => {
  if (!currentConversationId) return;
  if (isRecording) {
    pararGravacao(true); // já está a gravar → para e envia
  } else {
    await iniciarGravacao();
  }
});

recordingCancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  pararGravacao(false); // descarta sem enviar
});

async function iniciarGravacao() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('O teu navegador não suporta gravação de áudio.');
    return;
  }
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    console.error('Erro ao aceder ao microfone:', err);
    alert('Não foi possível aceder ao microfone. Verifica as permissões do navegador.');
    return;
  }

  audioChunks = [];
  try {
    mediaRecorder = new MediaRecorder(mediaStream);
  } catch (err) {
    console.error('MediaRecorder indisponível:', err);
    alert('Não foi possível iniciar a gravação neste navegador.');
    mediaStream.getTracks().forEach((t) => t.stop());
    return;
  }

  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) audioChunks.push(e.data);
  };

  mediaRecorder.start();
  isRecording = true;
  recordingSeconds = 0;
  atualizarTempoGravacao();

  inputArea.classList.add('hidden');
  recordingArea.classList.remove('hidden');
  micBtn.classList.add('recording');
  micBtn.title = 'Parar e enviar áudio';

  recordingTimerId = setInterval(() => {
    recordingSeconds += 1;
    atualizarTempoGravacao();
    if (recordingSeconds >= RECORDING_MAX_SECONDS) {
      pararGravacao(true);
    }
  }, 1000);
}

function atualizarTempoGravacao() {
  const min = Math.floor(recordingSeconds / 60);
  const seg = recordingSeconds % 60;
  recordingTimeEl.textContent = `${min}:${String(seg).padStart(2, '0')}`;
}

function pararGravacao(enviar) {
  if (!isRecording || !mediaRecorder) return;

  clearInterval(recordingTimerId);
  recordingTimerId = null;

  const convIdParaEnvio = currentConversationId;

  mediaRecorder.onstop = async () => {
    if (mediaStream) mediaStream.getTracks().forEach((t) => t.stop());
    mediaStream = null;

    if (enviar && audioChunks.length > 0 && convIdParaEnvio) {
      const tipo = mediaRecorder.mimeType || 'audio/webm';
      const blob = new Blob(audioChunks, { type: tipo });
      try {
        const dataUrl = await blobParaDataUrl(blob);
        if (dataUrl.length > 900000) {
          alert('Áudio demasiado longo para enviar. Tenta uma gravação mais curta.');
        } else {
          const user = auth.currentUser;
          const convRef = db.collection('conversations').doc(convIdParaEnvio);
          await convRef.collection('messages').add({
            audioData: dataUrl,
            senderId: user.uid,
            senderName: user.displayName || user.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            read: false,
            delivered: false,
            forwarded: false
          });
          await convRef.set({
            lastMessage: 'Áudio',
            lastMessageAt: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        }
      } catch (err) {
        console.error('Erro ao enviar áudio:', err);
        alert('Não foi possível enviar o áudio.');
      }
    }
    audioChunks = [];
  };

  mediaRecorder.stop();
  isRecording = false;
  recordingSeconds = 0;
  recordingTimeEl.textContent = '0:00';

  inputArea.classList.remove('hidden');
  recordingArea.classList.add('hidden');
  micBtn.classList.remove('recording');
  micBtn.title = 'Gravar mensagem de áudio';
}

// Usada também para limpar o estado ao trocar de conta/sair
function cancelarGravacao() {
  if (isRecording) pararGravacao(false);
}

function blobParaDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read-fail'));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

// Ícones de recibo, estilo WhatsApp:
//  1 check cinza  = enviada (ainda não chegou ao aparelho da outra pessoa)
//  2 checks cinza = entregue (chegou, mas a pessoa ainda não abriu a conversa)
//  2 checks azuis = lida (a pessoa abriu a conversa e viu a mensagem)
//  3 checks       = a outra pessoa reencaminhou esta mensagem para alguém
function ticksHtml(msg) {
  if (msg.forwarded) {
    return `<span class="msg-ticks forwarded" title="Reencaminhada para outra pessoa">${iconCheck}${iconCheck}${iconCheck}</span>`;
  }
  if (msg.read) {
    return `<span class="msg-ticks read" title="Lida">${iconCheck}${iconCheck}</span>`;
  }
  if (msg.delivered) {
    return `<span class="msg-ticks delivered" title="Entregue">${iconCheck}${iconCheck}</span>`;
  }
  return `<span class="msg-ticks sent" title="Enviada">${iconCheck}</span>`;
}

function renderMensagem(id, msg) {
  const user = auth.currentUser;
  const isMine = user && msg.senderId === user.uid;

  const row = document.createElement('div');
  row.className = `msg-row ${isMine ? 'mine' : 'theirs'}`;

  const bubble = document.createElement('div');
  bubble.className = `msg ${isMine ? 'mine' : 'theirs'}`;

  if (msg.imageURL) {
    const img = document.createElement('img');
    img.className = 'msg-image';
    img.src = msg.imageURL;
    img.alt = 'Imagem enviada';
    img.addEventListener('click', () => abrirImagemGrande(msg.imageURL));
    bubble.appendChild(img);
  } else if (msg.audioData) {
    const wrap = document.createElement('div');
    wrap.className = 'msg-audio-wrap';
    const audio = document.createElement('audio');
    audio.src = msg.audioData;
    audio.controls = true;
    audio.preload = 'metadata';
    wrap.appendChild(audio);
    bubble.appendChild(wrap);
  } else {
    const textDiv = document.createElement('div');
    textDiv.textContent = msg.text || '';
    bubble.appendChild(textDiv);
  }

  const hora = msg.createdAt
    ? msg.createdAt.toDate().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
    : '...';

  const timeSpan = document.createElement('span');
  timeSpan.className = 'msg-time';
  timeSpan.innerHTML = `${hora}${isMine ? ' ' + ticksHtml(msg) : ''}`;
  bubble.appendChild(timeSpan);

  row.appendChild(bubble);

  // Só se pode reencaminhar mensagens recebidas (as que o teu amigo te enviou)
  if (!isMine) {
    const fwdBtn = document.createElement('button');
    fwdBtn.type = 'button';
    fwdBtn.className = 'msg-forward-btn';
    fwdBtn.title = 'Reencaminhar';
    fwdBtn.innerHTML = iconForward;
    fwdBtn.addEventListener('click', () => abrirEncaminhar(id, msg));
    row.appendChild(fwdBtn);
  } else {
    // Só o remetente pode apagar a própria mensagem
    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'msg-delete-btn';
    delBtn.title = 'Apagar mensagem';
    delBtn.innerHTML = iconTrash;
    delBtn.addEventListener('click', () => apagarMensagem(id));
    row.appendChild(delBtn);
  }

  messagesEl.appendChild(row);
}

// ============================================================
// Apagar mensagem
// ============================================================
async function apagarMensagem(messageId) {
  if (!currentConversationId) return;
  const confirmar = window.confirm('Apagar esta mensagem para sempre?');
  if (!confirmar) return;
  try {
    await db.collection('conversations').doc(currentConversationId)
      .collection('messages').doc(messageId).delete();
  } catch (err) {
    console.error('Erro ao apagar mensagem:', err);
    alert('Não foi possível apagar a mensagem.');
  }
}

// ============================================================
// Reencaminhar mensagem para outra conversa
// ============================================================
function abrirEncaminhar(messageId, msg) {
  forwardMessageId = messageId;
  forwardMessageData = msg;
  renderForwardList();
  forwardModal.classList.remove('hidden');
}

function renderForwardList() {
  const me = auth.currentUser;
  forwardListEl.innerHTML = '';
  const outras = ultimaListaConversas.filter((c) => c.id !== currentConversationId);
  if (outras.length === 0) {
    forwardListEl.innerHTML = '<li class="conversations-empty">Não tens outras conversas para reencaminhar esta mensagem.</li>';
    return;
  }
  outras.forEach((conv) => {
    const otherUid = conv.participants.find((p) => p !== me.uid);
    const otherName = usersCache[otherUid]?.name || conv.participantNames?.[otherUid] || 'Utilizador';
    const li = document.createElement('li');
    li.className = 'conversation-item';
    li.innerHTML = `
      <span class="avatar">${escapeHtml(otherName.charAt(0))}</span>
      <span class="info"><span class="name">${escapeHtml(otherName)}</span></span>
    `;
    li.addEventListener('click', () => confirmarEncaminhar(conv.id));
    forwardListEl.appendChild(li);
  });
}

async function confirmarEncaminhar(targetConvId) {
  const me = auth.currentUser;
  const messageId = forwardMessageId;
  const msg = forwardMessageData;
  const originConvId = currentConversationId;

  forwardModal.classList.add('hidden');
  if (!msg || !targetConvId) return;

  try {
    // 1. Envia a mensagem reencaminhada (texto ou imagem) para a conversa de destino
    const novaMensagem = {
      senderId: me.uid,
      senderName: me.displayName || me.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      read: false,
      delivered: false,
      forwarded: false
    };
    let previaUltimaMensagem;
    if (msg.imageURL) {
      novaMensagem.imageURL = msg.imageURL;
      previaUltimaMensagem = 'Imagem';
    } else if (msg.audioData) {
      novaMensagem.audioData = msg.audioData;
      previaUltimaMensagem = 'Áudio';
    } else {
      novaMensagem.text = msg.text || '';
      previaUltimaMensagem = msg.text;
    }
    await db.collection('conversations').doc(targetConvId).collection('messages').add(novaMensagem);
    await db.collection('conversations').doc(targetConvId).set({
      lastMessage: previaUltimaMensagem,
      lastMessageAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    // 2. Marca a mensagem original como reencaminhada — é isto que faz
    //    aparecer o terceiro ícone de confirmação para quem a enviou originalmente.
    if (originConvId && messageId) {
      await db.collection('conversations').doc(originConvId)
        .collection('messages').doc(messageId)
        .update({ forwarded: true });
    }
  } catch (err) {
    console.error('Erro ao reencaminhar mensagem:', err);
  }
}

forwardCloseBtn.addEventListener('click', () => forwardModal.classList.add('hidden'));
forwardModal.addEventListener('click', (e) => {
  if (e.target === forwardModal) forwardModal.classList.add('hidden');
});

// ============================================================
// Stories — só fotos, desaparecem sozinhos depois de 24 horas
// ============================================================

// Escuta os stories ainda ativos (criados nas últimas 24h). O filtro é
// feito com o próprio campo "createdAt" (sem precisar de índice composto),
// e cada story mais antigo que 24h simplesmente deixa de aparecer aqui —
// não precisa de nenhuma limpeza manual.
function escutarStories(user) {
  if (unsubscribeStories) unsubscribeStories();
  const cutoff = firebase.firestore.Timestamp.fromMillis(Date.now() - STORY_DURATION_MS);
  unsubscribeStories = db.collection('stories')
    .where('createdAt', '>', cutoff)
    .orderBy('createdAt', 'asc')
    .onSnapshot((snap) => {
      const mapa = {};
      snap.forEach((doc) => {
        const d = doc.data();
        if (!d.uid) return;
        if (!mapa[d.uid]) mapa[d.uid] = [];
        mapa[d.uid].push({
          id: doc.id,
          uid: d.uid,
          name: d.name,
          imageData: d.imageData,
          createdAt: d.createdAt,
          createdAtMillis: d.createdAt?.toMillis?.() || Date.now()
        });
      });
      storiesPorUtilizador = mapa;
      renderStoriesBar();
    }, (err) => console.error('Erro ao carregar stories:', err));
}

function renderStoriesBar() {
  const me = auth.currentUser;
  if (!me) return;

  const meusStories = storiesPorUtilizador[me.uid] || [];
  myStoryRing.className = 'story-avatar-wrap' + (meusStories.length ? ' has-story' : '');
  myStoryBadge.classList.remove('hidden');
  const cachedMe = usersCache[me.uid];
  if (cachedMe) aplicarAvatar(myStoryAvatar, cachedMe.name, cachedMe.photoURL);

  storiesListEl.innerHTML = '';
  const todosUids = Object.keys(storiesPorUtilizador).filter((uid) => uid !== me.uid);

  // Perfis privados só mostram o story se já tivermos o código desse
  // perfil (acesso concedido). Enquanto não sabemos, escondemos o story
  // e verificamos em segundo plano — assim que a resposta chegar, a
  // barra é atualizada outra vez.
  const uids = todosUids.filter((uid) => {
    const cached = usersCache[uid];
    if (!cached || cached.privateProfile !== true) return true;
    if (acessoPerfilCache[uid] === true) return true;
    if (acessoPerfilCache[uid] === undefined && !acessoPerfilEmVerificacao.has(uid)) {
      acessoPerfilEmVerificacao.add(uid);
      temAcessoPerfil(uid).finally(() => {
        acessoPerfilEmVerificacao.delete(uid);
        renderStoriesBar();
      });
    }
    return false;
  });

  uids.sort((a, b) => {
    const la = storiesPorUtilizador[a][storiesPorUtilizador[a].length - 1];
    const lb = storiesPorUtilizador[b][storiesPorUtilizador[b].length - 1];
    return (lb.createdAtMillis || 0) - (la.createdAtMillis || 0);
  });

  uids.forEach((uid) => {
    observarUsuario(uid);
    const cached = usersCache[uid];
    const primeiraStory = storiesPorUtilizador[uid][0];
    const nome = cached?.name || primeiraStory?.name || 'Utilizador';

    const div = document.createElement('div');
    div.className = 'story-item';
    div.innerHTML = `
      <span class="story-avatar-wrap ${storiesVistas[uid] ? 'seen' : 'has-story'}">
        <span class="avatar story-avatar" data-avatar-uid="${uid}">${escapeHtml(nome.charAt(0))}</span>
      </span>
      <span class="story-label" data-name-uid-label="${uid}">${escapeHtml(nome)}</span>
    `;
    if (cached) aplicarAvatar(div.querySelector('.avatar'), cached.name, cached.photoURL);
    div.addEventListener('click', () => abrirVisualizadorStories(uids, uids.indexOf(uid)));
    storiesListEl.appendChild(div);
  });
}

// Clicar no "+" abre sempre o seletor de foto; clicar no resto do círculo
// abre os teus próprios stories (se já tiveres algum ativo).
myStoryBadge.addEventListener('click', (e) => {
  e.stopPropagation();
  storyInput.click();
});
myStoryItem.addEventListener('click', () => {
  const me = auth.currentUser;
  const meusStories = storiesPorUtilizador[me.uid] || [];
  if (meusStories.length > 0) {
    abrirVisualizadorStories([me.uid], 0);
  } else {
    storyInput.click();
  }
});

storyInput.addEventListener('change', async () => {
  const file = storyInput.files[0];
  storyInput.value = '';
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('Só é possível adicionar fotos ao story (sem vídeos).');
    return;
  }
  const user = auth.currentUser;
  try {
    const dataUrl = await redimensionarImagem(file, 1080, 1350, 0.7);
    await db.collection('stories').add({
      uid: user.uid,
      name: user.displayName || user.email,
      imageData: dataUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (err) {
    console.error('Erro ao publicar story:', err);
    alert('Não foi possível publicar o story. Tenta uma foto mais pequena.');
  }
});

// ---------- Visualizador de stories (ecrã inteiro, avança sozinho) ----------
function abrirVisualizadorStories(filaUids, indexInicial) {
  if (!filaUids || filaUids.length === 0) return;
  storyViewerFila = filaUids;
  storyViewerIndex = Math.max(0, indexInicial);
  storyItemIndex = 0;
  storyModal.classList.remove('hidden');
  mostrarStoryAtual();
}

function mostrarStoryAtual() {
  const uid = storyViewerFila[storyViewerIndex];
  const stories = storiesPorUtilizador[uid] || [];
  if (stories.length === 0) { fecharVisualizadorStories(); return; }
  if (storyItemIndex >= stories.length) storyItemIndex = stories.length - 1;

  const story = stories[storyItemIndex];
  const cached = usersCache[uid];
  const nome = cached?.name || story.name || 'Utilizador';

  storyViewName.textContent = nome;
  aplicarAvatar(storyViewAvatar, nome, cached?.photoURL);
  storyViewImg.src = story.imageData;
  storyViewTime.textContent = formatarTempoDecorrido(story.createdAtMillis);

  const me = auth.currentUser;
  const isDono = !!(me && uid === me.uid);
  storyDeleteBtn.classList.toggle('hidden', !isDono);

  storiesVistas[uid] = true;
  renderStoriesBar();

  configurarInteracoesStory(story, isDono);
  iniciarProgressoStory();
}

// Configura, para o story atualmente visível, o botão de "quem viu" (só o
// dono vê) e o coração para curtir (só quem não é o dono pode curtir).
function configurarInteracoesStory(story, isDono) {
  if (unsubscribeStoryViews) { unsubscribeStoryViews(); unsubscribeStoryViews = null; }
  if (unsubscribeStoryLike) { unsubscribeStoryLike(); unsubscribeStoryLike = null; }
  fecharPainelVisualizacoes();

  const me = auth.currentUser;

  if (isDono) {
    storyViewsBtn.classList.remove('hidden');
    storyLikeBtn.classList.add('hidden');
    storyViewsCount.textContent = '0';
    unsubscribeStoryViews = db.collection('stories').doc(story.id).collection('views')
      .onSnapshot((snap) => {
        storyViewsCount.textContent = snap.size;
        storyViewersList.innerHTML = '';
        if (snap.empty) {
          storyViewersList.innerHTML = '<li class="story-viewers-empty">Ainda ninguém viu este story.</li>';
          return;
        }
        const vistas = [];
        snap.forEach((doc) => vistas.push(doc.data()));
        vistas.sort((a, b) => (b.viewedAtMillis || b.viewedAt?.toMillis?.() || 0) - (a.viewedAtMillis || a.viewedAt?.toMillis?.() || 0));
        vistas.forEach((v) => {
          const li = document.createElement('li');
          li.className = 'story-viewer-item';
          li.innerHTML = `<span class="avatar">${escapeHtml((v.name || '?').charAt(0))}</span><span>${escapeHtml(v.name || 'Utilizador')}</span>`;
          storyViewersList.appendChild(li);
        });
      }, (err) => console.error('Erro ao carregar visualizações do story:', err));
  } else {
    storyViewsBtn.classList.add('hidden');
    storyLikeBtn.classList.remove('hidden');
    storyLikeBtn.classList.remove('liked');

    // Regista que este utilizador viu o story (sem bloquear a exibição).
    db.collection('stories').doc(story.id).collection('views').doc(me.uid).set({
      uid: me.uid,
      name: me.displayName || me.email,
      viewedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).catch((err) => console.error('Erro ao registar visualização do story:', err));

    // Segue o próprio "gosto" para pintar o coração a rosa.
    unsubscribeStoryLike = db.collection('stories').doc(story.id).collection('likes').doc(me.uid)
      .onSnapshot((doc) => {
        storyLikeBtn.classList.toggle('liked', doc.exists);
      }, (err) => console.error('Erro ao verificar gosto do story:', err));
  }
}

async function alternarLikeStory() {
  const uid = storyViewerFila[storyViewerIndex];
  const stories = storiesPorUtilizador[uid] || [];
  const story = stories[storyItemIndex];
  const me = auth.currentUser;
  if (!story || !me) return;
  const ref = db.collection('stories').doc(story.id).collection('likes').doc(me.uid);
  try {
    if (storyLikeBtn.classList.contains('liked')) {
      await ref.delete();
    } else {
      await ref.set({
        uid: me.uid,
        name: me.displayName || me.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  } catch (err) {
    console.error('Erro ao curtir story:', err);
  }
}

function abrirPainelVisualizacoes() {
  storyViewersPanel.classList.remove('hidden');
  clearTimeout(storyAutoTimerId); // pausa o avanço automático enquanto a lista está aberta
}

function fecharPainelVisualizacoes() {
  storyViewersPanel.classList.add('hidden');
}

storyLikeBtn.addEventListener('click', alternarLikeStory);
storyViewsBtn.addEventListener('click', abrirPainelVisualizacoes);
storyViewersClose.addEventListener('click', () => {
  fecharPainelVisualizacoes();
  iniciarProgressoStory(); // retoma o avanço automático ao fechar a lista
});

function iniciarProgressoStory() {
  clearTimeout(storyAutoTimerId);
  storyProgressFill.style.transition = 'none';
  storyProgressFill.style.width = '0%';
  void storyProgressFill.offsetWidth; // força o navegador a aplicar o reset antes da transição
  storyProgressFill.style.transition = `width ${STORY_VIEW_MS}ms linear`;
  requestAnimationFrame(() => { storyProgressFill.style.width = '100%'; });
  storyAutoTimerId = setTimeout(avancarStory, STORY_VIEW_MS);
}

function avancarStory() {
  const uid = storyViewerFila[storyViewerIndex];
  const stories = storiesPorUtilizador[uid] || [];
  if (storyItemIndex < stories.length - 1) {
    storyItemIndex += 1;
    mostrarStoryAtual();
  } else if (storyViewerIndex < storyViewerFila.length - 1) {
    storyViewerIndex += 1;
    storyItemIndex = 0;
    mostrarStoryAtual();
  } else {
    fecharVisualizadorStories();
  }
}

function retrocederStory() {
  if (storyItemIndex > 0) {
    storyItemIndex -= 1;
    mostrarStoryAtual();
  } else if (storyViewerIndex > 0) {
    storyViewerIndex -= 1;
    const stories = storiesPorUtilizador[storyViewerFila[storyViewerIndex]] || [];
    storyItemIndex = Math.max(0, stories.length - 1);
    mostrarStoryAtual();
  }
}

function fecharVisualizadorStories() {
  clearTimeout(storyAutoTimerId);
  if (unsubscribeStoryViews) { unsubscribeStoryViews(); unsubscribeStoryViews = null; }
  if (unsubscribeStoryLike) { unsubscribeStoryLike(); unsubscribeStoryLike = null; }
  fecharPainelVisualizacoes();
  storyModal.classList.add('hidden');
  storyViewImg.src = '';
}

function formatarTempoDecorrido(criadoEmMillis) {
  if (!criadoEmMillis) return 'agora mesmo';
  const diffMin = Math.floor((Date.now() - criadoEmMillis) / 60000);
  if (diffMin < 1) return 'agora mesmo';
  if (diffMin < 60) return `há ${diffMin} min`;
  return `há ${Math.floor(diffMin / 60)} h`;
}

storyPrevBtn.addEventListener('click', retrocederStory);
storyNextBtn.addEventListener('click', avancarStory);
storyCloseBtn.addEventListener('click', fecharVisualizadorStories);
storyModal.addEventListener('click', (e) => {
  if (e.target === storyModal) fecharVisualizadorStories();
});

storyDeleteBtn.addEventListener('click', async () => {
  const uid = storyViewerFila[storyViewerIndex];
  const stories = storiesPorUtilizador[uid] || [];
  const story = stories[storyItemIndex];
  if (!story) return;
  if (!window.confirm('Apagar este story?')) return;
  try {
    await db.collection('stories').doc(story.id).delete();
    fecharVisualizadorStories();
  } catch (err) {
    console.error('Erro ao apagar story:', err);
    alert('Não foi possível apagar o story.');
  }
});

// ============================================================
// Perfil — o teu ou o de outra pessoa
// ============================================================
async function abrirPerfil(uid, isMe) {
  profileAvatarBig.style.backgroundImage = '';
  profileAvatarBig.classList.add('avatar-icon-default');
  profileAvatarBig.innerHTML = iconUserDefault;
  profileStatusDot.dataset.statusUid = uid;
  profileStatusDot.classList.remove('online');
  profileNameEl.textContent = 'A carregar...';
  profileUsernameEl.textContent = '';
  profileExtraEl.className = '';
  profileExtraEl.innerHTML = '';
  profileModal.classList.remove('hidden');

  observarUsuario(uid);

  try {
    const snap = await db.collection('users').doc(uid).get();
    if (!snap.exists) {
      profileNameEl.textContent = 'Utilizador não encontrado';
      return;
    }
    const data = snap.data();
    const nome = data.name || 'Utilizador';
    const onlineEnabled = data.onlineEnabled !== false;
    const isOnline = onlineEnabled && data.online === true;
    const isPrivado = data.privateProfile === true;

    aplicarAvatarPerfil(profileAvatarBig, nome, data.photoURL);
    profileNameEl.textContent = isMe ? `${nome} (tu)` : nome;
    profileUsernameEl.textContent = '@' + (data.usernameLower || nome.toLowerCase());

    if (isMe) {
      // O próprio perfil mostra os controlos de edição (que incluem o
      // estado online e a biografia dentro do formulário).
      aplicarStatusDot(profileStatusDot, { onlineEnabled, online: data.online });
      renderEdicaoPerfil(uid, data);
    } else if (isPrivado && !(await temAcessoPerfil(uid))) {
      // Perfil trancado e ainda sem o código: não mostramos mais nada
      // além do nome, do nome de utilizador e do pedido do código —
      // nem biografia, nem estado online, nem email, nem contadores.
      renderPerfilTrancado(uid, nome);
      return;
    } else {
      aplicarStatusDot(profileStatusDot, { onlineEnabled, online: data.online });

      // Estado online (só é mostrado se a pessoa tiver o modo online ativado)
      if (onlineEnabled) {
        const statusP = document.createElement('p');
        statusP.className = 'profile-status';
        statusP.style.color = isOnline ? 'var(--online)' : 'var(--text-muted)';
        statusP.textContent = isOnline ? 'Online agora' : 'Offline';
        profileExtraEl.appendChild(statusP);
      }

      // Nota de perfil privado (já com acesso)
      if (isPrivado) {
        const lockP = document.createElement('p');
        lockP.className = 'profile-private-note';
        lockP.innerHTML = `${iconLock} Perfil privado — já tens acesso`;
        profileExtraEl.appendChild(lockP);
      }

      // Biografia
      if (data.bio) {
        const bioP = document.createElement('p');
        bioP.className = 'profile-bio';
        bioP.textContent = data.bio;
        profileExtraEl.appendChild(bioP);
      }

      // Botão de seguir — disponível tanto em perfis públicos como privados
      const followWrap = document.createElement('div');
      followWrap.className = 'profile-follow-btn-wrap';
      followWrap.appendChild(criarBotaoSeguir(uid, nome, () => {
        contarSeguidores(uid).then(({ seguidores }) => {
          const followersNumEl = document.getElementById('profile-followers-num');
          if (followersNumEl) followersNumEl.textContent = seguidores;
        });
      }));
      profileExtraEl.appendChild(followWrap);
    }

    // Contadores de "a seguir" / "seguidores" — visíveis em qualquer perfil,
    // público ou privado, incluindo o teu (aparece por baixo dos controlos
    // de edição, já que estes substituem o conteúdo do cartão).
    const followCounts = document.createElement('div');
    followCounts.className = 'profile-follow-counts';
    followCounts.innerHTML = `
      <span><strong id="profile-following-num">—</strong> a seguir</span>
      <span><strong id="profile-followers-num">—</strong> seguidores</span>
    `;
    profileExtraEl.appendChild(followCounts);
    contarSeguidores(uid).then(({ seguidores, aSeguir }) => {
      const followingNumEl = document.getElementById('profile-following-num');
      const followersNumEl = document.getElementById('profile-followers-num');
      if (followingNumEl) followingNumEl.textContent = aSeguir;
      if (followersNumEl) followersNumEl.textContent = seguidores;
    });
  } catch (err) {
    console.error('Erro ao carregar perfil:', err);
    profileNameEl.textContent = 'Não foi possível carregar o perfil.';
  }
}

// Ecrã reduzido mostrado quando o perfil é privado e ainda não temos o
// código — só nome, nome de utilizador e o formulário para introduzir o
// código de perfil.
function renderPerfilTrancado(uid, nome) {
  profileExtraEl.className = 'profile-locked';
  profileExtraEl.innerHTML = '';

  const lockP = document.createElement('p');
  lockP.className = 'profile-private-note';
  lockP.innerHTML = `${iconLock} Perfil privado`;
  profileExtraEl.appendChild(lockP);

  const hint = document.createElement('p');
  hint.className = 'profile-locked-hint';
  hint.textContent = 'Para conversar com esta pessoa e ver os storys dela, pede-lhe o código de perfil.';
  profileExtraEl.appendChild(hint);

  const form = document.createElement('form');
  form.className = 'profile-code-form';
  form.innerHTML = `
    <input type="text" class="profile-code-input" placeholder="Código de perfil" maxlength="6" autocomplete="off" />
    <button type="submit" class="btn-primary btn-full">Desbloquear</button>
    <p class="form-error"></p>
  `;
  profileExtraEl.appendChild(form);

  const input = form.querySelector('.profile-code-input');
  const btn = form.querySelector('button');
  const statusP = form.querySelector('.form-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    statusP.textContent = '';
    const resultado = await tentarDesbloquearComCodigo(uid, input.value);
    if (resultado.ok) {
      abrirPerfil(uid, false); // recarrega o perfil, já desbloqueado
      renderStoriesBar(); // os storys desta pessoa passam a poder aparecer
    } else {
      btn.disabled = false;
      statusP.textContent = resultado.erro;
    }
  });
}

// ============================================================
// Eliminar conta — apaga os dados de perfil e a conta de autenticação
// ============================================================
async function apagarDadosDoPerfil(uid, data) {
  const tarefas = [];
  if (data && data.usernameLower) {
    tarefas.push(db.collection('usernames').doc(data.usernameLower).delete().catch(() => {}));
  }
  tarefas.push(db.collection('users').doc(uid).collection('private').doc('profile').delete().catch(() => {}));
  tarefas.push(db.collection('users').doc(uid).delete().catch(() => {}));
  await Promise.all(tarefas);
}

// Pede à pessoa para confirmar a identidade de novo (exigido pelo Firebase
// para ações sensíveis como eliminar a conta, se a sessão não for recente).
async function reautenticar(user) {
  const isGoogle = user.providerData.some((p) => p.providerId === 'google.com');
  if (isGoogle) {
    await user.reauthenticateWithPopup(googleProvider);
  } else {
    const password = window.prompt('Por segurança, introduz novamente a tua palavra-passe para confirmar a eliminação da conta:');
    if (!password) throw new Error('cancelled');
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    await user.reauthenticateWithCredential(cred);
  }
}

async function eliminarConta(uid, data) {
  const user = auth.currentUser;
  if (!user) return;
  await ficarOffline().catch(() => {});
  try {
    await apagarDadosDoPerfil(uid, data);
    await user.delete();
  } catch (err) {
    if (err.code === 'auth/requires-recent-login') {
      await reautenticar(user);
      await apagarDadosDoPerfil(uid, data);
      await user.delete();
    } else {
      throw err;
    }
  }
}

// Controlos de edição (só aparecem no teu próprio perfil)
function renderEdicaoPerfil(uid, data) {
  const nomeAtual = data.name || 'Utilizador';
  const email = data.email;

  profileExtraEl.className = 'profile-edit';
  profileExtraEl.innerHTML = '';

  // --- Alterar foto ---
  const photoLabel = document.createElement('label');
  photoLabel.className = 'btn-secondary photo-upload-label';
  photoLabel.textContent = 'Alterar foto';
  const photoInput = document.createElement('input');
  photoInput.type = 'file';
  photoInput.accept = 'image/*';
  photoInput.hidden = true;
  photoLabel.appendChild(photoInput);
  profileExtraEl.appendChild(photoLabel);

  const photoStatus = document.createElement('p');
  photoStatus.className = 'form-error';
  profileExtraEl.appendChild(photoStatus);

  photoInput.addEventListener('change', async () => {
    const file = photoInput.files[0];
    if (!file) return;
    photoStatus.className = 'form-success';
    photoStatus.textContent = 'A atualizar foto...';
    try {
      const dataUrl = await redimensionarImagem(file, 200, 200, 0.75);
      await db.collection('users').doc(uid).set({ photoURL: dataUrl }, { merge: true });
      aplicarAvatarPerfil(profileAvatarBig, nomeAtual, dataUrl);
      photoStatus.textContent = 'Foto atualizada!';
    } catch (err) {
      console.error('Erro ao atualizar foto:', err);
      photoStatus.className = 'form-error';
      photoStatus.textContent = 'Não foi possível atualizar a foto.';
    }
  });

  // --- Editar nome ---
  const nameField = document.createElement('label');
  nameField.className = 'field';
  nameField.innerHTML = '<span>Nome</span>';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.value = nomeAtual;
  nameInput.maxLength = 30;
  nameField.appendChild(nameInput);
  profileExtraEl.appendChild(nameField);

  const saveNameBtn = document.createElement('button');
  saveNameBtn.type = 'button';
  saveNameBtn.className = 'btn-primary';
  saveNameBtn.textContent = 'Guardar nome';
  profileExtraEl.appendChild(saveNameBtn);

  const nameStatus = document.createElement('p');
  nameStatus.className = 'form-error';
  profileExtraEl.appendChild(nameStatus);

  saveNameBtn.addEventListener('click', async () => {
    const novoNome = nameInput.value.trim();
    if (!novoNome) return;
    nameStatus.className = 'form-error';
    nameStatus.textContent = '';
    try {
      const userSnap = await db.collection('users').doc(uid).get();
      const usernameLower = userSnap.data()?.usernameLower;

      await db.collection('users').doc(uid).set({ name: novoNome }, { merge: true });
      if (usernameLower) {
        await db.collection('usernames').doc(usernameLower).set({ name: novoNome }, { merge: true });
      }
      await auth.currentUser.updateProfile({ displayName: novoNome });

      profileNameEl.textContent = `${novoNome} (tu)`;
      nameStatus.className = 'form-success';
      nameStatus.textContent = 'Nome atualizado!';
    } catch (err) {
      console.error('Erro ao atualizar nome:', err);
      nameStatus.className = 'form-error';
      nameStatus.textContent = 'Não foi possível atualizar o nome.';
    }
  });

  // --- Biografia ---
  const bioField = document.createElement('label');
  bioField.className = 'field';
  bioField.innerHTML = '<span>Biografia</span>';
  const bioTextarea = document.createElement('textarea');
  bioTextarea.className = 'bio-textarea';
  bioTextarea.rows = 3;
  bioTextarea.maxLength = 160;
  bioTextarea.placeholder = 'Conta um pouco sobre ti...';
  bioTextarea.value = data.bio || '';
  bioField.appendChild(bioTextarea);
  profileExtraEl.appendChild(bioField);

  const saveBioBtn = document.createElement('button');
  saveBioBtn.type = 'button';
  saveBioBtn.className = 'btn-secondary';
  saveBioBtn.textContent = 'Guardar biografia';
  profileExtraEl.appendChild(saveBioBtn);

  const bioStatus = document.createElement('p');
  bioStatus.className = 'form-error';
  profileExtraEl.appendChild(bioStatus);

  saveBioBtn.addEventListener('click', async () => {
    bioStatus.className = 'form-error';
    bioStatus.textContent = '';
    try {
      await db.collection('users').doc(uid).set({ bio: bioTextarea.value.trim() }, { merge: true });
      bioStatus.className = 'form-success';
      bioStatus.textContent = 'Biografia atualizada!';
    } catch (err) {
      console.error('Erro ao atualizar biografia:', err);
      bioStatus.className = 'form-error';
      bioStatus.textContent = 'Não foi possível guardar a biografia.';
    }
  });

  // --- Modo online ---
  const onlineRow = document.createElement('div');
  onlineRow.className = 'switch-row';
  onlineRow.innerHTML = `
    <span class="switch-row-label">
      ${iconGlobe}
      <span>Modo online<small>Mostra aos teus amigos quando estás online</small></span>
    </span>
  `;
  const onlineSwitch = document.createElement('label');
  onlineSwitch.className = 'switch';
  onlineSwitch.innerHTML = `<input type="checkbox" ${data.onlineEnabled !== false ? 'checked' : ''}><span class="slider"></span>`;
  onlineRow.appendChild(onlineSwitch);
  profileExtraEl.appendChild(onlineRow);

  onlineSwitch.querySelector('input').addEventListener('change', async (e) => {
    const ativado = e.target.checked;
    try {
      await db.collection('users').doc(uid).set({
        onlineEnabled: ativado,
        online: ativado,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.error('Erro ao atualizar modo online:', err);
      e.target.checked = !ativado;
    }
  });

  // --- Perfil privado (trancar perfil) ---
  const privateRow = document.createElement('div');
  privateRow.className = 'switch-row';
  privateRow.innerHTML = `
    <span class="switch-row-label">
      ${iconLock}
      <span>Perfil privado<small>Só quem tiver o teu código de perfil pode conversar contigo e ver os teus storys</small></span>
    </span>
  `;
  const privateSwitch = document.createElement('label');
  privateSwitch.className = 'switch';
  privateSwitch.innerHTML = `<input type="checkbox" ${data.privateProfile === true ? 'checked' : ''}><span class="slider"></span>`;
  privateRow.appendChild(privateSwitch);
  profileExtraEl.appendChild(privateRow);

  // --- Código de acesso ao perfil privado ---
  const codeSection = document.createElement('div');
  codeSection.className = 'profile-code-section' + (data.privateProfile === true ? '' : ' hidden');
  codeSection.innerHTML = `
    <p class="field-hint" style="margin-top:14px;">O teu código de perfil — dá-o a quem quiseres deixar conversar contigo e ver os teus storys.</p>
    <div class="profile-code-display">
      <span class="profile-code-value" id="profile-code-value">A carregar...</span>
      <button type="button" class="btn-secondary" id="profile-code-generate">Gerar novo código</button>
    </div>
    <p class="profile-code-status" id="profile-code-status"></p>
    <div id="profile-code-access-list"></div>
  `;
  profileExtraEl.appendChild(codeSection);

  privateSwitch.querySelector('input').addEventListener('change', async (e) => {
    const ativado = e.target.checked;
    try {
      await db.collection('users').doc(uid).set({ privateProfile: ativado }, { merge: true });
      codeSection.classList.toggle('hidden', !ativado);
    } catch (err) {
      console.error('Erro ao atualizar privacidade do perfil:', err);
      e.target.checked = !ativado;
    }
  });

  const codeValueEl = codeSection.querySelector('#profile-code-value');
  const codeStatusEl = codeSection.querySelector('#profile-code-status');
  const codeAccessListEl = codeSection.querySelector('#profile-code-access-list');

  carregarCodigoPerfil(uid).then((codigo) => {
    codeValueEl.textContent = codigo || 'Ainda não geraste um código';
  });

  function renderListaAcessos() {
    listarAcessosConcedidos(uid).then((acessos) => {
      codeAccessListEl.innerHTML = '';
      if (!acessos.length) return;
      const title = document.createElement('p');
      title.className = 'field-hint';
      title.style.marginTop = '14px';
      title.textContent = `Pessoas com acesso (${acessos.length}):`;
      codeAccessListEl.appendChild(title);
      const ul = document.createElement('ul');
      ul.className = 'profile-access-list';
      acessos.forEach((a) => {
        const li = document.createElement('li');
        const nameSpan = document.createElement('span');
        nameSpan.textContent = a.granteeName || 'Utilizador';
        li.appendChild(nameSpan);
        const revokeBtn = document.createElement('button');
        revokeBtn.type = 'button';
        revokeBtn.className = 'request-btn reject';
        revokeBtn.title = 'Revogar acesso';
        revokeBtn.innerHTML = iconX;
        revokeBtn.addEventListener('click', async () => {
          await revogarAcesso(a.id);
          renderListaAcessos();
        });
        li.appendChild(revokeBtn);
        ul.appendChild(li);
      });
      codeAccessListEl.appendChild(ul);
    });
  }
  renderListaAcessos();

  codeSection.querySelector('#profile-code-generate').addEventListener('click', async () => {
    const btn = codeSection.querySelector('#profile-code-generate');
    btn.disabled = true;
    codeStatusEl.textContent = '';
    try {
      const novo = await gerarNovoCodigoPerfil(uid);
      codeValueEl.textContent = novo;
      codeStatusEl.className = 'profile-code-status ok';
      codeStatusEl.textContent = 'Novo código gerado. Quem já tinha acesso continua a tê-lo.';
    } catch (err) {
      console.error('Erro ao gerar código de perfil:', err);
      codeStatusEl.className = 'profile-code-status error';
      codeStatusEl.textContent = 'Não foi possível gerar o código.';
    } finally {
      btn.disabled = false;
    }
  });

  // --- Email (apenas informativo) ---
  if (email) {
    const emailInfo = document.createElement('p');
    emailInfo.style.cssText = 'color:var(--text-muted);font-size:13px;margin-top:16px;';
    emailInfo.textContent = email;
    profileExtraEl.appendChild(emailInfo);
  }

  // --- Política de privacidade ---
  const privacyRow = document.createElement('p');
  privacyRow.className = 'privacy-link-row';
  privacyRow.style.marginTop = '14px';
  const privacyLink = document.createElement('a');
  privacyLink.href = '#';
  privacyLink.textContent = 'Política de Privacidade';
  privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    privacyModal.classList.remove('hidden');
  });
  privacyRow.appendChild(privacyLink);
  profileExtraEl.appendChild(privacyRow);

  // --- Eliminar conta (zona de perigo, sempre no final) ---
  const dangerZone = document.createElement('div');
  dangerZone.className = 'danger-zone';
  dangerZone.innerHTML = `
    <p class="danger-zone-title">Zona de perigo</p>
    <button type="button" class="btn-danger" id="delete-account-btn">Eliminar conta</button>
    <div class="delete-account-confirm hidden" id="delete-account-confirm">
      <p class="delete-account-warning">
        Esta ação é permanente. O teu perfil, o teu nome de utilizador e os
        dados da tua conta vão ser apagados e não é possível recuperá-los
        depois. Mensagens que já enviaste em conversas com outras pessoas
        podem continuar visíveis para elas.
      </p>
      <button type="button" class="btn-danger" id="delete-account-confirm-btn">Sim, eliminar definitivamente</button>
      <button type="button" class="btn-secondary" id="delete-account-cancel-btn">Cancelar</button>
      <p class="form-error" id="delete-account-error"></p>
    </div>
  `;
  profileExtraEl.appendChild(dangerZone);

  const deleteBtn = dangerZone.querySelector('#delete-account-btn');
  const deleteConfirmBox = dangerZone.querySelector('#delete-account-confirm');
  const deleteConfirmBtn = dangerZone.querySelector('#delete-account-confirm-btn');
  const deleteCancelBtn = dangerZone.querySelector('#delete-account-cancel-btn');
  const deleteErrorEl = dangerZone.querySelector('#delete-account-error');

  deleteBtn.addEventListener('click', () => {
    deleteConfirmBox.classList.remove('hidden');
    deleteBtn.classList.add('hidden');
  });

  deleteCancelBtn.addEventListener('click', () => {
    deleteConfirmBox.classList.add('hidden');
    deleteBtn.classList.remove('hidden');
    deleteErrorEl.textContent = '';
  });

  deleteConfirmBtn.addEventListener('click', async () => {
    deleteErrorEl.textContent = '';
    deleteConfirmBtn.disabled = true;
    deleteCancelBtn.disabled = true;
    try {
      await eliminarConta(uid, data);
      // onAuthStateChanged trata da transição de volta para o ecrã de login
    } catch (err) {
      console.error('Erro ao eliminar conta:', err);
      if (err.message === 'cancelled') {
        deleteErrorEl.textContent = '';
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        deleteErrorEl.textContent = 'Palavra-passe incorreta. Tenta novamente.';
      } else {
        deleteErrorEl.textContent = 'Não foi possível eliminar a conta. Tenta novamente.';
      }
    }
    deleteConfirmBtn.disabled = false;
    deleteCancelBtn.disabled = false;
  });
}

chatHeaderInfo.addEventListener('click', () => {
  if (currentFriend) abrirPerfil(currentFriend.uid, false);
});

meProfileBtn.addEventListener('click', () => {
  const user = auth.currentUser;
  if (user) abrirPerfil(user.uid, true);
});

profileCloseBtn.addEventListener('click', () => profileModal.classList.add('hidden'));
profileModal.addEventListener('click', (e) => {
  if (e.target === profileModal) profileModal.classList.add('hidden');
});

// ============================================================
// Utilitários
// ============================================================
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function traduzErro(err) {
  const mapa = {
    'auth/email-already-in-use': 'Este email já está registado.',
    'auth/invalid-email': 'Email inválido.',
    'auth/weak-password': 'A palavra-passe deve ter pelo menos 6 caracteres.',
    'auth/user-not-found': 'Utilizador não encontrado.',
    'auth/wrong-password': 'Palavra-passe incorreta.',
    'auth/invalid-credential': 'Email ou palavra-passe incorretos.',
    'auth/too-many-requests': 'Demasiadas tentativas. Tenta novamente mais tarde.',
    'permission-denied': 'Sem permissão no Firestore — confirma se colaste as regras de segurança do README e publicaste-as.'
  };
  return mapa[err.code] || `Ocorreu um erro (${err.code || err.message}). Tenta novamente.`;
}
