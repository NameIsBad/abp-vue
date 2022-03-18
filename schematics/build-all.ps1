$api_url = 'http://localhost:8086'
$namespace = 'Zoey|Zoey.Admin' # 多个用|分割
$abp_services = ('abp', 'permissionManagement', 'auditing', 'account', 'featureManagement', 'settingManagement', 'identity', 'multi-tenancy')
$ks_services = ('login')

# $rootFolder = (Get-Item -Path "./" -Verbose).FullName
$generate_code_folder = './generate-code'
$exit_folder = (Test-Path $generate_code_folder)
if ($exit_folder -eq "True") {
    Write-Host "delete generate code folder"
    Remove-Item -Recurse -Force -Path './generate-code'
}

npm run build

foreach ($service in $abp_services) {
    Write-Host ("Build " + $service + " ...")
    schematics .:proxy-add --sourceUrl $api_url --rootNamespace $namespace --dry-run=false --module $service
}

foreach ($service in $ks_services) {
    Write-Host ("Build " + $service + " ...")
    schematics .:proxy-add --sourceUrl $api_url --rootNamespace $namespace --dry-run=false --module $service
}