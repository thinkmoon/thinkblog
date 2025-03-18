---
title: 【leetcode】4. Median of Two Sorted Arrays寻找两个有序数组的中位数
date: ''
modified: ''
category: 学习笔记
tags:
- python
- leetcode
thumb: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-16T13:39:09.png
---

![【leetcode】4. Median of Two Sorted Arrays寻找两个有序数组的中位数][1]

## 我的初次实现
```python
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        newList = nums1 + nums2
        newList.sort()
        result = 0
        if(len(newList)%2 != 0) :
            result = newList[math.ceil(len(newList)/2-1)]
        else:
            index = int(len(newList)/2)
            result = (newList[index] + newList[index-1])/2
        return result
```

## 成果
![2020-01-16T13:40:45.png][2]

## 问题
但是我们仔细观察，可以发现这个的时间复杂度是不够的。

  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-16T13:39:09.png
  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-16T13:40:45.png