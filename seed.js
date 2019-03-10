const db = require("./models");

var places_list = [
  {
    name: "Albany Bulb",
    type: ["park"],
    description:
      "The Albany Bulb (also simply known as The Bulb) is a former landfill largely owned by the City of Albany, in California. The Bulb is the west end of a landfill peninsula jutting west from the east shore of San Francisco Bay. The term 'Bulb' is often used to refer to the entire peninsula, which includes the Albany Plateau, north of Buchanan Street at its base; the high narrow 'Neck,' and the round 'Bulb.' The Bulb is part of the City of Albany, and can be reached via Buchanan Street or the Bay Trail along the east side of San Francisco Bay.",
    city: "Albany",
    photo:
      "http://1.bp.blogspot.com/-PM3kTTZnLQE/VdBp8o8PHvI/AAAAAAAAyv4/9WPyrkpmXA0/s1600/P1700521.jpg",
    url: "https://en.wikipedia.org/wiki/Albany_Bulb",
    coordinates: { lat: 37.5324, lng: -122.1929 },
    isFeatured: true,
    gem: "place"
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
    isFeatured: true,
    gem: "place"
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
    coordinates: { lat: 38.04644, lng: -122.18327 },
    isFeatured: true,
    gem: "place"
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
    isFeatured: true,
    gem: "place"
  },
  {
    type: ["restaurant"],
    name: "Stay Gold",
    description:
      "Stay Gold Deli is an Italian-American Deli counter, Central Texas BBQ spot, grocer, restaurant, coffee shop, market, arcade, and beer garden. We offer a variety of specialty items, ranging from smoked meats to house-made pickles to vegan items. There is a fully functional smoker grandfathered into the property, rumored to have been built by the same folks who built Everett & Jones’ smokers back in the day! Don’t forget to check out our events page for wine tasting, tap takeovers, pig roasts, parties and other fun stuff!",
    city: "Oakland",
    url: "http://www.staygolddeli.com",
    photo:
      "https://oaklandnorth.net/wp-content/uploads/2016/09/IMG_0397-600x400.jpg",
    gem: "place"
  },
  {
    name: "Brazil Cafe",
    type: ["Restaurant"],
    description:
      "If you mention Brazilian food when you're in the Bay Area, someone is sure to tell you all about Brazil Cafe. You can't miss our colorful Brazilian flags and our huge  menu. Our signs will draw you in, but it's our delicious, authentic Brazilian food that will keep you coming back again and again. Our customers become fast friends here at Brazil Cafe. Watch the world go by at one of our outdoor tables or have your food wrapped to go—either way, it'll knock you out.",
    city: "Berkeley",
    url: "https://www.pedrosbrazilcafe.com/",
    photo:
      "http://1.bp.blogspot.com/-mnDSsRYoOS8/Uho2nxw7Q6I/AAAAAAAAAYk/4V3JPbYO4K0/s640/P1080948.JPG",
    gem: "place"
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
    isAlive: true,
    gem: "people"
  },
  {
    name: "Wavy Gravy",
    description:
      'Hugh Nanton Romney (born May 15, 1936), better known as Wavy Gravy, is an American entertainer and activist for peace, best known for his hippie appearance, personality and countercultural beliefs. His moniker was given to him by B.B. King at the Texas International Pop Festival in 1969. "It\'s worked pretty well through my life," he says, "except with telephone operators – I have to say \'Gravy, first initial W.\'"',
    city: "Berkeley",
    photo: "http://www.seva.org/images/content/pagebuilder/wavy80-wavy2.jpg",
    url: "https://en.wikipedia.org/wiki/Wavy_Gravy",
    isAlive: true,
    gem: "people"
  },
  {
    name: "Huey Newton",
    description:
      "Huey Percy Newton was a revolutionary African-American political activist who, along with Bobby Seale, co-founded the Black Panther Party in 1965. He continued to pursue graduate studies, eventually earning a Ph.D. in social philosophy. In 1989 he was murdered in Oakland, California by Tyrone Robinson, a member of the Black Guerrilla Family, in a dispute over drug dealing.",
    city: "Oakland",
    photo:
      "http://cdn.vashtie.com/blog/wp-content/uploads/2016/02/1989huey.jpg",
    url: "https://en.wikipedia.org/wiki/Huey_P._Newton",
    isAlive: false,
    gem: "people"
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
