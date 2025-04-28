---
title: "Java高级特性详解"
date: 2024-04-22
lastmod: 2024-04-25
category: "学习"
tags: ["Java", "高级特性", "编程技巧"]
series: "Java核心技术"
order: 2
prev: "java-basics"
next: "java-design-patterns"
description: "本文深入探讨Java的高级特性，包括泛型、Lambda表达式、Stream API、多线程编程以及反射机制等内容。"
hidden: false
---

# Java高级特性详解

在掌握了Java基础知识之后，深入了解Java的高级特性将帮助您编写更加简洁、高效和强大的代码。本文将详细介绍Java的几个重要高级特性。

## 1. 泛型（Generics）

泛型是Java 5引入的一个重要特性，它允许类型（类和接口）在定义时使用类型参数，在使用时再指定类型。

### 1.1 泛型类

```java
// 泛型类定义
public class Box<T> {
    private T content;
    
    public void set(T content) {
        this.content = content;
    }
    
    public T get() {
        return content;
    }
}

// 使用泛型类
Box<String> stringBox = new Box<>();
stringBox.set("Hello World");
String str = stringBox.get();

Box<Integer> intBox = new Box<>();
intBox.set(123);
Integer num = intBox.get();
```

### 1.2 泛型方法

```java
public <T> T processValue(T value) {
    // 处理value的逻辑
    return value;
}

// 调用泛型方法
String result = processValue("test");  // 自动类型推断
Integer num = this.<Integer>processValue(42);  // 显式指定类型
```

### 1.3 类型限定符

```java
// T必须是Number或其子类
public <T extends Number> double sumValues(List<T> list) {
    double sum = 0.0;
    for (T value : list) {
        sum += value.doubleValue();
    }
    return sum;
}
```

## 2. Lambda表达式和函数式接口

Java 8引入了Lambda表达式，使代码更简洁，更接近函数式编程风格。

### 2.1 函数式接口

```java
@FunctionalInterface
interface MyFunction {
    int operate(int a, int b);
}

// 使用Lambda表达式实现函数式接口
MyFunction add = (a, b) -> a + b;
MyFunction multiply = (a, b) -> a * b;

System.out.println(add.operate(5, 3));       // 输出: 8
System.out.println(multiply.operate(5, 3));  // 输出: 15
```

### 2.2 内置函数式接口

Java 8提供了许多内置的函数式接口：

```java
// Predicate<T> - 接收T类型参数，返回boolean
Predicate<Integer> isPositive = n -> n > 0;
System.out.println(isPositive.test(5));  // true

// Function<T, R> - 接收T类型参数，返回R类型结果
Function<String, Integer> stringLength = s -> s.length();
System.out.println(stringLength.apply("Hello"));  // 5

// Consumer<T> - 接收T类型参数，无返回值
Consumer<String> printer = s -> System.out.println(s);
printer.accept("Hello World");  // 打印: Hello World

// Supplier<T> - 无参数，返回T类型结果
Supplier<Double> randomValue = () -> Math.random();
System.out.println(randomValue.get());  // 随机数
```

## 3. Stream API

Stream API提供了一种声明式的方式来处理数据集合。

### 3.1 创建Stream

```java
// 从集合创建Stream
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> streamFromList = list.stream();

// 从数组创建Stream
String[] array = {"a", "b", "c"};
Stream<String> streamFromArray = Arrays.stream(array);

// 使用Stream.of()
Stream<String> streamOfValues = Stream.of("a", "b", "c");
```

### 3.2 常用Stream操作

```java
List<String> names = Arrays.asList("John", "Sarah", "Mark", "Tanya", "Ellie");

// 过滤
List<String> longNames = names.stream()
                             .filter(name -> name.length() > 4)
                             .collect(Collectors.toList());
// [Sarah, Tanya, Ellie]

// 映射
List<Integer> nameLengths = names.stream()
                               .map(String::length)
                               .collect(Collectors.toList());
// [4, 5, 4, 5, 5]

// 排序
List<String> sortedNames = names.stream()
                              .sorted()
                              .collect(Collectors.toList());
// [Ellie, John, Mark, Sarah, Tanya]

// 去重
List<Integer> numbers = Arrays.asList(1, 2, 3, 2, 1);
List<Integer> distinctNumbers = numbers.stream()
                                    .distinct()
                                    .collect(Collectors.toList());
// [1, 2, 3]
```

### 3.3 终端操作

```java
// 计算
long count = names.stream().count();  // 5
Optional<String> first = names.stream().findFirst();  // Optional[John]

// 归约
Optional<String> combined = names.stream()
                              .reduce((a, b) -> a + ", " + b);
// Optional[John, Sarah, Mark, Tanya, Ellie]

// forEach
names.stream().forEach(System.out::println);
```

## 4. 多线程编程

Java提供了强大的多线程支持，允许程序并发执行任务。

### 4.1 创建线程

```java
// 继承Thread类
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread is running...");
    }
}

// 实现Runnable接口
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable is running...");
    }
}

// 启动线程
MyThread thread1 = new MyThread();
thread1.start();

Thread thread2 = new Thread(new MyRunnable());
thread2.start();

// 使用Lambda表达式
Thread thread3 = new Thread(() -> {
    System.out.println("Lambda thread is running...");
});
thread3.start();
```

### 4.2 线程池

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

// 创建固定大小的线程池
ExecutorService executor = Executors.newFixedThreadPool(5);

// 提交任务
for (int i = 0; i < 10; i++) {
    final int taskId = i;
    executor.submit(() -> {
        System.out.println("Task " + taskId + " is running on thread " + 
                          Thread.currentThread().getName());
    });
}

// 关闭线程池
executor.shutdown();
```

## 5. 反射机制

反射允许在运行时检查类、接口、字段和方法，以及动态创建类的实例和调用方法。

```java
// 获取Class对象
Class<?> clazz = Person.class;
// 或
Class<?> clazz = Class.forName("com.example.Person");

// 创建实例
Object obj = clazz.newInstance();

// 获取方法
Method method = clazz.getMethod("getName");
// 调用方法
String name = (String) method.invoke(obj);

// 获取字段
Field field = clazz.getDeclaredField("age");
// 设置访问权限
field.setAccessible(true);
// 设置字段值
field.setInt(obj, 25);
```

## 结论

掌握这些Java高级特性将大大提升您的编程能力，使您能够编写更具表现力、更高效的代码。这些特性是现代Java开发的重要组成部分，也是构建复杂应用程序的基础。

在下一篇文章中，我们将探讨Java中的设计模式和最佳实践，进一步提高代码质量和可维护性。 