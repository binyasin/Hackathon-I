Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

Write-Host "Installed voices:"
$synth.GetInstalledVoices() | ForEach-Object {
    Write-Host $_.VoiceInfo.Name
}

Write-Host "`nTrying to speak..."
$synth.Volume = 100
$synth.Rate = 0
$synth.Speak("Hello, can you hear me now?")
Write-Host "Speech complete!"
