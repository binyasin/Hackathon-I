# Simple Text-to-Speech wrapper
# Usage: .\speak.ps1 "Text to speak"
# Or: Get-Content file.txt | .\speak.ps1

param(
    [Parameter(ValueFromPipeline=$true, Position=0)]
    [string]$Text
)

begin {
    Add-Type -AssemblyName System.Speech
    $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $synth.Volume = 100
    $synth.Rate = 1  # Adjust: -10 (slow) to 10 (fast)

    # Use female voice if available
    $voices = $synth.GetInstalledVoices()
    $zira = $voices | Where-Object { $_.VoiceInfo.Name -like "*Zira*" }
    if ($zira) {
        $synth.SelectVoice($zira.VoiceInfo.Name)
    }
}

process {
    if ($Text) {
        $synth.Speak($Text)
    }
}

end {
    $synth.Dispose()
}
