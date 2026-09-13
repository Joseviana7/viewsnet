# ViewsNet — chat em tempo real (HTML + CSS + JS + Firebase)

Chat com nome de utilizador único, verificação de email, conversas
privadas 1-para-1 em tempo real, estado online opcional, biografia,
perfis privados com código de acesso, apagar mensagens e visualização
de imagens em destaque.

## Ficheiros
- `index.html` — login/registo, ecrã de verificação de email e ecrã de chat
- `style.css` — estilo (tema escuro, inspirado no teu mockup)
- `firebase-config.js` — onde colas a configuração do teu projeto Firebase
- `app.js` — toda a lógica (autenticação, nomes únicos, verificação, conversas)

## Como funciona o registo agora

1. O utilizador preenche **nome de utilizador**, **email** e **palavra-passe**.
2. A app verifica se esse nome de utilizador já existe na coleção `usernames`.
   Se já existir, pede para escolher outro — **só um utilizador pode ter
   cada nome**.
3. Cria a conta no Firebase Authentication e reserva o nome de utilizador
   numa transação (para evitar que duas pessoas registem o mesmo nome ao
   mesmo tempo).
4. É enviado automaticamente um **email de verificação com um link**
   (o Firebase trata do envio — avisa o utilizador para checar o spam).
5. Enquanto o email não for confirmado, a app mostra o ecrã "Confirma o teu
   email" com um botão **Reenviar email** e outro **Já confirmei, continuar**.
6. Depois de confirmado, o utilizador entra na conversa e pode procurar
   amigos pelo nome de utilizador (`@nome`) para começar a conversar
   1-para-1.

## Passo a passo no Firebase

1. Vai a [console.firebase.google.com](https://console.firebase.google.com) e
   clica em **Criar projeto**.
2. Dentro do projeto, clica no ícone **Web (`</>`)** para registar uma app.
3. Copia o bloco `firebaseConfig` que o Firebase mostra para o teu
   `firebase-config.js`.
4. No menu **Build**:
   - **Authentication** → *Sign-in method* → ativa **Email/Password**.
   - **Authentication** → *Sign-in method* → ativa também **Google** (é
     necessário para o botão "Continuar com Google" no login e no
     registo funcionar) e escolhe um email de suporte do projeto.
   - Em **Authentication → Templates**, podes personalizar o email de
     verificação e o email de **redefinição de palavra-passe** (idioma,
     remetente, texto) — por padrão já funcionam sem configuração extra.
   - **Firestore Database** → **Criar base de dados**.

⚠️ Se testares localmente com `npx serve .`, confirma que o domínio que
usas (ex. `localhost`) está na lista de **domínios autorizados** em
**Authentication → Settings → Domínios autorizados** — o Firebase já
inclui `localhost` por padrão.

## Novidades desta versão

- **Novo ícone da marca** (o "balão de conversa" com três pontos) em vez
  do ícone antigo, usado no ecrã de login, no ecrã de verificação e na
  barra lateral do chat.
- **Favicon** (`favicon.svg`) — o mesmo ícone passa a aparecer na aba do
  navegador.
- **Ícone de perfil**: quando um utilizador não tem foto de perfil, o
  ecrã de perfil mostra um ícone de silhueta em vez de uma letra/`?`.
- **Política de Privacidade**: link disponível no ecrã de login e no teu
  próprio ecrã de perfil, que abre um resumo do que é feito com os teus
  dados. É um texto genérico — revê e ajusta ao teu caso antes de
  publicares a app a sério.
- **Redefinir palavra-passe**: link "Esqueceste a palavra-passe?" no
  login. Ao introduzires o teu email, o Firebase envia automaticamente
  um email com um link para escolheres uma nova palavra-passe
  (`auth.sendPasswordResetEmail`) — não precisas de configurar nada além
  de ativar o Email/Password acima.
- **Login/registo automático com Google**: botão "Continuar com Google"
  tanto no login como no registo. Se for a primeira vez que essa conta
  Google entra na app, aparece um pequeno ecrã extra a pedir para
  escolheres um nome de utilizador único (`@nome`) antes de entrares no
  chat — o resto (nome, email, foto) já vem preenchido pela conta
  Google. Contas Google já entram com o email automaticamente
  verificado, por isso não passam pelo ecrã de confirmação de email.
- **Eliminar conta**: no fundo do teu próprio ecrã de perfil, na
  "Zona de perigo", há um botão para eliminares a conta em definitivo.
  Apaga o teu nome de utilizador reservado e o teu documento de perfil,
  e apaga a tua conta do sistema de autenticação. Se a tua sessão não
  for recente, a app pede para confirmares a tua identidade outra vez
  (palavra-passe, ou reautenticação com Google) antes de eliminar,
  como o próprio Firebase exige para ações sensíveis. Mensagens que já
  enviaste em conversas continuam visíveis para a outra pessoa — apagar
  isso por completo exigiria percorrer todas as conversas com uma
  Cloud Function, o que não está incluído nesta versão.
  ⚠️ Como esta função agora também apaga o documento em `usernames`,
  **tens de atualizar as regras do Firestore** com a versão mais
  recente deste README (o campo `allow delete` de `usernames` mudou de
  `false` para permitir que o próprio dono liberte o nome) e publicá-las
  de novo.

## Regras do Firestore (recomendadas)

No separador **Regras** do Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Nomes de utilizador — únicos: só cria se ainda não existir
    match /usernames/{usernameId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
                    && request.resource.data.uid == request.auth.uid
                    && !exists(/databases/$(database)/documents/usernames/$(usernameId));
      // Permite atualizar só o campo "name" (quando o utilizador muda de
      // nome) — nunca o "uid", para a unicidade nunca ser comprometida.
      allow update: if request.auth != null
                    && resource.data.uid == request.auth.uid
                    && request.resource.data.uid == resource.data.uid
                    && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['name']);
      // Só o dono do nome pode libertá-lo (necessário para "Eliminar conta").
      allow delete: if request.auth != null && resource.data.uid == request.auth.uid;
    }

    // Perfis de utilizador
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;

      // Código de perfil (só o próprio dono pode ler e escrever) — fica
      // à parte do documento principal de "users" porque esse é legível
      // por qualquer utilizador autenticado, e o código tem de ficar
      // secreto até ser partilhado por fora da app.
      match /private/{docId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }

    // Conversas 1-para-1: só os dois participantes acedem
    match /conversations/{conversationId} {
      allow read, update: if request.auth != null
                    && request.auth.uid in resource.data.participants;
      allow create: if request.auth != null
                    && request.auth.uid in request.resource.data.participants;

      match /messages/{messageId} {
        allow read: if request.auth != null
                    && request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
        allow create: if request.auth != null
                    && request.resource.data.senderId == request.auth.uid
                    && request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
        // Só permite alterar os campos "read" e "forwarded" (recibos de
        // leitura) — nunca o texto ou o remetente de uma mensagem já enviada.
        allow update: if request.auth != null
                    && request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants
                    && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['read', 'forwarded']);
        // Apagar mensagem: só quem a enviou pode apagá-la.
        allow delete: if request.auth != null
                    && request.auth.uid == resource.data.senderId;
      }
    }

    // Perfil privado/trancado — acesso por código. O "id" do documento é
    // sempre "{donoUid}_{convidadoUid}". Quem quer desbloquear o perfil de
    // alguém envia o código no campo "codeUsed"; a regra abaixo compara-o,
    // do lado do servidor, com o código guardado em
    // users/{donoUid}/private/profile — sem nunca deixar quem está a tentar
    // adivinhar o código lê-lo diretamente.
    match /profileUnlocks/{unlockId} {
      allow read: if request.auth != null
                    && (request.auth.uid == resource.data.owner || request.auth.uid == resource.data.grantee);
      allow create: if request.auth != null
                    && request.auth.uid == request.resource.data.grantee
                    && unlockId == request.resource.data.owner + '_' + request.resource.data.grantee
                    && request.resource.data.codeUsed ==
                       get(/databases/$(database)/documents/users/$(request.resource.data.owner)/private/profile).data.code;
      // Só o dono pode revogar um acesso já concedido.
      allow delete: if request.auth != null && request.auth.uid == resource.data.owner;
      allow update: if false;
    }

    // Stories — só fotos, qualquer utilizador autenticado pode ver;
    // só quem publicou pode apagar; nunca podem ser editados.
    match /stories/{storyId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
                    && request.resource.data.uid == request.auth.uid
                    && request.resource.data.imageData is string;
      allow update: if false;
      allow delete: if request.auth != null && resource.data.uid == request.auth.uid;

      // Quem viu o story — cada pessoa só pode criar/atualizar o seu
      // próprio registo de visualização (id = uid de quem viu).
      match /views/{viewerId} {
        allow read: if request.auth != null;
        allow create, update: if request.auth != null && request.auth.uid == viewerId;
        allow delete: if false;
      }

      // Gostos (coração rosa) — cada pessoa só controla o seu próprio "like".
      match /likes/{likerId} {
        allow read: if request.auth != null;
        allow write: if request.auth != null && request.auth.uid == likerId;
      }
    }

    // Seguir utilizadores — o id do documento é sempre "{seguidor}_{seguido}".
    // Só quem segue pode criar/apagar a própria relação de seguidor.
    match /follows/{followId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
                    && request.resource.data.followerUid == request.auth.uid
                    && followId == request.resource.data.followerUid + '_' + request.resource.data.followingUid;
      allow delete: if request.auth != null && resource.data.followerUid == request.auth.uid;
      allow update: if false;
    }
  }
}
```

## Índice do Firestore

A lista de conversas usa `where('participants', 'array-contains', uid)`.
Não precisa de índice composto (não há `orderBy` na query — a ordenação é
feita no próprio `app.js`), por isso deve funcionar sem configuração extra.
Se o Firestore pedir um índice na consola do navegador, basta clicar no
link que ele mostra no erro para o criar automaticamente.

## Como testar

Como usa o Firebase via CDN (sem build), abre com um servidor local:

```bash
npx serve .
```

ou a extensão "Live Server" do VS Code. (Abrir `index.html` diretamente com
`file://` pode bloquear alguns pedidos do Firebase.)

⚠️ Para testar as conversas precisas de **duas contas diferentes** — por
exemplo, uma no navegador normal e outra numa janela anónima, cada uma com
um nome de utilizador e email diferentes.

## Estrutura dos dados no Firestore

- `usernames/{nomeMinusculo}` → `{ uid, name }` — reserva o nome único
- `users/{uid}` → `{ name, usernameLower, email, photoURL, bio, onlineEnabled, online, lastSeen, privateProfile }`
  - `users/{uid}/private/profile` → `{ code }` — o código de acesso ao perfil privado; só o próprio dono consegue ler ou escrever este documento
- `conversations/{idConversa}` → `{ participants: [uidA, uidB], participantNames, lastMessage, lastMessageAt }`
  - `idConversa` é sempre os dois UIDs ordenados e juntos com `_`
  - `conversations/{idConversa}/messages/{id}` → `{ text ou imageURL, senderId, senderName, createdAt, read, forwarded }`
- `profileUnlocks/{donoUid_convidadoUid}` → `{ owner, grantee, granteeName, codeUsed, unlockedAt }`
  - Criado quando alguém desbloqueia com sucesso o perfil privado de outra pessoa com o código correto.
  - Enquanto existir, o `grantee` pode conversar com o `owner` e ver os storys dele sem voltar a pedir o código.

## Perfis (novo)

- Clicar no nome/avatar no topo do chat abre o perfil da pessoa com quem
  estás a falar (nome, nome de utilizador, foto, biografia e estado online,
  se tiver).
- Clicar no teu próprio nome, em baixo na barra lateral, abre o teu perfil
  e mostra também os controlos para:
  - **Alterar foto** — escolhes uma imagem do teu dispositivo, a app
    redimensiona-a automaticamente e guarda-a no teu perfil.
  - **Alterar nome** — o nome mostrado em todo o lado atualiza-se sozinho,
    em tempo real, em todas as conversas abertas.
  - **Biografia** — um pequeno texto (até 160 caracteres) que aparece no
    teu perfil para quem o visitar.
  - **Modo online** — um interruptor que ativas/desativas quando
    quiseres. Enquanto ativo, os teus amigos veem uma bolinha verde no
    teu avatar quando estás com a app aberta e visível; quando desativado,
    nunca apareces como online para ninguém.
  - **Perfil privado** — ver secção abaixo.
  - Ver o teu email (só tu vês o teu próprio email).

⚠️ O **nome de utilizador único** (o `@nome` usado para procurar amigos)
não muda — só o nome de exibição. Isto evita ter de reatribuir a unicidade
sempre que alguém troca de nome.

## Fotos e imagens (novo)

Para manter a app simples e sem precisar de configurar o Firebase Storage,
tanto as **fotos de perfil** como as **imagens enviadas no chat** são
redimensionadas no navegador (com um `<canvas>`) e guardadas como texto
(base64) diretamente no Firestore. Por isso:
- As imagens ficam automaticamente mais pequenas antes de serem enviadas.
- Não precisas de ativar nada extra no Firebase além do que já está no
  passo a passo acima.
- Evita enviar fotos muito grandes (o Firestore tem um limite de 1 MB por
  mensagem) — para uso normal (fotos do telemóvel, capturas de ecrã) não
  deve ser problema.

## Estado "online" (novo)

Ao contrário da versão anterior, o estado online voltou — mas é **cada
pessoa que decide** se quer aparecer online, através do interruptor
"Modo online" no seu perfil:

- Com o modo ativado, a app marca `online: true` sempre que a aba/janela
  está visível, e `online: false` quando fica em segundo plano, é fechada
  ou a pessoa termina sessão.
- Com o modo desativado, o campo `online` fica sempre `false` e ninguém vê
  a bolinha verde no teu avatar, mesmo estando a usar a app.
- A bolinha verde aparece no avatar da barra lateral, no cabeçalho da
  conversa e no perfil, sempre que `onlineEnabled` e `online` forem ambos
  verdadeiros.

⚠️ Esta deteção é feita apenas com a API `visibilitychange` do navegador
(sem Firebase Realtime Database), por isso é uma aproximação simples —
não deteta quedas de internet nem fecho abrupto do processo, só trocas de
aba/janela e fecho normal da página.

## Perfil privado / código de acesso (novo)

- No teu perfil, ativa o interruptor **"Perfil privado"**. Aparece logo a
  seguir a secção **"O teu código de perfil"**.
- Clica em **"Gerar novo código"** para criares um código de 6 caracteres.
  Copia-o e envia-o, por fora da app (mensagem, chamada, etc.), a quem
  quiseres deixar entrar.
- Quando alguém que **ainda não tem o código** procura o teu perfil (pelo
  `@nome`) e tenta ver o teu perfil ou conversar contigo, a app **não**
  mostra o chat nem os teus dados — aparece só o teu nome, o teu `@nome` e
  o texto **"Perfil privado"**, com um campo para introduzir o código.
- Ao escrever o código correto, a pessoa fica com **acesso permanente**:
  passa a poder conversar contigo e ver os teus storys sem ter de repetir o
  código. Se se enganar, vê "Código incorreto." e pode tentar de novo.
- No teu perfil, em **"Pessoas com acesso"**, vês a lista de quem já
  desbloqueou o teu perfil e podes **revogar** o acesso de alguém a
  qualquer momento (ícone ✗).
- Gerar um código novo **não revoga** o acesso de quem já tinha entrado
  com o código anterior — serve para dares a próxima pessoa um código
  diferente, sem teres de repetir o antigo. Se quiseres cortar o acesso de
  toda a gente, revoga-os um a um na lista.
- Se já tinhas uma conversa com essa pessoa antes de trancar o perfil, ela
  continua a poder falar contigo sem precisar de código — o perfil privado
  só afeta **conversas novas** (e a visibilidade dos teus storys para quem
  ainda não tem acesso).

⚠️ Importante: o código em si fica guardado em
`users/{uid}/private/profile`, um documento que **só o dono consegue ler**
— as regras do Firestore acima confirmam o código de quem tenta desbloquear
usando `get()` do lado do servidor, sem nunca deixar esse campo legível
para outra pessoa. Ainda assim, tal como o resto desta app (sem backend
próprio), alguém tecnicamente capaz de contornar a interface poderia
tentar interagir diretamente com a base de dados; para uma garantia 100%
à prova de manipulação (ex.: limitar tentativas de código erradas) seria
preciso uma Cloud Function.

## Apagar mensagens (novo)

- Nas tuas próprias mensagens (texto ou imagem) aparece um ícone de
  lixo. Ao clicares, a app pede confirmação e, se confirmares, apaga a
  mensagem de vez da conversa (para ti e para a outra pessoa).
- Só o remetente de uma mensagem a pode apagar — as regras do Firestore
  acima impedem que apagues mensagens de outra pessoa.

## Ver imagens em tamanho grande (novo)

- Clicar numa imagem enviada no chat já não abre outra página/aba — abre
  um cartão maior por cima da conversa (como o do perfil), com a imagem
  em destaque. Basta clicar fora do cartão ou no "×" para fechar.

## Responsividade (novo)

O layout foi revisto para se adaptar a qualquer tamanho de ecrã:
- **Telemóvel** (até 760px): a sidebar e a conversa deixam de ficar lado a
  lado — a app mostra só um "ecrã" de cada vez. Ao abrires uma conversa, a
  lista desliza para fora e aparece um botão **← voltar** no cabeçalho do
  chat para regressares à lista.
- **Ecrãs muito pequenos** (até 400px/340px) e **modo paisagem com pouca
  altura**: botões, avatares e bolhas de mensagem encolhem um pouco para
  caber sem cortar conteúdo.
- **Tablets** (até 1024px) e **ecrãs grandes** (1400px+): a largura da
  sidebar e o limite de largura das bolhas de mensagem ajustam-se para
  aproveitar melhor o espaço, sem ficarem nem apertadas nem gigantes.

## Mensagens de áudio (novo)

- O botão de microfone, ao lado do de imagem, inicia a gravação
  (pede permissão do microfone ao navegador). Enquanto gravas, aparece um
  temporizador e um ponto vermelho a pulsar.
- Clicar outra vez no microfone **para e envia** o áudio; o ✕ ao lado do
  temporizador **cancela** sem enviar.
- Tal como as imagens, o áudio é gravado com a API `MediaRecorder` do
  navegador e guardado como texto (base64) diretamente no Firestore — sem
  precisar de Firebase Storage. Por isso a gravação tem um limite de
  **90 segundos** (para caber no limite de 1 MB por mensagem do
  Firestore); se ultrapassar, a app para e envia automaticamente.
- Áudios recebidos podem ser reencaminhados tal como texto e imagens.

## Stories — só fotos, duram 24 horas (novo)

- No topo da barra lateral aparece uma fila de círculos, estilo
  "stories": o teu (com um "+" para adicionares) e o de cada amigo que
  tenha um story ativo.
- **Adicionar**: clica no "+" do teu círculo, escolhe uma foto do
  dispositivo (só imagens — vídeo não é suportado) e ela é publicada
  automaticamente. A foto é redimensionada no navegador antes de ser
  guardada, tal como as imagens do chat.
- **Ver**: clicar no círculo de alguém abre um visualizador em ecrã
  inteiro com uma barra de progresso que avança sozinha (5 segundos por
  foto) — podes tocar nos lados esquerdo/direito da imagem para
  retroceder/avançar manualmente. Depois do último story, passa
  automaticamente para a pessoa seguinte com stories.
- **Expiração automática**: cada story só é mostrado nas 24 horas depois
  de publicado — passado esse tempo, deixa de aparecer sozinho, sem
  precisares de apagar nada à mão. (Os documentos antigos ficam na base
  de dados; se quiseres apagá-los de vez, podias adicionar uma Cloud
  Function agendada — não incluída nesta versão simples.)
- **Apagar**: só quem publicou um story pode apagá-lo — ao abrir os teus
  próprios stories aparece um ícone de lixo no cabeçalho do visualizador.
- ⚠️ Se o dono do story tiver **perfil privado**, o story só aparece na
  barra de quem já tiver o código de perfil dele (ver secção "Perfil
  privado / código de acesso" acima). Para perfis públicos, continua a
  valer o comportamento antigo: qualquer utilizador com sessão iniciada
  pode ver os stories, mesmo sem terem conversa iniciada.

## Possíveis melhorias

- Indicador "a escrever...".
- Página de "esqueci a palavra-passe" (`auth.sendPasswordResetEmail`).
- Cloud Function agendada para apagar definitivamente stories expirados
  (hoje eles só deixam de aparecer, mas continuam guardados no Firestore).

## Recibos de leitura e reencaminhar (atualizado)

- Cada mensagem tem os campos `read` (bool), `delivered` (bool) e
  `forwarded` (bool).
- **Um ícone cinza** — mensagem enviada, ainda não chegou ao aparelho da
  outra pessoa (ela está offline ou com a app fechada).
- **Dois ícones cinzas** — a mensagem já **chegou** ao aparelho da outra
  pessoa (`delivered: true`), mas ela ainda não abriu essa conversa para a
  ler. Isto é atualizado em tempo real assim que a app da outra pessoa
  recebe a mensagem, mesmo que ela esteja a ver outra conversa.
- **Dois ícones azuis** — a outra pessoa abriu a conversa e **viu** a
  mensagem (`read: true`).
- **Três ícones** — a outra pessoa reencaminhou essa tua mensagem para mais
  alguém (`forwarded: true`).
- O botão de reencaminhar (ícone de seta) aparece nas mensagens que
  recebeste (não nas que tu enviaste) e abre uma lista das tuas outras
  conversas para escolheres para quem reencaminhar. Funciona tanto para
  texto como para imagens.

## Contador de mensagens não lidas na sidebar (novo)

- Cada conversa na barra lateral mostra agora uma bolinha com o número de
  mensagens que ainda não leste (ex.: "3"), tal como no WhatsApp — já não
  precisas de entrar na conversa para saber que recebeste algo novo.
- O número atualiza-se sozinho em tempo real e desaparece assim que abres
  a conversa (as mensagens ficam marcadas como lidas automaticamente).

## Seguir utilizadores, seguidores e a seguir (novo)

- Depois de procurares alguém pelo nome de utilizador, aparece um botão
  **Seguir** ao lado de "Conversar" — funciona tanto para perfis públicos
  como privados, e não depende de terem conversa iniciada.
- O mesmo botão aparece dentro do perfil de qualquer pessoa (**Seguir** /
  **A seguir**, ao clicares alterna entre os dois estados).
- Ao abrir qualquer perfil (o teu ou o de outra pessoa) passa a mostrar-se
  quantas pessoas ela **segue** e quantas pessoas a **seguem**.
- Os dados ficam na coleção `follows/{seguidor}_{seguido}` — por isso cada
  pessoa só pode criar ou apagar a própria relação de "seguir".

## Stories: quem viu e curtir com coração rosa (novo)

- Ao veres o story de alguém, isso fica registado automaticamente. Quando
  **tu** és o dono do story, aparece no canto inferior esquerdo um ícone de
  olho com o número de pessoas que já viram — ao tocares, abre a lista com
  o nome de cada uma.
- Quando vês o story de outra pessoa, aparece no canto inferior direito um
  ícone de coração — toca para curtir (fica rosa) ou tira o gosto ao tocar
  outra vez.
- Estes dados ficam nas subcoleções `stories/{id}/views` e
  `stories/{id}/likes`.

⚠️ Importante: se já tinhas as regras antigas publicadas, **substitui-as**
pelas novas deste README e clica em **Publicar** outra vez.
