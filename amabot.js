process.on('error', function(error, msg, next) {
  //console.error(JSON.stringify(error, null, 2));
  console.log("error")
  next(new Error(), data);
});
 
// TODO: handle this
process.on('uncaughtException', function (error, msg, why) {
  //console.error(JSON.stringify(error, null, 4));
  console.log("error")
});

password = "password"
gens = 10 //10
iters = 20000 //20000

var http = require('http');
var natural = require('natural');
fs = require('fs')
brain = require('brain')

// Create the configuration
var config = {
	channels: ["##bottest", "#futurology", "#mybots", "#futuristparty", "#AMAbot"],
	server: "irc.snoonet.org",
	botName: "AMAbot",
	sasl: false,
	secure: false,
	password: password
};

var maxLength = 500;
var maxNewlines = 6;
var released = 0;
var subredditList = ["askreddit+askscience+explainlikeimfive+changemyview", "AskHistorians+askmen+askwomen+askculinary", "futurology+philosophy+MachineLearning+learnprogramming", "all"];
var activeChannels = {};
var rawDataset = [];
var defaultChannelSetting = {};
var networkSettings = {
	layers: [4, 3, 2],
	learningRate: 0.1,
	threshold: 0.000001,
	iterations: iters
}
/*var networkSettings = {"layers":[3,6,3,3,3,5,3,1],"learningRate":0.009193395357579001,"threshold":0.2702860541099906,"iterations":19212.502439972013};
var networkSettings = {"layers":[8,19,9,22,24,1,6,7,2,16,3,2,5,7,1,2,4,1],"learningRate":0.0033243911806494705,"threshold":0.7047150845097602,"iterations":40797.12532903068};
var networkSettings = {"layers":[9,20,9,21,24,1,10,9,1,11,1,2,5,6,3],"learningRate":0.002924735611304713,"threshold":0.7961916553246081,"iterations":43209.032842190936};
var networkSettings = {"layers":[2,4,1,2],"learningRate":0.008147467230446723,"threshold":0.22654134919105473,"iterations":46747.36615619622};
*/
//var networkSettings = {"layers":[4,5,2],"learningRate":0.00023194521199911694,"threshold":0.000001078763395664282,"iterations":20034.78908073157};
//var networkSettings = {"layers":[4,5,2],"learningRate":0.00023194521199911694,"threshold":0.0000010562829725909978,"iterations":19797.069663880393};
/*var networkSettings = {"layers":[3,5,2,1,2,1,4],"learningRate":0.14381794724613428,"threshold":0.0000010224730655085295,"iterations":18688.28935455531};
var networkSettings = {"layers":[3,5,2,1,2,1],"learningRate":0.1711220392258838,"threshold":8.262058848747984e-7,"iterations":18793.842338956892};
var networkSettings = {"layers":[3,3,3,1,3],"learningRate":0.0035125559894367345,"threshold":0.0010001768320446372,"iterations":20093.089742818847};
*/
//var networkSettings = {"layers":[4,2,2],"learningRate":0.00023194521199911694,"threshold":0.0000012831276768585669,"iterations":19920.421788701788};
//var networkSettings = {"layers":[],"learningRate":0.0002504901404011595,"threshold":0.0000012533658032377527,"iterations":25414.23598228595};


var networkSettings = {"layers":[],"learningRate":0.019543054905444283,"threshold":0.1,"iterations":1000.198314515295};
var networkSettings = {"layers":[],"learningRate":0.02371273614254603,"threshold":0.1080865932999755,"iterations":6808.866671373775};
var networkSettings = {"layers":[1],"learningRate":0.031357327018297194,"threshold":0.0757713085276743,"iterations":7010.153680644004};
var networkSettings = {"layers":[1],"learningRate":0.02930038359341617,"threshold":0.06959408669598949,"iterations":7586.342043816811};
var networkSettings = {"layers":[2,1],"learningRate":0.02991200765536878,"threshold":0.062440579693873156,"iterations":8036.404564736056};
var networkSettings = {"layers":[2],"learningRate":0.02710111697056981,"threshold":0.057042649478990404,"iterations":8703.008759251212};
var networkSettings = {"layers":[4,3],"learningRate":0.04114500238704092,"threshold":0.0611729400814995,"iterations":5443.051571087624}
var networkSettings = {"layers":[],"learningRate":0.03521817724270217,"threshold":0.05562827149940124,"iterations":6551.885643714466};
var networkSettings = {"layers":[3,2,1],"learningRate":0.026519552102619342,"threshold":0.035693828430759994,"iterations":6965.243219611451};
var networkSettings = {"layers":[],"learningRate":0.023396226697915284,"threshold":0.035693828430759994,"iterations":6628.1487504702045};
var networkSettings = {"layers":[],"learningRate":0.02523913035089666,"threshold":0.036409500997588884,"iterations":7160.281104233691};
var networkSettings = {"layers":[6,2,4,2],"learningRate":0.030078094240842526,"threshold":0.05356082839949051,"iterations":11418.317464719004};
var networkSettings = {"layers":[4,4],"learningRate":0.031054105722877038,"threshold":0.05066490997169323,"iterations":12599.905669422802};
var networkSettings = {"layers":[4,4],"learningRate":0.031054105722877038,"threshold":0.05066490997169323,"iterations":12599.905669422802};
var networkSettings =  {"layers":[4,4],"learningRate":0.031054105722877038,"threshold":0.05066490997169323,"iterations":12599.905669422802};
var networkSettings = {"layers":[],"learningRate":0.029689335672511794,"threshold":0.051498690923560554,"iterations":16635.94919009061};
var networkSettings = {"layers":[5],"learningRate":0.029848654956194265,"threshold":0.06442495298585627,"iterations":17278.69638457538};
var networkSettings = {"layers":[],"learningRate":0.02686328508465397,"threshold":0.11095935954140806,"iterations":16598.606829934048};
var networkSettings = {"layers":[],"learningRate":0.024996287460399884,"threshold":0.11198483053012831,"iterations":17428.98565460126};
var networkSettings = {"layers":[3],"learningRate":0.024996287460399884,"threshold":0.11198483053012831,"iterations":17428.98565460126};
var networkSettings = {"layers":[],"learningRate":0.025358718268334548,"threshold":0.1316415173755812,"iterations":25365.55469696983}
//var networkSettings = {"layers":[3,3,3,2],"learningRate":0.026316061457421405,"threshold":0.06837233968322197,"iterations":13021.609025509826}
//var networkSettings = {"layers":[3,4,3,2,3,4],"learningRate":0.03022158137625,"threshold":0.0817169644902,"iterations":14312.13631039813}
var networkSettings = {"layers":[],"learningRate":0.022172069860590022,"threshold":0.12773462404386265,"iterations":25229.266687161475}
var networkSettings = {"layers":[2],"learningRate":0.01851578127351493,"threshold":0.1204016292171469,"iterations":21310.707642433823}
var networkSettings = {"layers":[2],"learningRate":0.01851578127351493,"threshold":0.1204016292171469,"iterations":21310.707642433823}
var networkSettings = {"layers":[2,3],"learningRate":0.016,"threshold":0.156,"iterations":2500}
var networkSettings = {"layers":[1],"learningRate":0.013508540320017576,"threshold":0.14428176130258982,"iterations":25000}
var networkSettings = {"layers":[2,5,3],"learningRate":0.011143364440165225,"threshold":0.10113186613413137,"iterations":3000}
var networkSettings = {"layers":[4],"learningRate":0.007072773526373853,"threshold":0,"iterations":2501}
var net;

var maxIterations = 3000

function makeNet(networkSettings, dataset){
	var net = new brain.NeuralNetwork({
		hiddenLayers: networkSettings.layers,
		learningRate: networkSettings.learningRate
	});
	var result = net.train(dataset, {
	  errorThresh: networkSettings.threshold,  // error threshold to reach
	  iterations: networkSettings.iterations,   // maximum training iterations
	  log: false,           // console.log() progress periodically
	  logPeriod: 5000        // number of iterations between logging
	})
	//console.log(JSON.stringify(result));
	return net;
}

function trainNetwork(dataset, networkSettings, gens){
	var bestErr = Infinity;
	var result;
	for (i=0;i<gens;i++){
		var newNet = new brain.NeuralNetwork({
			hiddenLayers: networkSettings.layers,
			learningRate: networkSettings.learningRate
		});
		var newResult = newNet.train(dataset, {
		  errorThresh: networkSettings.threshold,  // error threshold to reach
		  iterations: networkSettings.iterations,   // maximum training iterations
		  log: false,           // console.log() progress periodically
		  logPeriod: 5000        // number of iterations between logging
		})
		console.log("error:", newResult.error)
		if (newResult.error < bestErr){
			bestErr = newResult.error
			net = newNet
			result = newResult
		}
	}
	return result;
}

//randomly split dataset some percent
//create a random network setup
//train network on training data
//test on validation set
//mutate network
//repeat
//if mutated network settings do better, choose previous
//repeat
function hillClimb(rawDataset, percentValidation, gens, mutationRate, callback, timeinterval, maxtime){
	var dataset = extract(rawDataset);
	var validationset = [];
	var trainingset = [];
	for (key in dataset){
		value = dataset[key]
		if (Math.random() < percentValidation){
			validationset.push(value);
		} else {
			trainingset.push(value);
		}
	}
	//
	function testNet(net){
		var err = 0;
		for (key in validationset){
			var result = net.run(validationset[key].input)[0];
			err += Math.pow((validationset[key].output[0] - result),2);
			//console.log(validationset[key].output[0], result, (validationset[key].output[0] - result))
		}
		return err;
	}
	function testNets(newNet, oldNet){
		var probNew = 0.5;
		for (key in validationset){
			var dat = validationset[key];
			var oldResult = newNet.run(dat.input)[0];
			var newResult = oldNet.run(dat.input)[0];
			var probDataOld = 1 - Math.abs(dat.output - oldResult);
			var probDataNew = 1 - Math.abs(dat.output - newResult);
			probNew = (probDataNew*probNew)/(probDataOld*(1-probNew)+probDataNew*probNew);
			//console.log(probNew, probDataOld, probDataNew);
		}
		return probNew;
	}
	
	function mutate(networkSettings){
		function mutateVal(val, amount, min, max){
			var newVal = val;
			if (Math.random()<mutationRate){
				newVal += (Math.random()*val/4)-(val/4)/2;
				if (newVal > max || newVal < min){
					newVal = val;
				}
			}
			return newVal;
		}
		var layers = networkSettings.layers
		var newLayers = []
		for (key in layers){
			var nodes;
			if (Math.random()<mutationRate/layers.length){
				nodes = layers[key]+Math.round((Math.random()*4)-2);
				if (nodes <= 1){
					nodes = 1;
				}
			} else {
				nodes = layers[key]
			}
			newLayers[key] = nodes;
		}
		if (Math.random()<mutationRate){
			newLayers.push(Math.round(Math.random()*3+1));
		}
		if (Math.random()<mutationRate){
			newLayers.pop();
		}
		var newLearningRate = mutateVal(networkSettings.learningRate, 0.1, 0, 1);
		var newThreshold = mutateVal(networkSettings.threshold, 0.0000003, 0, 1);
		var newIterations = Math.min(mutateVal(networkSettings.iterations, 1000, 1, 10000000), maxIterations);
		
		return {layers: newLayers, learningRate: newLearningRate, threshold: newThreshold, iterations: newIterations};
	}
	var clock = Date.now()
	var oldNet = makeNet(networkSettings, trainingset);
	var oldTime = Date.now() - clock;
	var errOld = testNet(oldNet);
	function begin(i, callback){
		var newSettings = mutate(networkSettings);
		//console.log("NewSettings:", JSON.stringify(newSettings));
		var clock = Date.now()
		var newNet = makeNet(newSettings, trainingset);
		var newTime = Date.now() - clock;
		function callback2(){
			//var clock = Date.now()
			//var oldNet = makeNet(networkSettings, trainingset);
			//var oldTime = Date.now() - clock;
			//console.log("NewTime: ", newTime/1000, "OldTime:", oldTime/1000);
			var errNew = testNet(newNet);
			//var errOld = testNet(oldNet);
			//var probNew = testNets(newNet, oldNet)
			//var newBetter = Math.random()<probNew;
			var newBetter = errNew<errOld
			//console.log("Probability of New settings:", probNew)
			console.log("New err:", errNew, "Old Err:", errOld)
			//if ((newBetter && newTime < maxtime*1000) || (oldTime > maxtime*1000 && newTime < oldTime && newBetter)){
			if (newBetter){
				oldTime = newTime
				errOld = errNew
				networkSettings = newSettings;
				//console.log("Switching to new settings!")
				console.log("NewSettings:", i, JSON.stringify(newSettings));
				//console.log(JSON.stringify(newSettings));
				//console.log(errNew/validationset.length);
			}
			if (i<gens){
				setTimeout(function(){begin(i+1, callback);},timeinterval)
			} else {
				callback();
			}
		}
		setTimeout(callback2, timeinterval);
	}
	begin(1, callback);
}

function test(){
	console.log("done saving");

	for (k in rawDataset){
		if (!("threadNum" in rawDataset[k])){
			rawDataset[k].threadNum = 1;
			rawDataset[k].commentNum = 1;
			console.log("FIXING?")
		}
	}

	/*var dataset = extract(rawDataset)
	console.log(dataset)
	for (k in dataset){
		console.log(dataset[k]);
	}*/
	
	/*for (k in rawDataset){
		if (rawDataset[k].thread.id == "feqqk"){
			console.log("Removing Entry About Moon.");
		}
	}*/
	
	//hillClimb(rawDataset, 0.3, 10, 0.5)
	var dataset = extract(rawDataset);
	/*var result = net.train(datasets, {
	  errorThresh: 0.000001,  // error threshold to reach
	  iterations: 20000,   // maximum training iterations
	  log: true,           // console.log() progress periodically
	  logPeriod: 500        // number of iterations between logging
	})*/
	//net = makeNet(networkSettings, dataset)
	trainNetwork(dataset, networkSettings, gens)
	//var json = net.toJSON();

	//net = net.fromJSON(json);
	
	//console.log(result);
	//setTimeout(function(){bot.say("NickServ", "identify "+password);}, 5000);
}

function load(){
	fs.readFile("AMAbotData.txt", "utf8", function (err,data) {
	  if (err) {
		return console.log(err);
	  }
	  rawDataset = JSON.parse(data);
	  console.log("loadedData")
	  test();
	});
}

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

var tokenizer = new natural.TreebankWordTokenizer();
var NGrams = natural.NGrams;
function tokenize(text){
	return tokenizer.tokenize(text.toLowerCase())
}

function matchMarkov(search, text, n){
	var search = tokenize(search);
	var text = tokenize(text);
	var searchgrams = NGrams.ngrams(search, n);
	var textgrams = NGrams.ngrams(text, n);
	var count = 0;
for (textgramNum in textgrams){
		for (searchgramNum in searchgrams){
			if (arraysEqual(searchgrams[searchgramNum], textgrams[textgramNum])){
				count += 1;
			}
		}
	}
	return count;
}

function matchMarkovPercent(search, text, n){
	var search = tokenize(search);
	var text = tokenize(text);
	var searchgrams = NGrams.ngrams(search, n);
	var textgrams = NGrams.ngrams(text, n);
	var count = 0;
	for (searchgramNum in searchgrams){
		for (textgramNum in textgrams){
			if (arraysEqual(searchgrams[searchgramNum], textgrams[textgramNum])){
				count += 1;
				break;
			}
		}
	}
	return (searchgrams.length > 0 ? count/searchgrams.length : 0);
}

function numwords(text){
	return tokenize(text).length;
}

function segmentMatches(search, text, n){
	search = search.toLowerCase()
	text = text.toLowerCase()
	for (i=0;i<n;i++){
		var rand1 = Math.round(Math.random()*search.length-1);
		var rand2 = Math.round(Math.random()*search.length-1);
		if (rand1 > rand2){
			text.indexOf(search.splice(rand1, search.length));
		} else {
			
		}
	}
}

function wordMatches(words, text){
	words = words.toLowerCase();
	text = text.toLowerCase();
	wordsArray = words.split(" ");
	textArray = text.split(" ");
	wordsArray = wordsArray.filter(function(elem, pos) {
		return wordsArray.indexOf(elem) == pos;
	})
	var count = 0;
	for (k in wordsArray){
		for(var i = 0; i < textArray.length; ++i){
			if(textArray[i] == wordsArray[k])
				count++;
		}
	}
	return count
}

function wordMatchesPercent(words, text){
	words = words.toLowerCase();
	text = text.toLowerCase();
	wordsArray = words.split(" ");
	textArray = text.split(" ");
	wordsArray = wordsArray.filter(function(elem, pos) {
		return wordsArray.indexOf(elem) == pos;
	})
	var count = 0;
	for (k in wordsArray){
		for(var i = 0; i < textArray.length; ++i){
			if(textArray[i] == wordsArray[k])
				count++;
		}
	}
	return (textArray.length > 0 ? count/textArray.length : 0)
}

function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
}

function scale(n, max){
	return (n > max ? 1 : (n < 0 ? 0 : n/max));
}

function getInput(rawExample){
	var example = rawExample.thread;
	var question = rawExample.question;
	var featureVector = {
		totalResults: (rawExample.totalResults ? rawExample.totalResults : 0),
		resultsRecorded: (rawExample.totalResults ? 1 : 0),
		/*isFirst: (rawExample.threadNum == 0 ? 1 : 0),
		firstAnswers: 1-scale(rawExample.threadNum, 7),*/
		noComments: (example.num_comments == 0 ? 1 : 0),
		manyComments: scale(example.num_comments, 5),
		searchRank: 1-rawExample.threadNum/100,
		score: scale(example.score, 3000),
		/*downs: scale(example.downs, 3000),
		ups: scale(example.ups, 3000),
		edited: (example.edited ? 1 : 0),*/
		is_self: (example.is_self ? 1 : 0),
		comments: scale(example.num_comments,20000),
		over_18: (example.over_18 ? 1 : 0),
		questionLength: scale(numwords(question),200/5),
		selfTextLength: scale(numwords(example.selftext),10000/5),
		titleLength: scale(numwords(example.title), 300/5),
		Title1gramMatches: matchMarkovPercent(question, example.title, 1),
		Title2gramMatches: matchMarkovPercent(question, example.title, 2),
		Title3gramMatches: matchMarkovPercent(question, example.title, 3),
		Self1gramMatches: matchMarkovPercent(question, example.selftext, 1),
		Self2gramMatches: matchMarkovPercent(question, example.selftext, 2),
		Self3gramMatches: matchMarkovPercent(question, example.selftext, 3),
		/*titleWordMatches: scale(wordMatches(question, example.title), 15),
		selfTextWordMatches: scale(wordMatches(question, example.selftext),30),
		titleWordMatchesPercent: wordMatchesPercent(question, example.title),
		selfTextWordMatchesPercent: wordMatchesPercent(question, example.selftext)*/
	};
	return featureVector;
}

//extract features
function extract(rawDataset){
	var dataset = [];
	for (k in rawDataset){
		var example = rawDataset[k].thread;
		if ("label" in rawDataset[k]){
			var question = rawDataset[k].question;
			var featureVector = getInput(rawDataset[k]);
				var trainExample = {input: featureVector, output: (rawDataset[k].label == "positive" ? [1] : [0])};
			dataset.push(trainExample);
		}
	}
	console.log("Done extracting.");
	return dataset;
}

function save(data, filename){
	fs.writeFile(filename, data, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
}

// Get the lib
var irc = require("irc");

function newBot(config){

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
	channels: config.channels,
	sasl: config.sasl,
	secure: config.secure,
	userName: config.botName,
	nick: config.botName,
	password: config.password
});

function getCommand(text){
	if (text.indexOf("!") == 0){
		if (text.indexOf(" ") > 0){
			return [text.slice(1, text.indexOf(" ")), text.slice(text.indexOf(" ")+1, text.length)];
		} else {
			return [text.slice(1, text.length), ""];
		}
	} else {
		return ["", text];
	}
}

function answer(to, question, from){
	console.log("answering")
	var callback1 = function(output, threadDat, threadNum, commentDat, commentNum, totalResults, prob){
		if (threadDat){
			rawDataset.push({question: question, thread: threadDat, comment: commentDat, threadNum: threadNum, commentNum: commentNum, totalResults: totalResults});
			if (!commentDat){
				rawDataset[rawDataset.length-1].label = "negative";
			}
			if (!(to in activeChannels)){
				activeChannels[to] = {};
				//console.log("adding " + to + " to active channels");
			}
			activeChannels[to].last = rawDataset.length-1;
			//console.log("Changing " + to + ".last to " + (rawDataset.length-1));
			//console.log(JSON.stringify(activeChannels));
			activeChannels[to].details = {Title: threadDat.title, Link: "http://www.reddit.com"+threadDat.permalink, SearchResultNumber: threadNum+1, CommentNumber: commentNum+1, TotalResults: totalResults, EstimatedProbability: prob};
			//console.log(JSON.stringify(activeChannels));
			//console.log("Changing " + to + ".details to " + activeChannels[to].details);
		}
		bot.say(to, from+": "+output);
	}
	if (released < 2000){
		getSearch(question, subredditList, callback1);
	} else {
		setTimeout(function(){answer(to, question, from);}, released+10);
	}
}

// Listen for any message
bot.addListener("message", function(from, to, text, message) {
	//detect command and splice command
	var commandCut = getCommand(text);
	var command = commandCut[0];
	var text = commandCut[1];
	text = text.replace(/\bu\b/gi, "you");
	text = text.replace(/\bur\b/gi, "your");
	text = text.replace(/\by\b/gi, "why");
	text = text.replace(/\br u\b/gi, "are you");
	text = text.replace(/\bu r\b/gi, "you are");
	text = text.replace(/\b:\b/gi, " ");
	text = text.replace(/\bamabot\b/gi, "");
	console.log(command, text);
	if (to == config.botName){
		var replyTo = from;
	} else {
		var replyTo = to;
	}
	if (command == "boobs"){
		bot.say(replyTo, "(.Y.)");
	}
	if (command == "hillclimb"){
		bot.say(replyTo, "Climbing hills!...");
		var gens = 20;
		if (text){
			var vals = JSON.parse("["+text+"]");
			if (vals[0]) {
				gens = vals[0];
			}
		} else {
			var vals  = []
		}
		var callback = function(){bot.say(replyTo, JSON.stringify(networkSettings));};
				//rawDataset, percentValidation, gens, mutationRate, callback, timeinterval, maxtime
		hillClimb(rawDataset, 0.3, gens, 0.5, callback, (vals[1] ? vals[1]*1000 : 0), (vals[2] ? vals[2] : 60))
	}
	//if (command == "review")
		
	//
	if (command == "say" && from == "Houshalter"){
		var txt = text.split(" ");
		bot.say(txt[0], txt.splice(1,text.length).join(" "))
	}
	if (command == "results"){
		if (replyTo in activeChannels && "details" in activeChannels[replyTo]){
			bot.say(replyTo, "Picked " + activeChannels[replyTo].details.SearchResultNumber.toString() + " of " + activeChannels[replyTo].details.TotalResults.toString() + " results.");
		}
	}
	if (command == "prob"){
		if (replyTo in activeChannels && "details" in activeChannels[replyTo]){
			bot.say(replyTo, "Estimated Probability: " + (activeChannels[replyTo].details.EstimatedProbability *100).toString().slice(0, 5) + "%");
		}
	}
	if (command == "title"){
		if (replyTo in activeChannels && "details" in activeChannels[replyTo]){
			bot.say(replyTo, activeChannels[replyTo].details.Title);
		}
	}
	if (command == "link"){
		if (replyTo in activeChannels && "details" in activeChannels[replyTo]){
			bot.say(replyTo, activeChannels[replyTo].details.Link);
		}
	}
	if (command == "KickTheBucket"){
		bot.say(replyTo, "/me kicks pail.");
	}
	if (command == "train"){
		if (text.length > 0){
			var value = JSON.parse("["+text+"]");
			networkSettings.layers = value[0];
			networkSettings.learningRate = (value[1] ? value[1] : networkSettings.learningRate);
			networkSettings.threshold = (value[2] ? value[2] : networkSettings.threshold);
			/*net = new brain.NeuralNetwork({
				hiddenLayers: values[0],
				learningRate: (values[1] ? values[1] : 0.3)
			})*/}
		var dataset = extract(rawDataset);
		result = trainNetwork(dataset, networkSettings, 10)
		//net = makeNet(networkSettings, dataset);
		//var result = net.train(dataset, {
		//  errorThresh: networkSettings.threshold,  // error threshold to reach
		//  iterations: networkSettings.iterations,   // maximum training iterations
		//  log: true,           // console.log() progress periodically
		//  logPeriod: 5000        // number of iterations between logging
		//});
		bot.say(replyTo, JSON.stringify(result));
		//bot.say(replyTo, "Trained");
	}
	if (command == "details"){
		console.log("This part is working, command details recognized.")
		//console.log(JSON.stringify(activeChannels));
		if (replyTo in activeChannels && "details" in activeChannels[replyTo]){
			bot.say(replyTo, JSON.stringify(activeChannels[replyTo].details));
		}
	}
	if (command == 'ShowMeYourBrain'){
		bot.say(replyTo, JSON.stringify(net.toJSON()));
	}
	if (command == "login"){
		bot.say("NickServ", "nick AMAbot");
		setTimeout(function(){bot.say("NickServ", "identify "+password);}, 5000);
	}
	if (command == "save"){
		console.log("saving...");
		bot.say(replyTo, "Saving...")
		save(JSON.stringify(rawDataset), "AMAbotData.txt");
	}
	if (command == "yes" || command == "no"){
		if (replyTo in activeChannels && "last" in activeChannels[replyTo]){
			rawDataset[activeChannels[replyTo].last].label = (command == "yes" ? "positive" : "negative")
		}
	} else if (to == config.botName && from != config.botName && command == ""){
		console.log(from, command, text);
		answer(from, text);
	} else if (command == "ask"){
		console.log(from, command, text);
		answer(replyTo, text, from);
	} else if (command == "dumpData"){
		rawDataset = [];
	} else if (to == "#mybots" && command == ""){
		console.log(from, command, text);
		answer(replyTo, text, from);
	}
});
};

function getSearch(question, subreddits, callback1){
	question2 = encodeURIComponent(question);
	//console.log(question, question2)
	var options = {
	  host: 'www.reddit.com',
	  path: '/r/'+subreddits[0]+'/search.json?q=' + question2 + '&restrict_sr=on&sort=relevance&t=all&limit=100',
	  headers: {'user-agent': '/u/Noncomment IRC bot \'AMAbot\'; #futurology, #bottest'}
	};

	callback = function(response) {
		console.log("response received!", response)
	  var str = '';

	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
		str += chunk;
	  });

	  //the whole response has been recieved
	  response.on('end', function () {
		var errorVar = true
		try {
			var search = JSON.parse(str);
			if (!search.data || !search.data.children){Error()};
		} catch(err) {
			console.log("ERROR! Retrying")
			//setTimeout(function(){getSearch(question, subreddits, callback1);}, 2000);
			errorVar = false
		}
		if (errorVar) {
		if (search.data.children.length < 1){
			if (subreddits.length>1){
				subreddits = subreddits.slice(1, subreddits.length);
				setTimeout(function(){getSearch(question, subreddits, callback1);}, 50);
			} else {
				callback1("Sorry I don't know.", false, 0, false, 0, 0, 0);
			}
		} else {
			var children = search.data.children;
			var best = 0;
			var bestNum = 0;
			var bestThread = children[0].data;
			var bestDat;
			for (num=0;num<children.length;num++){
				var threadDat = children[num].data;
				var example = {question: question, thread: threadDat, threadNum: num};
				var test = getInput(example);
				var prob = net.run(test)[0];
				console.log(num, prob);
				if (prob > best){
					best = prob;
					bestNum = num;
					bestThread = threadDat;
					bestDat = test;
				}
			}
			console.log(bestDat);
			console.log("Picking: ", bestNum, best);
			setTimeout(function(){getComment(bestThread.permalink, callback1, bestThread, bestNum, children.length, best);}, 50);
		}}
	  });
	}
	released += 2000;
	setTimeout(function(){released += -2000;}, 2000);
	http.request(options, callback).end();
}

function getComment(permalink, callback1, threadDat, threadNum, totalResults, prob){
	permalink = permalink.replace('?ref=search_posts', '')
	console.log(permalink)
	var options = {
	  host: 'www.reddit.com',
	  path: permalink + ".json",
	  headers: {'user-agent': '/u/Noncomment IRC bot \'AMAbot\'; #futurology, #bottest'}
	};

	callback = function(response) {
	  var str = '';

	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
		str += chunk;
	  });

	  //the whole response has been recieved
	  response.on('end', function () {
		var errorVar = true
		try {
			var search = JSON.parse(str);
			if (!search.data || !search.data.children){Error()};
		} catch(err) {
			console.log("ERROR! Retrying - getComment")
			//setTimeout(function(){getComment(permalink, callback1, threadDat, threadNum, totalResults, prob);}, 2000);
			errorVar = false
		}
		if (errorVar) {
		var i = 0;
		var comments = search[1].data.children;
		while (i<comments.length){
			var comment = comments[i].data.body;
			console.log(comment);
			var completed = false
			if (!(comment == "[deleted]") && comment.length < maxLength && (comment.split("\n").length - 1) < maxNewlines){
				commentDat = comments[i].data;
				callback1(comment, threadDat, threadNum, commentDat, i, totalResults, prob);
				completed = true;
				break;
			}
			i++
		}
		if (!completed){
			callback1("Sorry this knowledge is forbidden.", threadDat, threadNum, false, 0, totalResults, prob)
		}}
	  });
	}
	released += 2000;
	setTimeout(function(){released += -2000;}, 2000);
	http.request(options, callback).end();
}
load()
newBot(config)

var config2 = {
	channels: ["#lw-bots", "#lesswrong"],
	server: "chat.freenode.net",
	botName: "AMAbot",
	sasl: false,
	secure: false,
	password: password
};

newBot(config2)