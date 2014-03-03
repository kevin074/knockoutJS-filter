$(function(){
	function AppViewModel(){
		this.filterKey=ko.observable()
		this.filterText=ko.observable("placeholder") //cannot work without some text
		this.clearText=function(){
			this.filterText("placeholder");
		};
		this.clearKey=function(){
			this.filterKey("");
		};
		this.keyNumbers= ko.computed(function(){
			
			//for better display on screen//
			this.formattedText = ko.observableArray(this.filterText().split("- End Verbatim -"));
			this.formattedText.pop() //last item is empty
			for (x in this.formattedText()){
				this.formattedText()[x]=this.formattedText()[x].trim().substring(19,this.formattedText()[x].length)
			}
			////////////////////////////////

			//processing for desired string to parse and match//
			var notWords = new RegExp("[^a-z|A-Z| |-]", "g");
			var replaceDash = new RegExp("-|,|:|/","g");
			var verbatimArray = this.filterText().split("- End Verbatim -");
			var tooMuchWhiteSpace = new RegExp(" {2,}","g")
			for (x in verbatimArray) {
				verbatimArray[x]=verbatimArray[x].replace("- Start Verbatim -","")
				verbatimArray[x]=verbatimArray[x].replace(notWords,"")
				verbatimArray[x]=verbatimArray[x].replace(replaceDash," ")
				verbatimArray[x]=verbatimArray[x].replace(tooMuchWhiteSpace," ")
			}
			////////////////////////////////

			if(this.filterKey()!=undefined){var keyWord = this.filterKey().toLowerCase();}
			var keyCount=0;
			var isInSentence = false;
			var verbatimCount=0;
			var numberOfWords=0;
			for (x in verbatimArray) {
				isInSentence=false;
				var  wordArray = verbatimArray[x].split(" ");
				for (y in wordArray) {
					var sentenceWord = wordArray[y].toLowerCase();
					if(sentenceWord==keyWord || sentenceWord==keyWord+"s") {
						keyCount++;
						isInSentence=true;
					}
					numberOfWords++;
				}
				if(isInSentence){verbatimCount++;}				
			}
			console.log(verbatimArray)
			return [keyCount, verbatimCount, numberOfWords, this.formattedText];
		}, this);
	}
	ko.applyBindings(new AppViewModel());
})