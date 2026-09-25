# PTZ Control Dock

Controle PTZ para OBS Studio, desenvolvido pelo **Culto em Off**.

> Estado atual: fundação da V0.1. O painel web e o transporte VISCA over IP já estão estruturados; NDI, ONVIF, OBS WebSocket e Companion entram nas próximas etapas.

## Objetivos

- Dock web compacto para OBS Studio
- Temas claro, escuro e automático
- Descoberta rápida de câmeras na rede
- VISCA over IP (UDP/TCP), NDI PTZ e ONVIF
- Pan/Tilt, zoom, foco, autofocus, home e presets
- Múltiplas câmeras e reconexão
- Integração OBS WebSocket
- API REST/WebSocket para Bitfocus Companion
- Aplicativo/instalador Windows para usuários leigos

## Desenvolvimento

Requer Node.js 22+.

```bash
npm install
npm run dev
```

Abra `http://127.0.0.1:8765/obs`.

## Estrutura

- `src/server`: servidor local, API e motores PTZ
- `src/web`: interface do Dock
- `docs`: arquitetura e roadmap

## Segurança

Por padrão o servidor escuta somente em `127.0.0.1`. Acesso pela LAN para tablet/Companion será uma opção explícita posteriormente.

## Sobre

Projeto Culto em Off. O link oficial do YouTube será configurado na tela Sobre antes da primeira release pública.
