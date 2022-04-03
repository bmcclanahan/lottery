// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";


/**
 * @dev A simple mock ProxyRegistry for use in local tests with minimal security
 */
contract MockVRFCoordinator is VRFCoordinatorV2Interface {
  bool public requestRandomWordsCalled = false;
  /**
   * @notice Get configuration relevant for making requests
   * @return minimumRequestConfirmations global min for request confirmations
   * @return maxGasLimit global max for request gas limit
   * @return s_provingKeyHashes list of registered key hashes
   */
  function getRequestConfig()
    external override
    view
    returns (
      uint16,
      uint32,
      bytes32[] memory
    ){
      return (1, 2, new bytes32[](1));
    }

  /**
   * @notice Request a set of random words.
   * @param keyHash - Corresponds to a particular oracle job which uses
   * that key for generating the VRF proof. Different keyHash's have different gas price
   * ceilings, so you can select a specific one to bound your maximum per request cost.
   * @param subId  - The ID of the VRF subscription. Must be funded
   * with the minimum subscription balance required for the selected keyHash.
   * @param minimumRequestConfirmations - How many blocks you'd like the
   * oracle to wait before responding to the request. See SECURITY CONSIDERATIONS
   * for why you may want to request more. The acceptable range is
   * [minimumRequestBlockConfirmations, 200].
   * @param callbackGasLimit - How much gas you'd like to receive in your
   * fulfillRandomWords callback. Note that gasleft() inside fulfillRandomWords
   * may be slightly less than this amount because of gas used calling the function
   * (argument decoding etc.), so you may need to request slightly more than you expect
   * to have inside fulfillRandomWords. The acceptable range is
   * [0, maxGasLimit]
   * @param numWords - The number of uint256 random values you'd like to receive
   * in your fulfillRandomWords callback. Note these numbers are expanded in a
   * secure way by the VRFCoordinator from a single random value supplied by the oracle.
   * @return requestId - A unique identifier of the request. Can be used to match
   * a request to a response in fulfillRandomWords.
   */
  function requestRandomWords(
    bytes32 keyHash,
    uint64 subId,
    uint16 minimumRequestConfirmations,
    uint32 callbackGasLimit,
    uint32 numWords
  ) external override returns (uint256 requestId){
    requestRandomWordsCalled = true;
    return 1;
  }


  function createSubscription() external override returns (uint64 subId){
    return 1;
  }


  function getSubscription(uint64 subId)
    external override
    view
    returns (
      uint96 balance,
      uint64 reqCount,
      address owner,
      address[] memory consumers
    ){
      return (1, 1, address(0x01BE23585060835E02B77ef475b0Cc51aA1e0709), new address[](1));
    }


  function requestSubscriptionOwnerTransfer(uint64 subId, address newOwner) external override {}


  function acceptSubscriptionOwnerTransfer(uint64 subId) external override {}


  function addConsumer(uint64 subId, address consumer) external override {}


  function removeConsumer(uint64 subId, address consumer) external override {}

  function cancelSubscription(uint64 subId, address to) external override {}
}