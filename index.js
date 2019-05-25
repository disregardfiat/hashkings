var steem = require('dsteem');
var steemState = require('steem-state');
var steemTransact = require('steem-transact');
var fs = require('fs');
const cors = require('cors');
const express = require('express')
const ENV = process.env;
const maxEx = process.max_extentions || 8
const IPFS = require('ipfs-api');
const ipfs = new IPFS({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
});
const app = express()
const port = ENV.PORT || 3000;
const wkey = ENV.wkey

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
    Object.keys(state.users).length
    var ret = state.stats
    ret.gardeners = Object.keys(state.users).length
    res.send(JSON.stringify(ret, null, 3))
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

app.get('/delegation/:user', (req, res, next) => {
    let user = req.params.user
    var op = {}
    for(i=0;i<state.delegations.length;i++){
        if(state.delegations[i].delegator == user){
            op = state.delegations[i]
            break;
        }
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(op, null, 3))
});

app.listen(port, () => console.log(`HASHKINGS token API listening on port ${port}!`))
var state
var startingBlock = ENV.STARTINGBLOCK || 32910000 ; //GENESIS BLOCK
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
                var data = JSON.parse(file.toString())
                startingBlock = data[0]
                state = JSON.parse(data[1]);
                startApp();
            } else {
                startApp()
                console.log(`${sh} failed to load, Replaying from genesis.\nYou may want to set the env var engineCrank`)
            }
        });
    } else {
        startingBlock = 33203000
        state = {"delegations":[{"delegator":"pugqueen","vests":39976125874,"availible":0,"used":1},{"delegator":"stephanus","vests":39974588563,"availible":0,"used":1},{"delegator":"inthenow","vests":39974577206,"availible":0,"used":1},{"delegator":"qwoyn-fund","vests":39969265471,"availible":0,"used":1},{"delegator":"luegenbaron","vests":79937710499,"availible":1,"used":1},{"delegator":"buckydurddle","vests":39928672533,"availible":0,"used":1},{"delegator":"jrawsthorne","vests":79856690072,"availible":1,"used":1},{"delegator":"mondoshawan","vests":119764506608,"availible":2,"used":1},{"delegator":"movingman","vests":199606471417,"availible":5,"used":0},{"delegator":"romiferns","vests":39902157902,"availible":0,"used":1},{"delegator":"mulletwang","vests":798032035767,"availible":4,"used":16},{"delegator":"simgirl","vests":159563267843,"availible":0,"used":4},{"delegator":"tygertyger","vests":39890651382,"availible":0,"used":1},{"delegator":"jonyoudyer","vests":159560538775,"availible":2,"used":2},{"delegator":"choosefreedom","vests":79780132574,"availible":1,"used":1},{"delegator":"ecoinstar","vests":239340396744,"availible":1,"used":5},{"delegator":"richardcrill","vests":39889849205,"availible":0,"used":1},{"delegator":"molovelly","vests":199444676737,"availible":3,"used":2},{"delegator":"mickvir","vests":39888208334,"availible":0,"used":1},{"delegator":"anarcist69","vests":79776276323,"availible":0,"used":2},{"delegator":"gamewatch","vests":39882850262,"availible":0,"used":1},{"delegator":"onthewayout","vests":39881464050,"availible":0,"used":1},{"delegator":"patrickulrich","vests":199396313587,"availible":4,"used":1},{"delegator":"hotsauceislethal","vests":239275449002,"availible":0,"used":6},{"delegator":"aggamun","vests":79749662318,"availible":0,"used":2},{"delegator":"qwoyn","vests":6628598692668,"availible":169,"used":0},{"delegator":"guiltyparties","vests":79740277379,"availible":0,"used":2},{"delegator":"abrockman","vests":398699953263,"availible":0,"used":10},{"delegator":"disregardfiat","vests":39869791916,"availible":0,"used":1}],"kudos":{"bluntsmasha":3,"prettynicevideo":2,"qwoyn-fund":1,"onthewayout":1,"abrockman":10,"choosefreedom":2,"jonyoudyer":6,"hotsauceislethal":5,"simgirl":4,"qwoyn":1,"patrickulrich":1,"mulletwang":13,"aggamun":1,"luegenbaron":2,"mondoshawan":3,"pugqueen":1,"thehermitmonk":3,"molovelly":1,"richardcrill":1,"sooflauschig":1},"stats":{"vs":1950,"dust":25,"time":31159798,"offsets":{"a":9600,"b":21600,"c":0,"d":19200,"e":20400,"f":7200},"env":{"a":{"name":"Afganistan","lat":"31.5","lon":"64.1","weather":{}},"b":{"name":"Africa","lat":"-3.2","lon":"37.9","weather":{}},"c":{"name":"Asia","lat":"18.1","lon":"92.93","weather": {}},"d":{"name":"SouthȀAmerica","lat":"-22.9","lon":"-43.2","weather":{}},"e":{"name":"Jamaica","lat":"18.1","lon":"-76.7","weather":{}},"f":{"name":"Mexico","lat":"25.8","lon":"-108.2","weather":{}}},"bu":"QmU5pbAUCmUhv8F8UvXBLtUQtKPcijnyfQ29Yk7Ey8i2Kx","bi":33202000,"prices":{"listed":{"a":20000,"b":20000,"c":20000,"d":20000,"e":20000,"f":20000,"t":20000,"seeds":{"reg":750,"mid":1500,"top":3000},"supplies":{}},"purchase":{"land":19500}},"supply":{"land":{"a":4141,"ac":60,"b":4151,"bc":52,"c":4148,"cc":53,"d":4159,"dc":42,"e":4161,"ec":40,"f":4181,"fc":20,"g":0,"gc":0,"t":420000,"tc":1,"counter":0},"strains":["hk","afg","lkg","mis","lb","kbr","aca","swz","kmj","dp","mal","pam","cg","ach","tha","cht"]},"gardeners":65},"bal":{"r":0,"c":7475,"b":38025,"p":319613},"refund":[],"lands":{"forSale":[]},"land":{"a10":{"owner":"qwoyn","strain":"kbr","xp":2250,"care":[[33177863,"watered","c"],[33142299,"watered","c"],[33114776,"watered","c"],[33096624,"watered","c"]],"aff":[],"planted":31713776,"stage":4,"substage":2,"id":"a10"},"a2":{"owner":"jonyoudyer","strain":"mis","xp":2250,"care":[[33179857,"watered","c"],[33150833,"watered","c"],[33124308,"watered","c"]],"aff":[],"planted":31853281,"stage":4,"substage":0,"id":"a2"},"b34":{"owner":"fracasgrimm","strain":"kbr","xp":2250,"care":[[32050954,"watered","c"],[31966430,"watered","c"],[31936407,"watered","c"],[31901978,"watered","c"]],"aff":[],"planted":31885890,"stage":1,"substage":5,"id":"b34"},"e13":{"owner":"pugqueen","strain":"cg","xp":2250,"care":[[33177877,"watered","c"],[33142309,"watered","c"],[33114769,"watered","c"]],"aff":[],"planted":31886216,"stage":3,"substage":7,"id":"e13"},"e14":{"owner":"mondoshawan","strain":"hk","xp":2250,"care":[[33193456,"watered","c"],[33157704,"watered","c"],[33127807,"watered","c"]],"aff":[],"planted":31887728,"stage":4,"substage":2,"id":"e14"},"a43":{"owner":"gregorypatrick","strain":"afg","xp":2250,"care":[[32986537,"watered","c"],[32762603,"watered","c"],[32676420,"watered","c"],[32533655,"watered","c"]],"aff":[],"planted":31900185,"stage":2,"substage":12,"id":"a43"},"a7":{"owner":"prettynicevideo","strain":"afg","xp":2250,"care":[[33198506,"watered"],[33166596,"watered","c"],[33140045,"watered","c"],[33116291,"watered","c"]],"aff":[],"planted":31903005,"stage":3,"substage":11,"id":"a7"},"b39":{"owner":"stephanus","strain":"swz","xp":2250,"care":[[32395975,"watered","c"],[32332533,"watered","c"],[32302259,"watered","c"],[32274137,"watered","c"],[32332533,"watered","c"],[32302259,"watered","c"],[32274136,"watered","c"],[32218415,"watered","c"],[32163946,"watered","c"],[32130362,"watered","c"],[32096472,"watered","c"],[32045519,"watered","c"],[32013561,"watered","c"],[31967150,"watered","c"],[31953686,"watered","c"],[31905303,"watered","c"]],"aff":[],"planted":31905253,"stage":2,"substage":2},"a49":{"owner":"inthenow","strain":"hk","xp":2250,"care":[[32769598,"watered","c"],[32687130,"watered","c"],[32601993,"watered","c"],[32566745,"watered","c"]],"aff":[],"planted":31905556,"stage":2,"substage":7,"id":"a49"},"a9":{"owner":"ghosthunter1","strain":"dp","xp":2250,"care":[[33125149,"watered","c"],[33024153,"watered","c"],[32913025,"watered","c"],[32796342,"watered","c"],[32737428,"watered","c"],[32680443,"watered","c"],[32650298,"watered","c"],[32610882,"watered","c"],[32569110,"watered","c"]],"aff":[],"planted":31905642,"stage":3,"substage":4,"id":"a9"},"a11":{"owner":"bluntsmasha","strain":"hk","xp":2250,"care":[[33173774,"watered","c"],[33131233,"watered","c"],[33086613,"watered","c"],[33086604,"watered"]],"aff":[],"planted":31911522,"stage":2,"substage":4,"id":"a11"},"b2":{"owner":"bluntsmasha","strain":"lb","xp":2250,"care":[[33173774,"watered","c"],[33131233,"watered","c"],[33086613,"watered","c"],[33086607,"watered"]],"aff":[],"planted":31911985,"stage":2,"substage":3,"id":"b2"},"c1":{"owner":"bluntsmasha","strain":"afg","xp":2250,"care":[[33173774,"watered","c"],[33131233,"watered","c"],[33086613,"watered","c"],[32857529,"watered","c"]],"aff":[],"planted":31911995,"stage":2,"substage":4,"id":"c1"},"f2":{"owner":"bluntsmasha","strain":"aca","xp":2250,"care":[[33173774,"watered","c"],[33131233,"watered","c"],[33086613,"watered","c"],[32805204,"watered","c"]],"aff":[],"planted":31912004,"stage":2,"substage":3,"id":"f2"},"b32":{"owner":"sooflauschig","strain":"afg","xp":2250,"care":[[33193681,"watered","c"],[33135149,"watered","c"],[33100325,"watered","c"],[33073257,"watered","c"]],"aff":[],"planted":31929923,"stage":4,"substage":3,"id":"b32"},"a48":{"owner":"californiacrypto","strain":"afg","xp":2250,"care":[[32689447,"watered","c"],[32626090,"watered","c"],[32604187,"watered","c"],[32571316,"watered","c"],[32542352,"watered","c"],[32514808,"watered","c"],[32451911,"watered","c"],[32423855,"watered","c"],[32392546,"watered","c"],[32364694,"watered","c"],[32337328,"watered","c"],[32308249,"watered","c"],[32276761,"watered","c"],[32337328,"watered"],[32308248,"watered","c"],[32276761,"watered","c"],[32247725,"watered","c"],[32203077,"watered","c"],[32167710,"watered","c"],[32138436,"watered","c"],[32113493,"watered","c"],[32081902,"watered","c"],[32052716,"watered","c"],[32020754,"watered","c"],[31990196,"watered","c"],[31961958,"watered","c"],[31961898,"watered"],[31961872,"watered"],[31961855,"watered"],[31961834,"watered"],[31961831,"watered"],[31961823,"watered"],[31961819,"watered"],[31961816,"watered"],[31961813,"watered"],[31932962,"watered","c"]],"aff":[],"planted":31932911,"stage":2,"substage":12},"b5":{"owner":"luegenbaron","strain":"aca","xp":2250,"care":[[33195970,"watered","c"],[33169008,"watered"],[33134782,"watered","c"],[33049608,"watered","c"]],"aff":[],"planted":31968004,"stage":3,"substage":0,"id":"b5"},"e8":{"owner":"disregardfiat","strain":"cht","xp":2250,"care":[[33197680,"watered"],[32574349,"watered","c"],[32087481,"watered","c"]],"aff":[],"planted":31968022,"stage":1,"substage":5,"id":"e8"},"a17":{"owner":"ngc","strain":"hk","xp":2250,"care":[[31968692,"watered","c"]],"aff":[],"planted":31968683,"stage":1,"substage":1,"id":"a17"},"f7":{"owner":"qwoyn-fund","strain":0,"xp":2250,"care":[[33177870,"watered","c"],[33142291,"watered","c"],[33114782,"watered","c"],[33096617,"watered"],[33033616,"watered","c"],[33012582,"watered"],[32976641,"watered","c"],[32944656,"watered","c"],[32887855,"watered","c"],[32853248,"watered","c"],[32819800,"watered","c"],[32798358,"watered","c"]],"aff":[],"planted":31972387,"stage":3,"substage":2,"id":"f7"},"b41":{"owner":"mondoshawan","strain":"mis","xp":750,"care":[[33193456,"watered","c"],[33157704,"watered","c"],[33127807,"watered","c"]],"aff":[],"planted":31978223,"stage":3,"substage":13,"id":"b41"},"c37":{"owner":"luegenbaron","strain":"afg","xp":2250,"care":[[33195970,"watered"],[33169008,"watered","c"],[33134782,"watered","c"],[33049610,"watered","c"]],"aff":[],"planted":31985840,"stage":3,"substage":3,"id":"c37"},"e16":{"owner":"luegenbaron","strain":"kbr","xp":2250,"care":[[33195970,"watered","c"],[33169008,"watered"],[33134782,"watered","c"],[33049612,"watered","c"]],"aff":[],"planted":31985846,"stage":3,"substage":0,"id":"e16"},"e11":{"owner":"jonyoudyer","strain":"swz","xp":2250,"care":[[33179857,"watered","c"],[33150833,"watered","c"],[33124308,"watered","c"]],"aff":[],"planted":32020193,"stage":3,"substage":10,"id":"e11"},"e15":{"owner":"mondoshawan","strain":"afg","xp":2250,"care":[[33193456,"watered","c"],[33157704,"watered","c"],[33127807,"watered","c"]],"aff":[],"planted":32275386,"stage":2,"substage":8,"id":"e15"},"e17":{"owner":"buckydurddle","strain":"hk","xp":1,"care":[[32501527,"watered","c"],[32481368,"watered"]],"aff":[],"planted":32481352,"stage":1,"substage":1},"b42":{"owner":"jonyoudyer","strain":"swz","xp":2250,"care":[[33179857,"watered","c"],[33150833,"watered","c"],[33124308,"watered","c"]],"aff":[],"planted":32547991,"stage":2,"substage":8,"id":"b42"},"a3":{"owner":"jonyoudyer","strain":"hk","xp":750,"care":[[33179857,"watered","c"],[33150833,"watered","c"],[33124308,"watered","c"]],"aff":[],"planted":32547995,"stage":1,"substage":13,"id":"a3"},"f9":{"owner":"jonyoudyer","strain":"aca","xp":1,"care":[[33179857,"watered","c"],[33150833,"watered","c"],[33124308,"watered","c"]],"aff":[],"planted":32547999,"stage":2,"substage":8,"id":"f9"},"f1":{"owner":"prettynicevideo","strain":"cg","xp":2250,"care":[[33198506,"watered"],[33166596,"watered","c"],[33140045,"watered","c"],[33116291,"watered","c"]],"aff":[],"planted":32550195,"stage":2,"substage":4,"id":"f1"},"a46":{"owner":"movingman","strain":"mis","xp":2250,"care":[[33126791,"watered","c"],[32620730,"watered","c"],[32566110,"watered","c"]],"aff":[],"planted":32565834,"stage":1,"substage":3,"id":"a46"},"a15":{"owner":"mrkhuffins","strain":"hk","xp":2250,"care":[[33091653,"watered","c"],[32577455,"watered","c"]],"aff":[],"planted":32577329,"stage":1,"substage":2,"id":"a15"},"b3":{"owner":"mrkhuffins","strain":"dp","xp":2250,"care":[[33091653,"watered","c"],[32577476,"watered","c"]],"aff":[],"planted":32577449,"stage":1,"substage":2,"id":"b3"},"d3":{"owner":"mrkhuffins","strain":"dp","xp":2250,"care":[[33091653,"watered","c"]],"aff":[],"planted":32577489,"stage":1,"substage":1,"id":"d3"},"c38":{"owner":"mondoshawan","strain":"kmj","xp":2250,"care":[[33193456,"watered"],[33157704,"watered","c"],[33127807,"watered","c"]],"aff":[],"planted":32679733,"stage":2,"substage":2,"id":"c38"},"d32":{"owner":"ecoinstar","strain":"cg","xp":2250,"care":[[33141801,"watered","c"],[33091065,"watered","c"],[33074068,"watered","c"],[33031904,"watered","c"],[33000960,"watered","c"],[33000709,"watered"],[32971782,"watered","c"],[32948291,"watered","c"],[32939351,"watered"],[32921208,"watered","c"],[32889667,"watered","c"],[32877056,"watered","c"],[32848313,"watered","c"]],"aff":[],"planted":32745119,"stage":2,"substage":0,"id":"d32"},"a50":{"owner":"abrockman","strain":"afg","xp":2250,"care":[[33195495,"watered"],[33195143,"watered"],[33173601,"watered","c"]],"aff":[],"planted":32776720,"stage":1,"substage":13,"id":"a50"},"c39":{"owner":"abrockman","strain":"hk","xp":2250,"care":[[33195495,"watered"],[33195143,"watered"],[33173601,"watered","c"]],"aff":[],"planted":32794139,"stage":1,"substage":10,"id":"c39"},"d33":{"owner":"abrockman","strain":"dp","xp":2250,"care":[[33195495,"watered"],[33195143,"watered"],[33173601,"watered","c"]],"aff":[],"planted":32794152,"stage":1,"substage":10,"id":"d33"},"b43":{"owner":"abrockman","strain":"lb","xp":2250,"care":[[33195495,"watered","c"],[33195143,"watered"],[33173601,"watered"]],"aff":[],"planted":32794161,"stage":1,"substage":9,"id":"b43"},"c40":{"owner":"romiferns","strain":"dp","xp":2250,"care":[[33193297,"watered"],[33173316,"watered","c"],[33162324,"watered"]],"aff":[],"planted":32800914,"stage":1,"substage":11,"id":"c40"},"a51":{"owner":"mulletwang","strain":"afg","xp":2250,"care":[[33201365,"watered"],[33188407,"watered"],[33122790,"watered","c"],[33108357,"watered"]],"aff":[],"planted":32806810,"stage":1,"substage":9,"id":"a51"},"b44":{"owner":"mulletwang","strain":"dp","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32816915,"stage":1,"substage":11,"id":"b44"},"e18":{"owner":"mulletwang","strain":"lb","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32817079,"stage":1,"substage":12,"id":"e18"},"c41":{"owner":"mulletwang","strain":"cht","xp":2250,"care":[[33201365,"watered"],[33188407,"watered"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32817085,"stage":1,"substage":9,"id":"c41"},"d34":{"owner":"mulletwang","strain":"aca","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32817096,"stage":1,"substage":12,"id":"d34"},"f10":{"owner":"mulletwang","strain":"ach","xp":2250,"care":[[33201365,"watered"],[33188407,"watered"],[33122790,"watered","c"],[33108357,"watered"]],"aff":[],"planted":32817164,"stage":1,"substage":9,"id":"f10"},"a1":{"owner":"a1-shroom-spores","strain":"swz","xp":2250,"care":[[33083762,"watered","c"],[32996870,"watered","c"],[32959387,"watered","c"],[32821714,"watered","c"]],"aff":[],"planted":32821622,"stage":1,"substage":4,"id":"a1"},"f11":{"owner":"choosefreedom","strain":"lb","xp":750,"care":[[33177850,"watered","c"],[33144792,"watered","c"],[33122946,"watered","c"],[33088140,"watered","c"],[33064093,"watered","c"],[33034256,"watered","c"],[33009814,"watered","c"],[32976032,"watered","c"],[32947326,"watered","c"],[32947289,"watered"]],"aff":[],"planted":32829855,"stage":1,"substage":13,"id":"f11"},"e19":{"owner":"mulletwang","strain":"hk","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32849320,"stage":1,"substage":10,"id":"e19"},"e20":{"owner":"mulletwang","strain":"pam","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32849363,"stage":1,"substage":10,"id":"e20"},"e21":{"owner":"mulletwang","strain":"swz","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32849393,"stage":1,"substage":10,"id":"e21"},"e22":{"owner":"mulletwang","strain":"tha","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32849501,"stage":1,"substage":10,"id":"e22"},"e23":{"owner":"mulletwang","strain":"pam","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32849545,"stage":1,"substage":10,"id":"e23"},"e24":{"owner":"mulletwang","strain":"tha","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32849739,"stage":1,"substage":10,"id":"e24"},"e25":{"owner":"mulletwang","strain":"kmj","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32850514,"stage":1,"substage":10,"id":"e25"},"e26":{"owner":"mulletwang","strain":"pam","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32850522,"stage":1,"substage":10,"id":"e26"},"e27":{"owner":"mulletwang","strain":"pam","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32850680,"stage":1,"substage":10,"id":"e27"},"e28":{"owner":"mulletwang","strain":"tha","xp":2250,"care":[[33201365,"watered"],[33188407,"watered","c"],[33122790,"watered","c"],[33108357,"watered","c"]],"aff":[],"planted":32850688,"stage":1,"substage":10,"id":"e28"},"e29":{"owner":"abrockman","strain":"cht","xp":2250,"care":[[33195495,"watered","c"],[33195143,"watered"],[33173601,"watered"]],"aff":[],"planted":32884641,"stage":1,"substage":8,"id":"e29"},"f12":{"owner":"abrockman","strain":"ach","xp":2250,"care":[[33195495,"watered"],[33195143,"watered"],[33173601,"watered","c"]],"aff":[],"planted":32890932,"stage":1,"substage":9,"id":"f12"},"e30":{"owner":"thehermitmonk","strain":"kbr","xp":2250,"care":[[33172920,"watered","c"],[33168106,"watered"],[33148226,"watered","c"],[33110053,"watered","c"],[33079924,"watered","c"]],"aff":[],"planted":32917993,"stage":1,"substage":7,"id":"e30"},"b45":{"owner":"thehermitmonk","strain":"dp","xp":2250,"care":[[33172920,"watered","c"],[33168106,"watered","c"],[33148226,"watered"],[33110053,"watered","c"],[33089617,"watered"]],"aff":[],"planted":32918003,"stage":1,"substage":7,"id":"b45"},"b46":{"owner":"thehermitmonk","strain":"swz","xp":2250,"care":[[33172920,"watered","c"],[33168106,"watered","c"],[33148226,"watered"],[33110053,"watered","c"],[33079921,"watered","c"]],"aff":[],"planted":32918020,"stage":1,"substage":7,"id":"b46"},"e31":{"owner":"simgirl","strain":"kmj","xp":2250,"care":[[33190677,"watered","c"],[33164638,"watered","c"],[33136341,"watered","c"],[33101208,"watered","c"]],"aff":[],"planted":32938707,"stage":1,"substage":9,"id":"e31"},"f13":{"owner":"simgirl","strain":"cht","xp":2250,"care":[[33190677,"watered"],[33164638,"watered","c"],[33136341,"watered","c"],[33101208,"watered","c"]],"aff":[],"planted":32938794,"stage":1,"substage":9,"id":"f13"},"b47":{"owner":"simgirl","strain":"aca","xp":750,"care":[[33190677,"watered","c"],[33164638,"watered","c"],[33136341,"watered","c"],[33101208,"watered","c"]],"aff":[],"planted":32938928,"stage":1,"substage":8,"id":"b47"},"d35":{"owner":"simgirl","strain":"dp","xp":2250,"care":[[33190677,"watered","c"],[33164638,"watered","c"],[33136341,"watered","c"],[33101208,"watered","c"]],"aff":[],"planted":32939019,"stage":1,"substage":9,"id":"d35"},"c42":{"owner":"tygertyger","strain":"cht","xp":750,"care":[[32966582,"watered","c"],[32941504,"watered","c"]],"aff":[],"planted":32941466,"stage":1,"substage":2},"c43":{"owner":"jonyoudyer","strain":"kmj","xp":750,"care":[[33179857,"watered"],[33150833,"watered","c"],[33124308,"watered","c"]],"aff":[],"planted":32946892,"stage":1,"substage":8,"id":"c43"},"d36":{"owner":"jonyoudyer","strain":"cht","xp":750,"care":[[33179857,"watered","c"],[33150833,"watered","c"],[33124308,"watered","c"]],"aff":[],"planted":32946899,"stage":1,"substage":9,"id":"d36"},"e33":{"owner":"richardcrill","strain":"dp","xp":2250,"care":[[33191133,"watered","c"],[33172033,"watered"],[33140428,"watered","c"],[33130181,"watered","c"],[33076216,"watered","c"],[33034160,"watered","c"],[32997971,"watered","c"],[32957311,"watered","c"],[32950363,"watered"]],"aff":[],"planted":32950340,"stage":1,"substage":7},"e34":{"owner":"molovelly","strain":"dp","xp":2250,"care":[[33170439,"watered","c"],[33142354,"watered","c"],[33106922,"watered","c"],[33086043,"watered"]],"aff":[],"planted":32961543,"stage":1,"substage":7,"id":"e34"},"c45":{"owner":"mickvir","strain":"lb","xp":1,"care":[[33159454,"watered","c"],[33130246,"watered","c"],[33099480,"watered","c"],[33083983,"watered","c"],[33068901,"watered"],[33053597,"watered","c"],[33033466,"watered"],[33017246,"watered","c"],[33001417,"watered","c"],[32986303,"watered"],[32970770,"watered","c"]],"aff":[],"planted":32970753,"stage":1,"substage":8,"id":"c45"},"e35":{"owner":"choosefreedom","strain":"pam","xp":1,"care":[[33177850,"watered","c"],[33144792,"watered","c"],[33122946,"watered","c"],[33088140,"watered","c"],[33064105,"watered","c"],[33034263,"watered","c"],[33009837,"watered","c"],[33009817,"watered"],[32971194,"watered","c"]],"aff":[],"planted":32971170,"stage":1,"substage":8,"id":"e35"},"e36":{"owner":"anarcist69","strain":"hk","xp":2250,"care":[[33145315,"watered","c"],[33091255,"watered","c"],[33055496,"watered","c"],[33031104,"watered","c"],[32996826,"watered","c"],[32971440,"watered","c"]],"aff":[],"planted":32971383,"stage":1,"substage":6,"id":"e36"},"a53":{"owner":"anarcist69","strain":"kmj","xp":750,"care":[[33145315,"watered","c"],[33091255,"watered","c"],[33055488,"watered","c"],[33031101,"watered","c"],[32996815,"watered","c"],[32971447,"watered","c"]],"aff":[],"planted":32971433,"stage":1,"substage":6,"id":"a53"},"c44":{"owner":"ecoinstar","strain":"hk","xp":2250,"care":[[33141801,"watered","c"],[33091065,"watered","c"],[33074073,"watered","c"],[33031907,"watered","c"],[33000912,"watered","c"],[33000905,"watered"],[32971823,"watered","c"]],"aff":[],"planted":32971815,"stage":1,"substage":6},"c46":{"owner":"qwoyn","strain":"hk","xp":2250,"care":[[33177863,"watered"],[33142299,"watered","c"],[33114776,"watered","c"],[33096624,"watered"]],"aff":[],"planted":33012618,"stage":1,"substage":4,"id":"c46"},"c47":{"owner":"molovelly","strain":"cht","xp":2250,"care":[[33170439,"watered","c"],[33142354,"watered","c"],[33106922,"watered","c"],[33086043,"watered","c"]],"aff":[],"planted":33024825,"stage":1,"substage":6,"id":"c47"},"c48":{"owner":"gamewatch","strain":"kbr","xp":2250,"care":[[33178626,"watered"],[33151413,"watered","c"],[33073694,"watered","c"],[33038048,"watered","c"]],"aff":[],"planted":33038041,"stage":1,"substage":3,"id":"c48"},"f6":{"owner":"onthewayout","strain":"cg","xp":1,"care":[[33199069,"watered"],[33165120,"watered","c"],[33142450,"watered","c"],[33107680,"watered","c"]],"aff":[],"planted":33053650,"stage":1,"substage":5,"id":"f6"},"a54":{"owner":"patrickulrich","strain":"afg","xp":2250,"care":[[33182845,"watered","c"],[33080880,"watered","c"]],"aff":[],"planted":33080870,"stage":1,"substage":2},"a55":{"owner":"hotsauceislethal","strain":"afg","xp":2250,"care":[[33192595,"watered"],[33165235,"watered","c"],[33134288,"watered","c"]],"aff":[],"planted":33081400,"stage":1,"substage":4,"id":"a55"},"e37":{"owner":"hotsauceislethal","strain":"lb","xp":2250,"care":[[33192595,"watered","c"],[33165235,"watered","c"],[33134288,"watered","c"]],"aff":[],"planted":33081420,"stage":1,"substage":4,"id":"e37"},"b49":{"owner":"hotsauceislethal","strain":"afg","xp":2250,"care":[[33192595,"watered","c"],[33165235,"watered","c"],[33134288,"watered","c"]],"aff":[],"planted":33081456,"stage":1,"substage":5,"id":"b49"},"f16":{"owner":"hotsauceislethal","strain":"aca","xp":2250,"care":[[33192595,"watered"],[33165235,"watered","c"],[33134288,"watered","c"]],"aff":[],"planted":33081480,"stage":1,"substage":4,"id":"f16"},"d37":{"owner":"hotsauceislethal","strain":"pam","xp":2250,"care":[[33192595,"watered","c"],[33165235,"watered","c"],[33134288,"watered","c"]],"aff":[],"planted":33081510,"stage":1,"substage":4,"id":"d37"},"c49":{"owner":"hotsauceislethal","strain":"cht","xp":2250,"care":[[33192595,"watered"],[33165235,"watered","c"],[33134288,"watered","c"]],"aff":[],"planted":33081531,"stage":1,"substage":4,"id":"c49"},"a56":{"owner":"abrockman","strain":"mal","xp":2250,"care":[[33195495,"watered"],[33195143,"watered"],[33173601,"watered","c"]],"aff":[],"planted":33113800,"stage":1,"substage":3,"id":"a56"},"b50":{"owner":"abrockman","strain":"aca","xp":2250,"care":[[33195495,"watered","c"],[33195143,"watered"],[33173601,"watered"]],"aff":[],"planted":33113805,"stage":1,"substage":2,"id":"b50"},"c50":{"owner":"abrockman","strain":"swz","xp":2250,"care":[[33195495,"watered"],[33195143,"watered"],[33173601,"watered","c"]],"aff":[],"planted":33113814,"stage":1,"substage":3,"id":"c50"},"d38":{"owner":"aggamun","strain":"afg","xp":2250,"care":[[33177423,"watered","c"],[33152003,"watered","c"],[33148325,"watered"],[33135728,"watered","c"]],"aff":[],"planted":33135669,"stage":1,"substage":3,"id":"d38"},"c51":{"owner":"aggamun","strain":"cht","xp":2250,"care":[[33177423,"watered"],[33152003,"watered","c"],[33148325,"watered"],[33135728,"watered","c"]],"aff":[],"planted":33135674,"stage":1,"substage":2,"id":"c51"},"a57":{"owner":"guiltyparties","strain":"lb","xp":2250,"care":[[33193502,"watered"]],"aff":[],"planted":33193480,"stage":1,"substage":0,"id":"a57"},"d40":{"owner":"abrockman","strain":"hk","xp":2250,"care":[[33195495,"watered"]],"aff":[],"planted":33195341,"stage":1,"substage":0,"id":"d40"},"e38":{"owner":"abrockman","strain":"dp","xp":2250,"care":[[33195495,"watered","c"]],"aff":[],"planted":33195346,"stage":1,"substage":1,"id":"e38"},"f17":{"owner":"abrockman","strain":"lb","xp":2250,"care":[[33195495,"watered"]],"aff":[],"planted":33195357,"stage":1,"substage":0,"id":"f17"},"a58":{"owner":"abrockman","strain":"aca","xp":2250,"care":[[33195495,"watered"]],"aff":[],"planted":33195363,"stage":1,"substage":0,"id":"a58"},"f18":{"owner":"abrockman","strain":"kbr","xp":2250,"care":[[33195495,"watered"]],"aff":[],"planted":33195379,"stage":1,"substage":0,"id":"f18"},"b51":{"owner":"abrockman","strain":"mis","xp":2250,"care":[[33195495,"watered","c"]],"aff":[],"planted":33195408,"stage":1,"substage":1,"id":"b51"},"c52":{"owner":"abrockman","strain":"kbr","xp":2250,"care":[[33195495,"watered"]],"aff":[],"planted":33195420,"stage":1,"substage":0,"id":"c52"},"e39":{"owner":"abrockman","strain":"aca","xp":2250,"care":[[33195495,"watered","c"]],"aff":[],"planted":33195425,"stage":1,"substage":1,"id":"e39"},"a59":{"owner":"abrockman","strain":"swz","xp":2250,"care":[[33195495,"watered"]],"aff":[],"planted":33195470,"stage":1,"substage":0,"id":"a59"},"d41":{"owner":"abrockman","strain":"kmj","xp":2250,"care":[[33195495,"watered"]],"aff":[],"planted":33195475,"stage":1,"substage":0,"id":"d41"},"f19":{"owner":"disregardfiat","strain":"cg","xp":2250,"care":[[33197785,"watered"]],"aff":[],"planted":33197746,"stage":1,"substage":0,"id":"f19"},"d39":{"owner":"guiltyparties","strain":"pam","xp":2250,"care":[[33202308,"watered"]],"aff":[],"planted":33202294,"stage":1,"substage":0,"id":"d39"}},"users":{"a1-shroom-spores":{"addrs":["a1"],"seeds":[{"strain":"cht","xp":1},{"strain":"tha","xp":1},{"strain":"pam","xp":2250},{"strain":"dp","xp":1},{"strain":"ach","xp":1},{"strain":"cg","xp":1},{"strain":"mal","xp":1},{"strain":"kmj","xp":1},{"strain":"kbr","xp":1},{"strain":"lkg","xp":1},{"strain":"afg","xp":1},{"strain":"lb","xp":2250}],"inv":[],"stats":[],"v":0},"shinedojo":{"addrs":["e1"],"seeds":[],"inv":[],"stats":[],"v":1},"jonyoudyer":{"addrs":["a2","a3","e11","f9","b42","c43","d36"],"seeds":[],"inv":[],"stats":[],"v":0,"a":1,"u":0},"em3di":{"addrs":["e2"],"seeds":[],"inv":[],"stats":[],"v":1},"timetraveljesus":{"addrs":["a4","e3"],"seeds":[],"inv":[],"stats":[],"v":2},"onlyzul":{"addrs":["a5","d1","d2","e5"],"seeds":[],"inv":[],"stats":[],"v":4},"besancia":{"addrs":["a6"],"seeds":[],"inv":[],"stats":[],"v":1},"prettynicevideo":{"addrs":["a7","a8","e6","f1"],"seeds":[{"strain":"afg","xp":2250},{"strain":"cg","xp":2250},{"strain":"hk","xp":2250},{"strain":"pam","xp":2250}],"inv":[],"stats":[],"v":0},"ghosthunter1":{"addrs":["a9","b1","e7"],"seeds":[{"strain":"kbr","xp":2250},{"strain":"cg","xp":2250}],"inv":[],"stats":[],"v":0},"qwoyn":{"addrs":["a10","c46"],"seeds":[{"strain":"lb","xp":2250},{"strain":"hk","xp":2250}],"inv":[],"stats":[],"v":1},"disregardfiat":{"addrs":["e8","f19"],"seeds":[],"inv":[],"stats":[],"v":0},"azuremoon":{"addrs":["e12"],"seeds":[],"inv":[],"stats":[],"v":1},"bluntsmasha":{"addrs":["a11","b2","c1","f2"],"seeds":[{"strain":"aca","xp":750}],"inv":[],"stats":[],"v":0},"thehermitmonk":{"addrs":["b45","b46","e30"],"seeds":[],"inv":[],"stats":[],"v":0},"tryp":{"addrs":["a12","a13","a14","c3","c4"],"seeds":[],"inv":[],"stats":[],"v":5},"highroadseeds":{"addrs":["c5","c6"],"seeds":[{"strain":"dp","xp":2250},{"strain":"aca","xp":2250}],"inv":[],"stats":[],"v":0},"mrkhuffins":{"addrs":["a15","b3","c7","d3"],"seeds":[],"inv":[],"stats":[],"v":4},"allcapsonezero":{"addrs":["b4"],"seeds":[],"inv":[],"stats":[],"v":1},"nelsius":{"addrs":["a16"],"seeds":[],"inv":[],"stats":[],"v":1},"luegenbaron":{"addrs":["b5","c37","e16"],"seeds":[],"inv":[],"stats":[],"v":0,"a":1,"u":0},"ngc":{"addrs":["a17","a18","a19","a20","a21","a22","a23","a24","a25","a26","a27","a28","a29","a30","a31","a32","a33","a34","a35","a36","a37","a38","a39","a40","a41","a42","b6","b7","b8","b9","b10","b11","b12","b13","b14","b15","b16","b17","b18","b19","b20","b21","b22","b23","b24","b25","b26","b27","b28","b29","b30","b31","c8","c9","c10","c11","c12","c13","c14","c15","c16","c17","c18","c19","c20","c21","c22","c23","c24","c25","c26","c27","c28","c29","c30","c31","c32","c33","d4","d5","d6","d7","d8","d9","d10","d11","d12","d13","d14","d15","d16","d17","d18","d19","d20","d21","d22","d23","d24","d25","d26","d27","d28","d29"],"seeds":[{"strain":"afg","xp":2250},{"strain":"lkg","xp":2250},{"strain":"cg","xp":2250},{"strain":"mis","xp":2250},{"strain":"lb","xp":2250},{"strain":"kbr","xp":2250},{"strain":"aca","xp":2250},{"strain":"swz","xp":2250},{"strain":"kmj","xp":2250},{"strain":"dp","xp":2250},{"strain":"mal","xp":2250},{"strain":"pam","xp":2250},{"strain":"cg","xp":2250}],"inv":[],"stats":[],"v":106},"sooflauschig":{"addrs":["b32"],"seeds":[],"inv":[],"stats":[],"v":0},"pangoli":{"addrs":["b33"],"seeds":[],"inv":[],"stats":[],"v":1},"fracasgrimm":{"addrs":["b34","b40"],"seeds":[{"strain":"aca","xp":750}],"inv":[],"stats":[],"v":0,"a":1,"u":0},"gregorypatrick":{"addrs":["a43"],"seeds":[{"strain":"hk","xp":2250},{"strain":"dp","xp":2250}],"inv":[],"stats":[],"v":0},"markegiles":{"addrs":["a44","b35","c34","d30","e10"],"seeds":[],"inv":[],"stats":[],"v":4},"cowboyblazerfan":{"addrs":["a45"],"seeds":[],"inv":[],"stats":[],"v":1},"movingman":{"addrs":["a46"],"seeds":[],"inv":[],"stats":[],"v":0},"dantrevino":{"addrs":["b36"],"seeds":[],"inv":[],"stats":[],"v":1},"eldun":{"addrs":["b37","f3"],"seeds":[],"inv":[],"stats":[],"v":3},"napoleon2702":{"addrs":["a47","b38","c35","d31","e9","f4"],"seeds":[],"inv":[],"stats":[],"v":6},"geekpowered":{"addrs":["f5"],"seeds":[],"inv":[],"stats":[],"v":1},"greenhouseradio":{"addrs":[],"seeds":[],"inv":[],"stats":[],"v":0,"a":0,"u":0},"eirik":{"addrs":["c36"],"seeds":[],"inv":[],"stats":[],"v":0,"a":0,"u":0},"onthewayout":{"addrs":["f6","f15"],"seeds":[],"inv":[],"stats":[],"v":0,"a":0,"u":0},"californiacrypto":{"addrs":["a48"],"seeds":[],"inv":[],"stats":[],"v":0,"a":0,"u":0},"smartsteem":{"addrs":[],"seeds":[],"inv":[],"stats":[],"v":0,"a":0,"u":0},"booster":{"addrs":[],"seeds":[],"inv":[],"stats":[],"v":0,"a":0,"u":0},"steemvotesio":{"addrs":[],"seeds":[],"inv":[],"stats":[],"v":0,"a":0,"u":0},"steemlike":{"addrs":[],"seeds":[],"inv":[],"stats":[],"v":0,"a":0,"u":0},"blocktrades":{"addrs":[],"seeds":[],"inv":[],"stats":[],"v":0,"a":2,"u":0},"pugqueen":{"addrs":["e13"],"seeds":[],"inv":[],"stats":[],"v":0,"a":1,"u":0},"mondoshawan":{"addrs":["e14","e15","b41","c38"],"seeds":[],"inv":[],"stats":[],"v":0,"a":1,"u":0},"stephanus":{"addrs":["b39"],"seeds":[],"inv":[],"stats":[],"v":0,"a":1,"u":0},"inthenow":{"addrs":["a49"],"seeds":[],"inv":[],"stats":[],"v":0,"a":1,"u":0},"qwoyn-fund":{"addrs":["f7"],"seeds":[{"strain":"aca","xp":2250}],"inv":[],"stats":[],"v":0,"a":1,"u":0},"jrawsthorne":{"addrs":["f8"],"seeds":[],"inv":[],"stats":[],"v":0},"buckydurddle":{"addrs":["e17"],"seeds":[],"inv":[],"stats":[],"v":0},"ecoinstar":{"addrs":["d32","a52","b48","c44","e32","f14"],"seeds":[],"inv":[],"stats":[],"v":0},"choosefreedom":{"addrs":["f11","e35"],"seeds":[],"inv":[],"stats":[],"v":0},"abrockman":{"addrs":["a50","b43","c39","d33","e29","f12","a56","b50","c50","d40","e38","f17","a58","b51","c52","d41","e39","f18","a59"],"seeds":[],"inv":[],"stats":[],"v":0},"romiferns":{"addrs":["c40"],"seeds":[],"inv":[],"stats":[],"v":0},"mulletwang":{"addrs":["a51","b44","c41","d34","e18","f10","e19","e20","e21","e22","e23","e24","e25","e26","e27","e28"],"seeds":[],"inv":[],"stats":[],"v":0},"simgirl":{"addrs":["e31","f13","b47","d35"],"seeds":[],"inv":[],"stats":[],"v":0},"tygertyger":{"addrs":["c42"],"seeds":[],"inv":[],"stats":[],"v":0},"richardcrill":{"addrs":["e33"],"seeds":[],"inv":[],"stats":[],"v":0},"molovelly":{"addrs":["e34","c47"],"seeds":[],"inv":[],"stats":[],"v":0,"a":0,"u":0},"mickvir":{"addrs":["c45"],"seeds":[],"inv":[],"stats":[],"v":0},"anarcist69":{"addrs":["a53","e36"],"seeds":[],"inv":[],"stats":[],"v":0},"gamewatch":{"addrs":["c48"],"seeds":[],"inv":[],"stats":[],"v":0},"patrickulrich":{"addrs":["a54"],"seeds":[],"inv":[],"stats":[],"v":0},"hotsauceislethal":{"addrs":["a55","b49","c49","d37","e37","f16"],"seeds":[],"inv":[],"stats":[],"v":0},"aggamun":{"addrs":["c51","d38"],"seeds":[],"inv":[],"stats":[],"v":0},"steembeem":{"addrs":[],"seeds":[],"inv":[],"stats":[],"v":0,"a":0,"u":0},"guiltyparties":{"addrs":["a57","d39"],"seeds":[],"inv":[],"stats":[],"v":0}},"news":{"a":[],"b":[],"c":[],"d":[],"f":[],"g":[],"h":[],"i":[],"t":[],"e":[]},"payday":[],"blacklist":{}}
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
            if (sun - state.stats.offsets[o] == 1200) {
               popWeather(o)
               .then(function(e,r){
                   console.log(r)
                    autoPoster(r,num)
               })
            }
            if (sun - state.stats.offsets[o] == 1500) {
               state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
            }
        }
        for (var i = 0; i < td.length; i++) {
            daily(td[i])
        }
        if (num % 125 === 0 && state.refund.length && processor.isStreaming() || processor.isStreaming() && state.refund.length > 60) {
            if (state.refund[0].length == 4) bot[state.refund[0][0]].call(this, state.refund[0][1], state.refund[0][2], state.refund[0][3])
            if (state.refund[0].length == 3) bot[state.refund[0][0]].call(this, state.refund[0][1], state.refund[0][2])
            if (state.refund[0].length == 2) {
                var op = true, bens = false
                try {
                    if (state.refund[1][1] == 'comment_options') op = false
                    if (state.refund[1][1].extentions[0][1].beneficiaries.length) bens = true
                } catch (e) {}
                if(op || bens){bot[state.refund[0][0]].call(this, state.refund[0][1])} else {
                    state.refund.shift()
                }
            }
            state.refund.push(state.refund.shift())
        }
        if (num % 100 === 0 && !processor.isStreaming()) {
            if(!state.news.e)state.news.e=[]
            client.database.getDynamicGlobalProperties().then(function(result) {
                console.log('At block', num, 'with', result.head_block_number - num, 'left until real-time.')
            });
        }

        if (num % 1000 === 0 && processor.isStreaming()) {
            if(!state.blacklist)state.blacklist={}
            ipfsSaveState(num, JSON.stringify(state))
        }

        if (num % 28800 === 20000 && state.payday.length) {
            console.log("?"+num)
            state.payday[0] = sortExtentions(state.payday[0],'account')
        var body = `## Upcoming daily overall economy reports\n`
        var footer = `\n[Visit us today](https://www.qwoyn.io) to get growing and earning on the Steem Blockchain with the push of a button!`
            if (state.news.h.length > 0){
                body = body + state.news.h[0] + footer ;state.news.h.shift();
            } else {
                body = body + `\n#### This guide should help you decide the perfect strain for your garden on Planet Hashkings. The place to grow virtual cannabis on the blockchain!` + footer
            }
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
        if (num % 28800 === 20300 && state.payday && state.payday[0].length) {
            console.log("?"+num)
            state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
        }
        if (num % 28800 === 25000 && state.payday.length) {
            console.log("?"+num)

            state.payday[0] = sortExtentions(state.payday[0],'account')
        var body = `## Information Feed\n`
            var footer = `\n[Visit us today](https://www.qwoyn.io) to get growing and earning on the Steem Blockchain with the push of a button!`
            if (state.news.i.length > 0){
                body = body + state.news.i[0] + footer ;state.news.i.shift();
            } else {
                body = body + `\n#### This guide should help you decide the perfect strain for your garden on Planet Hashkings. The place to grow virtual cannabis on the blockchain!` + footer
            }
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
        if (num % 28800 === 25300 && state.payday && state.payday.length) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        if (num % 28800 === 22000 && state.payday[0].length) {
            console.log("?"+num)
            state.payday[0] = sortExtentions(state.payday[0],'account')
        var body = `## Tent Growers Coming Soon\n`
            var footer = `\n[Visit us today](https://www.qwoyn.io) to get growing and earning on the Steem Blockchain with the push of a button!`
            if (state.news.t.length > 0){
                body = body + state.news.t[0] + footer ;state.news.t.shift();
            } else {
                body = body + `\n#### This guide should help you decide the perfect strain for your garden on Planet Hashkings. The place to grow virtual cannabis on the blockchain!` + footer
            }
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
    if (num % 28800 === 22300) {
        console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        if (num % 28800 === 28750) {
            state.payday = whotopay()
        }
        if (num % 28800 === 0) {
            var d = parseInt(state.bal.c / 4)
            state.bal.r += state.bal.c
            if (d) {
                state.refund.push(['xfer', 'disregardfiat', d, 'Dev Cut'])
                state.refund.push(['xfer', 'qwoyn-fund', d, 'Partners Cut'])
                state.refund.push(['xfer', 'qwoyn', d, 'Producer Cut'])
                state.bal.c -= d * 3
                d = parseInt(state.bal.c / 5) * 2
                state.refund.push(['xfer', 'jrawsthorne', d, 'Partner Cut'])
                state.bal.c -= d
                state.refund.push(['xfer', 'qwoyn-chest', state.bal.c, 'Warchest'])
                state.bal.c = 0
                state.refund.push(['power', username, state.bal.b, 'Power to the people!'])
            }
    }
  })

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
/*
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
*/
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
                if(state.users[from].seeds.length)seed=state.users[from].seeds.splice(0, 1)
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
  if(json.delegatee == username){
    for (var i = 0; i < state.delegations.length; i++) {
      if (state.delegations[i].delegator == json.delegator) {
        record = state.delegations.splice(i, 1)
        break;
      }
    }
      console.log(json.delegator, vests,record)
    if (!state.users[json.delegator] && json.delegatee == username) state.users[json.delegator] = {
      addrs: [],
      seeds: [],
      inv: [],
      stats: [],
      v: 0
    }
    var availible = parseInt(vests / (state.stats.prices.listed.a * (state.stats.vs) * 1000)),
    used = 0;
    if (record) {
      const use = record.used || 0
      if (record.vests < vests) {
        availible = parseInt(availible) - parseInt(use);
        used = parseInt(use)
      } else {
        if (use > availible) {
          var j = parseInt(use) - parseInt(availible);
          for (var i = state.users[json.delegator].addrs.length - j; i < state.users[json.delegator].addrs.length; i++) {
            delete state.land[state.users[json.delegator].addrs[i]];
            state.users[json.delegator].addrs.pop()
            state.lands.forSale.push(state.users[json.delegator].addrs[i])
          }
          used = parseInt(availible)
          availible = 0
        } else {
          availible = parseInt(availible) - parseInt(use)
          used = parseInt(use)
        }
      }
      }
      state.delegations.push({
        delegator: json.delegator,
        vests,
        availible,
        used
      })
  }
});
    processor.onOperation('transfer', function(json) {
        if (json.to == username && json.amount.split(' ')[1] == 'STEEM') {
            fetch(`http://blacklist.usesteem.com/user/${json.from}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                if(myJson.blacklisted.length == 0){
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
                    if (state.stats.supply.strains.indexOf(type) < 0){ type = state.stats.supply.strains[state.users.length % (state.stats.supply.strains.length -1)]}
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
                } else {
                    if (state.blacklist[json.from]){
                        var users = parseInt(amount/2),
                            ops = parseInt(amount - users)
                        state.balance.b += users
                        state.bal.c += ops
                    } else {
                        state.bal.r += amount
                        state.refund.push(['xfer', json.from, amount, 'This account is on the global blacklist. You may remove your delegation, any further transfers will be treated as donations.'])
                        state.blacklist[json.from] = true
                        console.log(`${json.from} blacklisted`)
                    }
                }
            })

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
        if(json.block > processor.getCurrentBlockNumber() - 1000){
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
        )} else {state.refund.splice(0,1)}
    },
    sign: function(op, callback) {
        console.log('attempting'+op[0])
        client.broadcast.sendOperations(op, key).then(
            function(result) {
                console.log(result)
            },
            function(error) {
                console.log(error)
                state.refund.pop()
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
        }, // 10 arrays for bennies
        b = 0, // counter
        c = 0, // counter
        h = 1, // top value
        o = [] // temp array
    for (d in state.kudos) {
        c = parseInt(c) + parseInt(state.kudos[d]) // total kudos
        if (state.kudos[d] > h) { // top kudos(for sorting)
            h = state.kudos[d]
        };
        if (state.kudos[d] == 1) { // for sorting , unshift 1 assuming most will be 1
            o.unshift({
                account: d,
                weight: 1
            })
        } else {
            if(!o.length){o.unshift({ //if nothing to sort, unshift into array
                account: d,
                weight: parseInt(state.kudos[d])
            })}
            for (var i = o.length - 1; i > 0; i--) { // insert sort
                    if (state.kudos[d] <= o[i].weight) {
                        o.splice(i, 0, {
                            account: d,
                            weight: parseInt(state.kudos[d])
                        });
                        break;
                    } else if (state.kudos[d] > o[o.length-1].weight) {
                        o.push({
                            account: d,
                            weight: parseInt(state.kudos[d])
                        });
                        break;
                    }
            }
        }
    }
    if (o.length > (maxEx * 10)) {
        b = (maxEx * 10)
    } else {
        b = o.length
    }
    while (b) { // assign bennies to posts, top kudos down
        for (var r in a) {
            a[r].push(o.pop());
            b--
            if(!b)break;
        }
    }
    state.kudos = {} //put back bennies over the max extentions limit
        for (var i = 0; i < o.length; i++) {
            state.kudos[o[i].account] = parseInt(o[i].weight)
        }
    for (var r in a) { //weight the 8 accounts in 10000
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

function sortExtentions(a, key) {
    var b=[],c=[]
    for(i=0;i<a.length;i++){
        b.push(a[i][key])
    }
    b = b.sort()
    for(i=0;i<a.length;i++){
        if(a[i][key]==b[0]){
            c.push(a[i])
            b.shift()
            i=0
            if(c.length==a.length)break;
        }
    }
    return c
}

function kudo(user) {
    console.log('Kudos: ' + user)
    if (!state.kudos[user]) {
        state.kudos[user] = 1
    } else {
        state.kudos[user]++
    }
}

function popWeather (loc){
    return new Promise((resolve, reject) => {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${state.stats.env[loc].lat}&lon=${state.stats.env[loc].lon}&APPID=${wkey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(r) {
            var tmin=400,tmax=0,tave=0,precip=0,h=0,p=[],c=[],w={s:0,d:0},s=[],d=r.list[0].wind.deg
            for(i=0;i<8;i++){
                tave += parseInt(parseFloat(r.list[i].main.temp)*100)
                if(r.list[i].main.temp > tmax){tmax = r.list[i].main.temp}
                if(r.list[i].main.temp < tmin){tmin = r.list[i].main.temp}
                h = r.list[i].main.humidity
                c = parseInt(c + parseInt(r.list[i].clouds.all))
                if(r.list[i].rain){
                    precip = parseFloat(precip) + parseFloat(r.list[i].rain['3h'])
                }
                s = r.list[i].wind.speed
            }
            tave = parseFloat(tave/800).toFixed(1)
            c = parseInt(c/8)
            state.stats.env[loc].weather = {
                high: tmax,
                low: tmin,
                avg: tave,
                precip,
                clouds: c,
                humidity: h,
                winds: s,
                windd: d
            }
            resolve(loc)
        }).catch(e=>{
            reject(e)
        })
    })
}

function autoPoster (loc, num) {
    var body = `# ${state.stats.env[loc].name} Growers Daily News\n`, bens = ''
    var footer = `\n[Visit us today](https://www.qwoyn.io) to get growing and earning on the Steem Blockchain with the push of a button!`
    if (state.news[loc].length > 0){
        body = body + state.news[loc][0];state.news[loc].shift();
    }
    body = body + `\n## Todays Weather\nYou can expect ${cloudy(state.stats.env[loc].weather.clouds)} with a high of ${parseFloat(state.stats.env[loc].weather.high - 272.15).toFixed(1)}_C. Winds will be out of the ${metWind(state.stats.env[loc].weather.windd)} at ${state.stats.env[loc].weather.winds} M/s. `
    if (state.stats.env[loc].weather.precip){body = body + `Models predict ${state.stats.env[loc].weather.precip}mm of rain. `}
    body = body + `Relative humidity will be around ${state.stats.env[loc].weather.humidity}% and a low of ${state.stats.env[loc].weather.low}_C overnight.\n` + footer
    var ops = [["comment",
                         {"parent_author": "",
                          "parent_permlink": 'hashkings',
                          "author": username,
                          "permlink": 'h'+num,
                          "title": `Hashkings Almanac for ${state.stats.env[loc].name} | ${num}`,
                          "body": body,
                          "json_metadata": JSON.stringify({tags:["hashkings"]})}]]
    if(state.payday.length){
        state.payday[0] = sortExtentions(state.payday[0],'account')
        bens = ["comment_options",
                         {"author": username,
                          "permlink": 'h'+num,
                          "max_accepted_payout": "1000000.000 SBD",
                          "percent_steem_dollars": 10000,
                          "allow_votes": true,
                          "allow_curation_rewards": true,
                          "extensions":
                          [[0,
                            {"beneficiaries":state.payday[0]}]]}]
        ops.push(bens)
        state.payday.shift()
    }
    state.refund.push(['sign',ops])
}

function cloudy(per){
    const range = parseInt(per/20)
    switch(range){
        case 4:
            return 'cloudy skies'
            break;
        case 3:
            return 'mostly cloudy skies'
            break;
        case 2:
            return 'scattered clouds in the sky'
            break;
        case 1:
            return 'mostly clear skies'
            break;
        default:
            return 'clear skies'

    }
}
function metWind(deg){
    const range = parseInt((deg-22.5)/8)
    switch(range){
        case 7:
            return 'North'
            break;
        case 6:
            return 'Northwest'
            break;
        case 5:
            return 'West'
            break;
        case 4:
            return 'Southwest'
            break;
        case 3:
            return 'South'
            break;
        case 2:
            return 'Southeast'
            break;
        case 1:
            return 'East'
            break;
        default:
            return 'Northeast'

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
                    }}}}}}
