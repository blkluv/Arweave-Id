from brownie import NFT_Manager, accounts



def main():

    account = accounts.load('dev1')
    contract = NFT_Manager.deploy({"from": account}, publish_source=False)
    print(f"NFT Manager contract deplyed at address: {contract}")