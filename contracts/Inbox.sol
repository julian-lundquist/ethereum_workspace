pragma solidity ^0.8.3;

contract Inbox {
    string public message;

    constructor (string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
