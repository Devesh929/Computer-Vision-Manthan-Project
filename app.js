var express = require('express');
var bodyParser = require('body-parser');
var ffmpeg = require('ffmpeg');
var request = require('request');
var fs = require('fs');
var app = express();

app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.listen(8080, function () {
  console.log('Hit me up at 8080 fam');
});


app.get('/getFrames', function(req, res){
    try {
        var process = new ffmpeg('HI.mp4');
        process.then(function (video) {
            // Callback mode
            video.fnExtractFrameToJPG('./frames/', {
                frame_rate : 1,
                every_n_seconds: 2,
                file_name : 'my_frame_%s'
            }, function (error, files) {
                if (!error)
                    console.log('Frames: ' + files);
                    frameLogic(function() {
                        res.send('done');
                    })
            });
        }, function (err) {
            console.log('Error: ' + err);
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
})

function frameLogic(callback){
    const testFolder = './frames/';
    fs.readdir(testFolder, (err, files) => {
          files.forEach(file => {
              console.log(file);
              getImageDataFromFile(file)
          });
          callback();
    })
}


function getImageDataFromFile(fileName){
    fs.readFile("./frames/" + fileName, 'binary',function(err, data) {
//        console.log(data);
//        console.log('\n\n\n');
        CallAPI(data, );
    });
}

function CallAPI(file, apiUrl, apiKey){
    var payload = file;
    request({
        url: apiUrl,
        method: "POST",
        json: false,
        body: payload,
        headers: {
            "content-type" : "application/octet-stream",
            "Ocp-Apim-Subscription-Key" : apiKey
        }
    }, function(err, res, body) {
        console.log(body);
    });
}