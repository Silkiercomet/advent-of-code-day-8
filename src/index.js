import "./styles.css";

/*
--- Day 8: Treetop Tree House ---

he Elves don't care about distant trees taller than those found by the rules above; the proposed tree house has large eaves to keep it dry, so they wouldn't be able to see higher than the tree house anyway.

In the example above, consider the middle 5 in the second row:

30373
25512
65332
33549
35390
Looking up, its view is not blocked; it can see 1 tree (of height 3).
Looking left, its view is blocked immediately; it can see only 1 tree (of height 5, right next to it).
Looking right, its view is not blocked; it can see 2 trees.
Looking down, its view is blocked eventually; it can see 2 trees (one of height 3, then the tree of height 5 that blocks its view).
A tree's scenic score is found by multiplying together its viewing distance in each of the four directions. For this tree, this is 4 (found by multiplying 1 * 1 * 2 * 2).

However, you can do even better: consider the tree of height 5 in the middle of the fourth row:

30373
25512
65332
33549
35390
Looking up, its view is blocked at 2 trees (by another tree with a height of 5).
Looking left, its view is not blocked; it can see 2 trees.
Looking down, its view is also not blocked; it can see 1 tree.
Looking right, its view is blocked at 2 trees (by a massive tree of height 9).
This tree's scenic score is 8 (2 * 2 * 1 * 2); this is the ideal spot for the tree house.

Consider each tree on your map. What is the highest scenic score possible for any tree?

Your puzzle answer was 315495.

*/
//

const func = () => {
  const inputValue = document.getElementById("value").value;
  const rowsOfTrees = inputValue
    .trim()
    .split("\n")
    .map((e) => e.trim().split(""));

  let mostPoints = 0;
  const scenicPoints = (arr, num) => {
    let blocked = false,
      points = 0;

    for (let i = 0; i < arr.length; i++) {
      if (num > arr[i] && blocked === false) {
        points++;
      } else if (num <= arr[i] && blocked === false) {
        points++;
        blocked = true;
      }
    }

    return points;
  };

  const checkLine = (positionX, positionY, number) => {
    let up = [],
      down = [],
      left = [],
      right = [];
    let row = [],
      column = [];

    for (let i = 0; i < rowsOfTrees.length; i++) {
      if (i !== positionY) {
        row.push(rowsOfTrees[positionX][i]);
      }
    }
    for (let i = 0; i < rowsOfTrees.length; i++) {
      if (i !== positionX) {
        column.push(rowsOfTrees[i][positionY]);
      }
    }
    up = column.slice(0, positionX).reverse();
    down = column.slice(positionX, column.length);
    left = row.slice(0, positionY).reverse();
    right = row.slice(positionY, row.length);

    let pointsUp = scenicPoints(up, number);
    let pointsDown = scenicPoints(down, number);
    let pointsLeft = scenicPoints(left, number);
    let pointsRight = scenicPoints(right, number);

    return pointsUp * pointsDown * pointsLeft * pointsRight;
  };

  for (let i = 1; i < rowsOfTrees.length - 1; i++) {
    for (let k = 1; k < rowsOfTrees[0].length - 1; k++) {
      const evaluate = checkLine(i, k, rowsOfTrees[i][k]);
      if (evaluate > mostPoints) {
        mostPoints = evaluate;
      }
    }
  }

  return mostPoints;
};

console.log(func());

//first part solution
// uses 4 instead the 14 for the slice method in the for loop
/*

30373
25512
65332
33549
35390
Each tree is represented as a single digit whose value is its height, where 0 is the shortest and 9 is the tallest.

A tree is visible if all of the other trees between it and an edge of the grid are shorter than it. Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.

All of the trees around the edge of the grid are visible - since they are already on the edge, there are no trees to block the view. In this example, that only leaves the interior nine trees to consider:

The top-left 5 is visible from the left and top. (It isn't visible from the right or bottom since other trees of height 5 are in the way.)
The top-middle 5 is visible from the top and right.
The top-right 1 is not visible from any direction; for it to be visible, there would need to only be trees of height 0 between it and an edge.
The left-middle 5 is visible, but only from the right.
The center 3 is not visible from any direction; for it to be visible, there would need to be only trees of at most height 2 between it and an edge.
The right-middle 3 is visible from the right.
In the bottom row, the middle 5 is visible, but the 3 and 4 are not.
With 16 trees visible on the edge and another 5 visible in the interior, a total of 21 trees are visible in this arrangement.

Consider your map; how many trees are visible from outside the grid?

Your puzzle answer was 1812.

const func = () => {
  const inputValue = document.getElementById("value").value;
  const rowsOfTrees = inputValue
    .trim()
    .split("\n")
    .map((e) => e.trim().split(""));
  let EdgeTrees = rowsOfTrees[0].length * 2 + (rowsOfTrees.length - 2) * 2;
  const scenicPoints = (arr, num) => {
    let blocked = false, points = 0

    for(let i = 0; i < arr.length; i++){
      if(arr[i] < num) {
        points++
      }else{
        return points
      }
    }
    
  }


  const checkLine = (positionX, positionY, number) => {
    let up = [],
      down = [],
      left = [],
      right = [];
    let row = [],
      column = [];
    const isBelowThreshold = (currentValue) => currentValue < number;

    for (let i = 0; i < rowsOfTrees.length; i++) {
      if (i !== positionY) {
        row.push(rowsOfTrees[positionX][i]);
      }
    }
    for (let i = 0; i < rowsOfTrees.length; i++) {
      if (i !== positionX) {
        column.push(rowsOfTrees[i][positionY]);
      }
    }
    up = column.slice(0, positionX);
    down = column.slice(positionX, column.length);
    left = row.slice(0, positionY);
    right = row.slice(positionY, row.length);

    if (
      up.every(isBelowThreshold) === true ||
      down.every(isBelowThreshold) === true ||
      left.every(isBelowThreshold) === true ||
      right.every(isBelowThreshold) === true
    ) {
      return true;
    }
    return false;
  };

  for (let i = 1; i < rowsOfTrees.length - 1; i++) {
    for (let k = 1; k < rowsOfTrees[0].length - 1; k++) {
      const evaluate = checkLine(i, k, rowsOfTrees[i][k]);
      if (evaluate) {
        ++EdgeTrees;
      }
    }
  }

  return EdgeTrees;
};

console.log(func());

*/
