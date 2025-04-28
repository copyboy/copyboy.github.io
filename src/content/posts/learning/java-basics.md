---
title: "Java基础知识总结"
description: "这篇文章总结了Java编程的基础知识，包括语法、面向对象编程、集合框架和异常处理等核心概念。"
date: 2023-10-15
category: "学习"
tags: ["Java", "编程", "基础知识"]
---

# Java基础知识总结

Java是一种广泛使用的编程语言，以其"一次编写，到处运行"的特性而闻名。本文将帮助您快速了解Java的核心基础知识。

## Java语言特点

- 面向对象
- 平台无关性
- 强类型
- 自动内存管理
- 多线程支持

## 基础语法

Java的基本语法包括变量声明、控制流语句和方法定义等。

```java
public class HelloWorld {
    public static void main(String[] args) {
        // 声明变量
        String greeting = "Hello, World!";
        
        // 输出到控制台
        System.out.println(greeting);
        
        // 条件语句
        if (greeting.contains("Hello")) {
            System.out.println("这是一个问候语");
        }
    }
}
```

## 面向对象编程

Java是一种纯面向对象的语言，支持封装、继承和多态三大特性。

### 封装

通过访问修饰符控制类成员的可见性。

```java
public class Person {
    private String name;
    private int age;
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}
```

### 继承

子类可以继承父类的属性和方法。

```java
public class Student extends Person {
    private String studentId;
    
    public String getStudentId() {
        return studentId;
    }
}
```

## 集合框架

Java提供了丰富的集合类，如ArrayList、HashMap等。

```java
import java.util.ArrayList;
import java.util.List;

List<String> names = new ArrayList<>();
names.add("张三");
names.add("李四");
```

## 总结

掌握Java基础知识是成为一名优秀Java开发者的第一步。通过本文的介绍，希望您能对Java有一个初步的了解。

## 参考资源

1. [Java官方文档](https://docs.oracle.com/javase/)
2. [Java编程思想](https://www.amazon.com/Thinking-Java-4th-Bruce-Eckel/dp/0131872486) 