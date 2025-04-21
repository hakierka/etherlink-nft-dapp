// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EtherlinkNFTv2 is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    event Minted(address indexed to, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("EtherlinkNFTv2", "ELNFTv2") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mint(address to, string memory tokenURI) public {
        _safeMint(to, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);
        emit Minted(to, tokenCounter, tokenURI);
        tokenCounter++;
    }

    function transferNFT(address to, uint256 tokenId) public {
        safeTransferFrom(msg.sender, to, tokenId);
    }
}
