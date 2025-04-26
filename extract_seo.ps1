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
    
    # Look for SEO component with direct props
    if ($content -match 'title=["'']([^"'']+)["'']') {
        $title = $matches[1]
    }
    
    if ($content -match 'description=["'']([^"'']+)["'']') {
        $description = $matches[1]
    }
    
    # Look for seoData object (used in island guides)
    if (-not $title -or -not $description) {
        if ($content -match 'seoData\s*=\s*{[^}]*title:\s*["'']([^"'']+)["''][^}]*description:\s*["'']([^"'']+)["'']') {
            $title = if ($title) { $title } else { $matches[1] }
            $description = if ($description) { $description } else { $matches[2] }
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
        Write-Host "No SEO data found for $pageName"
    }
}

# Export to CSV
$results | Export-Csv -Path $outputFile -NoTypeInformation

Write-Host "SEO data extracted to $outputFile"
Write-Host "Found $($results.Count) pages with SEO data"
