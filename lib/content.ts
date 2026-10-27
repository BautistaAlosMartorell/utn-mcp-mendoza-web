/**
 * Hechos del producto. Fuente: https://github.com/BautistaAlosMartorell/utnfrm-mcp (rama main, release v2.0.0).
 * Mantener alineado con el README y las notas de la release: no prometer nada que no estén publicado.
 * Al publicar una versión nueva, actualizar `product` y revisar `clients`, `installCommands` y las FAQ.
 */

const repo = "https://github.com/BautistaAlosMartorell/utnfrm-mcp";
const version = "2.0.0";
const pkg = `utn-mcp-mendoza-${version}.tgz`;

export const product = {
  name: "UTN FRM MCP",
  version,
  channel: "beta de solo lectura",
  platform: "Windows",
  node: "22.13",
  cli: "utn-mcp-mendoza",
  repo,
  release: `${repo}/releases/tag/v${version}`,
  asset: `${repo}/releases/download/v${version}/${pkg}`,
  assetName: pkg,
  sha256: "38F217BC1925FE01A1F91E33E6BF6524D4F51D7FFF370F8D3225284A2285C82C",
  issues: `${repo}/issues`,
  security: `${repo}/blob/main/SECURITY.md`,
  readme: `${repo}#readme`,
} as const;

export type Access = "lectura" | "preview";

export interface Tool {
  name: string;
  access: Access;
  does: string;
}

export const tools: Tool[] = [
  { name: "list_courses", access: "lectura", does: "Lista las materias de tu cuenta." },
  { name: "open", access: "lectura", does: "Abre una materia, sección o actividad y muestra su contenido." },
  { name: "list_assignments", access: "lectura", does: "Busca las actividades de una materia, con fechas y estado." },
  { name: "get_assignment", access: "lectura", does: "Lee la consigna, el estado y los adjuntos de una actividad." },
  { name: "list_resources", access: "lectura", does: "Recorre los recursos y archivos de una materia." },
  { name: "read_file", access: "lectura", does: "Extrae texto de PDF, DOCX, PPTX, XLSX y más. Indica si la extracción fue parcial." },
  { name: "get_grades", access: "lectura", does: "Consulta calificaciones, según tus permisos." },
  { name: "whoami", access: "lectura", does: "Muestra con qué cuenta está operando la sesión." },
  { name: "list_participants", access: "lectura", does: "Lista participantes de una materia, si tu cuenta puede verlos." },
  { name: "list_forums", access: "lectura", does: "Lista los foros de una materia." },
  { name: "get_forum_discussions", access: "lectura", does: "Lee los temas de un foro." },
  { name: "get_discussion_posts", access: "lectura", does: "Lee los mensajes de una discusión." },
  { name: "list_calendar_events", access: "lectura", does: "Consulta eventos y vencimientos del calendario." },
  { name: "get_choice", access: "lectura", does: "Lee una consulta o elección de la materia." },
  { name: "submit_assignment", access: "preview", does: "Prepara una entrega, pero está deshabilitada en esta beta: no sube ni envía archivos." },
  { name: "forum_post_topic", access: "preview", does: "Muestra cómo quedaría un tema nuevo. No publica." },
  { name: "forum_reply", access: "preview", does: "Muestra cómo quedaría una respuesta. No publica." },
  { name: "calendar_add_event", access: "preview", does: "Muestra el evento que se crearía. No lo crea." },
  { name: "submit_choice", access: "preview", does: "Muestra qué opción se votaría. No vota." },
];

export const accessMeta: Record<Access, { label: string }> = {
  lectura: { label: "Lectura" },
  preview: { label: "Vista previa" },
};

/** Paso 1: instalación en Windows, tal como figura en el README de la release. */
export const installCommands = [
  `$package = Join-Path $env:TEMP '${pkg}'`,
  "Invoke-WebRequest `",
  `  -Uri '${product.asset}' \``,
  "  -OutFile $package",
  "npm install --global $package",
  `${product.cli} install-browser`,
].join("\n");

export const verifyCommand = "(Get-FileHash $package -Algorithm SHA256).Hash";

/** Paso 2: iniciar sesión una sola vez. */
export const loginCommands = [`${product.cli} login`, `${product.cli} status`].join("\n");

export type ClientId = "codex" | "claude-desktop" | "cursor" | "vscode" | "antigravity";

export interface ClientDef {
  id: ClientId;
  label: string;
  /** Solo Codex fue probado de punta a punta en esta versión. */
  tested: boolean;
  /** Comandos a ejecutar en una terminal. */
  commands?: string;
  /** Dónde se pega el bloque que imprime `utn-mcp-mendoza setup`. */
  file?: string;
  /** Forma del bloque que imprime `setup` (la ruta real la completa el comando). */
  json?: string;
  how: string;
  doc?: { label: string; href: string };
}

const ROUTE = "<ruta que imprime el comando>";
const stdio = (key = "utn-mendoza") =>
  `{\n  "mcpServers": {\n    "${key}": {\n      "command": "node",\n      "args": ["${ROUTE}"]\n    }\n  }\n}`;

export const clients: ClientDef[] = [
  {
    id: "codex",
    label: "Codex",
    tested: true,
    commands: [
      `${product.cli} setup-codex`,
      "# Copiá y ejecutá el comando que imprime. Se ve así:",
      "# codex mcp add utn-mendoza `",
      `#   --env UTN_MCP_ASSIGNMENT_SUBMISSIONS_ENABLED=false -- node "${ROUTE}"`,
      "codex mcp list",
    ].join("\n"),
    how: "Ejecutá el comando que imprime setup-codex y reiniciá Codex para que cargue las herramientas. Este es el cliente probado en esta versión.",
    doc: { label: "MCP en Codex", href: "https://developers.openai.com/codex/mcp/" },
  },
  {
    id: "claude-desktop",
    label: "Claude Desktop",
    tested: false,
    commands: `${product.cli} setup`,
    file: "%APPDATA%\\Claude\\claude_desktop_config.json",
    json: stdio(),
    how: "setup imprime un bloque listo con tu ruta. Pegalo dentro de mcpServers, guardá y cerrá Claude Desktop por completo antes de volver a abrirlo.",
    doc: { label: "Servidores locales en Claude Desktop", href: "https://support.anthropic.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop" },
  },
  {
    id: "cursor",
    label: "Cursor",
    tested: false,
    commands: `${product.cli} setup`,
    file: ".cursor/mcp.json",
    json: stdio(),
    how: "Pegá el bloque de Cursor que imprime setup en ese archivo, en tu proyecto o en el directorio global.",
    doc: { label: "MCP en Cursor", href: "https://docs.cursor.com/context/model-context-protocol" },
  },
  {
    id: "vscode",
    label: "VS Code",
    tested: false,
    commands: `${product.cli} setup`,
    file: ".vscode/mcp.json",
    json: `{\n  "servers": {\n    "utn-mendoza": {\n      "type": "stdio",\n      "command": "node",\n      "args": ["${ROUTE}"]\n    }\n  }\n}`,
    how: "Pegá el bloque de VS Code que imprime setup. Después habilitá las herramientas en Copilot Chat, modo Agent.",
    doc: { label: "Servidores MCP en VS Code", href: "https://code.visualstudio.com/docs/agent-customization/mcp-servers" },
  },
  {
    id: "antigravity",
    label: "Antigravity",
    tested: false,
    commands: `${product.cli} setup`,
    json: stdio("utn_mendoza"),
    how: "Pegá el bloque de Antigravity que imprime setup en la configuración de servidores MCP del cliente.",
  },
];

/** Paso 4: primeras consultas, las mismas que sugiere el README. */
export const prompts = [
  "Listá mis materias y las tareas con vencimiento próximo. Indicá si no hay resultados o si ocurrió un error de acceso.",
  "Abrí la consigna de esta tarea.",
  "Leé el PDF adjunto e indicá si la extracción fue parcial.",
  "Mostrame los próximos eventos del calendario.",
];

export const uninstallCommands = [
  `${product.cli} logout`,
  "codex mcp remove utn-mendoza",
  `npm uninstall --global ${product.cli}`,
].join("\n");

export const faqs: { q: string; a: string }[] = [
  {
    q: "¿Qué es UTN FRM MCP?",
    a: "Un servidor local que le da a tu asistente de IA herramientas para consultar el Campus Virtual de la UTN Facultad Regional Mendoza con tu propia sesión. Usa el Model Context Protocol (MCP), un estándar abierto para conectar asistentes con herramientas.",
  },
  {
    q: "¿Con qué asistentes funciona?",
    a: "La beta se probó con Codex para Windows. Como habla MCP por STDIO, el comando setup también genera la configuración para Claude Desktop, Cursor, VS Code y Antigravity, pero esos clientes no se probaron en esta versión. No funciona desde un chat web que no admita servidores locales.",
  },
  {
    q: "¿Funciona en macOS o Linux?",
    a: "La versión publicada es para Windows: la sesión se protege con DPAPI y el paquete se probó ahí. El soporte para otros sistemas no está incluido en esta release.",
  },
  {
    q: "¿La IA puede entregar mis trabajos o publicar por mí?",
    a: "No. Esta beta es de solo lectura: publicar en foros, responder, votar, crear eventos y entregar están deshabilitados. Las herramientas de ese tipo, como mucho, muestran una vista previa. Las entregas las hacés vos desde el Campus.",
  },
  {
    q: "¿Qué pasa con mi contraseña?",
    a: "Se escribe únicamente en la página de inicio de sesión del Campus, en una ventana de Chromium que abre el login. El servidor guarda la sesión, no la contraseña, y en Windows la protege con DPAPI para tu usuario.",
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
    a: "Windows, Node.js 22.13 o posterior, una cuenta del Campus y Codex u otro cliente compatible con MCP por STDIO. No hace falta clonar el repositorio ni editar código: se instala con un paquete de la release.",
  },
];
