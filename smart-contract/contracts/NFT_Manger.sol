// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTManager is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;
    // Maps user addresses to their token IDs
    mapping (address => uint256) public AddressToID;


    constructor() ERC721("Arweave DI DApp", "DI DApp") {}


    // Mint a new NFT and assign it to the caller
    function mintNFT(string memory tokenURI) public {

        uint256 newItemId = _tokenId.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        AddressToID[msg.sender] = newItemId;
        _tokenId.increment();
    }


    // Get the ID of the most recently minted token
    function getTokenID() public view returns (uint256) {
        
        uint256 tokenID = _tokenId.current() - 1;
        return tokenID;
    }
}
