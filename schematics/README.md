# ABP Suite Schematics

所生成的代码不仅适用 `Vben`，同样适用 `ElementUI` 等 `VUE` 框架

## install Schematics cli

```
npm install -g @angular-devkit/schematics-cli or
yarn add -g @angular-devkit/schematics-cli
```

## Install dependency packages

```
npm install or
yarn
```

## LocalLaunch

```
npm run build
schematics .:proxy-add --sourceUrl 'http://localhost:8086' --rootNamespace 'Zoey|Zoey.Admin|Volo.Abp|Volo.Abp.AspNetCore.Mvc|Pages.Abp' --dry-run=false --module 'account'
```

## Remote Run

## 1.在该项目执行 link 命令

```
npm install
```

## 2.在运行项目执行 link 命令

```
npm link ks-schematics
```

## 3.在运行项目执行命令

```
ng g ks-schematics:proxy-add -t ng -m 'questions'
```

# 本地调试

1. lanch.json
   ```
   {
    // 使用 IntelliSense 了解相关属性。
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            // "request": "attach",
            "name": "Launch Program",
            "console": "externalTerminal",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/node_modules/@angular-devkit/schematics-cli/bin/schematics.js",
            "args": [
                ".:proxy-add",
                "-t ng -m 'questions'"
            ],
            "resolveSourceMapLocations": [
                "${workspaceFolder}/**",
                "!**/node_modules/**"
            ],
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ]
        }
    ]
   }
   ```
2. 执行命令

   ```
   npm run build
   npm run test
   ```

3. F5 运行
