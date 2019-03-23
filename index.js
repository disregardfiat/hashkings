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
  delegations:[],
  kudos:{},
  stats:{
    vs:2001,
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
  bal:{r:0,c:0,b:0,p:40503},
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
const key = steem.PrivateKey.from(ENV.KEY); //active key for account
const sh = ENV.sh || ''
const prefix = ENV.PREFIX || 'qwoyn_';
const clientURL = ENV.APIURL || 'https://api.steemit.com'
var client = new steem.Client(clientURL);
var processor;

const transactor = steemTransact(client, steem, prefix);


startWith(sh)
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
    const sun = (num - state.stats.time) % 28800
    var td = []
    for(var o in state.stats.offsets){if(sun-state.stats.offsets[o]<1200&&sun-state.stats.offsets[o]>0){td.push(`${o}${((sun-state.stats.offsets[o])*4)}`,`${o}${((sun-state.stats.offsets[o])*4)-1}`,`${o}${((sun-state.stats.offsets[o])*4)-2}`,`${o}${((sun-state.stats.offsets[o])*4)-3}`);console.log(td)}}
	 for (var i = 0;i<td.length;i++){
      daily(td[i])
    }
    if(num % 111 === 0 && state.refund.length && state.bal.b > 0 && processor.isStreaming() || processor.isStreaming() && state.refund.length > 60){
	if(state.refund[0].length == 4)bot[state.refund[0][0]].call(this,state.refund[0][1],state.refund[0][2],state.refund[0][3])
	if(state.refund[0].length == 3)bot[state.refund[0][0]].call(this,state.refund[0][1],state.refund[0][2])
	state.refund.push(state.refund.shift())
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
      state.refund.push(['xfer','qwoyn-fund',d,'Partners Cut'])
      state.refund.push(['xfer','qwoyn-chest',d,'Warchest'])
      state.bal.c -= d*3
      state.refund.push(['xfer','qwoyn',state.bal.c,'Producer Cut'])
      state.bal.c = 0
      if (state.bal.d > state.bal.b){state.bal.d -= state.bal.b;state.bal.b=0}
      else if(state.bal.d <= state.bal.b){state.bal.b -= state.bal.d;state.bal.d=0}
      state.refund.push(['power',username,state.bal.b,'Power to the people!'])
    }
  });
processor.on('water', function(json, from) {
    let plants = json.plants ,plantnames=''
    for (var i = 0;i < plants.length;i++){
      if(state.land[plants[i]].owner==from){state.land[plants[i]].care.unshift([processor.getCurrentBlockNumber(),'watered']);plantnames +=`${plants[i]} `}
    }
    console.log(`${from} watered ${plantnames}`)
  });
	
processor.on('return', function(json, from) {
    let lands = json.lands ,landnames=''
    for (var i = 0;i < lands.length;i++){
      if(state.land[lands[i]].owner==from){delete state.land[lands[i]];state.lands.forSale.push(lands[i]);state.refund.push(['xfer',from,state.stats.prices.purchase.land,`Returned ${lands[i]}`]);plantnames +=`${plants[i]} `}
    }
    console.log(`${from} returned ${landnames}`)
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
	if(state.users[from].seeds[json.seed])seed = state.users[from].seeds.splice(json.seed,1)[0]
	if (index>=0 && seed){
		console.log({seed})
	  if(!state.land[json.addr]){
	    const parcel = {owner:from, strain: seed.strain, xp:seed.xp,care:[],aff:[],planted:processor.getCurrentBlockNumber(),stage:1,substage:0,traits:seed.traits,terps:seed.terps}
	    state.land[json.addr]=parcel
	  } else if (state.land[json.addr].stage < 0) {
	    state.land[json.addr].strain = seed.strain
	    state.land[json.addr].xp = seed.xp
	    state.land[json.addr].care = []
	    state.land[json.addr].aff =[]
	    state.land[json.addr].planted = processor.getCurrentBlockNumber()
	    state.land[json.addr].stage = 1
	    state.land[json.addr].substage = 0
	    state.land[json.addr].traits = seed.traits || []
	    state.land[json.addr].terps = seed.terps || {}
	  } else {state.users[from].seeds.push(seed);console.log(`${from} can't plant that.`)}
	} else if (seed){state.users[from].seeds.push(seed);console.log(`${from} doesn't own that land`)}
    	else {console.log(`${from} did a thing with a plant?`)}
  });
processor.onOperation('transfer_to_vesting', function(json){
	if(json.to == username && json.from == username){const amount = parseInt(parseFloat(json.amount*1000));state.bal.b -= amount;state.bal.p+=amount}
});
processor.onOperation('delegate_vesting_shares', function(json,from){//grab posts to reward
    const vests = parseInt(parseFloat(json.vesting_shares)*1000000)
    var record = ''
    if (!state.users[json.delegator] && json.delegatee == 'hashkings')state.users[json.delegator]={addrs:[],seeds:[],inv:[],stats:[],v:0,a:0,u:0}
    var availible = parseInt(vests/(state.stats.sv*state.stats.prices.listed.a/1000)),used = 0;
    if (json.delegatee == 'hashkings' && vests){
      for (var i = 0; i < state.delegations.length;i++){
        if (state.delegations[i].delegator == json.delegator){
          record = state.delegations.splice(i,1)
          break;
        }
      }
	
	if(record){
	  if(record.vests < vests){availible = availible-record.used;used = record.used}
	  else {
	    if (record.used > availible){
		var j = record.used - availible;
		for(var i = state.users[json.delegator].addrs.length - j;i<state.users[json.delegator].addrs.length;i++)
		{delete state.land[state.users[json.delegator].addrs[i]];state.lands.forSale.push(state.users[json.delegator].addrs[i])}
		used = availible
		availible = 0
	    } else {
	      availible = availible-record.used
	      used = record.used
	    }
	  }	
	}
        state.delegations.push({delegator:json.delegator,vests,availible,used})
        console.log(current + `:${json.delegator} has delegated and earned ${availible} lands for @hashkings`)
    } else if (json.delegatee == 'dlux-io' && !vests){
      for (var i = 0; i < state.delegations.length;i++){
        if (state.delegations[i].delegator == json.delegator){
          state.delegations.splice(i,1)
          break;
        }
      }
      console.log(current + `:${json.delegator} has removed delegation to @hashkings`)
    }
  });
  processor.onOperation('transfer', function(json){
    if (json.to == username && json.amount.split(' ')[1] == 'STEEM'){
      if (!state.users[json.from])state.user[json.from]={addrs:[],seeds:[],inv:[],stats:[],v:0,a:0,u:0}
      const amount = parseInt(parseFloat(json.amount) * 1000)
      var want = json.memo.split(" ")[0].toLowerCase() || json.memo.toLowerCase() , type = json.memo.split(" ")[1] || ''
      if(state.stats.prices.listed[want]==amount || amount == 500 && type == 'manage' && state.stats.prices.listed[want]|| want=='rseed' && amount==state.stats.prices.listed.seeds.reg||want=='mseed'&&amount==state.stats.prices.listed.seeds.mid||want=='tseed'&&amount==state.stats.prices.listed.seeds.top){
	if(state.stats.supply.land[want]){
	  var allowed = false
	  if(amount == 500 && type == 'manage' ) {
		state.bal.c += amount;
		for(var i = 0;i<state.delegators.length;i++){
			if(json.delegator == state.delegators[i].delegator && state.delegators[i].availible){
				state.delegators[i].availible--;
				state.delegators[i].used++;
				allowed = true
				break;}}					       
					       }
	  else{  
	  const c = parseInt(amount*0.025)
	  state.bal.c += c
	  state.bal.b += amount - c
		  allowed = true
	    }
	  if (allowed){
	  state.stats.supply.land[want]--
	  const sel = `${want}c`
	  const num = state.stats.supply.land[sel]++
	  var addr = `${want}${num}`	
	  state.users[json.from].addrs.push(addr)
	  console.log(`${json.from} purchased ${addr}`)} else {state.refund.push(['xfer',json.from,amount,'Managing Land?...Maybe have your STEEM back'])}
	} else if (want=='rseed' && amount==state.stats.prices.listed.seeds.reg||want=='mseed'&&amount==state.stats.prices.listed.seeds.mid||want=='tseed'&&amount==state.stats.prices.listed.seeds.top){
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
	  console.log(`${json.from} purchased ${seed.strain}`)
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
  ipfs.add(Buffer.from([blocknum,hashable]), (err, IpFsHash) => {
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
xfer: function(toa,amount,memo){
	const float = parseFloat(amount/1000).toFixed(3)
	const data = {amount: `${float} STEEM`, from:username, to: toa, memo:memo}
	console.log(data,key)
    	client.broadcast.transfer(data, key).then(
        function(result) {
            console.log(result)
        },
        function(error) {
            console.log(error)
        }
    );
},
power:function(toa,amount,callback){
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
}
}
function whotopay(){
  var a={a:[],b:[],c:[],d:[],e:[],f:[],g:[],h:[],i:[],j:[]},b=0,c=0,h=1,o=[]
  for(d in state.kudos){
    c+=state.kudos[d];
    if(state.kudos[d]>h){
      h=state.kudos[d]
    };
    if(state.kudos[d]==1){
      d.unshift({account:d,weight:state.kudos[d]})
    } else{
      for (var i = d.length - 1;i>0;i--){
        for (var p in d[i]){
      if (state.kudos[d]<=d[i][p]){
        d.splice(i,0,{account:d,weight:state.kudos[d]});
        i=0;
      }
    }
      }         
    }      
  }
  if(d.length>3000){b=3000}else{b=d.length}
  while(b){
    for (var r in a){
      a[r].push(d.pop());
      b--
    }
  }
  state.kudos = {}
  if(d.length){  
    for (var i = 0;i < d.length;i++) {
      state.kudos[d[i].account] = d[i].weight
    }
  }
  for (var r in a) {
    var u = 0,q=0
    for (var i = 0; i < a[r].length;i++){
      u += a[r][i].weight
    }
    q = parseInt(u/10000)
    for (var i = 0; i < a[r].length;i++){
      a[r][i].weight = parseInt(a[r][i].weight*u)
    }
  }
  return a    
}
function kudo(user){if(!state.kudos[user]){state.kudos[user]=1}else{state.kudos[user]++}}
function daily(addr) {
	console.log(addr)
  if(state.land[addr]){
    for(var i = 0;i<state.land[addr].care.length;i++){if(state.land[addr].care[i][0]>processor.getCurrentBlockNumber()-28800 && state.land[addr].care[i][1]=='watered'){
	if(state.land[addr].substage < 14 && state.land[addr].stage>0){state.land[addr].substage++;kudo(state.land[addr].owner)}
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
