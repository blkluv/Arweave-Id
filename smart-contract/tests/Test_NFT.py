import pytest
from brownie import NFT_Manger, accounts



@pytest.fixture
def nft_manager():
    return NFT_Manger.deploy({'from': accounts[0]})



def test_mint_nft(nft_manager):

    initial_supply = nft_manager.totalSupply()
    nft_manager.mint_nft('Metadata')
    assert nft_manager.totalSupply() == initial_supply + 1
    

    
def test_token_uri(nft_manager):

    nft_manager.mint_nft('Metadata')
    token_id = nft_manager.getTokenID()
    token_uri = nft_manager.tokenURI(token_id)
    assert token_uri == 'Metadata'

    
    
def test_address_to_id(nft_manager):

    nft_manager.mint_nft('Metadata')
    token_id = nft_manager.getTokenID()
    assert nft_manager.AddressToID(accounts[0]) == token_id
