// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EtherlinkNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("EtherlinkNFT", "ELNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mint(address to, string memory tokenURI) public onlyOwner {
        _safeMint(to, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);
        tokenCounter++;
    }

    function transferNFT(address to, uint256 tokenId) public {
        safeTransferFrom(msg.sender, to, tokenId);
    }
}
