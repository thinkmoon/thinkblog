---
title: C++11新特性之auto的妙用
date: ''
modified: ''
category: 学习笔记
tags:
- C++
---

> C++11引入了auto和decltype关键字实现类型推导，通过这两个关键字不仅能方便地获得复杂的类型，还能简化书写，提高编码效率。下面说一下C++中的auto

### 旧标准
auto其实并不是一个新的关键字，在旧的标准C++98/03中，它代表着“具有自动存储周期的局部变量”。啥意思呢？就是我们平常所说的变量，他与static相对。就是说所有非static类型的都是“具有自动存储期的”。也就是说在旧的标准下。
```C++
autoint i =3;//等价于int i=3;
```
### 新标准
在C++11中，auto作为一个新的类型指示符（如int，double）来指示编译器的，但是auto申明的变量的类型必须由编译器在编译时期推导出来，也称类型推导。这种类型推导不是C++所独有的，还有很多具备这种能力的语言（如Python，Javascript）。我们先来看一段Python代码
```python
name ="thinkmoon"print"hello,"+ name 
```
在这里的name是不需要定义类型的，因为这个类型很容易被推导为字符串性，如过要想在C++中实现这种效果，我们可以这样。
```C++
#include<iostream>
int main(){
	auto name ="thinkmoon"; 
	std::cout <<"hello,"<< name << std::endl;
	return0;
}
```
效果是一样的，是不是觉得写起来特别的方便呢？

但是需要注意的是，在C++中这种静态类型推导是发生在编译期间的。而像Python这种动态类型推导却是发生在运行期间的。
### auto的基本用法
```C++
#include<iostream>
usingnamespace std;
int main(){
auto x =5; 
cout << x << endl;//x被推导为intauto p =newauto(1);    
cout <<"*"<< p <<"="<<*p << endl;//p被推导为
int *constauto*v =&x, u =6; 
cout <<"*"<< v <<"="<<*v <<"\n u="<< u << endl;//v被推导为const int *，u被推导const int
}
```
对于最后一个类型推导有几个需要注意

1.  v被推导为const int *而这里auto代替int，但是u等于6还是要写的，否则编译器会报错。
2.  u的等号后面只能写整型的变量，否则会报错，因为不能让编译器产生具有二义性的推断。
> 其实我们学习的时候可以把auto理解为占位符，它只是占着一个位置并不做其它的事情，由编译器将其类型推导出来再用对应的类型去运行，所以这个时候auto的类型推导是不能让编译器产生二义性的。  

### auto的推导规则
```C++
int x =0;auto* a =&x;//auto推导为int，
auto b =&x;//auto推导为int *，即使不申明为指针也能推断为指针
auto& c = x;//auto推导为int，等价于int 
auto d = c;//auto推导为int，auto会抛弃右值的引用类型
const auto e = x;//e是const int类型，
auto f = e;//f是int型constauto&g = x;//g是const 
int & auto & h = g;  //h是const int & 
```

> 总结：
1.  当不申明为引用或者指针时，auto的推导规则会抛弃对应右值的cv限定符（cv-qualifier，const，volatile限定符的总称）。
2.  当申明为引用或者指针时，auto推导规则会保留右值的cv属性。

### auto的限制
1.  auto s
> 错误原因:s没有明确的类型，auto无法推断。

2.  void fun(auto a=1){….}
> 错误原因：auto类型推导不能用作函数参数。
3.  auto不能用于非静态成员函数

```C++
struct Foo
{
	auto var_1=0;//错误，auto不能用于非静态成员函数
	static const auto var_2=0;//OK，var_2为static const int
}
```
### 4.  auto无法定义数组
```
int main()
{
	int arr[10]={0};
	auto aa    = arr; //OK,aa为int *
	auto bb[10]=arr;//error,auto无法定义数组
}
```
### 5.  auto无法推导出模板参数
```C++
Bar<int> bar;
Bar<auto> bb = bar;//error,auto无法推导出模板参数
```
### auto的优势
既然auto的功能特性这么方便，那么它的优势在哪？或者说，我们什么时候使用它能达到神效呢？
1.  遍历vector
> 这是一个简单的遍历。
`vector<int> vs;for(auto i = vs.begin(); i < vs.end(); i++){......}`
其实还可以更简单
`for(auto var : vs){.......}`
2.  待补充。。。。。。。嘿嘿！