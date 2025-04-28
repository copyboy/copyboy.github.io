---
title: "Spring Boot入门指南"
date: 2024-05-01
lastmod: 2024-05-05
category: "学习"
tags: ["Java", "Spring Boot", "框架"]
series: "Java框架"
order: 1
description: "本文介绍Spring Boot框架的基础知识，包括项目创建、配置管理、依赖注入和REST API开发等内容。"
hidden: false
---

# Spring Boot入门指南

Spring Boot是一个用于简化Spring应用开发的框架，它提供了一种快速创建独立、生产级别的Spring应用的方式。本文将介绍Spring Boot的基础知识和使用方法。

## 1. Spring Boot简介

Spring Boot旨在简化创建独立、生产级别的基于Spring的应用程序的流程。它采用了"约定优于配置"的原则，通过提供合理的默认配置减少了开发者的决策数量。

Spring Boot的主要特点包括：

- 创建独立的Spring应用
- 内嵌Tomcat、Jetty或Undertow（无需部署WAR文件）
- 提供固定的Starter POM简化Maven配置
- 尽可能自动配置Spring和第三方库
- 提供生产就绪功能，如指标、健康检查和外部配置
- 完全不需要XML配置

## 2. 创建Spring Boot项目

### 2.1 使用Spring Initializr

最简单的方式是使用[Spring Initializr](https://start.spring.io/)：

1. 访问https://start.spring.io/
2. 选择项目类型（Maven/Gradle）
3. 填写项目信息（Group, Artifact等）
4. 选择依赖（如Web, JPA, Security等）
5. 点击"Generate"下载项目骨架

### 2.2 使用命令行工具

```bash
# 安装Spring Boot CLI
# macOS (使用Homebrew)
brew tap spring-io/tap
brew install spring-boot

# 创建项目
spring init --dependencies=web,data-jpa my-project
```

### 2.3 使用IDE创建

主流IDE如IntelliJ IDEA、Eclipse和VS Code都提供Spring Boot项目创建向导。

## 3. Spring Boot项目结构

典型的Spring Boot项目结构如下：

```
my-project/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/myproject/
│   │   │       ├── Application.java
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       └── model/
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   └── test/
│       └── java/
│           └── com/example/myproject/
├── pom.xml (或build.gradle)
└── README.md
```

## 4. 基本配置

Spring Boot使用`application.properties`或`application.yml`文件进行配置：

```properties
# application.properties
# 服务器配置
server.port=8080
server.servlet.context-path=/api

# 数据库配置
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update

# 日志配置
logging.level.root=INFO
logging.level.org.springframework.web=DEBUG
```

YAML格式的配置：

```yaml
# application.yml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password
  jpa:
    hibernate:
      ddl-auto: update

logging:
  level:
    root: INFO
    org.springframework.web: DEBUG
```

## 5. 依赖注入

Spring Boot使用依赖注入来管理应用组件：

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    // 业务逻辑方法
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
```

## 6. 创建REST API

### 6.1 Controller示例

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }
    
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return userService.update(user);
    }
    
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }
}
```

### 6.2 实体类示例

```java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String email;
    private String password;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}
```

## 7. 运行Spring Boot应用

### 7.1 使用Maven

```bash
# 运行应用
mvn spring-boot:run

# 打包应用
mvn clean package

# 运行打包后的应用
java -jar target/myapp-0.0.1-SNAPSHOT.jar
```

### 7.2 使用Gradle

```bash
# 运行应用
gradle bootRun

# 打包应用
gradle build

# 运行打包后的应用
java -jar build/libs/myapp-0.0.1-SNAPSHOT.jar
```

## 8. Spring Boot Actuator

Spring Boot Actuator提供了监控和管理应用的功能：

```xml
<!-- 添加Actuator依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

配置Actuator端点：

```properties
# 启用所有端点
management.endpoints.web.exposure.include=*

# 仅启用特定端点
management.endpoints.web.exposure.include=health,info,metrics

# 端点基本路径
management.endpoints.web.base-path=/actuator
```

## 结论

Spring Boot极大地简化了Spring应用的开发和部署流程。通过提供合理的默认配置和自动配置功能，它使开发者能够专注于业务逻辑的实现，而不必过多关注基础架构的搭建。

随着经验的积累，你可以进一步探索Spring Boot的高级特性，如Spring Security、Spring Data JPA、Spring Cloud等，构建更复杂、更强大的应用。

在下一篇文章中，我们将深入介绍Spring Boot的高级特性和最佳实践。 