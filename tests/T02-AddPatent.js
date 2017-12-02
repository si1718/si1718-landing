
describe('Add patent', function () {
	it('should add a new contact', function (){
	browser.get("http://localhost:8080");
	
		var numPatentsBefore,numPatentsAfter;
	
       var patents = element.all(by.repeater('patent in patents')).then(function (patentsBefore){
				browser.driver.sleep(2000);
				numPatentsBefore = patentsBefore.length;
				browser.get("http://localhost:8080/#!/create");
				var randTitle = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;
				var randYear = Math.floor(Math.random() * (2099 - 1980 + 1)) + 1980;
				var randMonth = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
				var randDay = Math.floor(Math.random() * (28 - 1 + 1)) + 1;
				
				randYearStr = String(randYear);
				randMonthStr = String(randMonth);
				randDayStr = String(randDay);
				
				
				element(by.model('newPatent.title')).sendKeys('Testing'+randTitle);
				element(by.model('newPatent.date')).sendKeys(randYearStr+"-"+randMonthStr+"-"+randDayStr);
				element(by.model('newPatent.inventors')).sendKeys('1,2');
				
				element(by.buttonText('Create')).click().then(function(){
					browser.driver.sleep(2000);
					browser.get("http://localhost:8080");
					
					
					var patentsAfter = element.all(by.repeater('patent in patents')).then(function (patentsAfter){
						numPatentsAfter = patentsAfter.length;
						expect(numPatentsAfter).toEqual(numPatentsBefore+1);
					});
					
				}
					
					
					
					);
			
		});;
       
       
				
				
				
	});
});