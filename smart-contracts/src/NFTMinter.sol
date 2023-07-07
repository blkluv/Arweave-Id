// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTManager is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;
    // Maps user addresses to their token IDs
    mapping (address => uint256) public addressToId;


    constructor() ERC721("Arweave DI DApp", "DI DApp") {}


    // Mint a new NFT and assign it to the caller
    function mintNFT(string memory tokenURI, uint256 ArweaveFee) public payable {

        require(msg.value >= ArweaveFee, "The message value is under than Arweave Fee amount");
        uint256 newItemId = _tokenId.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        addressToId[msg.sender] = newItemId;
        _tokenId.increment();
    }

    function authenticate(address _owner) public view returns(bool) {

        uint256 token_id = addressToId[_owner];
        address token_owner = IERC721(this).ownerOf(token_id);

        if (token_owner == _owner) {
            return true;
        }

        else{
            return false;
        }
    }


    // Get the ID of the most recently minted token
    function getTokenID() public view returns (uint256) {
        
        uint256 tokenID = _tokenId.current() - 1;
        return tokenID;
    }
}
