var superBlinders = [ ["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000] ];

var lighthouseRock = {
  gateClosed: true,
  weaponBulbs: superBlinders,
  capacity: 30,
  secretPassageTo: "Underwater Outpost",
  numRangers: 0
};

function addRanger(location, name, skillz, station) {
  // increment the number of rangers property
  location.numRangers += 1;
  // add the ranger<number> property and assign a ranger object
  location["ranger" + location.numRangers] = {
    name:name,
    skillz:skillz,
    station:station
  };
}