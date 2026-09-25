# PTZ Control Web — by Culto em Off

**PTZ Control Web – Free PTZ Camera Controller for OBS, vMix & SPresenter**

**Controle câmeras PTZ diretamente pelo navegador, dentro do seu software de produção ou como painel independente.**

[Português](README.md) · [English](README.en.md) · [Español](README.es.md)

O **PTZ Control Web — by Culto em Off** é uma interface web local para controle de câmeras PTZ. Ele foi pensado para igrejas, transmissões ao vivo, produções audiovisuais e equipes que precisam de um controle simples, compacto e independente da versão do software de produção.

## Onde funciona

A interface roda no navegador e pode ser usada:

- como **Custom Browser Dock no OBS Studio**;
- dentro do **SPresenter**, quando utilizado como painel/página web;
- junto com o **vMix**, mantendo o controle PTZ aberto no navegador;
- ou **por fora de qualquer software**, diretamente no navegador.

Como o controle não depende de um plugin interno do OBS Studio, uma atualização de versão do OBS não interrompe o funcionamento do PTZ Control Web. No OBS, ele utiliza apenas o recurso de navegador/Custom Browser Dock para exibir a interface.

## Funcionalidades

- Controle de **Pan, Tilt, Zoom e Focus**.
- Movimento diagonal e comando **Home**.
- **Autofocus**, Focus Near e Focus Far.
- Velocidade de Pan/Tilt ajustável.
- **Presets de câmera** com chamada e gravação de posição.
- Nomes personalizados para os presets.
- Suporte a múltiplas câmeras.
- Interface em **Português, Inglês, Espanhol e Alemão**.
- Tema claro e escuro.
- Quantidade de presets configurável.
- Layout dos presets em **vertical ou horizontal**.
- Possibilidade de ocultar os controles PTZ e usar a interface principalmente como painel de presets.
- **Controle por gamepad/controle de videogame USB**, incluindo Pan/Tilt, Zoom, Focus, Autofocus, seleção, chamada e gravação de presets.
- **Integração com Bitfocus Companion via HTTP**, permitindo criar botões no Stream Deck para movimento, Zoom, Focus, Home e presets.
- Configurações de câmeras e nomes dos presets persistidos no computador.
- Interface responsiva para diferentes tamanhos de painel.

## Protocolos

Atualmente o projeto possui suporte a **VISCA over IP UDP**, **VISCA over IP TCP** e **VISCA USB/Serial**. A estrutura para ONVIF está presente, mas o driver ONVIF ainda não está disponível.

## Bitfocus Companion

O servidor disponibiliza uma API HTTP específica para integração com o Companion. É possível controlar câmera por número, UUID ou nome e criar ações para movimento, parada, Zoom, Focus, Autofocus, Home, chamar preset e salvar preset.

Exemplo:

```text
POST /api/companion/camera/1/preset/0/recall
POST /api/companion/camera/1/move/up?speed=8
POST /api/companion/camera/1/move/stop
```

Isso permite configurar ações de **pressionar e soltar** no Companion para movimentar a câmera enquanto o botão estiver pressionado.

## Controle USB / Gamepad

Um controle de videogame pode ser usado diretamente pelo navegador. O mapeamento atual inclui joystick para Pan/Tilt, gatilhos para Zoom, botões superiores para Focus, direcional para navegar pelos presets e botões para chamar, salvar e acionar Autofocus.

## Desenvolvimento

Requer Node.js 22+.

```bash
npm install
npm run dev
```

Abra:

```text
http://127.0.0.1:8765/obs
```

## Estrutura

- `src/server`: servidor local, API e drivers PTZ.
- `src/web`: interface web.
- `docs`: arquitetura e documentação.

## Segurança

Por padrão, o servidor escuta somente em `127.0.0.1`, mantendo a interface e a API acessíveis apenas no computador onde o PTZ Control Web está sendo executado.

## Sobre

**PTZ Control Web — by Culto em Off**, projeto criado por **Jonas**, com foco em compartilhar ferramentas e soluções para áudio, vídeo, transmissão e tecnologia.


## 🔎 PTZ camera controller

PTZ Control Web é um controlador gratuito de câmeras PTZ baseado em navegador para **OBS Studio, vMix e SPresenter**, com suporte a **VISCA over IP (UDP/TCP)**, **VISCA USB/Serial**, presets, Pan/Tilt/Zoom, foco, controle USB/Gamepad e integração HTTP com **Bitfocus Companion**. Pode funcionar como controlador PTZ standalone no navegador ou dentro do OBS Studio como Custom Browser Dock.

**Keywords:** PTZ controller, PTZ camera controller, PTZ web controller, OBS PTZ controller, VISCA controller, VISCA over IP, USB PTZ controller, Bitfocus Companion PTZ, vMix PTZ, SPresenter PTZ, church livestream PTZ.
