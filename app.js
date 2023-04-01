const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("", function(req,res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    
    const data =  {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    console.log(jsonData);

    const url = "https://us13.api.mailchimp.com/3.0/lists/39ca288bc5";

    const options = {
        method: "POST",
        auth: "arun1:16fb3dbe3fe34af3d60b37ee6fe61aaa-us13"
    }

    const request = https.request(url, options, function(response) {
       
        if(response.errorCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function(data) {
            // console.log(JSON.parse(data));
        });
    }); 

    app.post("/failure.html",function(req, res) {
        res.redirect("/");
    })

    request.write(jsonData);
    request.end();
});


app.listen(process.env.PORT || 3000, function() {
    console.log("Port 3000");
});




//API KEY:
// 16fb3dbe3fe34af3d60b37ee6fe61aaa-us13


// list_id: 39ca288bc5