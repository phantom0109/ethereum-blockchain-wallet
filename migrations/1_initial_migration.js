const NiceToken = artifacts.require("NiceToken")

module.exports = async function (deployer) {
  await deployer.deploy(NiceToken);

  const niceToken = await NiceToken.deployed()
  // Mint 200 NiceToken for the first account
  const result = await niceToken.mint(
    '0x8D1be72BD7B79322D28C7185eB1346234c0a279b',
    '200000000000000000000'
  )
   console.info("Success")
};