---
title: 【leetcode】1. two sum两数之和
date: ''
modified: ''
category: 学习笔记
tags:
- leetcode
- javascript
thumb: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-13T04:11:52.png
---

![leetcode(1): two sum][1]
## Description
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
```c
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```

## 0. My solution(Brute Force)
```javascript
var twoSum = function(nums, target) {
    for(let i = 0; i < nums.length; i++) {
        for(let j = 0; j < nums.length; j++) {
            if(nums[i] + nums[j] === target && i != j) {
                return [i, j]
            }
        }
    }
};
```
· Time complexity: O(n^2), For each element, I try to find its complement by looping through the rest of array which takes O(n)*O(n) time. Therefore, the time complexity is O(n^2).

· Space complexity : O(1). 

## 1. Improve
```javascript
var twoSum = function(nums, target) {
    for(let i = 0; i < nums.length; i++) {
        for(let j = i + 1; j < nums.length; j++) {
            if(nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
};
```
## 2. Improve again
```javascript
var twoSum = function(nums, target) {
    for(var i = 0; i< nums.length; i++){
        var complement = target - nums[i];
        var found = nums.indexOf(complement, i + 1);
        if(found !== -1){
            return [i, found];
        }
    }
    return [0, 0];
};
```
## 3. Improve again
```javascript
var twoSum = function(nums, target) {
    if (nums.length === 2) return [0, 1];
    const len = nums.length;
    let hashTable = {};
	for(let i = 0; i < len; i++){
		// Add a new obj to the hashTable where key = nums[i] and value = i
		hashTable[nums[i]] = i;
	}
	
    for(let i = 0; i < len; i++) {
        let complement = target - nums[i];
        let found = hashTable[complement]; // Determine whether the complement exist in the hashTable
        if(found !== undefined && found != i) return [i, found];
	}
	return [0,0];
}
```
[B站视频地址](https://www.bilibili.com/video/av83229623/)

  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-13T04:11:52.png