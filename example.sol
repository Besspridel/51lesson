//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Example {

    uint256 public x;
    string public str;
    uint256[] data;

    function setX(uint256 _x)public returns(uint256){
        x = _x;
        return x;
    }

    function setStr(string memory _str)public{
        str = _str;
    }

    function init(uint256 count)public returns(uint256[] memory){
        for(uint256 i = 0; i < count; i++){
            data.push(i * i);
        }
        return data;
    }

    function getX() public view returns (uint256) {
        return x;
    }

    function getStr() public view returns (string memory){
        return str;
    }

    function getData() public view returns (uint256[] memory){
        return data;
    }
}