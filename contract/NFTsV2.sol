// SPDX-License-Identifier: MIT LICENSE

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

pragma solidity ^0.8.0;

contract PepeBornNFT is ERC721Enumerable, Ownable {

    struct TokenInfo {
        IERC20 paytoken;
        uint256 costvalue;
    }

    TokenInfo[] public AllowedCrypto;
    
    using Strings for uint256;
    string public baseURI;
    string public baseExtension = ".json";
    uint256 public cost = 0.01 ether;
    uint256 public maxSupply = 10000;
    uint256 public maxMintAmount = 5;
    uint256[5] public lastMinted;
    bool public paused = false;

//==For DevMint== 
    address[] private devWallets;
    mapping(uint256 => bool) private _tokenIdExists;

    modifier onlyDev() {
        bool exist = false;
        for (uint256 i; i < devWallets.length; ++i) {
            if (msg.sender == devWallets[i]) {
                exist = true;
            }
        }
        require(exist == true, "forbidden");
        _;
    }

    function setDevWallets(address[] memory _devWallets) external onlyOwner {
        require(_devWallets.length > 0, "empty array");
        devWallets = _devWallets;
    }

    function mintForDev(
        uint256[] calldata __tokenIds
    ) external payable onlyDev {
        uint256 supply = totalSupply();
        require(!paused, "paused-eror");
        require(__tokenIds.length <= maxMintAmount, "tokenid-length");
        require(__tokenIds.length > 0, "less<0");
        require(supply + __tokenIds.length <= maxSupply, "maxsuplly error");

        for (uint256 i; i < __tokenIds.length; ++i) {
            _safeMint(msg.sender, __tokenIds[i]);
            _tokenIdExists[__tokenIds[i]] = true;
        }
    }
    constructor() ERC721("PepeBornNFT", "PBN") {
        baseURI = "https://ipfs.io/ipfs/bafybeiepzg6e7oes2ifdgxmn6anepetmnqgiqh42tbjjnhv4ukx5ll73ga/";
    }

    function addCurrency(
        IERC20 _paytoken,
        uint256 _costvalue
    ) public onlyOwner {
        AllowedCrypto.push(
            TokenInfo({
                paytoken: _paytoken,
                costvalue: _costvalue
            })
        );
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function getRandomNumber(uint256 _salt) public view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.difficulty, _salt)
            )
        ) % (maxSupply - 1);
        return randomNumber;
    }
        

    function mint(address _to, uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
	uint256 newItemId;
        uint256 rpCnt;
        require(!paused);
        require(_mintAmount > 0);
        require(_mintAmount <= maxMintAmount);
        require(supply + _mintAmount <= maxSupply);
        
	if (msg.sender != owner()) {
            require(msg.value == cost * _mintAmount, "Not enough balance to complete transaction.");
            }
	        
            for (uint256 i = 1; i <= _mintAmount; i++) {
            rpCnt = 0;
            while (rpCnt < maxSupply) {
                newItemId = getRandomNumber(newItemId);
                if (!_tokenIdExists[newItemId]) {
                    break;
                }
                newItemId++;
                rpCnt++;
            }
            if (rpCnt < maxSupply) {
                _safeMint(_to, newItemId);
                _tokenIdExists[newItemId] = true;
		lastMinted[i-1] = newItemId;
            }
        }
        }


    function mintpid(address _to, uint256 _mintAmount, uint256 _pid) public payable {
        TokenInfo storage tokens = AllowedCrypto[_pid];
        IERC20 paytoken;
        paytoken = tokens.paytoken;
        uint256 costval;
        costval = tokens.costvalue;
        uint256 supply = totalSupply();
	    uint256 newItemId;
        uint256 rpCnt;
        require(!paused);
        require(_mintAmount > 0);
        require(_mintAmount <= maxMintAmount);
        require(supply + _mintAmount <= maxSupply);
            
            for (uint256 i = 1; i <= _mintAmount; i++) {
            require(paytoken.transferFrom(msg.sender, address(this), costval));
            rpCnt = 0;
            while (rpCnt < maxSupply) {
                newItemId = getRandomNumber(newItemId);
                if (!_tokenIdExists[newItemId]) {
                    break;
                }
                newItemId++;
                rpCnt++;
            }
            if (rpCnt < maxSupply) {
                _safeMint(_to, newItemId);
                _tokenIdExists[newItemId] = true;
		lastMinted[i-1] = newItemId;
            }
        }
        }

        function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
        {
            uint256 ownerTokenCount = balanceOf(_owner);
            uint256[] memory tokenIds = new uint256[](ownerTokenCount);
            for (uint256 i; i < ownerTokenCount; i++) {
                tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
            }
            return tokenIds;
        }
    
        
        function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory) {
            require(
                _exists(tokenId),
                "ERC721Metadata: URI query for nonexistent token"
                );
                
                string memory currentBaseURI = _baseURI();
                return
                bytes(currentBaseURI).length > 0 
                ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
                : "";
        }
        // only owner
        
        function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner() {
            maxMintAmount = _newmaxMintAmount;
        }
        
        function setBaseURI(string memory _newBaseURI) public onlyOwner() {
            baseURI = _newBaseURI;
        }
        
        function setBaseExtension(string memory _newBaseExtension) public onlyOwner() {
            baseExtension = _newBaseExtension;
        }
        
        function pause(bool _state) public onlyOwner() {
            paused = _state;
        }

        function getNFTCost(uint256 _pid) public view virtual returns(uint256) {
            TokenInfo storage tokens = AllowedCrypto[_pid];
            uint256 costval;
            costval = tokens.costvalue;
            return costval;
        }

        function getCryptotoken(uint256 _pid) public view virtual returns(IERC20) {
            TokenInfo storage tokens = AllowedCrypto[_pid];
            IERC20 paytoken;
            paytoken = tokens.paytoken;
            return paytoken;
        }
        
        function withdrawcustom(uint256 _pid) public payable onlyOwner() {
            TokenInfo storage tokens = AllowedCrypto[_pid];
            IERC20 paytoken;
            paytoken = tokens.paytoken;
            paytoken.transfer(msg.sender, paytoken.balanceOf(address(this)));
        }
        
        function withdraw() public payable onlyOwner() {
            require(payable(msg.sender).send(address(this).balance));
        }
}