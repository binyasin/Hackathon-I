---
id: 001
title: Setup Text-to-Speech for Claude Code
stage: general
date: 2026-01-09
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: main
user: JOJIS
command: none
labels: ["text-to-speech", "tts", "accessibility", "windows", "powershell", "tooling"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - speak-text.ps1
 - test-audio.ps1
 - check-voices.ps1
 - check-audio-device.ps1
 - speak.ps1
 - idle-reminder.ps1
tests:
 - Manual TTS voice test (Microsoft David and Zira detected)
 - PowerShell speech synthesis verification
 - Idle detection test (10 second timeout)
---

## Prompt

User requested: "expecting Claude Code to speak responses out loud"

Follow-up interactions:
- User confirmed Windows Terminal as the environment
- Audio hardware confirmed working
- Windows Narrator troubleshooting attempted but not working reliably
- Pivoted to PowerShell-based TTS solution using System.Speech
- User requested custom Urdu phrase "Mujhay Uljhan horahi hai" for idle timeout
- User selected Option 1: Timeout script for inactivity detection
- Successfully tested idle reminder with 10-second timeout

## Response snapshot

Created comprehensive Windows TTS solution with two main components:

**1. speak.ps1** - Simple text-to-speech wrapper
- Uses System.Speech.Synthesis.SpeechSynthesizer
- Supports pipeline input and direct text parameter
- Configurable speech rate (-10 to 10)
- Defaults to Microsoft Zira (female voice)
- Usage: `Get-Clipboard | .\speak.ps1` or `.\speak.ps1 "text"`

**2. idle-reminder.ps1** - Inactivity monitor
- Monitors keyboard/mouse idle time using Win32 GetLastInputInfo API
- Speaks custom phrase "Mujhay Uljhan horahi hai" after configurable timeout
- Default: 30 seconds, tested with 10 seconds
- Prevents repetition (max once per minute)
- Usage: `.\idle-reminder.ps1 -IdleSeconds 30`

**Supporting scripts created:**
- test-audio.ps1 - Basic SAPI voice test
- check-voices.ps1 - List installed TTS voices and test speech
- check-audio-device.ps1 - Audio device diagnostics

**Voices detected:**
- Microsoft David Desktop (male)
- Microsoft Zira Desktop (female)

## Outcome

- ✅ Impact: Enabled audio output for Claude Code responses via PowerShell TTS scripts, with idle reminder functionality for improved user experience
- 🧪 Tests: TTS voices verified (David and Zira), speech synthesis tested successfully, idle detection validated with 10-second timeout
- 📁 Files: Created 6 PowerShell scripts (speak.ps1, idle-reminder.ps1, test-audio.ps1, check-voices.ps1, check-audio-device.ps1, speak-text.ps1)
- 🔁 Next prompts: User can now use TTS with Claude Code, may want to create shortcuts or aliases for easier access
- 🧠 Reflection: Windows Narrator proved unreliable with terminal applications. PowerShell System.Speech API provided robust, programmatic TTS solution. Idle detection using Win32 API successfully implemented for custom reminder phrase in Urdu.

## Evaluation notes (flywheel)

- Failure modes observed: Initial Windows Narrator approach failed to read terminal output reliably; first PowerShell command had syntax errors due to improper escaping
- Graders run and results (PASS/FAIL): PASS - User confirmed hearing speech output from both speak.ps1 and idle-reminder.ps1 scripts
- Prompt variant (if applicable): Pivoted from accessibility tool (Narrator) to custom PowerShell solution when initial approach failed
- Next experiment (smallest change to try): Could create batch file aliases for common TTS commands (e.g., `speak-clipboard.bat`) or integrate with Claude Code hooks if available
