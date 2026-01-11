# Text-to-Speech Script for Windows
# Usage: Get-Content output.txt | .\speak-text.ps1
# Or: .\speak-text.ps1 "Text to speak"

param(
    [Parameter(ValueFromPipeline=$true)]
    [string]$Text
)

begin {
    Add-Type -AssemblyName System.Speech
    $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $synth.Rate = 1  # Adjust speed: -10 (slow) to 10 (fast)
    $synth.Volume = 100  # 0-100
}

process {
    if ($Text) {
        Write-Host "Speaking: $Text"
        $synth.Speak($Text)
    }
}

end {
    $synth.Dispose()
}
