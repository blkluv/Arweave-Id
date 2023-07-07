// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts@4.9.1/utils/Counters.sol";
import "@openzeppelin/contracts@4.9.1/access/Ownable.sol";
import "@openzeppelin/contracts@4.9.1/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts@4.9.1/token/ERC721/extensions/ERC721URIStorage.sol";


contract NFTMinter is ERC721URIStorage, ReentrancyGuard, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    // Official Arweave fee address
    address payable ArweaveFeeAddress;

    // Maps user addresses to their token IDs
    mapping (address => uint256) public addressToId;


    constructor() ERC721("Arweave DApp", "AR DApp") {}


    // Mint a new NFT and assign it to the caller
    function mintNFT(string memory tokenURI) public {

        uint256 newItemId = _tokenId.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        addressToId[msg.sender] = newItemId;
        _tokenId.increment();
    }

    // authenticate users through their profile nft
    function authenticate(address _owner) public view returns(bool) {

        uint256 token_id = addressToId[_owner];
        address token_owner = IERC721(this).ownerOf(token_id);

        return (token_owner == _owner);
    }

    // pay upload price for nft metadata
    function payUploadFee(uint256 _amount) external payable nonReentrant {

        require(msg.value >= _amount, "Insufficient message value");
        uint256 contractBalance = address(this).balance;

        if(contractBalance > 0) {
            ArweaveFeeAddress.transfer(contractBalance);
        }
    }


    function updateUploadAddress(address _newFeeAddress) external onlyOwner {

        ArweaveFeeAddress = payable(_newFeeAddress);
    }


    // Get the ID of the most recently minted token
    function getTokenID() public view returns (uint256) {
        
        uint256 tokenID = _tokenId.current() - 1;
        return tokenID;
    }
}
