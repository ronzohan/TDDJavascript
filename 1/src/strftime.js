Date.prototype.strftime = (function(){
    function strftime(format){
    	var date = this;

    	return (format + "").replace(/%([a-zA-Z])/g, 
    	function (m, f){
    		var formatter = Date.formats && Date.formats[f];

    		if (typeof formatter == "function")
    		{
    			return formatter.call(Date.formats, date);
    		} 
    		else if (typeof formatter == "string")
    		{
    			return date.strftime(formatter);
    		}

    		return f;
    	});
	}

//Internal Helper
function zeroPad(num)
{
	return (+num < 10 ? "0" : "") + num;
}

Date.formats = {
	//Formatting methods 
	d: function(date){
		return zeroPad(date.getDate());
	},

	m: function(date){
		return zeroPad(date.getMonth());
	},

	y: function(date){
		return zeroPad(date.getYear() % 100);
	},

	Y: function(date){
		return date.getFullYear();
	},
	
	// Format shorthands
	F: "%Y-%m-%d",
	D: "%m/%d/%y"
};

return strftime;
}());

function assert(message, expr){
	if (!expr){
		throw new Error(message)
		
	}
	
	assert.count++;
	
	return true
}

assert.count = 0;


function output(text, color){
	var p = document.createElement("p");
	p.innerHTML = text;
	p.style.color = color;
	document.body.appendChild(p);
}


function testCase(name, tests){
	assert.count = 0;
	var successful = 0;
	var testCount = 0;
	var hasSetup = typeof tests.setUp == "function";
	var hasTeardown = typeof tests.tearDown == "function";
	
	for (var test in tests){
		if (!/^test/.test(test)){
			continue;
		}
		
		testCount++;
		
		try{
			if (hasSetup){
				tests.setUp();
			}
			
			tests[test]();
			output(test, "#0c0");
			
			if (hasTeardown){
				tests.tearDown();
			}
			
			// If the tearDown method throws an error, it is
			// considered a test failure, so we don't count
			// success until all methods have run successfully
			successful++;
			
		} catch(e){
			output(test + " failed: " + e.message, "#c00");
		}
	}
	
	var color = successful == testCount ? "#0c0" : "#c00";
	
	output("<strong>" + testCount + " tests, " + 
		  (testCount - successful) + " failures</strong>", color)
}
