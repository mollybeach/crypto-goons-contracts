// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

/*
    Transform a Mutant Cat into a Cured Cat using Serum:
    - Burn a Serum per transformation of a Cat
    It'll be an erc 721 mint contract
    You’ll need IERC1155 for Serum
    So u need to transfer it to 0 address when u mint
    And they need to transfer the mutantcat to the contract address when minting
    Create a method that can withdraw the meowz
*/

contract Chinchilla is ERC721Enumerable, Ownable , IERC721Receiver {
    using Strings for uint256;

    //uint256
    uint256 public curedCatTotal;
    uint256 public chinchillaupply = 999;
    uint256 public MUTANT_MEOWZ_TOKEN_ID;
    uint256 public CURED_MEOWZ_TOKEN_ID;
    uint256 public SERUM_TOKEN_ID = 1;
    uint256 public SERUM_COST = 1;

    //addressses
    IERC721 public chinchillaAddress;
    IERC721 public mutantMeowzAddress;
    IERC1155 public serumAddress;
    address public zeroAddress;
    address public contractAddress;

    //mappings
    mapping(address => uint256) public addressMintedBalance;
    mapping (uint256 => string) private _tokenURIs;
    
    //strings
    string public baseURI;
    
    //bool
    bool private started;

    //constructor args 
    constructor(
        string memory name_, 
        string memory symbol_, 
        string memory baseURI_, 
        address _mutantMeowzAddress, 
        address _serumAddress
    ) ERC721(name_, symbol_) {
        baseURI = baseURI_;
        mutantMeowzAddress = IERC721(_mutantMeowzAddress);
        serumAddress = IERC1155(_serumAddress);
        contractAddress = address(this);
        chinchillaAddress = IERC721(contractAddress);
    }

   //Basic Functions 
    function _baseURI() internal view virtual override returns (string memory){
        return baseURI;
    }
    function setBaseURI(string memory _newURI) public onlyOwner {
        baseURI = _newURI;
    }
    //ERC271 
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "tokenId does not exist.");
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : ".json";
    }
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
            require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
            _tokenURIs[tokenId] = _tokenURI;
    }
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
    //setStart 
    function setStart() public onlyOwner  {
        started = true;
    }
    //Total Supply 
    function totalSupply() public view virtual override returns (uint256) {
        return curedCatTotal;
    }

    //Allows Public transform MutantMeowz tokens into Chinchilla tokens for the price of 1 Serum
    function transformCuredCat(uint256[] calldata _tokenIds)  public {
        uint256 QTY = _tokenIds.length;
        require(started, "not started");
        require(curedCatTotal + QTY <= chinchillaupply, "This mint would pass max Chinchilla supply");
        require(serumAddress.balanceOf(msg.sender, SERUM_TOKEN_ID) >= SERUM_COST * QTY , "Insufficient value of serum to transform a curedCat");
        require(mutantMeowzAddress.balanceOf(msg.sender) >= QTY, "Must be a holder mutantMeowz Token to transform into each Chinchilla");
       //Transform MutantMeowz into Chinchilla
        for (uint256 i = 0; i < QTY; i++) {
            //burn serum
            serumAddress.safeTransferFrom(msg.sender, zeroAddress, SERUM_TOKEN_ID,  1, ""); 
            //transfer mutantMeowz
            MUTANT_MEOWZ_TOKEN_ID = _tokenIds[i];
            mutantMeowzAddress.safeTransferFrom(msg.sender, zeroAddress, MUTANT_MEOWZ_TOKEN_ID);
            //mint chinchilla
            CURED_MEOWZ_TOKEN_ID = curedCatTotal + 1;
            _mint(_msgSender(), curedCatTotal++);
            addressMintedBalance[msg.sender] += 1;
        }
    }
}


