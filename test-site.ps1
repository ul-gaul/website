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
    Write-Host '  TESTER LE SITE GAUL' -ForegroundColor Cyan
    Write-Host '============================================================' -ForegroundColor Cyan
    Write-Host 'Ce script prepare le projet et demarre le site localement.'
    Write-Host 'Le navigateur devrait s ouvrir automatiquement.'
    Write-Host ''

    Write-Host '[1/3] Verification de Node.js...' -ForegroundColor Yellow
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        throw 'Node.js est requis. Installez-le depuis https://nodejs.org/, puis relancez ce script.'
    }
    Write-Host '      Node.js est disponible.' -ForegroundColor Green

    Write-Host '[2/3] Verification des dependances du projet...' -ForegroundColor Yellow
    if (-not (Test-Path -LiteralPath 'node_modules')) {
        Write-Host '      Les dependances ne sont pas encore installees.'
        Write-Host '      Installation en cours. Cette etape peut prendre quelques minutes...'
        npm.cmd install
        if ($LASTEXITCODE -ne 0) {
            throw 'L installation des dependances a echoue. Verifiez votre connexion Internet, puis relancez le script.'
        }
    } else {
        Write-Host '      Les dependances sont deja installees.' -ForegroundColor Green
    }

    Write-Host '[3/3] Demarrage du serveur local...' -ForegroundColor Yellow
    Write-Host '      Une nouvelle page devrait s ouvrir dans votre navigateur.'
    Write-Host '      Pour arreter le serveur, revenez ici et appuyez sur Ctrl+C.'
    Write-Host ''
    npm.cmd start
    if ($LASTEXITCODE -ne 0) {
        throw 'Le serveur local s est arrete avec une erreur. Consultez le message affiche ci-dessus.'
    }
}
catch {
    Write-Host ''
    Write-Host 'ERREUR : le test du site n a pas pu etre termine.' -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ''
    Write-Host 'Que faire ?' -ForegroundColor Yellow
    Write-Host '  1. Lisez le message d erreur affiche ci-dessus.'
    Write-Host '  2. Verifiez que Node.js est installe et que votre connexion fonctionne.'
    Write-Host '  3. Relancez test-site.cmd apres avoir corrige le probleme.'
}
finally {
    Wait-BeforeExit
}
