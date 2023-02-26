// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract NFT_Manger is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;
    mapping (address => uint256) public AddressToID;
    

    constructor() ERC721("Arweave DI DApp", "DI DApp") {

    }

    function mint_nft(string memory tokenURI) public  {
        
        uint256 newItemId = _tokenId.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        AddressToID[msg.sender] = newItemId;

        _tokenId.increment();
    }

    
    function getTokenID() public view returns(uint256){

        uint256 tokenID = _tokenId.current() - 1;
        return tokenID;
    }
}