#!/usr/bin/env python3
"""Generate timed Brazilian Portuguese voice tracks for EP001 using Edge TTS."""
import asyncio
import json
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "EPISODES" / "EP001" / "voice_lines.json"
OUT = ROOT / "out"
VOICE_DIR = OUT / "voices"
FALLBACK_VOICE = "pt-BR-AntonioNeural"

def run(cmd):
    subprocess.run(cmd, check=True)

async def save_audio(edge_tts, text, voice, destination):
    last_error = None
    for attempt in range(4):
        try:
            communicate = edge_tts.Communicate(
                text=text, voice=voice, rate="+0%", volume="+0%"
            )
            await communicate.save(str(destination))
            if destination.exists() and destination.stat().st_size > 1024:
                return voice
            raise RuntimeError("O serviço retornou um arquivo de áudio vazio.")
        except Exception as error:
            last_error = error
            destination.unlink(missing_ok=True)
            if attempt < 3:
                wait = 2 ** (attempt + 1)
                print(f"Falha temporária ({error}); nova tentativa em {wait}s.")
                await asyncio.sleep(wait)
    raise RuntimeError(f"Não foi possível gerar áudio com {voice}: {last_error}")

async def main():
    if not shutil.which("ffmpeg"):
        raise SystemExit("ffmpeg não encontrado no PATH")
    try:
        import edge_tts
    except ImportError:
        raise SystemExit("Instale edge-tts: python -m pip install edge-tts")

    data = json.loads(DATA.read_text(encoding="utf-8"))
    voice_map = data["voices"]
    VOICE_DIR.mkdir(parents=True, exist_ok=True)

    # Confirma as vozes disponíveis antes de iniciar as 19 falas.
    available = {item["ShortName"] for item in await edge_tts.list_voices()}
    for role, voice in list(voice_map.items()):
        if voice not in available:
            print(f"Voz {voice} indisponível para {role}; usando {FALLBACK_VOICE}.")
            voice_map[role] = FALLBACK_VOICE

    for line in data["lines"]:
        requested_voice = voice_map[line["voice"]]
        target = VOICE_DIR / f'{line["id"]}_{line["voice"]}.mp3'
        print(f'Gerando voz {line["id"]}: {line["voice"]} ({requested_voice})')
        try:
            await save_audio(edge_tts, line["text"], requested_voice, target)
        except Exception as primary_error:
            if requested_voice == FALLBACK_VOICE:
                raise
            print(f"Voz principal falhou: {primary_error}. Tentando voz reserva.")
            await save_audio(edge_tts, line["text"], FALLBACK_VOICE, target)

    inputs = []
    filters = []
    for index, line in enumerate(data["lines"]):
        audio = VOICE_DIR / f'{line["id"]}_{line["voice"]}.mp3'
        inputs += ["-i", str(audio)]
        delay = round(float(line["start"]) * 1000)
        filters.append(f"[{index}:a]adelay={delay}|{delay},volume=1.0[a{index}]")

    labels = "".join(f"[a{i}]" for i in range(len(data["lines"])))
    filter_complex = ";".join(filters) + (
        f";{labels}amix=inputs={len(data['lines'])}:duration=longest:normalize=0,"
        f"apad,atrim=0:{data['duration_seconds']},"
        "loudnorm=I=-16:TP=-1.5:LRA=11[out]"
    )
    output = OUT / "ep001-voices.wav"
    run([
        "ffmpeg", "-y", *inputs, "-filter_complex", filter_complex,
        "-map", "[out]", "-ar", "48000", "-ac", "2", str(output)
    ])
    print(f"Faixa de vozes criada: {output}")

if __name__ == "__main__":
    asyncio.run(main())
