YUI({
	combine: true,
	timeout: 10000
}).use("node", "console", "test", function(Y){
	var assert = Y.Assert;
	
	var strftimeTestCase = new Y.Test.Case({
		name: "Date.prototype.strftime Tests",
		
		setUp: function(){
			this.date = new Date(2009, 9, 2, 22, 14, 45);
		},
		
		tearDown: function(){
			delete this.date;
		},
		
		"test %Y should return full year": function(){
			var year = Date.formats.Y(this.date);
			
			assert.isNumber(year);
			assert.areEqual(2009, year);
		}
	});
	
	//create the console
	var r = new Y.Console({
		newestOnTop: false,
		style: 'block'
	});
	
	r.render("#testReport");
	Y.Test.Runner.add(strftimeTestCase);
	Y.Test.Runner.run();
});
 