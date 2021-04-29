pragma solidity ^0.8.4;

contract Lottery {
    address public manager;
    address[] public players;

    constructor () {
        manager = msg.sender;
    }

    function enterLottery() public payable {
        require(msg.value >= .001 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        // uint value = block.difficulty + block.timestamp + players.length;
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public payable managerOnly {
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

    modifier managerOnly() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}