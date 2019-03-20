var steem = require('dsteem');
var steemState = require('steem-state');
var steemTransact = require('steem-transact');
var fs = require('fs');
const cors = require('cors');
const express = require('express')
const ENV = process.env;
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
const app = express()
const port = ENV.PORT || 3000;
app.use(cors())
app.get('/p/:addr', (req, res, next) => {
  let addr = req.params.addr
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(state.land[addr], null, 3))
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
  res.send(JSON.stringify({refunds:state.refund,bal:state.bal}, null, 3))
});

app.get('/u/:user', (req, res, next) => {
  let user = req.params.user
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(state.users[user], null, 3))
});

app.listen(port, () => console.log(`HASHKINGS token API listening on port ${port}!`))
var state = {
  stats:{
    dust:25,
    time:31159798,
    offsets:{a:9600,b:21600,c:0,d:19200,e:20400,f:7200},
    bu:'',bi:0,
    prices:{
      listed:{
	a:20000,
	b:20000,
	c:20000,
	d:20000,
	e:20000,
	f:20000,
	t:20000,
	seeds:{
	  reg:750,
	  mid:1500,
	  top:3000	
	},
	supplies:{
	  	
	}
      },
      purchase:{
	land:19500
      }
    },
    supply:{
      land:{a:4153,ac:47,b:4162,bc:38,c:4165,cc:35,d:4169,dc:31,e:4191,ec:9,f:4195,fc:5,g:0,gc:0,t:420000,tc:0,counter:0},
      strains:['hk','afg','lkg','mis','lb','kbr','aca','swz','kmj','dp','mal','pam','cg','ach','tha','cht']
    },
  },
  bal:{r:0,c:0,b:0,p:0},
  refund:[],
  lands:{forSale:[]},
  land:{},
  users:{
      "a1-shroom-spores":{addrs:['a1'],seeds:[],inv:[],stats:[],v:1},
      "shinedojo":{addrs:['e1'],seeds:[],inv:[],stats:[],v:1},
      "jonyoudyer":{addrs:['a2','a3'],seeds:[],inv:[],stats:[],v:2},
      "em3di":{addrs:['e2'],seeds:[],inv:[],stats:[],v:1},
      "timetraveljesus":{addrs:['a4','e3'],seeds:[],inv:[],stats:[],v:2},
      "onlyzul":{addrs:['a5','d1','d2','e5'],seeds:[],inv:[],stats:[],v:4},
      "besancia":{addrs:['a6'],seeds:[],inv:[],stats:[],v:1},
      "prettynicevideo":{addrs:['a7','a8','e6','f1'],seeds:[],inv:[],stats:[],v:6},
      "ghosthunter1":{addrs:['a9','b1','e7'],seeds:[],inv:[],stats:[],v:3},
      "qwoyn":{addrs:['a10'],seeds:[],inv:[],stats:[],v:1},
      "disregardfiat":{addrs:['e8'],seeds:[],inv:[],stats:[],v:1},
      "bluntsmasha":{addrs:['a11','b2','c1','f2'],seeds:[],inv:[],stats:[],v:4},
      "tryp":{addrs:['a12','a13','a14','c3','c4'],seeds:[],inv:[],stats:[],v:5},
      "highroadseeds":{addrs:['c5','c6'],seeds:[],inv:[],stats:[],v:2},
      "mrkhuffins":{addrs:['a15','b3','c7','d3'],seeds:[],inv:[],stats:[],v:4},
      "allcapsonezero":{addrs:['b4'],seeds:[],inv:[],stats:[],v:1},
      "nelsius":{addrs:['a16'],seeds:[],inv:[],stats:[],v:1},
      "luegenbaron":{addrs:['b5'],seeds:[],inv:[],stats:[],v:1},
      "ngc":{addrs:['a17','a18','a19','a20','a21','a22','a23','a24','a25','a26','a27','a28','a29','a30','a31','a32','a33','a34','a35','a36','a37','a38','a39','a40','a41','a42','b6','b7','b8','b9','b10','b11','b12','b13','b14','b15','b16','b17','b18','b19','b20','b21','b22','b23','b24','b25','b26','b27','b28','b29','b30','b31','c8','c9','c10','c11','c12','c13','c14','c15','c16','c17','c18','c19','c20','c21','c22','c23','c24','c25','c26','c27','c28','c29','c30','c31','c32','c33','d4','d5','d6','d7','d8','d9','d10','d11','d12','d13','d14','d15','d16','d17','d18','d19','d20','d21','d22','d23','d24','d25','d26','d27','d28','d29'],seeds:[],inv:[],stats:[],v:120},
      "sooflauschig":{addrs:['b32'],seeds:[],inv:[],stats:[],v:1},
      "pangoli":{addrs:['b33'],seeds:[],inv:[],stats:[],v:1},
      "fracasgrimm":{addrs:['b34'],seeds:[],inv:[],stats:[],v:1},
      "gregorypatrick":{addrs:['a43'],seeds:[],inv:[],stats:[],v:1},
      "markegiles":{addrs:['a44','b35','c34','d30'],seeds:[],inv:[],stats:[],v:4},
      "cowboyblazerfan":{addrs:['a45'],seeds:[],inv:[],stats:[],v:1},
      "movingman":{addrs:['a46'],seeds:[],inv:[],stats:[],v:1},
      "dantrevino":{addrs:['b36'],seeds:[],inv:[],stats:[],v:1},
      "eldun":{addrs:['b37','f3'],seeds:[],inv:[],stats:[],v:3},
      "napoleon2702":{addrs:['a47','b38','c35','d31','e9','f4'],seeds:[],inv:[],stats:[],v:6},
      "geekpowered":{addrs:['f5'],seeds:[],inv:[],stats:[],v:1}
  }
}
var startingBlock = ENV.STARTINGBLOCK || 31152000;     //GENESIS BLOCK
const username = ENV.ACCOUNT || 'hashkings';//account with all the SP
const key = ENV.KEY; //active key for account

const prefix = ENV.PREFIX || 'qwoyn_';
const clientURL = ENV.APIURL || 'https://api.steemit.com'
var client = new steem.Client(clientURL);
var processor;

const transactor = steemTransact(client, steem, prefix);


startWith()
function startWith (sh){
  if (sh){
console.log(`Attempting to start from IPFS save state ${sh}`);
  ipfs.cat(sh, (err, file) => {
    if (!err){
      var data = JSON.parse(file);
      startingBlock = data[0]
      state = data[1];
      startApp();
    } else {
      startApp()
      console.log(`${sh} failed to load, Replaying from genesis.\nYou may want to set the env var engineCrank`)
    }
  });
} else { startApp()}
}

function startApp() {
  processor = steemState(client, steem, startingBlock, 10, prefix);


 processor.onBlock(function(num, block) {
    const sun = num - state.stats.time % 28800
    var td = []
    for(var o in state.stats.offsets){if(sun-state.stats.offsets[o]<1200&&sun-state.stats.offsets[o]>=0){td.push(`${o}${(sun-state.stats.offsets[o]*4)}`,`${o}${(sun-state.stats.offsets[o]*4)-1}`,`${o}${(sun-state.stats.offsets[o]*4)-2}`,`${o}${(sun-state.stats.offsets[o]*4)-3}`)}}
    for (var i = 0;i<td.length;i++){
      daily(td[i])
    }
    if(state.refund.length && state.bal.b > 0){
	bot[state.refund[0][0]].call(state.refund[0][1],state.refund[0][2],state.refund[0][3],state.refund[0][4])
    }
    if(num % 100 === 0 && !processor.isStreaming()) {
      client.database.getDynamicGlobalProperties().then(function(result) {
        console.log('At block', num, 'with', result.head_block_number-num, 'left until real-time.')
      });
    }

    if(num % 1000 === 0) {
      //ipfsSaveState(num, ipfs.Buffer.from(state))
    }
    if(num % 28800 === 0){
      var d = parseInt(state.bal.c/4)
      state.bal.r += state.bal.c
      state.refund.push(['xfer','disregardfiat',d,'Dev Cut'])
      state.refund.push(['xfer','qwoyn-partners',d,'Partners Cut'])
      state.refund.push(['xfer','qwoyn-wf',d,'Warchest'])
      state.bal.c -= d*3
      state.refund.push(['xfer','qwoyn',state.bal.c,'Producer Cut'])
      state.bal.c = 0
      if (state.bal.d > state.bal.b){state.bal.d -= state.bal.b;state.bal.b=0}
      else if(state.bal.d <= state.bal.b){state.bal.b -= state.bal.d;state.bal.d=0}
      state.refund.push(['power','hashkings',state.bal.b,'Producer Cut'])
    }
  });
processor.on('water', function(json, from) {
    let plants = JSON.parse(json.plants),plantnames=''
    for (var i = 0;i < plants.length;i++){
      if(state.land[plants[i]].owner==from){state.land[plants[i]].care.unshift([processor.getCurrentBlockNumber(),'watered']);plantnames +=`${plants[i]} `}
    }
    console.log(`${from} watered ${plantnames}`)
  });

processor.on('redeem', function(json, from) {
  if(state.users[from].v > 0){
    state.users[from].v--
    let type = json.type || ''
    if (state.stats.supply.strains.indexOf(type)<0)type = state.stats.supply.strains[state.users.length%state.stats.supply.strains.length]
    var xp = 2250
    var seed = {strain:type,xp:xp}
    state.users[from].seeds.push(seed)
  }
});

processor.on('adjust', function(json, from) {
    if(from == username && json.dust > 1)state.stats.dust = json.dust
    if(from == username && json.time > 1)state.stats.time = json.time
  });

  processor.on('plant', function(json, from) {
	const index = state.users[from].addrs.indexOf(json.addr)
	var seed = ''
	if(state.users[from].seeds[json.seed])seed = state.users[from].seeds.splice(json.seed,1)
	if (index>=0 && seed){
	  if(!state.land[json.addr]){
	    const parcel = {owner:from, strain: seed.strain, xp:seed.xp,care:[],aff:[],planted:processor.getCurrentBlockNumber(),stage:0,substage:0,traits:seed.traits,terps:seed.terps}
	    state.land[addr]=parcel
	  } else if (state.land[json.addr].stage < 0) {
	    state.land[addr].strain = seed.strain
	    state.land[addr].xp = seed.xp
	    state.land[addr].care = []
	    state.land[addr].aff =[]
	    state.land[addr].planted = processor.getCurrentBlockNumber()
	    state.land[addr].stage = 1
	    state.land[addr].substage = 0
	    state.land[addr].traits = seed.traits || []
	    state.land[addr].terps = seed.terps || {}
	  } else {state.users[from].seeds.push(seed);console.lol(`${from} can't plant that.`)}
	} else if (seed){state.users[from].seeds.push(seed);console.lol(`${from} doesn't own that land`)}
    	else {console.log(`${from} did a thing with a plant?`)}
  });
processor.onOperation('transfer_to_vesting', function(json){
	if(json.to == username && json.from == username){const amount = parseInt(parseFloat(json.amount*1000));state.bal.b -= amount;state.bal.p+=amount}
});
  processor.onOperation('transfer', function(json){
    if (json.to == username && json.amount.split(' ')[1] == 'STEEM'){
	    console.log('I got this')
      if (!state.users[json.from])state.user[json.from]={addrs:[],seeds:[],inv:[],stats:[],v:0}
      const amount = parseInt(parseFloat(json.amount) * 1000)
      var want = json.memo.split(" ")[0] || json.memo , type = json.memo.split(" ")[1] || ''
      console.log(want,type)
      if(state.stats.prices.listed[want]==amount  || want=='rseed' && amount==state.stats.prices.listed.seeds.reg||want=='mseed'&&amount==state.stats.prices.listed.seeds.mid||want=='tseed'&&amount==state.stats.prices.listed.seeds.top){
	      console.log('this far')
	if(state.stats.supply.land[want]){
		console.log('even further')
	  state.stats.supply.land[want]--
	  const sel = `${want}c`
	  const num = state.stats.supply.land[sel]++
	  var addr = `${want}${num}`	
	  state.users[json.from].addrs.push(addr)
	  const c = parseInt(amount*0.025)
	  state.bal.c += c
	  state.bal.b += amount - c
	  console.log(`${json.from} purchased ${addr}`)
	} else if (want=='rseed' && amount==state.stats.prices.listed.seeds.reg||want=='mseed'&&amount==state.stats.prices.listed.seeds.mid||want=='tseed'&&amount==state.stats.prices.listed.seeds.top){
		console.log('seeds?')
	  if (state.stats.supply.strains.indexOf(type)<0)type = state.stats.supply.strains[state.users.length%state.stats.supply.strains.length]
	  var xp = 1
	  if(want=='mseed')xp=750
	  if(want=='tseed')xp=2250
	  var seed = {strain:type,xp:xp}
	  console.log(seed)
	  state.users[json.from].seeds.push(seed)
	  const c = parseInt(amount*0.025)
	  state.bal.c += c
	  state.bal.b += amount - c
	  console.log(`${json.from} purchased ${addr}`)
	} else {
		console.log('refund fun')
	  state.bal.r += amount
	  state.refund.push(['xfer',json.from,amount,'We don\'t know what you wanted... have your STEEM back'])
	  console.log(`${json.from} sent a weird transfer...refund?`)
	}
      } else {
      console.log('refund fun')
	  state.bal.r += amount
	  state.refund.push(['xfer',json.from,amount,'We don\'t know what you wanted... have your STEEM back'])
	  console.log(`${json.from} sent a weird transfer...refund?`)
      }
    } else if (json.from == username){
      const amount = parseInt(parseFloat(json.amount) * 1000)
      for (var i = 0;i<state.refund.length;i++){if(state.refund[i][1] == json.to && state.refund[i][2] == amount)state.refund.splice(i,1);state.bal.r-=amount;console.log(`${json.to} refunded successfully`);break;}
    }
  });
  processor.onStreamingStart(function() {
    console.log("At real time.")
  });

  processor.start();


  var transactor = steemTransact(client, steem, prefix);
  processor.on('return', function(json, from) {
	var index = state.users[from].addrs.indexOf(json.addr)    
	if (index>=0){
	  state.lands.forSale.push(state.users[from].addrs.splice(i,1))
	  state.bal.r += state.stats.prices.purchase.land
	  if(state.bal.b - state.stats.prices.purchase.land > 0){state.bal.b -= state.stats.prices.purchase.land}else{state.bal.d += state.stats.prices.purchase.land}
	  state.refund.push(['xfer',from,state.stats.prices.purchase.land,'We\'re sorry to see you go!'])
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
  ipfs.add(hashable, (err, IpFsHash) => {
    if (!err){
      state.stats.bu = IpFsHash[0].hash
      state.stats.bi = blocknum
      console.log(current + `:Saved:  ${IpFsHash[0].hash}`)
      transactor.json(username, key, 'report', {
        hash: state.stats.bu,
        block: state.stats.bi,
	
      }, function(err, result) {
        if(err) {
          console.error(err, `\nMost likely your ACCOUNT and KEY variables are not set!`);
        } else {
          console.log(current + `:Sent State report and published ${plasma.hashLastIBlock} for ${plasma.hashBlock}`)
        }
    })
    } else {
      console.log({cycle}, 'IPFS Error', err)
      cycleipfs(cycle++)
      if (cycle >= 25){
        cycle = 0;
        return;
      }
    }
  })
};
var bot ={
xfer: function(amount,to,memo,callback){
	const data = {amount:`(amount/1000).toFixed(3) STEEM`,from:username,to:to,memo:JSON.stringify(memo)}
    var x = client.transfer(data, key)
	x.then(callback(x));
},
power:function(amount,toa,callback){
const op = [
        'transfer_to_vesting',
        {
            from: username,
            to: toa,
            amount: `${(amount/1000).toFixed(3)} STEEM`,
        },
    ];
    client.broadcast.sendOperations([op], key).then(
        function(result) {
            callback(0,result)
        },
        function(error) {
            callback(error,0)
        }
    );
}
}

function daily(addr) {
  if(state.land[addr]){
    for(var i = 0;i<state.land[addr].care.length;i++){if(state.land[addr].care[i][0]>processor.getCurrentBlockNumber()-28800 && state.land[addr].care[i][1]=='watered'){
	if(state.land[addr].substage < 14 && state.land[addr].stage>0)state.land[addr].substage++
	if(state.land[addr].substage==14){state.land[addr].substage=0;state.land[addr].stage++}
	if(state.land[addr].stage==5&&state.land[addr].substage==0)state.land[addr].sex=state.land.length%1
	if(state.land[addr].stage==9&&state.land[addr].substage==13){state.land[addr].aff.push([processor.getCurrentBlockNumber(),'over']);state.land[addr].substage=12}
	for(var j = 0;j<state.land[addr].aff.length;j++){
	  if(state.land[addr].aff[j][0]>processor.getCurrentBlockNumber()-86400&&state.land[addr].aff[j][1]=='over'){state.land[addr].stage=-1;break;}	
	}
      }
    }
  }
}
