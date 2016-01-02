# Locate Chutzpah
$ChutzpahDir = get-childitem -Path packages -Filter chutzpah.console.exe -recurse | select-object -first 1 | select -expand Directory

# Run tests using Chutzpah and export results as JUnit format to chutzpah-results.xml
$ChutzpahCmd = "$($ChutzpahDir)\chutzpah.console.exe $($env:APPVEYOR_BUILD_FOLDER)\PoorClaresAngular /junit .\chutzpah-results.xml"

Write-Host $ChutzpahCmd
Invoke-Expression $ChutzpahCmd
