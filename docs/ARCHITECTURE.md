# Arquitetura

## Componentes

1. **Core local** — processo Windows que expõe HTTP/WebSocket.
2. **Drivers PTZ** — VISCA UDP/TCP, NDI PTZ e ONVIF.
3. **Discovery** — NDI Finder, WS-Discovery/ONVIF e probes configuráveis.
4. **Web UI** — `/obs` compacto; futuramente `/control` e `/settings`.
5. **OBS** — Custom Browser Dock + obs-websocket.
6. **Companion** — API estável e módulo Bitfocus dedicado.
7. **Windows** — tray app, inicialização automática e instalador.

## Princípios

- localhost por padrão
- movimento contínuo com STOP ao soltar
- nenhuma credencial de câmera no frontend
- drivers desacoplados da UI
- descoberta não deve bloquear o painel
- configuração persistente por usuário

## Roadmap

### V0.1
- [x] servidor local
- [x] dock responsivo
- [x] tema claro/escuro/automático
- [x] base VISCA UDP
- [x] API de movimento/zoom/home/preset
- [ ] persistência de câmeras
- [ ] descoberta NDI
- [ ] descoberta ONVIF
- [ ] NDI PTZ
- [ ] ONVIF PTZ
- [ ] foco/autofocus
- [ ] OBS WebSocket
- [ ] Companion
- [ ] tray app
- [ ] instalador Windows
