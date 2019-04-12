var steem = require('dsteem');
var steemState = require('steem-state');
var steemTransact = require('steem-transact');
var fs = require('fs');
const cors = require('cors');
const express = require('express')
const ENV = process.env;
const IPFS = require('ipfs-api');
const ipfs = new IPFS({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
});
const app = express()
const port = ENV.PORT || 3000;

app.use(cors())
app.get('/p/:addr', (req, res, next) => {
    let addr = req.params.addr
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(state.land[addr], null, 3))
});
app.get('/a/:user', (req, res, next) => {
    let user = req.params.user, arr = []
    res.setHeader('Content-Type', 'application/json');
    if(state.users[user]){
        for (var i = 0 ; i < state.users[user].addrs.length ; i++){
            arr.push(state.users[user].addrs[i])
        }
    }
    for ( var i = 0 ; i < arr.length ; i++){
        insert = ''
        var insert = state.land[arr[i]]
        if(insert){
            insert.id = arr[i]
            if(insert.care.length>3){insert.care.splice(3,insert.care.length-3)}
            if(insert.aff.length>3){insert.aff.splice(3,insert.aff.length-3)}
            arr.splice(i,1,insert)
        }
    }
    res.send(JSON.stringify(arr, null, 3))
});

app.get('/stats', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(state.stats, null, 3))
});

app.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(state, null, 3))
});

app.get('/refunds', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        refunds: state.refund,
        bal: state.bal
    }, null, 3))
});

app.get('/u/:user', (req, res, next) => {
    let user = req.params.user
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(state.users[user], null, 3))
});

app.listen(port, () => console.log(`HASHKINGS token API listening on port ${port}!`))
var state = {
   "delegations": [
      {
         "delegator": "jonyoudyer",
         "vests": 39980749568,
         "availible": 0,
         "used": 1
      },
      {
         "delegator": "pugqueen",
         "vests": 39976125874,
         "availible": 0,
         "used": 1
      },
      {
         "delegator": "mondoshawan",
         "vests": 39975980553,
         "availible": 0,
         "used": 1
      },
      {
         "delegator": "stephanus",
         "vests": 39974588563,
         "availible": 0,
         "used": 1
      },
      {
         "delegator": "inthenow",
         "vests": 39974577206,
         "availible": 0,
         "used": 1
      }
   ],
   "kudos": {
      "bluntsmasha": 2,
      "jonyoudyer": 1,
      "prettynicevideo": 1,
      "qwoyn": 1,
      "ghosthunter1": 1,
      "gregorypatrick": 1,
      "californiacrypto": 1,
      "mondoshawan": 1
   },
   "stats": {
      "vs": 1997,
      "dust": 25,
      "time": 31159798,
      "offsets": {
         "a": 9600,
         "b": 21600,
         "c": 0,
         "d": 19200,
         "e": 20400,
         "f": 7200
      },
      "bu": "QmeeSxBx5EEoosNKeUi4JTnUMukxrZSyge8jTVeV7MFmsK",
      "bi": 31958000,
      "prices": {
         "listed": {
            "a": 20000,
            "b": 20000,
            "c": 20000,
            "d": 20000,
            "e": 20000,
            "f": 20000,
            "t": 20000,
            "seeds": {
               "reg": 750,
               "mid": 1500,
               "top": 3000
            },
            "supplies": {}
         },
         "purchase": {
            "land": 19500
         }
      },
      "supply": {
         "land": {
            "a": 4151,
            "ac": 50,
            "b": 4161,
            "bc": 40,
            "c": 4164,
            "cc": 37,
            "d": 4169,
            "dc": 32,
            "e": 4186,
            "ec": 15,
            "f": 4194,
            "fc": 7,
            "g": 0,
            "gc": 0,
            "t": 420000,
            "tc": 1,
            "counter": 0
         },
         "strains": [
            "hk",
            "afg",
            "lkg",
            "mis",
            "lb",
            "kbr",
            "aca",
            "swz",
            "kmj",
            "dp",
            "mal",
            "pam",
            "cg",
            "ach",
            "tha",
            "cht"
         ]
      }
   },
   "bal": {
      "r": 21,
      "c": 0,
      "b": 0,
      "p": 141903
   },
   "refund": [
   ],
   "lands": {
      "forSale": []
   },
   "land": {
      "a10": {
         "owner": "qwoyn",
         "strain": "kbr",
         "xp": 2250,
         "care": [
            [
               31958716,
               "watered"
            ],
            [
               31941511,
               "watered",
               "c"
            ],
            [
               31929468,
               "watered"
            ],
            [
               31874759,
               "watered",
               "c"
            ],
            [
               31846989,
               "watered",
               "c"
            ],
            [
               31816312,
               "watered",
               "c"
            ],
            [
               31815632,
               "watered",
               "c"
            ],
            [
               31789626,
               "watered",
               "c"
            ],
            [
               31763213,
               "watered",
               "c"
            ],
            [
               31713786,
               "watered",
               "c"
            ]
         ],
         "aff": [],
         "planted": 31713776,
         "stage": 1,
         "substage": 8
      },
      "a2": {
         "owner": "jonyoudyer",
         "strain": "mis",
         "xp": 2250,
         "care": [
            [
               31930218,
               "watered",
               "c"
            ],
            [
               31901661,
               "watered",
               "c"
            ],
            [
               31872829,
               "watered",
               "c"
            ]
         ],
         "aff": [],
         "planted": 31853281,
         "stage": 1,
         "substage": 3
      },
      "b34": {
         "owner": "fracasgrimm",
         "strain": "kbr",
         "xp": 2250,
         "care": [
            [
               31936407,
               "watered"
            ],
            [
               31901978,
               "watered",
               "c"
            ],
            [
               31885962,
               "watered",
               "c"
            ]
         ],
         "aff": [],
         "planted": 31885890,
         "stage": 1,
         "substage": 2
      },
      "e13": {
         "owner": "pugqueen",
         "strain": "cg",
         "xp": 2250,
         "care": [
            [
               31958737,
               "watered"
            ],
            [
               31906070,
               "watered",
               "c"
            ],
            [
               31886232,
               "watered",
               "c"
            ]
         ],
         "aff": [],
         "planted": 31886216,
         "stage": 1,
         "substage": 2
      },
      "e14": {
         "owner": "mondoshawan",
         "strain": "hk",
         "xp": 2250,
         "care": [
            [
               31953848,
               "watered",
               "c"
            ],
            [
               31925485,
               "watered",
               "c"
            ],
            [
               31900342,
               "watered"
            ],
            [
               31887742,
               "watered",
               "c"
            ],
            [
               31887741,
               "watered"
            ]
         ],
         "aff": [],
         "planted": 31887728,
         "stage": 1,
         "substage": 3
      },
      "a43": {
         "owner": "gregorypatrick",
         "strain": "afg",
         "xp": 2250,
         "care": [
            [
               31957272,
               "watered"
            ],
            [
               31929103,
               "watered",
               "c"
            ],
            [
               31900194,
               "watered",
               "c"
            ]
         ],
         "aff": [],
         "planted": 31900185,
         "stage": 1,
         "substage": 2
      },
      "a7": {
         "owner": "prettynicevideo",
         "strain": "afg",
         "xp": 2250,
         "care": [
            [
               31936791,
               "watered",
               "c"
            ],
            [
               31903067,
               "watered",
               "c"
            ]
         ],
         "aff": [],
         "planted": 31903005,
         "stage": 1,
         "substage": 2
      },
      "b39": {
         "owner": "stephanus",
         "strain": "swz",
         "xp": 2250,
         "care": [
            [
               31953686,
               "watered"
            ],
            [
               31905303,
               "watered",
               "c"
            ]
         ],
         "aff": [],
         "planted": 31905253,
         "stage": 1,
         "substage": 1
      },
      "a49": {
         "owner": "inthenow",
         "strain": "hk",
         "xp": 2250,
         "care": [
            [
               31905966,
               "watered",
               "c"
            ],
            [
               31905633,
               "watered"
            ]
         ],
         "aff": [],
         "planted": 31905556,
         "stage": 1,
         "substage": 1
      },
      "a9": {
         "owner": "ghosthunter1",
         "strain": "dp",
         "xp": 2250,
         "care": [
            [
               31934193,
               "watered",
               "c"
            ],
            [
               31906043,
               "watered",
               "c"
            ]
         ],
         "aff": [],
         "planted": 31905642,
         "stage": 1,
         "substage": 2
      },
      "a11": {
         "owner": "bluntsmasha",
         "strain": "hk",
         "xp": 2250,
         "care": [
            [
               31956037,
               "watered"
            ],
            [
               31936220,
               "watered",
               "c"
            ]
         ],
         "aff": [],
         "planted": 31911522,
         "stage": 1,
         "substage": 1
      },
      "b2": {
         "owner": "bluntsmasha",
         "strain": "lb",
         "xp": 2250,
         "care": [
            [
               31956044,
               "watered"
            ],
            [
               31936226,
               "watered"
            ]
         ],
         "aff": [],
         "planted": 31911985,
         "stage": 1,
         "substage": 0
      },
      "c1": {
         "owner": "bluntsmasha",
         "strain": "afg",
         "xp": 2250,
         "care": [
            [
               31956052,
               "watered"
            ],
            [
               31936232,
               "watered",
               "c"
            ]
         ],
         "aff": [],
         "planted": 31911995,
         "stage": 1,
         "substage": 1
      },
      "f2": {
         "owner": "bluntsmasha",
         "strain": "aca",
         "xp": 2250,
         "care": [
            [
               31956059,
               "watered"
            ],
            [
               31936238,
               "watered",
               "c"
            ]
         ],
         "aff": [],
         "planted": 31912004,
         "stage": 1,
         "substage": 1
      },
      "b32": {
         "owner": "sooflauschig",
         "strain": "afg",
         "xp": 2250,
         "care": [
            [
               31958097,
               "watered"
            ],
            [
               31929983,
               "watered",
               "c"
            ],
            [
               31929981,
               "watered"
            ],
            [
               31929977,
               "watered"
            ],
            [
               31929976,
               "watered"
            ],
            [
               31929972,
               "watered"
            ],
            [
               31929963,
               "watered"
            ],
            [
               31929956,
               "watered"
            ],
            [
               31929955,
               "watered"
            ]
         ],
         "aff": [],
         "planted": 31929923,
         "stage": 1,
         "substage": 1
      },
      "a48": {
         "owner": "californiacrypto",
         "strain": "afg",
         "xp": 2250,
         "care": [
            [
               31932962,
               "watered",
               "c"
            ]
         ],
         "aff": [],
         "planted": 31932911,
         "stage": 1,
         "substage": 1
      }
   },
   "users": {
      "a1-shroom-spores": {
         "addrs": [
            "a1"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "shinedojo": {
         "addrs": [
            "e1"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "jonyoudyer": {
         "addrs": [
            "a2",
            "a3",
            "e11"
         ],
         "seeds": [
            {
               "strain": "swz",
               "xp": 2250
            },
            {
               "strain": "swz",
               "xp": 2250
            }
         ],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 1,
         "u": 0
      },
      "em3di": {
         "addrs": [
            "e2"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "timetraveljesus": {
         "addrs": [
            "a4",
            "e3"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 2
      },
      "onlyzul": {
         "addrs": [
            "a5",
            "d1",
            "d2",
            "e5"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 4
      },
      "besancia": {
         "addrs": [
            "a6"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "prettynicevideo": {
         "addrs": [
            "a7",
            "a8",
            "e6",
            "f1"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 5
      },
      "ghosthunter1": {
         "addrs": [
            "a9",
            "b1",
            "e7"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 2
      },
      "qwoyn": {
         "addrs": [
            "a10"
         ],
         "seeds": [
            {
               "strain": "dp",
               "xp": 2250
            },
            {
               "strain": "lb",
               "xp": 2250
            },
            {
               "strain": "hk",
               "xp": 2250
            }
         ],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "disregardfiat": {
         "addrs": [
            "e8"
         ],
         "seeds": [
            {
               "strain": "cht",
               "xp": 2250
            }
         ],
         "inv": [],
         "stats": [],
         "v": 0
      },
      "azuremoon": {
         "addrs": [
            "e12"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "bluntsmasha": {
         "addrs": [
            "a11",
            "b2",
            "c1",
            "f2"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0
      },
      "tryp": {
         "addrs": [
            "a12",
            "a13",
            "a14",
            "c3",
            "c4"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 5
      },
      "highroadseeds": {
         "addrs": [
            "c5",
            "c6"
         ],
         "seeds": [
            {
               "strain": "dp",
               "xp": 2250
            },
            {
               "strain": "aca",
               "xp": 2250
            }
         ],
         "inv": [],
         "stats": [],
         "v": 0
      },
      "mrkhuffins": {
         "addrs": [
            "a15",
            "b3",
            "c7",
            "d3"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 4
      },
      "allcapsonezero": {
         "addrs": [
            "b4"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "nelsius": {
         "addrs": [
            "a16"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "luegenbaron": {
         "addrs": [
            "b5"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "ngc": {
         "addrs": [
            "a17",
            "a18",
            "a19",
            "a20",
            "a21",
            "a22",
            "a23",
            "a24",
            "a25",
            "a26",
            "a27",
            "a28",
            "a29",
            "a30",
            "a31",
            "a32",
            "a33",
            "a34",
            "a35",
            "a36",
            "a37",
            "a38",
            "a39",
            "a40",
            "a41",
            "a42",
            "b6",
            "b7",
            "b8",
            "b9",
            "b10",
            "b11",
            "b12",
            "b13",
            "b14",
            "b15",
            "b16",
            "b17",
            "b18",
            "b19",
            "b20",
            "b21",
            "b22",
            "b23",
            "b24",
            "b25",
            "b26",
            "b27",
            "b28",
            "b29",
            "b30",
            "b31",
            "c8",
            "c9",
            "c10",
            "c11",
            "c12",
            "c13",
            "c14",
            "c15",
            "c16",
            "c17",
            "c18",
            "c19",
            "c20",
            "c21",
            "c22",
            "c23",
            "c24",
            "c25",
            "c26",
            "c27",
            "c28",
            "c29",
            "c30",
            "c31",
            "c32",
            "c33",
            "d4",
            "d5",
            "d6",
            "d7",
            "d8",
            "d9",
            "d10",
            "d11",
            "d12",
            "d13",
            "d14",
            "d15",
            "d16",
            "d17",
            "d18",
            "d19",
            "d20",
            "d21",
            "d22",
            "d23",
            "d24",
            "d25",
            "d26",
            "d27",
            "d28",
            "d29"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 120
      },
      "sooflauschig": {
         "addrs": [
            "b32"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0
      },
      "pangoli": {
         "addrs": [
            "b33"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "fracasgrimm": {
         "addrs": [
            "b34"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0
      },
      "gregorypatrick": {
         "addrs": [
            "a43"
         ],
         "seeds": [
            {
               "strain": "hk",
               "xp": 2250
            },
            {
               "strain": "dp",
               "xp": 2250
            }
         ],
         "inv": [],
         "stats": [],
         "v": 0
      },
      "markegiles": {
         "addrs": [
            "a44",
            "b35",
            "c34",
            "d30",
            "e10"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 4
      },
      "cowboyblazerfan": {
         "addrs": [
            "a45"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "movingman": {
         "addrs": [
            "a46"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "dantrevino": {
         "addrs": [
            "b36"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "eldun": {
         "addrs": [
            "b37",
            "f3"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 3
      },
      "napoleon2702": {
         "addrs": [
            "a47",
            "b38",
            "c35",
            "d31",
            "e9",
            "f4"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 6
      },
      "geekpowered": {
         "addrs": [
            "f5"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 1
      },
      "greenhouseradio": {
         "addrs": [],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 0,
         "u": 0
      },
      "eirik": {
         "addrs": [
            "c36"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 0,
         "u": 0
      },
      "onthewayout": {
         "addrs": [
            "f6"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 0,
         "u": 0
      },
      "californiacrypto": {
         "addrs": [
            "a48"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 0,
         "u": 0
      },
      "smartsteem": {
         "addrs": [],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 0,
         "u": 0
      },
      "booster": {
         "addrs": [],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 0,
         "u": 0
      },
      "steemvotesio": {
         "addrs": [],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 0,
         "u": 0
      },
      "steemlike": {
         "addrs": [],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 0,
         "u": 0
      },
      "blocktrades": {
         "addrs": [],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 2,
         "u": 0
      },
      "pugqueen": {
         "addrs": [
            "e13"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 1,
         "u": 0
      },
      "mondoshawan": {
         "addrs": [
            "e14"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 1,
         "u": 0
      },
      "stephanus": {
         "addrs": [
            "b39"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 1,
         "u": 0
      },
      "inthenow": {
         "addrs": [
            "a49"
         ],
         "seeds": [],
         "inv": [],
         "stats": [],
         "v": 0,
         "a": 1,
         "u": 0
      }
   },
   "news": {
      "a": [],
      "b": [],
      "c": [],
      "d": [],
      "f": [],
      "g": [],
      "h": [],
      "i": [],
      "t": []
   },
   "payday": [
      [
         {
            "account": "pugqueen",
            "weight": 10000
         }
      ],
      [
         {
            "account": "sooflauschig",
            "weight": 10000
         }
      ],
      [
         {
            "account": "fracasgrimm",
            "weight": 10000
         }
      ],
      [
         {
            "account": "stephanus",
            "weight": 10000
         }
      ]
   ]
}
var startingBlock = ENV.STARTINGBLOCK || 31958500 ; //GENESIS BLOCK
const username = ENV.ACCOUNT || 'hashkings'; //account with all the SP
const key = steem.PrivateKey.from(ENV.KEY); //active key for account
const sh = ENV.sh || ''
const prefix = ENV.PREFIX || 'qwoyn_';
const clientURL = ENV.APIURL || 'https://api.steemit.com'
var client = new steem.Client(clientURL);
var processor;

const transactor = steemTransact(client, steem, prefix);


startWith(sh)

function startWith(sh) {
    if (sh) {
        console.log(`Attempting to start from IPFS save state ${sh}`);
        ipfs.cat(sh, (err, file) => {
            if (!err) {
                var data = JSON.parse(file.toString());
                startingBlock = data[0]
                state = JSON.parse(data[1]);
                startApp();
            } else {
                startApp()
                console.log(`${sh} failed to load, Replaying from genesis.\nYou may want to set the env var engineCrank`)
            }
        });
    } else {
        startApp()
    }
}

function startApp() {
    processor = steemState(client, steem, startingBlock, 10, prefix);


    processor.onBlock(function(num, block) {
        const sun = (num - state.stats.time) % 28800
        var td = []
        for (var o in state.stats.offsets) {
            if (sun - state.stats.offsets[o] < 1200 && sun - state.stats.offsets[o] > 0) {
                td.push(`${o}${((sun-state.stats.offsets[o])*4)}`, `${o}${((sun-state.stats.offsets[o])*4)-1}`, `${o}${((sun-state.stats.offsets[o])*4)-2}`, `${o}${((sun-state.stats.offsets[o])*4)-3}`);
            }
        }
        for (var i = 0; i < td.length; i++) {
            daily(td[i])
        }
        if (num % 50 === 0 && state.refund.length && processor.isStreaming() || processor.isStreaming() && state.refund.length > 60) {
            if (state.refund[0].length == 4) bot[state.refund[0][0]].call(this, state.refund[0][1], state.refund[0][2], state.refund[0][3])
            if (state.refund[0].length == 3) bot[state.refund[0][0]].call(this, state.refund[0][1], state.refund[0][2])
            if (state.refund[0].length == 2) bot[state.refund[0][0]].call(this, state.refund[0][1])
            state.refund.push(state.refund.shift())
        }
        if (num % 100 === 0 && !processor.isStreaming()) {
            client.database.getDynamicGlobalProperties().then(function(result) {
                console.log('At block', num, 'with', result.head_block_number - num, 'left until real-time.')
            });
        }

        if (num % 1000 === 0 && processor.isStreaming()) {
            ipfsSaveState(num, JSON.stringify(state))
        }
        if (num % 28800 === 2880 && state.payday) {
            console.log("?"+num)
        var body = `It's a nice day in Jamaica`
            if (state.news.e.length > 0){body = state.news.e[0];state.news.e.shift();}
            state.refund.push(['sign',[["comment", 
                                 {"parent_author": "", 
                                  "parent_permlink": 'hashkings', 
                                  "author": username, 
                                  "permlink": 'h'+num, 
                                  "title": `Almanac | Jamaica | ${num}`, 
                                  "body": body,
                                  "json_metadata": JSON.stringify({tags:["hashkings"]})}], 
                                ["comment_options", 
                                 {"author": username, 
                                  "permlink": 'h'+num, 
                                  "max_accepted_payout": "1000000.000 SBD", 
                                  "percent_steem_dollars": 10000, 
                                  "allow_votes": true, 
                                  "allow_curation_rewards": true, 
                                  "extensions": 
                                  [[0, 
                                    {"beneficiaries":state.payday[0]}]]}]] ])
            state.payday.shift()
    }
        if (num % 28800 === 3180 && state.payday) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        
    if (num % 28800 === 3660 && state.payday) {
        console.log("?"+num)
        var body = `It's a nice day in Central America`
            if (state.news.d.length > 0){body = state.news.d[0];state.news.d.shift();}
            state.refund.push(['sign',[["comment", 
                                 {"parent_author": "", 
                                  "parent_permlink": 'hashkings', 
                                  "author": username, 
                                  "permlink": 'h'+num, 
                                  "title": `Almanac | Central America | ${num}`, 
                                  "body": body,
                                  "json_metadata": JSON.stringify({tags:["hashkings"]})}], 
                                ["comment_options", 
                                 {"author": username, 
                                  "permlink": 'h'+num, 
                                  "max_accepted_payout": "1000000.000 SBD", 
                                  "percent_steem_dollars": 10000, 
                                  "allow_votes": true, 
                                  "allow_curation_rewards": true, 
                                  "extensions": 
                                  [[0, 
                                    {"beneficiaries":state.payday[0]}]]}]] ])
            state.payday.shift()
    }
        if (num % 28800 === 3960 && state.payday) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        if (num % 28800 === 5440 && state.payday) {
            
            console.log("?"+num)
        var body = `It's a nice day in Mexico`
            if (state.news.f.length > 0){body = state.news.f[0];state.news.f.shift();}
            state.refund.push(['sign',[["comment", 
                                 {"parent_author": "", 
                                  "parent_permlink": 'hashkings', 
                                  "author": username, 
                                  "permlink": 'h'+num, 
                                  "title": `Almanac | Central America | ${num}`, 
                                  "body": body,
                                  "json_metadata": JSON.stringify({tags:["hashkings"]})}], 
                                ["comment_options", 
                                 {"author": username, 
                                  "permlink": 'h'+num, 
                                  "max_accepted_payout": "1000000.000 SBD", 
                                  "percent_steem_dollars": 10000, 
                                  "allow_votes": true, 
                                  "allow_curation_rewards": true, 
                                  "extensions": 
                                  [[0, 
                                    {"beneficiaries":state.payday[0]}]]}]] ])
            state.payday.shift()
    }
        if (num % 28800 === 5740 && state.payday) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        if (num % 28800 === 12000 && state.payday) {
            console.log("?"+num)
        var body = `It's a nice day in Asia`
            if (state.news.c.length > 0){body = state.news.c[0];state.news.c.shift();}
            state.refund.push(['sign',[["comment", 
                                 {"parent_author": "", 
                                  "parent_permlink": 'hashkings', 
                                  "author": username, 
                                  "permlink": 'h'+num, 
                                  "title": `Almanac | Asia | ${num}`, 
                                  "body": body,
                                  "json_metadata": JSON.stringify({tags:["hashkings"]})}], 
                                ["comment_options", 
                                 {"author": username, 
                                  "permlink": 'h'+num, 
                                  "max_accepted_payout": "1000000.000 SBD", 
                                  "percent_steem_dollars": 10000, 
                                  "allow_votes": true, 
                                  "allow_curation_rewards": true, 
                                  "extensions": 
                                  [[0, 
                                    {"beneficiaries":state.payday[0]}]]}]] ])
            state.payday.shift()
    }
        if (num % 28800 === 12300 && state.payday) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        
        if (num % 28800 === 15000 && state.payday) {
            console.log("?"+num)
        var body = `It's a nice day in Afganistan`
            if (state.news.a.length > 0){body = state.news.a[0];state.news.a.shift();}
            state.refund.push(['sign',[["comment", 
                                 {"parent_author": "", 
                                  "parent_permlink": 'hashkings', 
                                  "author": username, 
                                  "permlink": 'h'+num, 
                                  "title": `Almanac | Afganistan | ${num}`, 
                                  "body": body,
                                  "json_metadata": JSON.stringify({tags:["hashkings"]})}], 
                                ["comment_options", 
                                 {"author": username, 
                                  "permlink": 'h'+num, 
                                  "max_accepted_payout": "1000000.000 SBD", 
                                  "percent_steem_dollars": 10000, 
                                  "allow_votes": true, 
                                  "allow_curation_rewards": true, 
                                  "extensions": 
                                  [[0, 
                                    {"beneficiaries":state.payday[0]}]]}]] ])
            state.payday.shift()
    }
        if (num % 28800 === 15300 && state.payday) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        if (num % 28800 === 10000 && state.payday) {
            console.log("?"+num)
        var body = `Testing Hashkings Automated features 10`
            if (state.news.g.length > 0){body = state.news.g[0];state.news.g.shift();}
            state.refund.push(['sign',[["comment", 
                                 {"parent_author": "", 
                                  "parent_permlink": 'hashkings', 
                                  "author": username, 
                                  "permlink": 'h'+num, 
                                  "title": `Automated | ${num}`, 
                                  "body": body,
                                  "json_metadata": JSON.stringify({tags:["hashkings"]})}], 
                                ["comment_options", 
                                 {"author": username, 
                                  "permlink": 'h'+num, 
                                  "max_accepted_payout": "1000000.000 SBD", 
                                  "percent_steem_dollars": 10000, 
                                  "allow_votes": true, 
                                  "allow_curation_rewards": true, 
                                  "extensions": 
                                  [[0, 
                                    {"beneficiaries":state.payday[0]}]]}]] ])
            state.payday.shift()
    }
        if (num % 28800 === 10300 && state.payday) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        if (num % 28800 === 20000 && state.payday) {
            console.log("?"+num)
        var body = `Testing Hashkings Automated features 20`
            if (state.news.h.length > 0){body = state.news.h[0];state.news.h.shift();}
            state.refund.push(['sign',[["comment", 
                                 {"parent_author": "", 
                                  "parent_permlink": 'hashkings', 
                                  "author": username, 
                                  "permlink": 'h'+num, 
                                  "title": `Automated | ${num}`, 
                                  "body": body,
                                  "json_metadata": JSON.stringify({tags:["hashkings"]})}], 
                                ["comment_options", 
                                 {"author": username, 
                                  "permlink": 'h'+num, 
                                  "max_accepted_payout": "1000000.000 SBD", 
                                  "percent_steem_dollars": 10000, 
                                  "allow_votes": true, 
                                  "allow_curation_rewards": true, 
                                  "extensions": 
                                  [[0, 
                                    {"beneficiaries":state.payday[0]}]]}]] ])
            state.payday.shift()
    }
        if (num % 28800 === 20300 && state.payday) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        if (num % 28800 === 25000 && state.payday) {
            console.log("?"+num)
        var body = `Testing Hashkings Automated features 25`
            if (state.news.i.length > 0){body = state.news.i[0];state.news.i.shift();}
            state.refund.push(['sign',[["comment", 
                                 {"parent_author": "", 
                                  "parent_permlink": 'hashkings', 
                                  "author": username, 
                                  "permlink": 'h'+num, 
                                  "title": `Automated | ${num}`, 
                                  "body": body,
                                  "json_metadata": JSON.stringify({tags:["hashkings"]})}], 
                                ["comment_options", 
                                 {"author": username, 
                                  "permlink": 'h'+num, 
                                  "max_accepted_payout": "1000000.000 SBD", 
                                  "percent_steem_dollars": 10000, 
                                  "allow_votes": true, 
                                  "allow_curation_rewards": true, 
                                  "extensions": 
                                  [[0, 
                                    {"beneficiaries":state.payday[0]}]]}]] ])
            state.payday.shift()
    }
        if (num % 28800 === 25300 && state.payday) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        if (num % 28800 === 22000 && state.payday) {
            console.log("?"+num)
        var body = `It's a nice day in Afganistan 22`
            if (state.news.t.length > 0){body = state.news.t[0];state.news.t.shift();}
            state.refund.push(['sign',[["comment", 
                                 {"parent_author": "", 
                                  "parent_permlink": 'hashkings', 
                                  "author": username, 
                                  "permlink": 'h'+num, 
                                  "title": `Automated | ${num}`, 
                                  "body": body,
                                  "json_metadata": JSON.stringify({tags:["hashkings"]})}], 
                                ["comment_options", 
                                 {"author": username, 
                                  "permlink": 'h'+num, 
                                  "max_accepted_payout": "1000000.000 SBD", 
                                  "percent_steem_dollars": 10000, 
                                  "allow_votes": true, 
                                  "allow_curation_rewards": true, 
                                  "extensions": 
                                  [[0, 
                                    {"beneficiaries":state.payday[0]}]]}]] ])
            state.payday.shift()
    }
    if (num % 28800 === 22300 && state.payday) {
        console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        
        if (num % 28800 === 0) {
            var d = parseInt(state.bal.c / 4)
            state.bal.r += state.bal.c
            if (d) {
                state.refund.push(['xfer', 'disregardfiat', d, 'Dev Cut'])
                state.refund.push(['xfer', 'qwoyn-fund', d, 'Partners Cut'])
                state.refund.push(['xfer', 'qwoyn', d, 'Warchest'])
                state.bal.c -= d * 3
                d = parseInt(state.bal / 5)
                state.refund.push(['xfer', 'jrawsthorne', d, 'Partner Cut'])
                state.bal.c -= d
                state.refund.push(['xfer', 'qwoyn-chest', state.bal.c, 'Producer Cut'])
                state.bal.c = 0
                if (state.bal.d > state.bal.b) {
                    state.bal.d -= state.bal.b;
                    state.bal.b = 0
                } else if (state.bal.d <= state.bal.b) {
                    state.bal.b -= state.bal.d;
                    state.bal.d = 0
                }
                state.refund.push(['power', username, state.bal.b, 'Power to the people!'])
            }
            state.payday = whotopay()
            var body = `It's a nice day in Africa`
            if (state.news.b.length > 0){body = state.news.b[0];state.news.b.shift();}
            state.refund.push(['sign',[["comment", 
                                 {"parent_author": "", 
                                  "parent_permlink": 'hashkings', 
                                  "author": username, 
                                  "permlink": 'h'+num, 
                                  "title": `Almanac | Africa | ${num}`, 
                                  "body": body,
                                  "json_metadata": JSON.stringify({tags:['hashkings']})}], 
                                ["comment_options", 
                                 {"author": username, 
                                  "permlink": 'h'+num, 
                                  "max_accepted_payout": "1000000.000 SBD", 
                                  "percent_steem_dollars": 10000, 
                                  "allow_votes": true, 
                                  "allow_curation_rewards": true, 
                                  "extensions": 
                                  [[0, 
                                    {"beneficiaries":state.payday[0]}]]}]] ])
            state.payday.shift()
            console.log({state})
        }
    if (num % 28800 === 300) {
        console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
    });
    
    processor.on('water', function(json, from) {
        let plants = json.plants,
            plantnames = ''
        for (var i = 0; i < plants.length; i++) {
            try {
            if (state.land[plants[i]].owner == from) {
                state.land[plants[i]].care.unshift([processor.getCurrentBlockNumber(), 'watered']);
                plantnames += `${plants[i]} `
            }
            } catch (e){console.log(`${from} can't water what is not theirs`)}
        }
        console.log(`${from} watered ${plantnames}`)
    });

    processor.on('return', function(json, from) {
        let lands = json.lands,
            landnames = ''
        for (var i = 0; i < lands.length; i++) {
            if (state.land[lands[i]].owner == from) {
                delete state.land[lands[i]];
                state.lands.forSale.push(lands[i]);
                state.refund.push(['xfer', from, state.stats.prices.purchase.land, `Returned ${lands[i]}`]);
                plantnames += `${plants[i]} `
            }
        }
        console.log(`${from} returned ${landnames}`)
    });

    processor.on('redeem', function(j, f) {
        console.log(`${f} ${j}`)
        if (state.users[f]){if (state.users[f].v && state.users[f].v > 0) {
            state.users[f].v--
            let type = j.type || ''
            if (state.stats.supply.strains.indexOf(type) < 0) type = state.stats.supply.strains[state.users.length % state.stats.supply.strains.length]
            var seed = {
                strain: type,
                xp: 2250
            }
            state.users[f].seeds.push(seed)
        }}
    });

    processor.on('adjust', function(json, from) {
        if (from == username && json.dust > 1) state.stats.dust = json.dust
        if (from == username && json.time > 1) state.stats.time = json.time
    });

    processor.on('report', function(json, from) {
        try{for (var i = 0; i < state.refund.length; i++) {
            if (state.refund[i][2].block == json.block) state.refund.splice(i, 1)
        }}catch(e){}
    });
    processor.on('grant', function(json, from) {
        if(from=='hashkings'){state.users[json.to].v = 1}
    });
    processor.on('news', function(json, from) {
        if(from=='hashkings'){
            if(!state.news){
                state.news = {a:[],b:[],c:[],d:[],f:[],g:[],h:[],i:[],t:[]}
            }
            state.news[json.queue].push(json.body)
         }
    });

    processor.on('plant', function(json, from) {
        var index, seed=''
        try{
            index = state.users[from].addrs.indexOf(json.addr)
            for (var i = 0;i < state.users[from].seeds.length; i++){
                if(state.users[from].seeds[i].strain = json.seed){seed=state.users[from].seeds.splice(i, 1);break;}
            }
        } catch (e) {}
        if (!seed){
            try {
                seed=state.users[from].seeds.splice(0, 1)
            }catch (e) {}
        }
        console.log(index,seed,from)
        if (index >= 0 && seed) {
            if (!state.land[json.addr]) {
                console.log('planted on empty')
                const parcel = {
                    owner: from,
                    strain: seed[0].strain,
                    xp: seed[0].xp,
                    care: [],
                    aff: [],
                    planted: processor.getCurrentBlockNumber(),
                    stage: 1,
                    substage: 0,
                    traits: seed.traits,
                    terps: seed.terps
                }
                state.land[json.addr] = parcel
            } else if (state.land[json.addr].stage < 0) {
                console.log('planted on dead')
                state.land[json.addr].strain = seed.strain
                state.land[json.addr].xp = seed.xp
                state.land[json.addr].care = []
                state.land[json.addr].aff = []
                state.land[json.addr].planted = processor.getCurrentBlockNumber()
                state.land[json.addr].stage = 1
                state.land[json.addr].substage = 0
                state.land[json.addr].traits = seed.traits || []
                state.land[json.addr].terps = seed.terps || {}
            } else {
                state.users[from].seeds.unshift(seed[0]);
                console.log(`${from} can't plant that.`)
            }
        } else if (seed) {
            state.users[from].seeds.unshift(seed[0]);
            console.log(`${from} doesn't own that land`)
        } else {
            console.log(`${from} did a thing with a plant?`)
        }
    });
    processor.onOperation('transfer_to_vesting', function(json) {
        if (json.to == username && json.from == username) {
            const amount = parseInt(parseFloat(json.amount) * 1000)
            console.log(amount, 'to vesting')
            state.bal.b -= amount
            state.bal.p += amount
            for (var i = 0; i < state.refund.length; i++) {
                if (state.refund[i][1] == json.to && state.refund[i][2] == amount) {
                    state.refund.splice(i, 1);
                    console.log(`${json.to} powered up ${amount}`);
                    break;
                }
            }
        }
    });
    processor.onOperation('comment_options', function(json) {
        for(var i = 0;i<state.refund.length;i++){
            if(state.refund[i][0]=='sign'){
                if(state.refund[i][1][0][0]=='comment'){
                    if (json.author == username && json.permlink == state.refund[i][1][0][1].permlink && state.refund[i][1][0][0] == 'comment') {
                        state.refund.splice(i,1)
                    }
                }
            }
        }
    });
    processor.onOperation('vote', function(json) {
        for(var i = 0;i<state.refund.length;i++){
            if(state.refund[i][0]=='sign'){
                if(state.refund[i][1][0][0]=='vote'){
                    if (json.author == username && json.permlink == state.refund[i][1][0][1].permlink && state.refund[i][1][0][0] == 'vote') {
                        state.refund.splice(i,1)
                    }
                }
            }
        }
    });
    processor.onOperation('delegate_vesting_shares', function(json, from) { //grab posts to reward
        const vests = parseInt(parseFloat(json.vesting_shares) * 1000000)
        var record = ''
        if (!state.users[json.delegator] && json.delegatee == username) state.users[json.delegator] = {
            addrs: [],
            seeds: [],
            inv: [],
            stats: [],
            v: 0,
            a: 0,
            u: 0
        }
        var availible = parseInt(vests / (state.stats.prices.listed.a * (state.stats.vs) * 1000)),
            used = 0;
        if (json.delegatee == 'hashkings' && vests) {
            for (var i = 0; i < state.delegations.length; i++) {
                if (state.delegations[i].delegator == json.delegator) {
                    record = state.delegations.splice(i, 1)
                    break;
                }
            }

            if (record) {
                if (record.vests < vests) {
                    availible = availible - record.used;
                    used = record.used
                } else {
                    if (record.used > availible) {
                        var j = record.used - availible;
                        for (var i = state.users[json.delegator].addrs.length - j; i < state.users[json.delegator].addrs.length; i++) {
                            delete state.land[state.users[json.delegator].addrs[i]];
                            state.lands.forSale.push(state.users[json.delegator].addrs[i])
                        }
                        used = availible
                        availible = 0
                    } else {
                        availible = availible - record.used
                        used = record.used
                    }
                }
            }
            state.users[json.delegator].a = availible
            state.users[json.delegator].u = used
            state.delegations.push({
                delegator: json.delegator,
                vests,
                availible,
                used
            })
            console.log(processor.getCurrentBlockNumber() + `:${json.delegator} has delegated and earned ${availible} lands for @hashkings`)
        } else if (json.delegatee == username && !vests) {
            for (var i = 0; i < state.delegations.length; i++) {
                if (state.delegations[i].delegator == json.delegator) {
                    state.delegations.splice(i, 1)
                    break;
                }
            }
            console.log(processor.getCurrentBlockNumber() + `:${json.delegator} has removed delegation to @hashkings`)
        }
    });
    processor.onOperation('transfer', function(json) {
        if (json.to == username && json.amount.split(' ')[1] == 'STEEM') {
            if (!state.users[json.from]) state.users[json.from] = {
                addrs: [],
                seeds: [],
                inv: [],
                stats: [],
                v: 0,
                a: 0,
                u: 0
            }
            const amount = parseInt(parseFloat(json.amount) * 1000)
            var want = json.memo.split(" ")[0].toLowerCase() || json.memo.toLowerCase(),
                type = json.memo.split(" ")[1] || ''
            if (state.stats.prices.listed[want] == amount || amount == 500 && type == 'manage' && state.stats.prices.listed[want] || want == 'rseed' && amount == state.stats.prices.listed.seeds.reg || want == 'mseed' && amount == state.stats.prices.listed.seeds.mid || want == 'tseed' && amount == state.stats.prices.listed.seeds.top) {
                if (state.stats.supply.land[want]) {
                    var allowed = false
                    if (amount == 500 && type == 'manage') {
                        console.log(`${json.from} is managing`)
                        for (var i = 0; i < state.delegations.length; i++) {
                            if (json.from == state.delegations[i].delegator && state.delegations[i].availible) {
                                state.delegations[i].availible--;
                                state.delegations[i].used++;
                                state.bal.c += amount;
                                allowed = true
                                break;
                            }
                        }
                    } else {
                        const c = parseInt(amount * 0.025)
                        state.bal.c += c
                        state.bal.b += amount - c
                        allowed = true
                    }
                    if (allowed) {
                        state.stats.supply.land[want]--
                        const sel = `${want}c`
                        const num = state.stats.supply.land[sel]++
                        var addr = `${want}${num}`
                        state.users[json.from].addrs.push(addr)
                        console.log(`${json.from} purchased ${addr}`)
                    } else {
                        state.refund.push(['xfer', json.from, amount, 'Managing Land?...Maybe have your STEEM back'])
                    }
                } else if (want == 'rseed' && amount == state.stats.prices.listed.seeds.reg || want == 'mseed' && amount == state.stats.prices.listed.seeds.mid || want == 'tseed' && amount == state.stats.prices.listed.seeds.top) {
                    if (state.stats.supply.strains.indexOf(type) < 0) type = state.stats.supply.strains[state.users.length % state.stats.supply.strains.length]
                    var xp = 1
                    if (want == 'mseed') xp = 750
                    if (want == 'tseed') xp = 2250
                    var seed = {
                        strain: type,
                        xp: xp
                    }
                    console.log(seed)
                    state.users[json.from].seeds.push(seed)
                    const c = parseInt(amount * 0.025)
                    state.bal.c += c
                    state.bal.b += amount - c
                    console.log(`${json.from} purchased ${seed.strain}`)
                } else {
                    console.log('refund fun')
                    state.bal.r += amount
                    state.refund.push(['xfer', json.from, amount, 'We don\'t know what you wanted... have your STEEM back'])
                    console.log(`${json.from} sent a weird transfer...refund?`)
                }
            } else if (amount > 10) {
                console.log('refund fun')
                state.bal.r += amount
                state.refund.push(['xfer', json.from, amount, 'Sorry, this account only accepts in game transactions.'])
                console.log(`${json.from} sent a weird transfer...refund?`)
            }
        } else if (json.from == username) {
            const amount = parseInt(parseFloat(json.amount) * 1000)
            for (var i = 0; i < state.refund.length; i++) {
                if (state.refund[i][1] == json.to && state.refund[i][2] == amount) {
                    state.refund.splice(i, 1);
                    state.bal.r -= amount;
                    console.log(`${json.to} refunded successfully`);
                    break;
                }
            }
        }
    });
    processor.onStreamingStart(function() {
        console.log("At real time.")
    });

    processor.start();


    var transactor = steemTransact(client, steem, prefix);
    processor.on('return', function(json, from) {
        var index = state.users[from].addrs.indexOf(json.addr)
        if (index >= 0) {
            state.lands.forSale.push(state.users[from].addrs.splice(i, 1))
            state.bal.r += state.stats.prices.purchase.land
            if (state.bal.b - state.stats.prices.purchase.land > 0) {
                state.bal.b -= state.stats.prices.purchase.land
            } else {
                state.bal.d += state.stats.prices.purchase.land
            }
            state.refund.push(['xfer', from, state.stats.prices.purchase.land, 'We\'re sorry to see you go!'])
        }

    });

    function exit() {
        console.log('Exiting...');
        processor.stop(function() {
            saveState(function() {
                process.exit();
                console.log('Process exited.');
            });
        });
    }
}

function ipfsSaveState(blocknum, hashable) {
    ipfs.add(Buffer.from(JSON.stringify([blocknum, hashable]), 'ascii'), (err, IpFsHash) => {
        if (!err) {
            state.stats.bu = IpFsHash[0].hash
            state.stats.bi = blocknum
            console.log(blocknum + `:Saved:  ${IpFsHash[0].hash}`)
            state.refund.push(['customJson', 'report', {
                stateHash: state.stats.bu,
                block: blocknum
            }])
        } else {
            console.log('IPFS Error', err)
        }
    })
};
var bot = {
    xfer: function(toa, amount, memo) {
        const float = parseFloat(amount / 1000).toFixed(3)
        const data = {
            amount: `${float} STEEM`,
            from: username,
            to: toa,
            memo: memo
        }
        console.log(data, key)
        client.broadcast.transfer(data, key).then(
            function(result) {
                console.log(result)
            },
            function(error) {
                console.log(error)
            }
        );
    },
    customJson: function(id, json, callback) {
        client.broadcast.json({
            required_auths: [],
            required_posting_auths: [username],
            id: prefix + id,
            json: JSON.stringify(json),
        }, key).then(
            result => {
                console.log('Signed ${json}')
            },
            error => {
                console.log('Error sending customJson')
            }
        )
    },
    sign: function(op, callback) {
        console.log('attempting'+op[0])
        client.broadcast.sendOperations(op, key).then(
            function(result) {
                console.log(result)
            },
            function(error) {
                console.log(error)
            }
        );
    },
    power: function(toa, amount, callback) {
        const op = [
            'transfer_to_vesting',
            {
                from: username,
                to: toa,
                amount: `${parseFloat(amount/1000).toFixed(3)} STEEM`,
            },
        ];
        client.broadcast.sendOperations([op], key).then(
            function(result) {
                console.log(result)
            },
            function(error) {
                console.log(error)
            }
        );
    },
    sendOp: function(op) {
        client.broadcast.sendOperations(op, key).then(
            function(result) {
                console.log(result)
            },
            function(error) {
                console.log(error)
            }
        );
    }
}

function whotopay() {
    var a = {
            a: [],
            b: [],
            c: [],
            d: [],
            e: [],
            f: [],
            g: [],
            h: [],
            i: [],
            j: []
        },
        b = 0,
        c = 0,
        h = 1,
        o = []
    for (d in state.kudos) {
        c = parseInt(c) + parseInt(state.kudos[d])
        if (state.kudos[d] > h) {
            h = state.kudos[d]
        };
        if (state.kudos[d] == 1) {
            o.unshift({
                account: d,
                weight: parseInt(state.kudos[d])
            })
        } else {
            if(!o.length){o.unshift({
                account: d,
                weight: parseInt(state.kudos[d])
            })}
            for (var i = o.length - 1; i > 0; i--) {
                    if (state.kudos[d] <= o[i].weight ||(state.kudos[d] > o[i].weight && i == o.length)) {
                        o.splice(i, 0, {
                            account: d,
                            weight: parseInt(state.kudos[d])
                        });
                        i = 0;
                    }
            }
        }
    }
    if (o.length > 3000) {
        b = 3000
    } else {
        b = o.length
    }
    while (b) {
        for (var r in a) {
            a[r].push(o.pop());
            b--
            if(!b)break;
        }
    }
    state.kudos = {}
        for (var i = 0; i < o.length; i++) {
            state.kudos[o[i].account] = parseInt(o[i].weight)
        }
    for (var r in a) {
        var u = 0,
            q = 0
        for (var i = 0; i < a[r].length; i++) {
            u = parseInt(u) + parseInt(a[r][i].weight)
        }
        q = parseInt(10000/u)
        for (var i = 0; i < a[r].length; i++) {
            a[r][i].weight = parseInt(parseInt(a[r][i].weight) * q)
        }
    }
    o = []
    for (var i in a){
        o.push(a[i])
    }
    console.log('payday:'+o)
    return o
}

function kudo(user) {
    console.log('Kudos: ' + user)
    if (!state.kudos[user]) {
        state.kudos[user] = 1
    } else {
        state.kudos[user]++
    }
}

function daily(addr) {
    var grown = false
    if (state.land[addr]) {
        for (var i = 0; i < state.land[addr].care.length; i++) {
            if (state.land[addr].care[i][0] > processor.getCurrentBlockNumber() - 28800 && state.land[addr].care[i][1] == 'watered') {
                if(!grown)state.land[addr].care[i].push('c')
                if (state.land[addr].substage < 14 && state.land[addr].stage > 0 && !grown) {
                    if(!grown){
                        state.land[addr].substage++;
                        grown = true;
                        kudo(state.land[addr].owner)
                    } else {
                        state.land[addr].aff.push([processor.getCurrentBlockNumber(), 'too wet']);   
                    }
                }
                if (state.land[addr].substage == 14) {
                    state.land[addr].substage = 0;
                    state.land[addr].stage++
                }
                if (state.land[addr].stage == 5 && state.land[addr].substage == 0) state.land[addr].sex = state.land.length % 1
                if (state.land[addr].stage == 9 && state.land[addr].substage == 13) {
                    state.land[addr].aff.push([processor.getCurrentBlockNumber(), 'over']);
                    state.land[addr].substage = 12
                }
                for (var j = 0; j < state.land[addr].aff.length; j++) {
                    if (state.land[addr].aff[j][0] > processor.getCurrentBlockNumber() - 86400 && state.land[addr].aff[j][1] == 'over') {
                        state.land[addr].stage = -1;
                        break;
                    }
                }
            }
        }
    }
}
