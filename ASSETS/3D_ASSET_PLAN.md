# Plano de assets 3D — estilo game

## Direção visual aprovada
Manter o estilo de personagem de game 3D estilizado/low-poly. Não converter para visual 2D, boneco liso ou realista.

## Pacote-base escolhido
**Quaternius — Universal Base Characters**
- Página oficial: https://quaternius.com/packs/universalbasecharacters.html
- Download: https://quaternius.itch.io/universal-base-characters
- Licença informada pelo autor: CC0 1.0.
- Inclui seis bases humanoides masculinas/femininas em proporções Regular, Teen e Superhero, rig humanoide e 20 penteados.
- A versão Standard gratuita inclui os arquivos-base; a versão Source com todos os projetos/shaders é paga.
- Formatos anunciados: FBX, glTF, OBJ e Blend.

## Animações
**Quaternius — Universal Animation Library**
- Página oficial: https://quaternius.com/packs/universalanimationlibrary.html
- Download: https://quaternius.itch.io/universal-animation-library
- Licença informada pelo autor: CC0 1.0.
- Mais de 120 animações na biblioteca completa; a versão gratuita Standard contém uma seleção menor.
- Compatibilidade anunciada com o rig humanoide Universal.

## Adaptação dos personagens da novela
- **Pai (POV):** reutilizar o rig humanoide e manter visíveis somente braços/mãos e pernas/pés na câmera. Roupa de trabalhador será adaptada; não criar rosto/corpo visível na câmera POV.
- **Mãe:** base feminina Regular, ajustar cabelo comprido, pele e roupa cotidiana conforme a bíblia visual.
- **Filho:** avaliar a base Teen como ponto de partida, mas não tratá-la como criança automaticamente. Se as proporções não funcionarem, criar/adaptar um corpo infantil mantendo o mesmo estilo e rig.

## Regras de integração
1. Baixar os pacotes oficiais e preservar seus arquivos de licença.
2. Não substituir o protótipo Remotion 2D até o teste 3D passar.
3. Importar os modelos no Blender e verificar materiais, escala, esqueleto e pesos.
4. Testar caminhada, idle, sentar e gestos antes de produzir cenas longas.
5. Guardar origem, licença, versão e modificações de cada asset.
6. Não distribuir os pacotes originais isoladamente; usar apenas os modelos modificados/incorporados no projeto conforme a licença.

## Primeiro teste
Montar uma cena curta com a mãe e o filho em plano médio e o pai em primeira pessoa, validando:
- consistência visual entre personagens;
- deformação de ombros, cotovelos, punhos e joelhos;
- mãos e pés sem atravessar objetos/chão;
- animações retargetadas sem torções;
- render vertical 1080×1920.
