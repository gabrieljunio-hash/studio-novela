# Studio Novela

Estúdio independente para produzir uma novela animada 2D em formato vertical.

## Protótipo incluído
- Vídeo vertical 1080 × 1920
- 30 quadros por segundo
- 12 segundos
- Cena 1: mão alcança e movimenta um copo
- Cena 2: caminhada em primeira pessoa com balanço de câmera e cenário em movimento
- Cena 3: personagem secundário fala com movimento de boca

## Requisitos
Node.js 20 ou superior e npm.

## Executar
```bash
npm install
npm run studio
```
Abra o endereço indicado pelo Remotion para visualizar a composição.

## Renderizar
```bash
npm run render
```
O vídeo será salvo em `out/prototipo-pov.mp4`.

## Limitações desta versão
Este é um protótipo visual de animação 2D com movimentos interpolados. Ainda não implementa física completa, captura de movimento, sincronização automática de voz ou rig avançado. O teste serve para validar linguagem visual, câmera e continuidade antes de produzir o episódio piloto.

## Estrutura
- `src/Prototype.tsx`: cenas e elementos animados
- `src/Root.tsx`: composição Remotion
- `src/index.ts`: entrada do projeto
- `.github/workflows/build-zip.yml`: gera ZIP do projeto a cada atualização
