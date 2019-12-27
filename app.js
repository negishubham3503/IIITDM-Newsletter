const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME : fName,
                    LNAME : lName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    var options = {
        url: /* your mailchimp url*/,
        method: "POST",
        headers: {
            "Authorization": "shubhamnegi" /* + your mailchimp api key as string*/; 
        },
        body: jsonData
    };
    request(options, function(error, response, body){
        if (error)
            res.sendFile(__dirname + "/failure.html");
        else{
            if (response.statusCode === 200)
                res.sendFile(__dirname + "/success.html");
            else
                res.sendFile(__dirname + "/failure.html");
        }
    });
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});