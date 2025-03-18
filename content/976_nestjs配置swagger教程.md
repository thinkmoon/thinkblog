---
title: nestjs配置swagger教程
date: '2022-12-16 20:58:16'
modified: '2022-12-16 20:58:16'
category: 教程分享
tags:
- typescript
- nodejs
- javascript
desc: 本文记录如何在nestjs框架下配置swagger。OpenAPI是一个与语言无关的RESTful API定义说明，Nest提供了一个专有的模块来利用装饰器生成类似声明。
thumb: https://blog.cdn.thinkmoon.cn/2022-12-16/20-41-35
---

> 本文记录如何在nestjs框架下配置swagger。OpenAPI是一个与语言无关的RESTful API定义说明，Nest提供了一个专有的模块来利用装饰器生成类似声明。

## 安装

```bash
npm install --save @nestjs/swagger swagger-ui-express
```

## 引导

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('api-collect')
    .setDescription('API文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3001);
}

bootstrap().then(() => {
  Logger.log("启动成功");
});

```
这里主要引入了两个模块，`SwaggerModule`和`DocumentBuilder`。其中`DocumentBuilder`建立一个遵循OpenAPI 标准的基础文档。它提供了不同的方法来配置类似标题、描述、版本等信息属性。

（SwaggerModule#createDocument()方法返回)是一个遵循OpenAPI文档的序列化对象。除了HTTP，你也可以以JSON/YAML文件格式保存和使用它。

> SwaggerModule.setup('api', app, document);

此行代码标记你的文档最终挂载的路径。

## 运行体验

![nestjs swagger](https://blog.cdn.thinkmoon.cn/2022-12-16/20-41-35)

此时我们就可以看到熟悉的swagger界面啦。

## 类型和参数

如果我们想设置swagger对应的参数请求类型，那么也可以使用它的反射来创建响应模型。

使用ts声明一个参数请求dto
```typescript
export class ParamsDto {
  params?: string[];
}
```typescript

接口上声明对应的入参

```typecript
import { Body, Controller, Post, Query } from "@nestjs/common";
import { SqlService } from "../service/sql.service";
import { CodeDto } from "../entity/code.dto";
import { ParamsDto } from "../entity/params.dto";
import { PathDto } from "../entity/path.dto";

@Controller("api-collect")
export class SqlController {
  constructor(private readonly sqlService: SqlService) {
  }

  @Post("/execute-by-path")
  executeByPath(@Query() pathDto: PathDto, @Body() paramsDto: ParamsDto) {
    return this.sqlService.executeSqlByPath(pathDto.path, paramsDto.params);
  }

  @Post("/execute-by-code")
  executeByCode(@Query() codeDto: CodeDto, @Body() paramsDto: ParamsDto) {
    return this.sqlService.executeSqlByCode(codeDto.code, paramsDto.params);
  }
}
```

激活swagger ts类型扫描插件（Nestjs框架自带）

![swagger ts类型扫描](https://blog.cdn.thinkmoon.cn/2022-12-16/20-49-40)

激活此插件后

ts的枚举类型会作为swagger的入参枚举类型，可选变量也会生成对应的required字段

插件会自动扫描[‘.dto.ts’, ‘.entity.ts’]后缀的类实体声明

## 效果预览

![Nest js swagger](https://blog.cdn.thinkmoon.cn/2022-12-16/20-53-06)

![Description](https://blog.cdn.thinkmoon.cn/2022-12-16/20-53-47)







