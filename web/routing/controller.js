let express = require('express')

const request = require('request');
const rp = require('request-promise')
// Initialize the app
let app = express();
// Setup server port
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', function (req, res) {
    res.render('DatHang-init');
  })
app.post('/get-list-ward', (req, res) => {
    var {token, IdProvice} = req.body;
    
    var options = {
        method: 'POST',
        uri: 'https://apiv3-test.ghn.vn/api/v1/apiv3/GetWards',
        body: {
            token: token,
            DistrictID: Number(IdProvice) 
        },
        json: true // Automatically stringifies the body to JSON
    };
    rp(options)
        .then(function (DATA) {  
           console.log(DATA.data.Wards);
           res.json({data:DATA.data.Wards});
        })
        .catch(function (err) {
            console.log("loi roi!")  
        });
});

app.post('/get-list-District', (req, res) => {
    var token = "TokenStaging";
    var options = {
        method: 'POST',
        uri: 'https://apiv3-test.ghn.vn/api/v1/apiv3/GetDistricts',
        body: {
            token: token,
          
        },
        json: true // Automatically stringifies the body to JSON
    };
    rp(options)
        .then(function (DATA) {  
            var lsDistric = [];
            DATA.data.forEach(item => {
                if(item.ProvinceID == 202)
                {
                    lsDistric.push(item)
                }
                
            });
        
           res.json({data:  lsDistric});
        })
        .catch(function (err) {
            console.log("loi roi!"+err)  
        });
});


app.post('/create-oder-GHN', (req, res) => {

  var {ToDistric, toWard, ServerId} =  req.body;
  console.log(" "+ToDistric+" "+toWard + " "+ ServerId);

})

app.listen(port, function () {
    console.log("Running  on port " + port);
});
// request('https://thongtindoanhnghiep.co/api/city'
//  request(`https://thongtindoanhnghiep.co/api/city/${id_tinh}/distric  