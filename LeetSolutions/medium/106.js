// 106. Construct Binary Tree from Inorder and Postorder Traversal
// Given inorder and postorder traversal of a tree, construct the binary tree.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    let map = new Map();
    for (let i = 0; i < inorder.length; i++) map.set(inorder[i], i);
    let pInd = postorder.length - 1;
    
    // Chect if subtree still has nodes!
    // Right subtree always populated first
    let genTree = (lo, hi) => {
        if (lo > hi) return null;

        let val = postorder[pInd];
        pInd--;
        let node = new TreeNode(val);
        node.right = genTree(map.get(val) + 1, hi);
        node.left = genTree(lo, map.get(val) - 1);
        return node;
    }
    return genTree(0, postorder.length - 1);
};