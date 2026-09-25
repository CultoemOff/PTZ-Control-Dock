# PTZ Control Web

**Controla cámaras PTZ directamente desde el navegador, dentro de tu software de producción o como panel independiente.**

[Português](README.md) · [English](README.en.md) · [Español](README.es.md)

**PTZ Control Web**, desarrollado por **Culto em Off**, es una interfaz web local para controlar cámaras PTZ. Está pensado para iglesias, transmisiones en vivo, producciones audiovisuales y equipos técnicos que necesitan un controlador simple y compacto, independiente de la versión del software de producción.

## Dónde funciona

La interfaz funciona en el navegador y puede utilizarse:

- como **Custom Browser Dock en OBS Studio**;
- dentro de **SPresenter**, cuando se utiliza como página/panel web;
- junto con **vMix**, manteniendo PTZ Control Web abierto en el navegador;
- o **de forma totalmente independiente**, directamente en el navegador.

Como el control de las cámaras no depende de un plugin interno de OBS Studio, las actualizaciones de versión de OBS no interrumpen el funcionamiento de PTZ Control Web. OBS solo se utiliza para mostrar la interfaz web mediante la función de navegador/Custom Browser Dock.

## Funcionalidades

- Control de **Pan, Tilt, Zoom y Focus**.
- Movimiento diagonal y comando **Home**.
- **Autofocus**, Focus Near y Focus Far.
- Velocidad de Pan/Tilt ajustable.
- **Presets de cámara** con llamada y guardado de posición.
- Nombres personalizados para los presets.
- Soporte para múltiples cámaras.
- Interfaz en **Portugués, Inglés, Español y Alemán**.
- Temas claro y oscuro.
- Cantidad de presets configurable.
- Layout de presets **vertical u horizontal**.
- Posibilidad de ocultar los controles PTZ y utilizar la interfaz principalmente como panel de presets.
- **Compatibilidad con gamepad/control de videojuegos USB**, incluyendo Pan/Tilt, Zoom, Focus, Autofocus, selección, llamada y guardado de presets.
- **Integración con Bitfocus Companion mediante HTTP**, permitiendo crear botones en Stream Deck para movimiento, Zoom, Focus, Home y presets.
- Configuraciones de cámaras y nombres de presets guardados de forma persistente en el equipo.
- Interfaz adaptable a diferentes tamaños de panel.

## Protocolos

Actualmente el proyecto admite **VISCA over IP UDP**, **VISCA over IP TCP** y **VISCA USB/Serial**. La estructura para ONVIF está presente, pero el driver ONVIF todavía no está disponible.

## Bitfocus Companion

El servidor local ofrece una API HTTP específica para Companion. Las cámaras pueden seleccionarse por número, UUID o nombre exacto, con acciones para movimiento, parada, Zoom, Focus, Autofocus, Home, llamada de preset y guardado de preset.

Ejemplo:

```text
POST /api/companion/camera/1/preset/0/recall
POST /api/companion/camera/1/move/up?speed=8
POST /api/companion/camera/1/move/stop
```

Esto permite configurar acciones de **presionar y soltar** en Companion para mover la cámara solamente mientras el botón está presionado.

## Gamepad / Control USB

Se puede utilizar un control de videojuegos directamente desde el navegador. El mapeo actual incluye joystick para Pan/Tilt, gatillos para Zoom, botones superiores para Focus, cruceta para navegar por los presets y botones para llamar, guardar y activar Autofocus.

## Desarrollo

Requiere Node.js 22+.

```bash
npm install
npm run dev
```

Abre:

```text
http://127.0.0.1:8765/obs
```

## Estructura

- `src/server`: servidor local, API y drivers PTZ.
- `src/web`: interfaz web.
- `docs`: arquitectura y documentación.

## Seguridad

De forma predeterminada, el servidor escucha solamente en `127.0.0.1`, manteniendo la interfaz y la API accesibles únicamente desde el equipo donde se ejecuta PTZ Control Web.

## Acerca del proyecto

Creado por **Jonas — Culto em Off**, con el objetivo de compartir herramientas y soluciones para audio, video, transmisión en vivo y tecnología.
