// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Script.sol";
import {NFTMinter} from "../src/NFTMinter.sol";

contract NFTMinterScript is Script {

    function run() external returns (NFTMinter) {
        vm.startBroadcast();

        NFTMinter _contract = new NFTMinter();

        vm.stopBroadcast();
        return _contract;
    }
}
