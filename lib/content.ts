/**
 * Hechos del producto. Fuente: https://github.com/BautistaAlosMartorell/utnfrm-mcp (rama main, versión 2.1.0:
 * README, SECURITY y test de contrato de herramientas).
 * Mantener alineado con el README: no prometer nada que no esté publicado.
 * Al publicar una versión nueva, actualizar `product` y revisar `tools`, `clients`, `installByOs` y las FAQ.
 */

const repo = "https://github.com/BautistaAlosMartorell/utnfrm-mcp";
const version = "2.1.0";

export const product = {
  name: "UTN FRM MCP",
  version,
  channel: "beta multiplataforma",
  platforms: "Windows, Linux y macOS",
  node: "22.13",
  cli: "utn-mcp-mendoza",
  repo,
  /** Página de releases: de ahí se bajan el instalador y su .sha256. */
  release: `${repo}/releases`,
  // shortcut: #main se mueve con cada push (el tag v2.1.0 quedó antes del fix de Windows): fijar acá el tag nuevo cuando el dueño lo publique.
  gitSpec: "github:BautistaAlosMartorell/utnfrm-mcp#main",
  pkgName: `utn-mcp-mendoza-${version}.tgz`,
  mcpbName: `utn-mcp-mendoza-${version}.mcpb`,
  issues: `${repo}/issues`,
  security: `${repo}/blob/main/SECURITY.md`,
  readme: `${repo}#readme`,
} as const;

export type Access = "lectura" | "permiso" | "local" | "preview";

export interface Tool {
  name: string;
  access: Access;
  area: string;
  does: string;
}

const CAMPUS = "Campus Virtual";
const AUTO = "Autogestión (Sysacad)";
const MAIL = "Correo institucional";
const SES = "Sesión y ajustes";
const WRITE = "Escrituras de Moodle (deshabilitadas)";

export const tools: Tool[] = [
  { name: "list_courses", access: "lectura", area: CAMPUS, does: "Lista las materias de tu cuenta." },
  { name: "open", access: "lectura", area: CAMPUS, does: "Abre una materia, sección o actividad y muestra su contenido." },
  { name: "get_course_contents", access: "lectura", area: CAMPUS, does: "Todas las unidades de una materia con sus actividades, también en formato por mosaicos." },
  { name: "list_assignments", access: "lectura", area: CAMPUS, does: "Busca las actividades de una materia, con fechas y estado." },
  { name: "get_assignment", access: "lectura", area: CAMPUS, does: "Lee la consigna, el estado y los adjuntos de una actividad." },
  { name: "get_deadlines", access: "lectura", area: CAMPUS, does: "Próximas entregas y cierres de cuestionarios, por fecha y con tu estado de entrega." },
  { name: "get_announcements", access: "lectura", area: CAMPUS, does: "Avisos recientes del foro de novedades." },
  { name: "get_quiz_info", access: "lectura", area: CAMPUS, does: "Reglas, nota e intentos de un cuestionario. Nunca inicia ni envía un intento." },
  { name: "list_resources", access: "lectura", area: CAMPUS, does: "Recorre los recursos y archivos de una materia." },
  { name: "read_file", access: "lectura", area: CAMPUS, does: "Extrae texto de PDF, DOCX, PPTX, XLSX y más. Con full: true devuelve el documento completo y reconstruye las tablas de los PDF." },
  { name: "study_pack", access: "lectura", area: CAMPUS, does: "Reúne el material de una unidad con índice de temas y estado de lectura. Es la base de los resúmenes." },
  { name: "get_pdf_page_image", access: "lectura", area: CAMPUS, does: "Dibuja una página de PDF como imagen, para diagramas y fórmulas." },
  { name: "read_external", access: "lectura", area: CAMPUS, does: "Lee notebooks y archivos públicos que enlaza la cátedra (GitHub, Gist, Colab en GitHub), sin tus cookies." },
  { name: "get_grades", access: "lectura", area: CAMPUS, does: "Consulta calificaciones, según tus permisos." },
  { name: "whoami", access: "lectura", area: CAMPUS, does: "Muestra con qué cuenta está operando la sesión." },
  { name: "list_participants", access: "lectura", area: CAMPUS, does: "Lista participantes de una materia, si tu cuenta puede verlos." },
  { name: "list_forums", access: "lectura", area: CAMPUS, does: "Lista los foros de una materia." },
  { name: "get_forum_discussions", access: "lectura", area: CAMPUS, does: "Lee los temas de un foro." },
  { name: "get_discussion_posts", access: "lectura", area: CAMPUS, does: "Lee los mensajes de una discusión." },
  { name: "list_calendar_events", access: "lectura", area: CAMPUS, does: "Consulta eventos y vencimientos del calendario." },
  { name: "get_choice", access: "lectura", area: CAMPUS, does: "Lee una consulta o elección de la materia." },
  { name: "download_file", access: "local", area: CAMPUS, does: "Guarda un archivo del Campus en ~/Downloads/utn-mcp sin sobrescribir nada." },

  { name: "sysacad_consultar", access: "lectura", area: AUTO, does: "Exámenes aprobados y aplazados, plan, cursado, horarios, estado académico y correlatividades." },
  { name: "sysacad_inscripcion_estado", access: "lectura", area: AUTO, does: "Dice si la inscripción a cursado está abierta. Solo mira." },
  { name: "get_autogestion_avisos", access: "lectura", area: AUTO, does: "Avisos públicos de Autogestión: llamados, plazos, certificados. No requiere sesión." },

  { name: "mail_list_messages", access: "lectura", area: MAIL, does: "Lista los mensajes de una carpeta. No marca nada como leído." },
  { name: "mail_read_message", access: "lectura", area: MAIL, does: "Lee un mensaje. No lo marca como leído." },
  { name: "mail_search", access: "lectura", area: MAIL, does: "Busca por remitente, asunto, texto, fechas y no leídos, en una carpeta o en todas." },
  { name: "mail_delete_messages", access: "permiso", area: MAIL, does: "Mueve mensajes a la Papelera. Pide tu permiso en cada llamada y no borra de forma definitiva." },
  { name: "mail_restore_messages", access: "permiso", area: MAIL, does: "Recupera mensajes de la Papelera. Pide tu permiso en cada llamada." },
  { name: "mail_set_seen", access: "permiso", area: MAIL, does: "Marca mensajes como leídos o no leídos. Pide tu permiso en cada llamada." },

  { name: "session_status", access: "lectura", area: SES, does: "Indica si la sesión del Campus está activa." },
  { name: "start_login", access: "local", area: SES, does: "Abre la ventana de inicio de sesión del Campus, sin terminal. También sirve para renovarla." },
  { name: "install_browser", access: "local", area: SES, does: "Instala Chromium (unos 150 MB) la primera vez, desde tu cliente." },
  { name: "set_active_courses", access: "local", area: SES, does: "Guarda tus materias del cuatrimestre para que las consultas generales vayan más rápido." },

  { name: "submit_assignment", access: "preview", area: WRITE, does: "Prepara una entrega, pero está deshabilitada: no sube ni envía archivos." },
  { name: "forum_post_topic", access: "preview", area: WRITE, does: "Muestra cómo quedaría un tema nuevo. No publica." },
  { name: "forum_reply", access: "preview", area: WRITE, does: "Muestra cómo quedaría una respuesta. No publica." },
  { name: "calendar_add_event", access: "preview", area: WRITE, does: "Muestra el evento que se crearía. No lo crea." },
  { name: "submit_choice", access: "preview", area: WRITE, does: "Muestra qué opción se votaría. No vota." },
];

export const toolAreas = [CAMPUS, AUTO, MAIL, SES, WRITE];

export const accessMeta: Record<Access, { label: string }> = {
  lectura: { label: "Lectura" },
  permiso: { label: "Con permiso" },
  local: { label: "En tu equipo" },
  preview: { label: "Vista previa" },
};

/** Atajos (prompts MCP) que el cliente muestra como acciones. */
export const shortcuts = [
  { name: "conectar_con_el_campus", does: "Instala el navegador e inicia sesión, sin terminal." },
  { name: "resumen_de_mi_semana", does: "Qué vence en 7 días y qué avisos hay." },
  { name: "que_entrego", does: "Pendientes hasta una fecha o cantidad de días." },
  { name: "resumir_unidad", does: "Resumen de una unidad, con índice de cobertura y páginas de origen." },
  { name: "preparar_parcial", does: "Temas, chuleta, preguntas de práctica y plan de estudio." },
  { name: "practica_de_unidad", does: "Preguntas de práctica con respuestas." },
  { name: "tarjetas_de_repaso", does: "Tarjetas para repasar una unidad." },
  { name: "plan_de_estudio", does: "Plan de estudio día por día." },
];

export type OsId = "windows" | "linux" | "macos";

export interface OsDef {
  id: OsId;
  label: string;
  shell: string;
  /** Prerrequisito del sistema, si lo hay. */
  before?: string;
  /** Instalación con npm directo desde GitHub. */
  npm: string;
  install: string;
  verify: string;
  note?: string;
}

const dir = "utn-mcp-beta";

/** npm 12 bloquea las dependencias git por defecto (EALLOWGIT): el flag las habilita solo para este comando. */
const npmGit = `npm install --global --allow-git=all ${product.gitSpec}`;
const browser = `${product.cli} install-browser`;
const linuxDeps = ["sudo apt-get update", "sudo apt-get install -y libsecret-tools gnome-keyring"];

export const installMethods = [
  { id: "npm", label: "Con npm" },
  { id: "tgz", label: "Instalador .tgz" },
] as const;
export type MethodId = (typeof installMethods)[number]["id"];

/** Paso 1: descarga manual de la release, tal como figura en el README. */
export const installByOs: OsDef[] = [
  {
    id: "windows",
    label: "Windows",
    shell: "PowerShell",
    npm: [npmGit, browser].join("\n"),
    install: [
      `cd "$HOME\\Downloads\\${dir}"`,
      `npm install --global .\\${product.pkgName}`,
      `${product.cli} install-browser`,
    ].join("\n"),
    verify: [
      `$esperado = (Get-Content .\\${product.pkgName}.sha256 -Raw).Trim().Split()[0]`,
      `$obtenido = (Get-FileHash .\\${product.pkgName} -Algorithm SHA256).Hash.ToLower()`,
      `if ($obtenido -eq $esperado) { "OK: instalador verificado" } else { "ERROR: vuelve a descargarlo" }`,
    ].join("\n"),
  },
  {
    id: "linux",
    label: "Linux",
    shell: "Terminal",
    before:
      "Necesita el almacén seguro de contraseñas (Secret Service) de una sesión de escritorio normal, desbloqueado. No funciona de forma segura por SSH, sin pantalla ni en WSL. El bloque es para Ubuntu o Debian; en otras distribuciones instalá el equivalente.",
    npm: [...linuxDeps, npmGit, browser].join("\n"),
    install: [
      `cd ~/Downloads/${dir}`,
      ...linuxDeps,
      `npm install --global ./${product.pkgName}`,
      `${product.cli} install-browser`,
    ].join("\n"),
    verify: `sha256sum -c ${product.pkgName}.sha256`,
  },
  {
    id: "macos",
    label: "macOS",
    shell: "Terminal",
    note: "Cuando macOS pregunte, permití que UTN FRM MCP use el Llavero de inicio de sesión.",
    npm: [npmGit, browser].join("\n"),
    install: [
      `cd ~/Downloads/${dir}`,
      `npm install --global ./${product.pkgName}`,
      `${product.cli} install-browser`,
    ].join("\n"),
    verify: `shasum -a 256 -c ${product.pkgName}.sha256`,
  },
];

/** Paso 2: atajo guiado o login manual. */
export const wizardCommand = `${product.cli} setup-wizard`;
export const loginCommands = [`${product.cli} login`, `${product.cli} status`].join("\n");

export type ClientId = "codex" | "claude-code" | "opencode" | "claude-desktop";

export interface ClientDef {
  id: ClientId;
  label: string;
  commands?: string;
  how: string;
  doc?: { label: string; href: string };
}

export const clients: ClientDef[] = [
  {
    id: "codex",
    label: "Codex",
    commands: [`${product.cli} setup-codex`, "codex mcp list"].join("\n"),
    how: "Registra el servidor en Codex. Debe aparecer utn-mendoza en la lista; después cerrá y volvé a abrir Codex.",
    doc: { label: "MCP en Codex", href: "https://developers.openai.com/codex/mcp/" },
  },
  {
    id: "claude-code",
    label: "Claude Code",
    commands: [`${product.cli} setup-claude`, "claude mcp list"].join("\n"),
    how: "Lo registra con alcance de usuario. Debe aparecer utn-mendoza; después reiniciá Claude Code.",
  },
  {
    id: "opencode",
    label: "OpenCode",
    commands: [`${product.cli} setup-opencode`, "opencode mcp list"].join("\n"),
    how: "Lo registra en la configuración global de OpenCode. Debe aparecer utn-mendoza; después reiniciá OpenCode.",
  },
  {
    id: "claude-desktop",
    label: "Claude Desktop",
    how: `Sin terminal: bajá ${product.mcpbName} de la release (con su .sha256), abrilo con doble clic o en Ajustes → Extensiones y completá las dos opciones opcionales. Después pedile «Conectame con el Campus»: el paquete no está firmado, así que verificá su SHA-256.`,
    doc: { label: "Servidores locales en Claude Desktop", href: "https://support.anthropic.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop" },
  },
];

/** Paso 4: primeras consultas. */
export const prompts = [
  "Listá mis materias y las tareas próximas. Si no hay resultados, decime que la lista está vacía; si hubo un error de acceso, explicame cuál.",
  "¿Qué me falta para recibirme y qué materia conviene rendir primero?",
  "Resumime la unidad 3 de Física II y armame preguntas de práctica.",
  "¿Tengo mails sin leer de la facultad?",
];

export const uninstallCommands = [
  `${product.cli} logout`,
  `${product.cli} forget-credentials`,
  "codex mcp remove utn-mendoza",
  "claude mcp remove utn-mendoza --scope user",
  "opencode mcp remove utn-mendoza",
  `npm uninstall --global ${product.cli}`,
].join("\n");

export const faqs: { q: string; a: string }[] = [
  {
    q: "¿Qué es UTN FRM MCP?",
    a: "Un servidor local que le da a tu asistente de IA herramientas para consultar el Campus Virtual, Autogestión (Sysacad) y el correo institucional de la UTN Facultad Regional Mendoza, con tu propia cuenta. Usa el Model Context Protocol (MCP), un estándar abierto para conectar asistentes con herramientas.",
  },
  {
    q: "¿Con qué asistentes funciona?",
    a: "Con Codex, Claude Code, OpenCode y Claude Desktop (mediante un paquete .mcpb, sin terminal). Cada uno tiene su comando de registro o su paquete. No funciona desde un chat web que no admita servidores locales.",
  },
  {
    q: "¿Funciona en Windows, Linux y macOS?",
    a: "Sí. La instalación, el arranque del servidor, el registro de cada cliente, el almacenamiento seguro de una sesión de prueba y Chromium pasan en la integración continua de los tres sistemas. Linux se probó a mano con una cuenta real; Windows tiene validación previa y macOS todavía necesita pruebas de estudiantes. En Linux hace falta una sesión de escritorio con Secret Service.",
  },
  {
    q: "¿La IA puede entregar mis trabajos o publicar por mí?",
    a: "No. En el Campus y en Autogestión es solo lectura: entregar, publicar en foros, responder, votar, crear eventos o inscribirse están deshabilitados. Las herramientas de ese tipo, como mucho, muestran una vista previa. Las entregas las hacés vos desde el Campus.",
  },
  {
    q: "¿Qué puede hacer con mi correo?",
    a: "Listar, leer y buscar mensajes sin marcarlos como leídos. También puede mover mensajes a la Papelera, recuperarlos y marcarlos como leídos o no leídos, pero te pide permiso en cada llamada. Nunca envía mensajes ni borra de forma definitiva.",
  },
  {
    q: "¿Qué pasa con mi contraseña?",
    a: "El Campus se inicia en su propia página, en una ventana de Chromium: ahí escribís tu contraseña, no en el asistente. Autogestión y el correo necesitan tu usuario y contraseña; solo si los cargás en el asistente de instalación se guardan cifrados en el almacén seguro del sistema (DPAPI, Llavero o Secret Service), nunca en archivos de texto ni en la configuración. Con forget-credentials los borrás.",
  },
  {
    q: "¿Mi asistente ve lo que consulto?",
    a: "Sí. Lo que el servidor devuelve llega al cliente MCP que elegiste y queda sujeto a su política de privacidad. Evitá consultar información que no quieras compartir con él.",
  },
  {
    q: "¿Es un producto oficial de la UTN?",
    a: "No. Es un proyecto independiente y no oficial, sin afiliación ni aval de la Universidad Tecnológica Nacional. Solo accede a lo que tu cuenta ya puede ver.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Windows, Linux o macOS, Node.js 22.13 o posterior, una cuenta del Campus y un cliente de IA con MCP ya instalado. No hace falta clonar el repositorio ni editar código: se instala con un paquete de la release y un asistente guiado (setup-wizard) hace el resto.",
  },
];
