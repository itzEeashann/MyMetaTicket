const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "mymetaticket"
  const SYMBOL = "MTT"

  // Deploy contract
  const mymetaticket = await ethers.getContractFactory("mymetaticket")
  const MYmetaticket = await MYmetaticket.deploy(NAME, SYMBOL)
  await MYmetaticket.deployed()

  console.log(`Deployed MYmetaticket Contract at: ${MYmetaticket.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "Sparkathon",
      cost: tokens(3),
      tickets: 0,
      date: "30/9/2023",
      time: "1pm",
      location: "Asia Pacific University"
    },
    {
      name: "Lauv Concert",
      cost: tokens(1),
      tickets: 125,
      date: "10/9/2023",
      time: "6.30PM",
      location: "Axiata Areana"
    },
    {
      name: "Coldplay Concert",
      cost: tokens(0.25),
      tickets: 200,
      date: "21/12/2023",
      time: "6.30pm",
      location: "Stadium Bukit Jalil"
    },
    {
      name: "ETH KL",
      cost: tokens(5),
      tickets: 0,
      date: "13/10/2023",
      time: "10am",
      location: "Sunway University"
    },
    {
      name: "Joji Concert",
      cost: tokens(1.5),
      tickets: 125,
      date: "21/11/2023",
      time: "7pm",
      location: "Stadium Merdeka"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await MYmetaticket.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});