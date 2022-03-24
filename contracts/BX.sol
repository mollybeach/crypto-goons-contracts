// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";


/*
    Breed a BX with two chinchilla with Fox
    - Burn a Fox to breed a VS
    it'll be an erc 721 mint contract
    You’ll need IERC1155 for this
    It’s an open zeppelin contract
    They will burn the fox
    So u need to transfer it to 0 address when u mint
    And they need to transfer the mutantcat to the contract when minting
    Create a method that can withdraw the BX
*/

contract BX is ERC721Enumerable, Ownable , IERC721Receiver {
    using Strings for uint256;
    event MintBXEvent(address indexed sender, uint256 startWith);
    event TransferCuredCatEvent(address indexed from, address indexed to, uint256 indexed tokenId);
    event BurnFoxEvent(address indexed owner, uint256 indexed tokenId);

    //uint256 supply counters 
    uint256 public BXTotal;

    //uint256
    uint256 public maxMintsPerWallet= 1;
    uint256 public FOX_COST = 1;
    uint256 public supplyBX = 999;
    uint256 public BXSupply = 999;
    uint256 public CURED_MEOWZ_TOKEN_ID = 1; 
    uint256 public FOX_TOKEN_ID = 1;
    uint256[] chinchillaLastBred = new uint256[](999);

    //uint 32
    uint32 public breedingCooldown = uint32(8 hours);

    //addressses
    IERC721 public BXAddress;
    IERC721 public chinchillaAddress;
    IERC1155 public foxAddress;
    address public zeroAddress;
    address public contractAddress;

    //mappings
    mapping (uint256 => string) private _tokenURIs;
    
    //strings
    string public baseURI;
    
    //bool
    bool private started;

    //constructor args 
    constructor(
        string memory _name,
        string memory _symbol,
        string memory baseURI_
    ) ERC721(_name, _symbol) {
        baseURI = baseURI_;
        contractAddress = address(this);
        BXAddress = IERC721(contractAddress);
    }

   //Basic Functions 
    function _baseURI() internal view virtual override returns (string memory){
        return baseURI;
    }
    function setBaseURI(string memory _newURI) public onlyOwner {
        baseURI = _newURI;
    }
    function setAddresses(address _chinchillaAddress, address _foxAddress) public onlyOwner {
        chinchillaAddress = IERC721(_chinchillaAddress);
        foxAddress = IERC1155(_foxAddress);
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
        return BXTotal;
    }
    function getLastBredChinchilla(uint256 tokenId) public view returns (uint256) {
        return chinchillaLastBred[tokenId];
    }

        //Allows Public to breed BX with two chinchilla tokens using Fox
    function breedBX(uint256[] calldata _tokenIds)  public {
        require(started, "not started");
        require(BXTotal + 2 <= BXSupply, "This mint would pass max BX supply");
        require(foxAddress.balanceOf(msg.sender, FOX_TOKEN_ID) > FOX_COST, "Insufficient value of FOX to breed a BX");
        require(chinchillaAddress.balanceOf(msg.sender) > 2, "Must be a holder 2 Cured Meowz Tokens to breed  a BX"); 
        require(chinchillaAddress.ownerOf(_tokenIds[0]) == _msgSender() && chinchillaAddress.ownerOf(_tokenIds[1]) == _msgSender(), "must be the owner of both cured meowz to breed");
         // both chinchilla must not have been recently bred
        require(block.timestamp - chinchillaLastBred[_tokenIds[0]] > breedingCooldown && block.timestamp - chinchillaLastBred[_tokenIds[1]] > breedingCooldown,"one or more chinchilla is on breeding cooldown");
        // burn fox
        foxAddress.safeTransferFrom(msg.sender, zeroAddress, FOX_TOKEN_ID,  1, ""); 
        emit BurnFoxEvent(_msgSender(), FOX_TOKEN_ID);
        // transfer cured meowz 
        chinchillaAddress.safeTransferFrom(msg.sender, contractAddress, CURED_MEOWZ_TOKEN_ID);
        emit TransferCuredCatEvent(msg.sender, contractAddress, CURED_MEOWZ_TOKEN_ID);  
         //mint BX
        _mint(_msgSender(), BXTotal++);
        emit MintBXEvent(_msgSender(), BXTotal);
         // Assign the current time to the chinchilla ids used for this breeding
        chinchillaLastBred[_tokenIds[0]] = block.timestamp;
        chinchillaLastBred[_tokenIds[1]] = block.timestamp;
    }

    // Withdraw Meowz
    function withdrawBX() external onlyOwner {
        supplyBX = BXAddress.balanceOf(contractAddress);
        BXAddress.transferFrom(contractAddress, msg.sender, supplyBX);
    } 


}


