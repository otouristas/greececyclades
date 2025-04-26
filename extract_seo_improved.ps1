# PowerShell script to extract SEO meta titles and descriptions

# Define the pages directory
$pagesDir = Join-Path -Path $PSScriptRoot -ChildPath "src\pages"
$outputFile = Join-Path -Path $PSScriptRoot -ChildPath "seo_meta_data.csv"

# Create an array to store the results
$results = @()

# Get all TSX files in the pages directory
$files = Get-ChildItem -Path $pagesDir -Filter "*.tsx"

foreach ($file in $files) {
    $pageName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $content = Get-Content -Path $file.FullName -Raw
    
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
    
    # If we found both title and description, add to results
    if ($title -and $description) {
        $results += [PSCustomObject]@{
            Page = $pageName
            "Meta Title" = $title
            "Meta Description" = $description
        }
    } else {
        # For pages with missing data, try to infer based on page name
        if ($pageName -match "Guide$") {
            $islandName = $pageName -replace "Guide$", ""
            $title = "$islandName Island Guide | Greece Cyclades"
            $description = "Complete travel guide to $islandName island in the Cyclades. Find the best beaches, villages, activities, and travel tips for your visit."
            
            $results += [PSCustomObject]@{
                Page = $pageName
                "Meta Title" = $title
                "Meta Description" = $description
            }
        } else {
            Write-Host "No SEO data found for $pageName"
        }
    }
}

# Sort results by page name
$results = $results | Sort-Object -Property Page

# Export to CSV
$results | Export-Csv -Path $outputFile -NoTypeInformation -Encoding UTF8

Write-Host "SEO data extracted to $outputFile"
Write-Host "Found $($results.Count) pages with SEO data"

# Display the first few entries to verify
Write-Host "`nSample of extracted data:"
$results | Select-Object -First 5 | Format-Table -AutoSize
