const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName)
  console.log(lastName);
  console.log(email);

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  var jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/c9842acec3";


  const options = {
    method: "POST",
    auth: "Subhamoy:5e006a6a81ab75bd5f798e6d831ca648-us8"
  }
  const request = https.request(url, options, function(response) {

    if (response.statusCode ===200)
    {
      res.sendFile(__dirname+"/sucess.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }


    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
});


app.post("/failure", function(req,res){
  res.redirect("/");
})



app.listen(process.env.PORT || 3000, function() {
  console.log("Initiating the server at 3000.........");
});
// API KEY
// 5e006a6a81ab75bd5f798e6d831ca648-us8
// LIST ID
// c9842acec3
