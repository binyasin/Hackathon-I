# Check current audio devices
Write-Host "Current audio playback devices:"
Get-AudioDevice -List | Where-Object { $_.Type -eq "Playback" }

Write-Host "`n--- Testing beep sound ---"
[console]::beep(800, 500)

Write-Host "`n--- Testing TTS with max volume ---"
$voice = New-Object -ComObject SAPI.SpVoice
$voice.Volume = 100
$voice.Rate = 0
$voice.Speak("Testing speech output. Please confirm if you can hear this.")
