const express = require ('express');
const body_parser = require ('body-parser');
const request = require ('request');
const https = require ('https');
const app = express();

app.use(body_parser.urlencoded({extended : true}));
app.use(express.static("public"));
app.get("/", function (req,res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req,res)=>{

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
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
    var jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/0fccc07fb8";
    const options = {
        method: "POST",
        auth: "amir:770d9ea199af92b646071f1ae4b95dfb-us18"
    }
    const request = https.request(url,options, (response)=>{
        response.on("data",(data)=>{
            console.log(JSON.parse(data))
        });
    });
    request.write(jsonData);
    request.end();

});
app.listen(process.env.PORT || 3000, ()=>{
    console.log("we are on port 3000");
});
//770d9ea199af92b646071f1ae4b95dfb-us18

//list id : 0fccc07fb8