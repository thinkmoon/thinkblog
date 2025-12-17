---
title: 【leetcode】2. Add Two Numbers两数相加
date: '2020-01-16 21:42:10'
lastmod: '2020-01-16 21:42:10'
categories:
- 学习笔记
tags:
- leetcode
- python
featured_image: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-14T08:20:00.png
---


![【leetcode】2. Add Two Numbers两数相加][1]



## 描述

给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。



如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。



您可以假设除了数字 0 之外，这两个数都不会以 0 开头。



> 示例：

```c

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)

输出：7 -> 0 -> 8

原因：342 + 465 = 807

```



## 思路



我看到这个题的第一感觉就是用递归把数获取出来，然后再相加，之后再把得数结构化。问题就被细分为了两个方面：

1. 加数的提取

2. 得数的结构化



## 我的初次实现

```python

class Solution:

    def getStr(self,node: ListNode) -> str:

        if node.next == None:

            return node.val

        else:

            last = self.getStr(node.next)

            return  str(last) + str(node.val)



    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:

        num1 = self.getStr(l1)

        num2 = self.getStr(l2)

        result = int(num1) + int(num2)

        resultList = list(str(result))

        tmp = ListNode(int(resultList.pop(0)))

        List = tmp

        while resultList:

            tmp = ListNode(int(resultList.pop(0)))

            tmp.next = List

            List = tmp

        return List

```

### 成果

![成果][2]



## 改进思路

利用人列竖式算法的方法，计算每一列的值



### 改进代码

```python

class Solution:

    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:

        # if l1.next == None and l1.val == 0:

        #    return l2

        # if l2.next == None and l2.val == 0:

        #    return l1

        l1_iter = l1

        l2_iter = l2

        Sum = l1_iter.val + l2_iter.val

        carry = 1 if Sum >= 10 else 0

        Sum %= 10

        List = ListNode(Sum)

        l1_iter = l1_iter.next

        l2_iter = l2_iter.next

        Site = List

        while(l1_iter != None and l2_iter != None):

            Sum = l1_iter.val + l2_iter.val + carry

            carry = 1 if Sum >= 10 else 0

            Sum %= 10

            tmp = ListNode(Sum)

            Site.next = tmp

            Site = Site.next

            l1_iter = l1_iter.next

            l2_iter = l2_iter.next

        last = Site

        if(l1_iter == None and l2_iter == None) :

            if(carry == 1):

                tmp = ListNode(carry)

                last.next = tmp

            return List

        else:

            Site = l1_iter if l2_iter == None else l2_iter

            tail = Site

            while(Site != None and carry == 1):

                Sum = Site.val + carry

                Site.val = Sum % 10

                carry = 0 if Sum < 10 else 1

                if(Site.next == None and carry == 1):

                    tmp = ListNode(carry)

                    Site.next = tmp

                    break

                Site = Site.next

            last.next = tail

        return List

```



## 成果

![Add Two Numbers超越100%的Python用户][3]





  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-14T08:20:00.png

  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-14T08:25:07.png

  [3]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-14T10:23:51.png