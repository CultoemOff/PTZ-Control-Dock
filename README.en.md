# PTZ Control Web — by Culto em Off

**PTZ Control Web – Free PTZ Camera Controller for OBS, vMix & SPresenter**

**Control PTZ cameras directly from your browser, inside your production software, or as a standalone control panel.**

[Português](README.md) · [English](README.en.md) · [Español](README.es.md)

**PTZ Control Web — by Culto em Off** is a local web interface for PTZ camera control. It is designed for churches, live streaming, audiovisual productions, and technical teams that need a simple, compact controller independent of the production software version.

## Where it works

The interface runs in a browser and can be used:

- as a **Custom Browser Dock in OBS Studio**;
- inside **SPresenter**, when used as a web page/panel;
- alongside **vMix**, with PTZ Control Web open in a browser;
- or **completely standalone**, directly in your browser.

Because camera control does not depend on an internal OBS Studio plugin, OBS version updates do not break PTZ Control Web. OBS is only used to display the web interface through its browser/Custom Browser Dock feature.

## Features

- **Pan, Tilt, Zoom and Focus** control.
- Diagonal movement and **Home** command.
- **Autofocus**, Focus Near and Focus Far.
- Adjustable Pan/Tilt speed.
- Camera **presets** with position recall and save.
- Custom preset names.
- Multiple camera support.
- Interface available in **Portuguese, English, Spanish and German**.
- Light and dark themes.
- Configurable number of presets.
- **Vertical or horizontal** preset layout.
- PTZ controls can be hidden when the interface is mainly used as a preset panel.
- **USB gamepad/controller support**, including Pan/Tilt, Zoom, Focus, Autofocus, preset selection, recall and save.
- **Bitfocus Companion integration over HTTP**, allowing Stream Deck buttons for movement, Zoom, Focus, Home and presets.
- Camera settings and preset names are persisted on the computer.
- Responsive interface for different panel sizes.

## Protocols

The project currently supports **VISCA over IP UDP**, **VISCA over IP TCP**, and **VISCA USB/Serial**. ONVIF structure is present, but the ONVIF driver is not available yet.

## Bitfocus Companion

The local server provides a dedicated HTTP API for Companion. Cameras can be addressed by number, UUID or exact name, with actions for movement, stop, Zoom, Focus, Autofocus, Home, preset recall and preset save.

Example:

```text
POST /api/companion/camera/1/preset/0/recall
POST /api/companion/camera/1/move/up?speed=8
POST /api/companion/camera/1/move/stop
```

This also makes it possible to configure **press and release** actions in Companion, so the camera moves only while a button is held.

## USB Gamepad / Controller

A game controller can be used directly through the browser. The current mapping includes a joystick for Pan/Tilt, triggers for Zoom, shoulder buttons for Focus, D-pad preset navigation, and buttons for recall, save and Autofocus.

## Development

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:8765/obs
```

## Project structure

- `src/server`: local server, API and PTZ drivers.
- `src/web`: web interface.
- `docs`: architecture and documentation.

## Security

By default, the server listens only on `127.0.0.1`, keeping the interface and API accessible only from the computer running PTZ Control Web.

## About

Created by **Jonas — Culto em Off**, focused on sharing tools and solutions for audio, video, live streaming and technology.


## 🔎 PTZ camera controller

PTZ Control Web is a free browser-based **PTZ camera controller for OBS Studio, vMix and SPresenter**, supporting **VISCA over IP (UDP/TCP)**, **VISCA USB/Serial**, presets, Pan/Tilt/Zoom, focus, USB gamepads and HTTP integration with **Bitfocus Companion**. Use it as a standalone web PTZ controller or inside OBS Studio as a Custom Browser Dock.

**Keywords:** PTZ controller, PTZ camera controller, PTZ web controller, OBS PTZ controller, VISCA controller, VISCA over IP, USB PTZ controller, Bitfocus Companion PTZ, vMix PTZ, SPresenter PTZ, church livestream PTZ.
