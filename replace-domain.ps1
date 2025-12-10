$targetDir = "c:\Users\kasio\OneDrive\Documents\FINALPROEJCTS\Hotels Santorini\discovercycladesgr"

# Update all .tsx, .ts, .json, .md files in src folder
$extensions = @("*.tsx", "*.ts", "*.json", "*.md")
$folders = @("src", "public", "scripts")

foreach ($folder in $folders) {
    $path = Join-Path $targetDir $folder
    if (Test-Path $path) {
        foreach ($ext in $extensions) {
            Get-ChildItem -Path $path -Filter $ext -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
                $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
                if ($content -and $content -match "greececyclades") {
                    $newContent = $content -replace "greececyclades\.com", "discovercyclades.gr"
                    $newContent = $newContent -replace "Greececyclades\.com", "Discovercyclades.gr"
                    $newContent = $newContent -replace "GreeceCyclades\.com", "DiscoverCyclades.gr"
                    Set-Content $_.FullName -Value $newContent -NoNewline
                    Write-Host "Updated: $($_.FullName)"
                }
            }
        }
    }
}

# Also update root level config files
$rootFiles = @("sitemap.xml", "sitemap_analysis.csv", "robots.txt")
foreach ($file in $rootFiles) {
    $filePath = Join-Path $targetDir $file
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -ErrorAction SilentlyContinue
        if ($content -and $content -match "greececyclades") {
            $newContent = $content -replace "greececyclades\.com", "discovercyclades.gr"
            Set-Content $filePath -Value $newContent -NoNewline
            Write-Host "Updated: $filePath"
        }
    }
}

Write-Host "Domain replacement complete!"
