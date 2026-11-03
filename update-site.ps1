$ErrorActionPreference = 'Stop'

function Wait-BeforeExit {
    Write-Host ''
    Write-Host '------------------------------------------------------------' -ForegroundColor DarkGray
    Write-Host 'Appuyez sur une touche pour fermer cette fenetre' -ForegroundColor DarkGray
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
}

try {
    Set-Location -LiteralPath $PSScriptRoot

    Write-Host ''
    Write-Host '============================================================' -ForegroundColor Cyan
    Write-Host '  METTRE A JOUR LES DEPENDANCES DU SITE GAUL' -ForegroundColor Cyan
    Write-Host '============================================================' -ForegroundColor Cyan
    Write-Host 'Ce script installe les dependances du projet et applique'
    Write-Host 'les correctifs de securite npm disponibles.'
    Write-Host ''

    Write-Host '[1/3] Verification de Node.js...' -ForegroundColor Yellow
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        throw 'Node.js est requis. Installez-le depuis https://nodejs.org/, puis relancez ce script.'
    }
    Write-Host '      Node.js est disponible.' -ForegroundColor Green

    Write-Host '[2/3] Installation des dependances...' -ForegroundColor Yellow
    npm.cmd install
    if ($LASTEXITCODE -ne 0) {
        throw 'L installation des dependances a echoue. Verifiez votre connexion Internet, puis relancez le script.'
    }
    Write-Host '      Les dependances sont a jour.' -ForegroundColor Green

    Write-Host '[3/3] Recherche et application des correctifs de securite...' -ForegroundColor Yellow
    npm.cmd audit fix
    if ($LASTEXITCODE -ne 0) {
        Write-Host '      Certaines vulnerabilites ne peuvent pas etre corrigees automatiquement, mais depend de la version de Node.js utilisée. ' -ForegroundColor Yellow
        Write-Host '      Lancez "npm audit" pour plus de details.' -ForegroundColor Yellow
    }

    Write-Host '[3/3] Mise a jour des dependances terminee avec succes.' -ForegroundColor Green
    Write-Host '      Aucun deploiement ni changement Git n a ete effectue.'
}
catch {
    Write-Host ''
    Write-Host 'ERREUR : la mise a jour n a pas pu etre terminee.' -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ''
    Write-Host 'Corrigez le probleme, puis relancez update-site.cmd.' -ForegroundColor Yellow
}
finally {
    Wait-BeforeExit
}