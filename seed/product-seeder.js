var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping',{useMongoClient:true});

var products =[ 
new Product({
	imagePath:"https://originassets.akamaized.net/origin-com-store-final-assets-prod/182633/231.0x326.0/1038862_LB_231x326_en_US_%5E_2016-07-21-10-11-54_1b27093a8723b707c8433a4aafc9203fd660d669.jpg",
	title:"FIFA 17",
	description:"FIFA 17 is a sports video game in the FIFA series developed and published by Electronic Arts, which released in September 2016. This is the first FIFA game in the series to use the Frostbite game engine.Marco Reus serves as the cover athlete on the game",
	price:17
}),

new Product({
	imagePath:"https://staticdelivery.nexusmods.com/mods/110/images/78518-0-1473113067.jpg",
	title:"SkyRim: The Elder Scrolls V",
	description:"The Elder Scrolls V: Skyrim is an open world action role-playing video game developed by Bethesda Game Studios and published by Bethesda Softworks",
	price:25
}),

new Product({
	imagePath:"https://upload.wikimedia.org/wikipedia/en/1/18/Call_of_Duty_WWII_Cover_Art.jpg",
	title:"Call of Duty:WWII",
	description:"Call of Duty: WWII is an upcoming first-person shooter video game developed by Sledgehammer Games and published by Activision for PlayStation 4, Xbox One and Microsoft Windows",
	price:55
}),

]

var done=0;
for(i=0;i<products.length;i++)
{
	console.log("Inside");
	products[i].save(function(err,res){
		done++;
		if(done===products.length)
		{
			mongoose.disconnect();
		}	
	});
}	