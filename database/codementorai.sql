CREATE DATABASE IF NOT EXISTS codementorai;

USE codementorai;

CREATE TABLE IF NOT EXISTS tblproblems (
    Problem_id INT NOT NULL AUTO_INCREMENT,
    Title VARCHAR(100) NOT NULL,
    Difficulty VARCHAR(30) NOT NULL,
    Concept VARCHAR(50) NOT NULL,
    Description TEXT NOT NULL,
    PRIMARY KEY (Problem_id)
);

INSERT INTO tblproblems
    (Title, Difficulty, Concept, Description)
VALUES
(
    'Reverse a String',
    'Easy',
    'Strings',
    'Write a Java program to reverse a given String without using StringBuilder.reverse().'
),
(
    'Find Largest Number',
    'Easy',
    'Arrays',
    'Write a Java program to find the largest number in an integer array.'
),
(
    'Check Palindrome',
    'Easy',
    'Strings',
    'Write a Java program to determine whether a given String is a palindrome.'
),
(
    'Count Vowels',
    'Easy',
    'Loops',
    'Count the number of vowels in a given String.'
),
(
    'Two Sum',
    'Medium',
    'Arrays',
    'Given an integer array and target, find two indices whose values add to the target.'
),
(
    'Check Prime Number',
    'Easy',
    'Math',
    'Write a Java program to determine whether a given number is prime.'
),
(
    'Factorial of a Number',
    'Easy',
    'Math',
    'Write a Java program to calculate the factorial of a given number.'
),
(
    'Fibonacci Series',
    'Easy',
    'Loops',
    'Write a Java program to print the Fibonacci series up to a given number of terms.'
),
(
    'Find Second Largest Number',
    'Easy',
    'Arrays',
    'Write a Java program to find the second largest number in an integer array.'
),
(
    'Find Smallest Number',
    'Easy',
    'Arrays',
    'Write a Java program to find the smallest number in an integer array.'
),
(
    'Count Frequency of Elements',
    'Medium',
    'Arrays',
    'Write a Java program to count the frequency of each element in an integer array.'
),
(
    'Remove Duplicates from Array',
    'Easy',
    'Arrays',
    'Write a Java program to remove duplicate elements from an integer array.'
),
(
    'Check Anagram',
    'Easy',
    'Strings',
    'Write a Java program to determine whether two strings are anagrams of each other.'
),
(
    'Find Missing Number',
    'Easy',
    'Arrays',
    'Given an array containing numbers from 1 to n with one number missing, find the missing number.'
),
(
    'Move Zeroes to End',
    'Easy',
    'Arrays',
    'Move all zeroes in an integer array to the end while maintaining the relative order of non-zero elements.'
),
(
    'Binary Search',
    'Easy',
    'Searching',
    'Implement binary search to find a target value in a sorted integer array.'
),
(
    'Merge Two Sorted Arrays',
    'Easy',
    'Arrays',
    'Merge two sorted integer arrays into one sorted array.'
),
(
    'Maximum Subarray Sum',
    'Medium',
    'Arrays',
    'Find the contiguous subarray with the largest sum.'
),
(
    'Valid Parentheses',
    'Easy',
    'Stack',
    'Given a string containing brackets, determine whether the brackets are correctly matched and nested.'
),
(
    'First Non-Repeating Character',
    'Medium',
    'Strings',
    'Find the first character in a string that does not repeat.'
),
(
    'Longest Substring Without Repeating Characters',
    'Medium',
    'Strings',
    'Find the length of the longest substring that contains no repeated characters.'
),
(
    'Rotate an Array',
    'Medium',
    'Arrays',
    'Rotate an integer array to the right by a given number of positions.'
),
(
    'Reverse a Linked List',
    'Easy',
    'Linked List',
    'Reverse a singly linked list and return the new head.'
),
(
    'Detect Cycle in Linked List',
    'Medium',
    'Linked List',
    'Determine whether a singly linked list contains a cycle.'
),
(
    'Implement Stack Using Queues',
    'Medium',
    'Queue',
    'Implement a stack data structure using one or more queues.'
),
(
    'Implement Queue Using Stacks',
    'Medium',
    'Stack',
    'Implement a queue data structure using two stacks.'
),
(
    'Number of Islands',
    'Medium',
    'Graphs',
    'Given a grid of land and water cells, count the number of connected islands.'
),
(
    'Shortest Path in a Grid',
    'Medium',
    'Graphs',
    'Find the shortest path between two cells in a grid while avoiding blocked cells.'
),
(
    'Climbing Stairs',
    'Easy',
    'Dynamic Programming',
    'Given n stairs where you can climb one or two steps at a time, calculate the number of distinct ways to reach the top.'
),
(
    'LRU Cache',
    'Hard',
    'Design',
    'Design a Least Recently Used cache supporting get and put operations efficiently.'
);