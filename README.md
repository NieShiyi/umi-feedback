# README
根据umi4官方文档安装项目 https://umijs.org/docs/tutorials/getting-started

## 步骤
1. 执行`pnpm dlx create-umi@latest`
2. 选择pnpm、taobao、antd-design-pro
3. pnpm start启动项目

## 问题
1.界面显示异常，antd-design-pro样式异常
![image](https://user-images.githubusercontent.com/35129125/230373364-b537a845-f1f0-4dab-b5e0-a68f22a27670.png)
2.umi的配置文件.umirc.ts中 theme设置了主题色失效，antd的主题颜色还是默认的蓝色。
```
 theme: {
    "@primary-color": "#1494D3", //更改主题色
  }
```
3.可能存在其他的问题

## 分析和修改问题
1.安装项目的package.json如下所示
```
{
  "private": true,
  "author": "Nie Shiyi <shiyi.nie@qitantech.com>",
  "scripts": {
    "dev": "max dev",
    "build": "max build",
    "format": "prettier --cache --write .",
    "prepare": "husky install",
    "postinstall": "max setup",
    "setup": "max setup",
    "start": "npm run dev"
  },
  "dependencies": {
    "@ant-design/icons": "^4.7.0",
    "@ant-design/pro-components": "2.0.1",
    "@umijs/max": "^4.0.64",
    "antd": "^5.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "husky": "^8.0.1",
    "lint-staged": "^13.0.3",
    "prettier": "^2.7.1",
    "prettier-plugin-organize-imports": "^2",
    "prettier-plugin-packagejson": "^2",
    "typescript": "^5.0.0"
  }
}
```

2.是不是@umijs/max和@ant-design/pro-components的版本问题导致的，@umijs/max已经到最新版本，但是@ant-design/pro-components不是
- "@ant-design/pro-components": "2.0.1"
- "@umijs/max": "^4.0.64"

3.升级@ant-design/pro-components为2.4.4后；页面布局和样式就显示正常了
![image](https://user-images.githubusercontent.com/35129125/230373985-3bcc308c-fc80-4921-8828-4b0bde4afe94.png)

4. 核心还是pnpm v8安装依赖导致的问题，我现在使用的pnpm安装依赖会生成pnpm-lock.yaml文件，对应的lockfileVersion: '6.0'。我之前是使用的pnpm <v8版本，lockfileVersion: '5.4'，无论是antd-dsign-pro，还是antd的样式都是正常的，也可以成功设置theme


## 环境信息
node：v16.17.0  
pnpm：8.1.1  
platform： windows10  
umi（全局安装）： v4.0.64  

### 注意：根据umi4安装的版本在main分支上
