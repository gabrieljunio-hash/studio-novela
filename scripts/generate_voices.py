#!/usr/bin/env python3
"""Generate timed Brazilian Portuguese voice tracks for EP001 using Edge TTS.

Requires: pip install edge-tts
Requires: ffmpeg on PATH
Outputs: out/voices/*.mp3 and out/ep001-voices.wav
"""
import asyncio
import json
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "EPISODES" / "EP001" / "voice_lines.json"
OUT = ROOT / "out"
VOICE_DIR = OUT / "voices"

def run(cmd):
    subprocess.run(cmd, check=True)

async def synthesize(line, destination):
    import edge_tts
    communicate = edge_tts.Communicate(
        text=line["text"],
        voice=VOICE_MAP[line["voice"]],
        rate="+0%",
        volume="+0%",
    )
    await communicate.save(str(destination))

async def main():
    if not shutil.which("ffmpeg"):
        raise SystemExit("ffmpeg não encontrado no PATH")
    try:
        import edge_tts  # noqa: F401
    except ImportError:
        raise SystemExit("Instale edge-tts: python -m pip install edge-tts")

    data = json.loads(DATA.read_text(encoding="utf-8"))
    global VOICE_MAP
    VOICE_MAP = data["voices"]
    VOICE_DIR.mkdir(parents=True, exist_ok=True)

    for line in data["lines"]:
        target = VOICE_DIR / f'{line["id"]}_{line["voice"]}.mp3'
        print(f'Gerando voz {line["id"]}: {line["voice"]}')
        await synthesize(line, target)

    # Build one 90-second timeline. Each clip is delayed to its authored start.
    inputs = []
    filters = []
    for index, line in enumerate(data["lines"]):
        audio = VOICE_DIR / f'{line["id"]}_{line["voice"]}.mp3'
        inputs += ["-i", str(audio)]
        delay = round(float(line["start"]) * 1000)
        filters.append(f"[{index}:a]adelay={delay}|{delay},volume=1.0[a{index}]")

    labels = "".join(f"[a{i}]" for i in range(len(data["lines"])))
    filter_complex = ";".join(filters) + f";{labels}amix=inputs={len(data['lines'])}:duration=longest:normalize=0,apad,atrim=0:{data['duration_seconds']}, loudnorm=I=-16:TP=-1.5:LRA=11[out]"
    output = OUT / "ep001-voices.wav"
    run([
        "ffmpeg", "-y", *inputs, "-filter_complex", filter_complex,
        "-map", "[out]", "-ar", "48000", "-ac", "2", str(output)
    ])
    print(f"Faixa de vozes criada: {output}")

if __name__ == "__main__":
    asyncio.run(main())
