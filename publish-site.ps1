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
    Write-Host '  PUBLIER LE SITE GAUL' -ForegroundColor Cyan
    Write-Host '============================================================' -ForegroundColor Cyan
    Write-Host 'Ce script construit le site et le publie sur Firebase.'
    Write-Host 'La publication rendra les changements visibles en ligne.'
    Write-Host ''

    Write-Host '[1/5] Verification de Node.js...' -ForegroundColor Yellow
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        throw 'Node.js est requis. Installez-le depuis https://nodejs.org/, puis relancez ce script.'
    }
    Write-Host '      Node.js est disponible.' -ForegroundColor Green

    Write-Host '[2/5] Verification des dependances du projet...' -ForegroundColor Yellow
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

    $firebaseCli = Join-Path $PSScriptRoot 'node_modules\.bin\firebase.cmd'
    if (-not (Test-Path -LiteralPath $firebaseCli)) {
        throw 'Firebase CLI introuvable. Relancez le script pour reinstaller les dependances.'
    }

    Write-Host '[3/5] Verification de la connexion Firebase...' -ForegroundColor Yellow
    Write-Host '      Cette verification determine si une connexion est necessaire.'
    $previousErrorActionPreference = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    & $firebaseCli projects:list --json 2> $null
    $firebaseExitCode = $LASTEXITCODE
    $ErrorActionPreference = $previousErrorActionPreference
    if ($firebaseExitCode -ne 0) {
        Write-Host '      Connexion necessaire : une page va s ouvrir dans le navigateur.' -ForegroundColor Yellow
        Write-Host '      Connectez-vous avec le compte Firebase autorise a publier le site.'
        & $firebaseCli login
        if ($LASTEXITCODE -ne 0) {
            throw 'La connexion Firebase a echoue ou a ete annulee. Relancez le script et terminez la connexion.'
        }
    } else {
        Write-Host '      La connexion Firebase est valide.' -ForegroundColor Green
    }

    Write-Host '[4/5] Construction et publication du site...' -ForegroundColor Yellow
    Write-Host '      Le site est d abord construit, puis envoye a Firebase.'
    Write-Host '      Ne fermez pas cette fenetre pendant cette operation.'
    npm.cmd run deploy
    if ($LASTEXITCODE -ne 0) {
        throw 'La construction ou la publication a echoue. Consultez le message affiche ci-dessus.'
    }

    Write-Host '[5/5] Publication terminee avec succes.' -ForegroundColor Green
    Write-Host '      Les changements sont maintenant disponibles sur le site en ligne.'
}
catch {
    Write-Host ''
    Write-Host 'ERREUR : la publication n a pas pu etre terminee.' -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ''
    Write-Host 'Que faire ?' -ForegroundColor Yellow
    Write-Host '  1. Lisez le message d erreur affiche ci-dessus.'
    Write-Host '  2. Verifiez Node.js, votre connexion Internet et votre compte Firebase.'
    Write-Host '  3. Corrigez le probleme, puis relancez publish-site.cmd.'
}
finally {
    Wait-BeforeExit
}
