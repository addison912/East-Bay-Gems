const db = require("./models");

var places_list = [
  {
    name: "Albany Bulb",
    type: ["park"],
    description:
      "The Albany Bulb (also simply known as The Bulb) is a former landfill largely owned by the City of Albany, in California. The Bulb is the west end of a landfill peninsula jutting west from the east shore of San Francisco Bay. The term 'Bulb' is often used to refer to the entire peninsula, which includes the Albany Plateau, north of Buchanan Street at its base; the high narrow 'Neck,' and the round 'Bulb.' The Bulb is part of the City of Albany, and can be reached via Buchanan Street or the Bay Trail along the east side of San Francisco Bay.",
    city: "Albany",
    photo: "https://i.imgur.com/vkPLCG7.jpg",
    url: "https://en.wikipedia.org/wiki/Albany_Bulb",
    coordinates: { lat: 37.5324, lng: -122.1929 }
  },
  {
    name: "The Alley",
    type: ["bar", "restaurant"],
    description:
      "The Alley, one of the last remainders left from a rich history of Oakland piano bars, was founded in 1933. The Alley is a piano bar and restaurant located on Grand Avenue in Oakland, CA near the Grand Lake Theatre by the Lake Merritt estuary.",
    city: "Oakland",
    photo:
      "https://assets.simpleviewcms.com/simpleview/image/fetch/c_limit,q_80,w_1200/https://res.cloudinary.com/simpleview/image/upload/crm/oakland/Screen-Shot-2018-05-30-at-11.02.22-AM-f6196db25056a36_f61c024c-5056-a36f-23e7a8124717b481.png",
    url: "https://www.thealleyoakland.com/",
    coordinates: { lat: 37.813141, lng: -122.247166 },
    isFeatured: true
  },
  {
    name: "Warehouse Cafe",
    type: ["restaurant", "bar"],
    description:
      "The Warehouse Cafe offers more than 250 specialty beers from around the world, and the beers on tap are served in a Mason jar.  Vodka-based drinks like a Black Jack Frosty and Crocodile Cooler are also popular.  Inebriated customers often sleep it off at the nearby Burlington Hotel.",
    city: "Port Costa",
    photo:
      "http://storage.googleapis.com/zagat-article-ss/Port_Costa_Warehouse-Virginia_Miller.jpg?h=646&w=646&auto=format",
    url: "http://www.warehousecafeportcosta.com/",
    coordinates: { lat: 38.04644, lng: -122.18327 }
  },
  {
    name: "Claremont Canyon Regional Preserve",
    type: ["park", "hike"],
    city: "Berkeley",
    description:
      "Claremont Canyon Regional Preserve is a small regional park mainly located in the city of Oakland, California, and administered by the East Bay Regional Park District. The park is named for the canyon in which it's situated, Claremont Canyon, out of which Claremont Creek flows on its way to its confluence with Temescal Creek. Originally, the canyon was named 'Harwood's Canyon', then 'Telegraph Canyon'. The name was changed to Claremont by a developer of the nearby Claremont district.",
    photo: "https://i.imgur.com/Zc0GPoY.jpg",
    url: "https://en.wikipedia.org/wiki/Claremont_Canyon_Regional_Preserve",
    coordinates: { lat: 37.8659, lng: -122.2365 },
    isFeatured: true
  }
];

var people_list = [
  {
    name: "Pink Man",
    description:
      "Pink Man (real name Michael Maxfield) is a local celebrity from the San Francisco Bay Area. He can be seen riding his unicycle around the cities of Berkeley, Oakland and San Francisco. He gets his name from the shocking pink unitard and cape he wears while he performs impromptu unicycle tricks in public places—spinning, engaging in sudden stops, riding down the street at high speeds, and carrying people on his back",
    city: "Berkeley",
    photo: "https://upload.wikimedia.org/wikipedia/commons/7/70/Pinkman.jpg",
    url: "https://en.wikipedia.org/wiki/Pink_Man",
    isAlive: true
  },
  {
    name: "Green Man",
    description:
      "Pink Man (real name Michael Maxfield) is a local celebrity from the San Francisco Bay Area. He can be seen riding his unicycle around the cities of Berkeley, Oakland and San Francisco. He gets his name from the shocking pink unitard and cape he wears while he performs impromptu unicycle tricks in public places—spinning, engaging in sudden stops, riding down the street at high speeds, and carrying people on his back",
    city: "Berkeley",
    photo: "https://media.giphy.com/media/eUoGmTHkmGv72/giphy.gif",
    url: "https://en.wikipedia.org/wiki/Pink_Man",
    isAlive: true
  },
  {
    name: "Orange Man",
    description:
      "Pink Man (real name Michael Maxfield) is a local celebrity from the San Francisco Bay Area. He can be seen riding his unicycle around the cities of Berkeley, Oakland and San Francisco. He gets his name from the shocking pink unitard and cape he wears while he performs impromptu unicycle tricks in public places—spinning, engaging in sudden stops, riding down the street at high speeds, and carrying people on his back",
    city: "Berkeley",
    photo:
      "https://cdn-images-1.medium.com/max/1600/1*mI7YNvyBsT6ZtTks3TaaKg.jpeg",
    url: "https://en.wikipedia.org/wiki/Pink_Man",
    isAlive: true
  },
  {
    name: "Red Man",
    description:
      "Pink Man (real name Michael Maxfield) is a local celebrity from the San Francisco Bay Area. He can be seen riding his unicycle around the cities of Berkeley, Oakland and San Francisco. He gets his name from the shocking pink unitard and cape he wears while he performs impromptu unicycle tricks in public places—spinning, engaging in sudden stops, riding down the street at high speeds, and carrying people on his back",
    city: "Berkeley",
    photo:
      "https://pbs.twimg.com/profile_images/1035390955011026946/-VTnbCes_400x400.jpg",
    url: "https://en.wikipedia.org/wiki/Pink_Man",
    isAlive: true
  },
  {
    name: "Blue Man",
    description:
      "Pink Man (real name Michael Maxfield) is a local celebrity from the San Francisco Bay Area. He can be seen riding his unicycle around the cities of Berkeley, Oakland and San Francisco. He gets his name from the shocking pink unitard and cape he wears while he performs impromptu unicycle tricks in public places—spinning, engaging in sudden stops, riding down the street at high speeds, and carrying people on his back",
    city: "Berkeley",
    photo:
      "https://cdn2.atlantamagazine.com/wp-content/uploads/sites/4/2015/04/0415_bluemangroup_oneuseonly.jpg",
    url: "https://en.wikipedia.org/wiki/Pink_Man",
    isAlive: true
  }
];

var user_list = [
  {
    username: "addison",
    uid: "123",
    imageUrl: "https://i.imgur.com/7f07mYf.png",
    fullName: "Addison moore",
    email: "addisondrewmoore@gmail.com",
    posts: [],
    likes: []
  }
];

simpleCreate(db.People, people_list, "people");
simpleCreate(db.Places, places_list, "places");
simpleCreate(db.Users, user_list, "users");

function simpleCreate(DB, object_list, name) {
  DB.deleteMany({}, (err, objects) => {
    DB.create(object_list, (err, objects) => {
      if (err) {
        return console.log("err", err);
      }
      console.log("deleted all", name);
      console.log("created", objects.length, name);
    });
  });
}
