# PowerShell script to extract SEO meta titles and descriptions

# Define the pages directory and output file
$pagesDir = Join-Path -Path $PSScriptRoot -ChildPath "src\pages"
$outputFile = Join-Path -Path $PSScriptRoot -ChildPath "seo_meta_data.csv"

# Create an array to store the results
$results = @()

# Function to extract SEO data from a file
function Extract-SeoData {
    param (
        [string]$FilePath
    )
    
    $pageName = [System.IO.Path]::GetFileNameWithoutExtension($FilePath)
    $content = Get-Content -Path $FilePath -Raw
    
    $title = $null
    $description = $null
    
    # Pattern 1: Direct SEO props
    if ($content -match 'title=["'']([^"'']+)["'']') {
        $title = $matches[1]
    }
    
    if ($content -match 'description=["'']([^"'']+)["'']') {
        $description = $matches[1]
    }
    
    # Pattern 2: seoData object (used in island guides)
    if ((-not $title -or -not $description) -and $content -match 'seoData\s*=\s*{[^}]*title:\s*["'']([^"'']+)["''][^}]*description:\s*["'']([^"'']+)["'']') {
        $title = if ($title) { $title } else { $matches[1] }
        $description = if ($description) { $description } else { $matches[2] }
    }
    
    # Pattern 3: Multi-line SEO component
    if ((-not $title -or -not $description) -and $content -match '<SEO[^>]*\r?\n') {
        $seoBlock = $content -split '<SEO' | Select-Object -Last 1 -Skip 1
        $seoBlock = "<SEO" + ($seoBlock -split '/>' | Select-Object -First 1)
        
        if ($seoBlock -match 'title=["'']([^"'']+)["'']') {
            $title = if ($title) { $title } else { $matches[1] }
        }
        
        if ($seoBlock -match 'description=["'']([^"'']+)["'']') {
            $description = if ($description) { $description } else { $matches[1] }
        }
    }
    
    # Pattern 4: SITE_TAGLINE constant
    if ((-not $description) -and $content -match 'SITE_TAGLINE') {
        # Try to get the SITE_TAGLINE constant
        $siteTaglineFile = Join-Path -Path $PSScriptRoot -ChildPath "src\constants\seo.ts"
        if (Test-Path $siteTaglineFile) {
            $taglineContent = Get-Content -Path $siteTaglineFile -Raw
            if ($taglineContent -match 'SITE_TAGLINE\s*=\s*["'']([^"'']+)["'']') {
                $siteTagline = $matches[1]
                if ($content -match 'description=\{SITE_TAGLINE\}') {
                    $description = $siteTagline
                }
            }
        }
    }
    
    # Return the results
    if ($title -and $description) {
        return [PSCustomObject]@{
            Page = $pageName
            MetaTitle = $title
            MetaDescription = $description
        }
    } elseif ($pageName -match "Guide$") {
        # For island guides with missing data, try to infer based on page name
        $islandName = $pageName -replace "Guide$", ""
        $title = "$islandName Island Guide | Greece Cyclades"
        $description = "Complete travel guide to $islandName island in the Cyclades. Find the best beaches, villages, activities, and travel tips for your visit."
        
        return [PSCustomObject]@{
            Page = $pageName
            MetaTitle = $title
            MetaDescription = $description
        }
    } else {
        Write-Host "No SEO data found for $pageName"
        return $null
    }
}

# Get all TSX files in the pages directory
$files = Get-ChildItem -Path $pagesDir -Filter "*.tsx"

# Process each file
foreach ($file in $files) {
    $data = Extract-SeoData -FilePath $file.FullName
    if ($data) {
        $results += $data
    }
}

# Sort results by page name
$results = $results | Sort-Object -Property Page

# Create the CSV content manually to ensure proper formatting
$csvContent = "Page,Meta Title,Meta Description`r`n"
foreach ($item in $results) {
    # Escape double quotes in the fields
    $title = $item.MetaTitle -replace '"', '""'
    $description = $item.MetaDescription -replace '"', '""'
    
    # Add the line to the CSV content
    $csvContent += "$($item.Page),`"$title`",`"$description`"`r`n"
}

# Write the CSV content to the file
[System.IO.File]::WriteAllText($outputFile, $csvContent, [System.Text.Encoding]::UTF8)

Write-Host "SEO data extracted to $outputFile"
Write-Host "Found $($results.Count) pages with SEO data"

# Create a simple HTML file to view the data
$htmlFile = Join-Path -Path $PSScriptRoot -ChildPath "seo_meta_data.html"
$htmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <title>SEO Meta Data</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        tr:nth-child(even) { background-color: #f9f9f9; }
    </style>
</head>
<body>
    <h1>SEO Meta Data</h1>
    <table>
        <tr>
            <th>Page</th>
            <th>Meta Title</th>
            <th>Meta Description</th>
        </tr>
"@

foreach ($item in $results) {
    $htmlContent += @"
        <tr>
            <td>$($item.Page)</td>
            <td>$($item.MetaTitle)</td>
            <td>$($item.MetaDescription)</td>
        </tr>
"@
}

$htmlContent += @"
    </table>
</body>
</html>
"@

[System.IO.File]::WriteAllText($htmlFile, $htmlContent, [System.Text.Encoding]::UTF8)
Write-Host "HTML view created at $htmlFile"
