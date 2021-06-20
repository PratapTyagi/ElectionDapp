// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract Election {
    
    struct Candidate {
        uint _id;
        string name;
        uint votesCount;
    }
    
    event electionUpdate (
        uint _id,
        string name,
        uint votesCount
    );
    
    uint public candidatesCount;
    
    mapping(uint => Candidate) public candidates;
    
    mapping(address => bool) public hasVoted;
    
    constructor() {
        addCandidates("Narendra Modi");
        addCandidates("Rahul Gandhi");
        addCandidates("Arvind Kejriwal");
    }
    
    function addCandidates(string memory name) private{
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    }
    
    function Vote(uint _id) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(candidates[_id]._id != 0, "Id doesn't exists");
        
        candidates[_id].votesCount ++;
        hasVoted[msg.sender] = true;
        emit electionUpdate(_id, candidates[_id].name, candidates[_id].votesCount);  
    }
        
}