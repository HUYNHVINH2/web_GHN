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
    var { token, IdProvice } = req.body;

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
            res.json({ data: DATA.data.Wards });
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
                if (item.ProvinceID == 202) {
                    lsDistric.push(item)
                }

            });

            res.json({ data: lsDistric });
        })
        .catch(function (err) {
            console.log("loi roi!" + err)
        });
});

app.post('/get-ServerID', (req, res) => {
    var token = "TokenStaging"
    var { weight, Length, width, height, IdProvice } = req.body;
    var options = {
        method: 'POST',
        uri: 'https://apiv3-test.ghn.vn/api/v1/apiv3/FindAvailableServices',
        body: {
            token: token,
            Weight: Number(weight),
            Height: Number(height),
            Length: Number(Length),
            Width: Number(width),
            FromDistrictID: 1451,
            ToDistrictID: Number(IdProvice)
        },
        json: true // Automatically stringifies the body to JSON
    };
    rp(options)
        .then(function (DATA) {
            let DataServer = [];
            DataServer.push(DATA.data[0].ServiceID, DATA.data[0].ServiceFee, DATA.data[0].ExpectedDeliveryTime, DATA.data[0].Name);
            console.log(DataServer)
            res.json({ data: DataServer });
        })
        .catch(function (err) {
            console.log("loi roi!" + err)
        });

})
app.post('/create-oder-GHN', (req, res) => {

    var {
        IdProvice, toWardcode, ServerId,
        weight, Length, width, height, ReturnAddress, ReturnContactName, ReturnContactPhone
    } = req.body;
    console.log(" " + IdProvice + " " + toWardcode + " " + ServerId + " "
        + weight + "" + Length + "" + width + "" + height + ReturnAddress + ReturnContactName + ReturnContactPhone);


    var options = {
        method: 'POST',
        uri: 'https://apiv3-test.ghn.vn/api/v1/apiv3/CreateOrder',
        body: {
            token: "TokenStaging",
            PaymentTypeIDoptional:1,
            FromDistrictID:1451,
            FromWardCode:"20911",
            ToDistrictID:Number(IdProvice),
            ToWardCode:toWardcode,
            Note: "Tạo ĐH qua API",
            SealCode: "tem niêm phong",
            ExternalCode: "",
            ClientContactName: "KOF",
            ClientContactPhone: "19001206",
            ClientAddress: "102 Man Thiện", 
            CustomerName: ReturnContactName,
            CustomerPhone: ReturnContactPhone,
            ShippingAddress: ReturnAddress,
            CoDAmount: 1500000,
            NoteCode: "CHOXEMHANGKHONGTHU", 
            InsuranceFee: 0,
            ClientHubID: 299650,
            ServiceID: Number(ServerId), 
            Content: "Test nội dung",
            CouponCode: "",
            Weight: Number(weight),
            Height: Number(height),
            Length: Number(Length),
            Width: Number(width),
            ShippingOrderCosts:
            [
                {
                    "ServiceID": 53337
                }
            ],
            ReturnContactName: "KOF",
            ReturnContactPhone: "19001206",
            ReturnAddress: "102 Man Thiện",
            ReturnDistrictID: 1455,
            ExternalReturnCode: "GHN",
            IsCreditCreate: true,
            AffiliateID: 252905
        },
        json: true // Automatically stringifies the body to JSON
    };
    rp(options)
        .then(function (DATA) {
           var DataServer = " Dung roi"
            console.log("dung"+DATA)
            res.json({ data: DataServer });
        })
        .catch(function (err) {
            console.log("loi roi!" + err)
        });


})

app.listen(port, function () {
    console.log("Running  on port " + port);
});
// request('https://thongtindoanhnghiep.co/api/city'
//  request(`https://thongtindoanhnghiep.co/api/city/${id_tinh}/distric  