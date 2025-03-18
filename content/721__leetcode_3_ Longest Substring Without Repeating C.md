---
title: 【leetcode】3. Longest Substring Without Repeating Characters无重复字符的最长子串
date: '2020-01-16 21:41:34'
modified: '2020-01-16 21:41:34'
category: 学习笔记
tags:
- leetcode
- python
thumb: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-15T06:37:26.png
---

![题目描述][1]

## 思路
查找无重复的字符子串，然后滑动窗口

## 初次解
每次滑动一格窗口
```python
class Solution:
    def isUnique(self, s: str) -> bool:
        for ch in s:
            if s.count(ch) > 1:
                return False
            else:
                continue
        return True
    def lengthOfLongestSubstring(self, s: str) -> int:
        i,j,Max=0,0,0
        j+=1
        while j <= len(s):
            if self.isUnique(s[i:j]):
                print(s[i:j],"is Unique",i,j)
                Max=max(j-i,Max)
                j+=1
            else:
                i+=1
        return Max
```

## 成果


## 第一次优化
```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        if(len(s)==1): 
            return 1
        i,j,Max=0,0,0
        while j <= len(s):
            st = s[i:j+1]
            if(j+1 < len(s)):
                index = st.find(s[j+1])
                if index > -1:
                    i+=(index+1)
                j+=1
                Max=max(j-i+1,Max)
            else:
                break
        return Max
```

## 成果
![2020-01-15T07:27:31.png][2]


  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-15T06:37:26.png
  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-15T07:27:31.png