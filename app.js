const express1=require("express");
const app=express1();
const bodyParser=require("body-parser");
const https=require("https");
const request=require("request");


app.use(express1.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
	res.sendFile(__dirname+"/signup.html");
});



app.post("/",function(req,res)
{
const firstName=req.body.fname;
const lastName=req.body.lname;
const email=req.body.email;

const data=
	{
		members:[
		{
			email_address:email,
			status:"subscribed",
			merge_fields:{
				FNAME:firstName,
				LNAME:lastName
			}
		}
		]
	};


    const url="https://us8.api.mailchimp.com/3.0/lists/5b137d3e93"
	const jsonData=JSON.stringify(data);
	const options={method:"post",auth:"hsd18_:d11d621df6067a5dafa3ae22710ac058-us8"};
	const request=https.request(url,options,function(response)
	{

	 if(response.statusCode==200)
	 {
	 	res.sendFile(__dirname+"/Success.html");
	 }
	 else
	 {
	 	res.sendFile(__dirname+"/Failue.html");
	 }
       response.on("data",function(data)
       {
       	console.log(JSON.parse(data));
       });
	} );

	request.write(jsonData);
	request.end();
});


app.post("/Failue.html",function(req,res)
{
res.redirect("/");
});


app.listen(process.env.PORT||3000 ,function(req,res)
{
	console.log("Server is running at port 3000");
});


