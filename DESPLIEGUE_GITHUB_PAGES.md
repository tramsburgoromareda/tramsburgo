# Despliegue en GitHub Pages

Este proyecto está preparado para desplegarse como web estática en GitHub Pages usando Astro y GitHub Actions.

## URL de la web

Cuando esté publicado, el sitio quedará disponible en:

```text
https://tramsburgoromareda.github.io/tramsburgo/
```

## Configuración importante

La configuración principal está en `astro.config.mjs`:

```js
export default defineConfig({
  site: "https://tramsburgoromareda.github.io",
  base: "/tramsburgo",
  output: "static",
});
```

`site` indica el dominio de GitHub Pages.

`base` indica el nombre del repositorio. Es necesario porque la web no se publica en la raíz del dominio, sino dentro de `/tramsburgo/`.

## Workflow de despliegue

El despliegue automático está configurado en:

```text
.github/workflows/deploy.yml
```

Este workflow hace lo siguiente:

1. Descarga el código del repositorio.
2. Instala `pnpm`.
3. Instala Node.js.
4. Instala las dependencias con `pnpm install --frozen-lockfile`.
5. Genera la web final con `pnpm run build`.
6. Sube la carpeta `dist/` a GitHub Pages.

## Activar GitHub Pages

En GitHub, dentro del repositorio:

1. Entra en `Settings`.
2. Ve a `Pages`.
3. En `Build and deployment`, selecciona:

```text
Source: GitHub Actions
```

Después de esto, cada vez que se suban cambios a `main` o a `Migracion_Web_Astro`, GitHub ejecutará el despliegue automáticamente.

## Comandos útiles

Instalar dependencias:

```bash
pnpm install
```

Levantar la web en local:

```bash
pnpm run dev
```

Generar la versión final:

```bash
pnpm run build
```

Previsualizar la versión generada:

```bash
pnpm run preview
```

## Carpeta generada

Astro genera la web final en:

```text
dist/
```

No hay que editar esta carpeta a mano. Se crea automáticamente al ejecutar `pnpm run build`.

## Nota sobre rutas e imágenes

Como la web se publica en `/tramsburgo/`, las rutas internas y los assets usan la base de Astro (`import.meta.env.BASE_URL`) para funcionar correctamente tanto en local como en GitHub Pages.
