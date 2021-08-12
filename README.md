# abp-vue

本项目参照[colinin](https://github.com/colinin/abp-vue-admin-element-typescript)

本项目为单体应用并且移除了 _IdentityServer4_ 使用 _jwt_

## 后端

[abp vnext](https://github.com/abpframework/abp)

运行

1. 修改**DbMigrator**和 **HttpApi.Host**项目的 appsettings.json 的数据库和 redis 连接字符串
2. 运行**DbMigrator**项目(初始化 mysql 数据库)
3. 运行**HttpApi.Host**

## 前端

[vben](https://vvbin.cn/next/#/dashboard/analysis)

运行

```
# 安装依赖
yarn

# 运行项目
yarn dev
```
