// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


/*- Total supply: 5000
1 Genesis NFT in wallet = 1 free mint (996 Reserved Supply)
- dev mint function that allows us to mint for free (300 Reserved Supply)
- Public mint 0.02 ETH mint PRICE (3704 Supply)
- Would be good to let free mints and public at the same time (every mint after the allocated free mints per user would be 0.02eth, just like public
*/

contract Elephant is ERC721Enumerable, Ownable {
    using Strings for uint256;

    event MintEvent(address indexed sender, uint256 startWith, uint256 _qty);
    event DevMintEvent(address ownerAddress, uint256 startWith, uint256 amountMinted);
    event FreeMintEvent(address indexed sender, uint256 startWith, uint256 _qty);
    event PublicMintEvent(address indexed sender, uint256 startWith, uint256 _qty);

    //uint256 supply counters 
    uint256 public devTotal;
    uint256 public freeTotal;
    uint256 public publicTotal;
    uint256 public totalMinted;

    //uint256
    uint256 public maxMintsPerWallet= 1;
    uint256 public PRICE = 20000000000000000; //0.02 ETH
    uint256 public freeSupply = 996;
    uint256 public devSupply = 300;
    uint256 public publicSupply = 3704;


    //addressses
    IERC721 public elephantAddress;
    IERC721 public genesisAddress;
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
        string memory _name,
        string memory _symbol,
        string memory baseURI_
    ) ERC721(_name, _symbol) {
        baseURI = baseURI_;
        contractAddress = address(this);
    }

   //Basic Functions 
    function _baseURI() internal view virtual override returns (string memory){
        return baseURI;
    }
    function setBaseURI(string memory _newURI) public onlyOwner {
        baseURI = _newURI;
    }
    function setAddresses(address _genesisAddress) public onlyOwner {
        genesisAddress = IERC721(_genesisAddress);
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
    
    //setStart 
    function setStart() public onlyOwner  {
        started = true;
    }
    //Total Supply 
    function totalSupply() public view virtual override returns (uint256) {
        return totalMinted;
    }

    //Minting fuctions
    function mint(uint256 _qty) public {
        for(uint256 i = 0; i < _qty; i++){
            _mint(_msgSender(), 1 + totalMinted++);
            addressMintedBalance[msg.sender] += 1;
        }
        emit MintEvent(_msgSender(), totalMinted+1, _qty);
    }
    //Allows Team to mint 300 tokens for free
    function devMint() public onlyOwner {
        require(started, "not started");
        mint(devSupply);
        devTotal += devSupply;
        emit DevMintEvent(_msgSender(), devTotal, devSupply);
    }
    //Allows Public to mint 996 Elephant tokens for free if they are holders of Genesis Token 
    function mintFree(uint256 _qty) public  {
        require(started, "not started");
        require(_qty > 0 , "need to mint at least 1 NFT");
        require(freeTotal + _qty <= freeSupply, "This mint would pass max freesupply");
        require(genesisAddress.balanceOf(msg.sender) > 1,  "Must be a holder of Genesis Token to receive a free mint of Elephant");
        require(IERC721(contractAddress).balanceOf(msg.sender) < maxMintsPerWallet, "Max mint amount allowed exceeded for this wallet for free mints");
        _mint(msg.sender, freeTotal + _qty);
        mint(_qty);
        freeTotal += _qty;
        emit FreeMintEvent(_msgSender(), freeTotal, _qty);
    }
   //Allows Public to mint 3704 tokens of Elephant for 0.2Eth
    function mintPublic(uint256 _qty) public payable {
        require(started, "not started");
        require(_qty > 0 , "need to mint at least 1 NFT");
        require(msg.value == _qty * PRICE, "insufficient funds");
        require(publicTotal + _qty <= publicSupply, "max available public mints reached!");
        payable(owner()).transfer(msg.value);
        mint(_qty);
        publicTotal += _qty;
        emit PublicMintEvent(_msgSender(), publicTotal, _qty);
    }

}
