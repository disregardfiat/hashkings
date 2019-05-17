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
var state = require('./state.js')
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
                var data = JSON.parse(file.toString());
                startingBlock = data[0]
                state = JSON.parse(data[1]);
                if (data[0] < 32600000)state.refund = []
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
        if (num % 125 === 0 && state.refund.length && processor.isStreaming() || processor.isStreaming() && state.refund.length > 60) {
            if (state.refund[0].length == 4) bot[state.refund[0][0]].call(this, state.refund[0][1], state.refund[0][2], state.refund[0][3])
            if (state.refund[0].length == 3) bot[state.refund[0][0]].call(this, state.refund[0][1], state.refund[0][2])
            if (state.refund[0].length == 2) bot[state.refund[0][0]].call(this, state.refund[0][1])
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
        if (num % 28800 === 2880 && state.payday[0].length) {
            console.log("?"+num)
            
            state.payday[0] = sortExtentions(state.payday[0],'account')
            var body = `## Jamaica Growers Daily News\n`
            var footer = `\n[Visit us today](https://www.qwoyn.io) to get growing and earning on the Steem Blockchain with the push of a button!`
            if (state.news.e.length > 0){
                body = body + state.news.e[0] + footer ;state.news.e.shift();
            } else {
                body = body + `\n#### This guide should help you decide the perfect strain for your garden on Planet Hashkings. The place to grow virtual cannabis on the blockchain!` + footer
            }
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
        
    if (num % 28800 === 3660 && state.payday && state.payday[0].length) {
        console.log("?"+num)
        state.payday[0] = sortExtentions(state.payday[0],'account')
            var body = `## Central America Growers Daily News\n`
            var footer = `\n[Visit us today](https://www.qwoyn.io) to get growing and earning on the Steem Blockchain with the push of a button!`
            if (state.news.d.length > 0){
                body = body + state.news.d[0] + footer ;state.news.d.shift();
            } else {
                body = body + `\n#### This guide should help you decide the perfect strain for your garden on Planet Hashkings. The place to grow virtual cannabis on the blockchain!` + footer
            }
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
        if (num % 28800 === 3960 && state.payday && state.payday[0].length) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        if (num % 28800 === 5440 && state.payday) {
            
            console.log("?"+num)
            state.payday[0] = sortExtentions(state.payday[0],'account')
            var body = `## Mexico Growers Daily News\n`
            var footer = `\n[Visit us today](https://www.qwoyn.io) to get growing and earning on the Steem Blockchain with the push of a button!`
            if (state.news.f.length > 0){
                body = body + state.news.f[0] + footer ;state.news.f.shift();
            } else {
                body = body + `\n#### This guide should help you decide the perfect strain for your garden on Planet Hashkings. The place to grow virtual cannabis on the blockchain!` + footer
            }
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
        if (num % 28800 === 5740 && state.payday && state.payday[0].length) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        if (num % 28800 === 12000 && state.payday) {
            console.log("?"+num)
            state.payday[0] = sortExtentions(state.payday[0],'account')
            var body = `## Asia Growers Daily News\n`
            var footer = `\n[Visit us today](https://www.qwoyn.io) to get growing and earning on the Steem Blockchain with the push of a button!`
            if (state.news.c.length > 0){
                body = body + state.news.c[0] + footer ;state.news.c.shift();
            } else {
                body = body + `\n#### This guide should help you decide the perfect strain for your garden on Planet Hashkings. The place to grow virtual cannabis on the blockchain!` + footer
            }
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
        if (num % 28800 === 12300 && state.payday && state.payday[0].length) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        
        if (num % 28800 === 15000) {
            console.log("?"+num)
            state.payday[0] = sortExtentions(state.payday[0],'account')
        var body = `## Afganistan Growers Daily News\n`
        var footer = `\n[Visit us today](https://www.qwoyn.io) to get growing and earning on the Steem Blockchain with the push of a button!`
            if (state.news.a.length > 0){
                body = body + state.news.a[0] + footer ;state.news.a.shift();
            } else {
                body = body + `\n#### This guide should help you decide the perfect strain for your Afganistan Garden on Planet Hashkings. The place to grow virtual cannabis on the blockchain!` + footer
            }
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
        if (num % 28800 === 15300 && state.payday && state.payday[0].length) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
    }
        if (num % 28800 === 10000 && state.payday) {
            console.log("?"+num)
            state.payday[0] = sortExtentions(state.payday[0],'account')
        var body = `## G-Series Automaton\n`
        var footer = `\n[Visit us today](https://www.qwoyn.io) to get growing and earning on the Steem Blockchain with the push of a button!`
            if (state.news.g.length > 0){
                body = body + state.news.g[0] + footer ;state.news.g.shift();
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
        if (num % 28800 === 10300 && state.payday && state.payday[0].length) {
            console.log("?"+num)
    state.refund.push(['sign',[["vote",{"author":username,"permlink":`h${num-300}`,"voter":username,"weight":10000}]]])
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
            state.payday = whotopay()
            if(state.payday[0].length){
                state.payday[0] = sortExtentions(state.payday[0],'account')
                var body = `## Africa Growers Daily News\n`
                var footer = `\n[Visit us today](https://www.qwoyn.io) to get growing and earning on the Steem Blockchain with the push of a button!`
                    if (state.news.b.length > 0){
                        body = body + state.news.b[0] + footer ;state.news.b.shift();
                    } else {
                        body = body + `Did you know the African Continent has some of the best Sativa Landraces on the planet?  From Swazi Gold to Durban Poison these tall Cannabis plants include wonderful lemon terpines that offer a nice uplifting high.

Even though Cannabis is illegal in many parts of Africa it is still prominent throughout the continent with South Africa, Algeria, Nigeria and the Congo leading the way in Cannabis production.

![swz.png](https://files.steempeak.com/file/steempeak/hashkings/Z2WtzWRO-swz.png)
South Africa, specifically Swaziland is known for its Swazi Gold.. According to Leafly this strain is know for its "sweet, citrus flavor and fast-acting effects. Designed to withstand the harsh conditions of its mountainous homeland"

---

![durban.png](https://files.steempeak.com/file/steempeak/hashkings/Av1Kz44T-durban.png)
Another fan favorite which grows on the southern coast of Africa is Durban Poison. Leafly describes this plant as, "the perfect strain to help you stay productive through a busy day, when exploring the outdoors, or to lend a spark of creativity." We agree with them and absolutely recommend this strain which we have seen grown outdoor to over 10 Feet in height.

---

![kmj.png](https://files.steempeak.com/file/steempeak/hashkings/hPRQeSPX-kmj.png)
You may have heard of the tallest mountain in Africa but have you heard of this monster Sativa?  Kilimanjaro, as the name suggests, this strain grows in the mountains of Tanzania and is described, according to leafly, as the “elephant stomper”. Visit our [seedbank](https://www.qwoyn.io/#/market/seedbank) and get yourself this African Sativa today.

---

![mal.png](https://files.steempeak.com/file/steempeak/hashkings/Jidk0AM5-mal.png)
One of the most famous Strains in our list of Seeds is the Malawi. This strain grows in Southeastern Africa and is perfect for making hash. Leafly describes it as, a strain that takes 120 days to finish flowering and "produces long and resin-coated buds"

![weed_divider.png](https://files.steempeak.com/file/steempeak/hashkings/RVcc2WGY-weed_divider.png)

#### This guide should help you decide the perfect strain for your African Garden on Planet Hashkings. The place to grow virtual cannabis on the blockchain!` + footer
                    }
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
            }
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
    if (o.length > (maxEx * 10)) {
        b = (maxEx * 10)
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
