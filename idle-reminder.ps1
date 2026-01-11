# Idle Reminder Script
# Speaks "Mujhay Uljhan horahi hai" after inactivity
# Usage: .\idle-reminder.ps1 -IdleSeconds 30

param(
    [int]$IdleSeconds = 30  # Default: 30 seconds of inactivity
)

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.Volume = 100
$synth.Rate = 0

Add-Type @'
using System;
using System.Runtime.InteropServices;

public class IdleTime {
    [StructLayout(LayoutKind.Sequential)]
    public struct LASTINPUTINFO {
        public uint cbSize;
        public uint dwTime;
    }

    [DllImport("user32.dll")]
    public static extern bool GetLastInputInfo(ref LASTINPUTINFO plii);

    public static uint GetIdleTime() {
        LASTINPUTINFO lastInputInfo = new LASTINPUTINFO();
        lastInputInfo.cbSize = (uint)Marshal.SizeOf(lastInputInfo);
        GetLastInputInfo(ref lastInputInfo);
        return ((uint)Environment.TickCount - lastInputInfo.dwTime) / 1000;
    }
}
'@

Write-Host "Idle reminder active. Will speak after $IdleSeconds seconds of inactivity."
Write-Host "Press Ctrl+C to stop."

$lastSpoken = [DateTime]::MinValue

while ($true) {
    $idleTime = [IdleTime]::GetIdleTime()

    if ($idleTime -ge $IdleSeconds) {
        # Check if we haven't spoken in the last minute to avoid repetition
        $timeSinceLastSpoken = ([DateTime]::Now - $lastSpoken).TotalSeconds

        if ($timeSinceLastSpoken -gt 60) {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Idle for $idleTime seconds - speaking reminder..."
            $synth.Speak("Mujhay Uljhan horahi hai")
            $lastSpoken = [DateTime]::Now
        }
    }

    Start-Sleep -Seconds 5
}
