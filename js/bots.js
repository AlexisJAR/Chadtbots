class Bot{
    constructor(name, linkProfilePic){
        this.name = name;
        this.linkProfilePic = linkProfilePic;
    }

    understandCommand(command){
        if(command == "What can you all do for me?"){
            document.getElementById("ChatMain").innerHTML += '<div class="d-flex justify-content-start"><span class="small mb-1 text-muted">'+new Date().toDateString()+'</span>&ensp;<span class="small mb-1">'+this.name+'</span></div><div class="d-flex flex-row justify-content-start mb-4 pt-1"><div><iframe width="420" height="345" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"></iframe></div><img src="ressources/'+this.name+'.jpg"alt="avatar 1" style="width: 85px; height: 100%;"></div>';
        }
    }
}

class RugbyBot extends Bot{
    understandCommand(command){
        super(command);
        if(command.indexOf(this.name)!==-1){
            if(command == this.name + " show me how well performed Castres last year, please."){
                const url = 'https://api-rugby.p.rapidapi.com/teams/statistics?team=98&league=16&season=2022';
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '0450222e5fmshb7274e958edd20bp14a12fjsnba3b9c3bce32',
                        'X-RapidAPI-Host': 'api-rugby.p.rapidapi.com'
                    }
                };

                try {
                    const response = await fetch(url, options);
                    const result = await response.text();
                    const resJson = JSON.parse(result);
                    const stringReturn = "Last year, Castres won "+resJson.games.wins.all.total + " games on the " + resJson.games.played.all + " games they played.";
                    document.getElementById("ChatMain").innerHTML += '<div class="d-flex justify-content-start"><span class="small mb-1 text-muted">'+new Date().toDateString()+'</span>&ensp;<span class="small mb-1">'+this.name+'</span></div><div class="d-flex flex-row justify-content-start mb-4 pt-1"><div>'+stringReturn+'</div><img src="ressources/'+this.name+'.jpg"alt="avatar 1" style="width: 85px; height: 100%;"></div>';
                } catch (error) {
                    console.error(error);
                }
            }
            else if(command == this.name + " show me how well performed Stade Francais last year, please."){
                const url = 'https://api-rugby.p.rapidapi.com/teams/statistics?team=106&league=16&season=2022';
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '0450222e5fmshb7274e958edd20bp14a12fjsnba3b9c3bce32',
                        'X-RapidAPI-Host': 'api-rugby.p.rapidapi.com'
                    }
                };

                try {
                    const response = await fetch(url, options);
                    const result = await response.text();
                    const resJson = JSON.parse(result);
                    const stringReturn = "Last year, Stade Francais won "+resJson.games.wins.all.total + " games on the " + resJson.games.played.all + " games they played.";
                    document.getElementById("ChatMain").innerHTML += '<div class="d-flex justify-content-start"><span class="small mb-1 text-muted">'+new Date().toDateString()+'</span>&ensp;<span class="small mb-1">'+this.name+'</span></div><div class="d-flex flex-row justify-content-start mb-4 pt-1"><div>'+stringReturn+'</div><img src="ressources/'+this.name+'.jpg"alt="avatar 1" style="width: 85px; height: 100%;"></div>';
                } catch (error) {
                    console.error(error);
                }    
            }
            else {
                //Call ChatGPT
            }
        }
        else if(command == "Help"){
            stringReturn = "You may call me to asks about my favorite teams of the greatest sport ever.";
            stringReturn += "To learn about the last results of Castres, simply ask : "+this.name+" show me how well performed Castres last year, please.";
            stringReturn += "To learn about the last results of Stade Francais, kindly ask : "+this.name+" show me how well performed Stade Francais last year, please.";
            stringReturn += "You may also call my name to ask me for anything else, but please be civil.";
            document.getElementById("ChatMain").innerHTML += '<div class="d-flex justify-content-start"><span class="small mb-1 text-muted">'+new Date().toDateString()+'</span>&ensp;<span class="small mb-1">'+this.name+'</span></div><div class="d-flex flex-row justify-content-start mb-4 pt-1"><div>'+stringReturn+'</div><img src="ressources/'+this.name+'.jpg"alt="avatar 1" style="width: 85px; height: 100%;"></div>'
        }
    }
}

class LinguistBot extends Bot{
    understandCommand(command, targetTongue, intendedWord){
        super(command);
        if(command.indexOf(this.name)!==-1){
            if(command == this.name + " can you translate "+intendedWord+" in "+targetTongue+", please."){
                const url = 'https://rapid-translate-multi-traduction.p.rapidapi.com/t';
                const tarCode = this.listOfTongues(targetTongue);
                if(tarCode!="Unknown"){
                    const options = {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'X-RapidAPI-Key': '0450222e5fmshb7274e958edd20bp14a12fjsnba3b9c3bce32',
                            'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
                        },
                        body: {
                            from: 'en',
                            to: tarCode,
                            q: intendedWord
                        }
                    };
                    try {
                        const response = await fetch(url, options);
                        const result = await response.text();
                        const print = result.slice(3);
                        const messResponse = intendedWord+" in "+targetTongue+" is : "+print;
                        document.getElementById("ChatMain").innerHTML += '<div class="d-flex justify-content-start"><span class="small mb-1 text-muted">'+new Date().toDateString()+'</span>&ensp;<span class="small mb-1">'+this.name+'</span></div><div class="d-flex flex-row justify-content-start mb-4 pt-1"><div>'+messResponse+'</div><img src="ressources/'+this.name+'.jpg"alt="avatar 1" style="width: 85px; height: 100%;"></div>';
                    } catch (error) {
                        console.error(error);
                    }
                }
                else{
                    const Refusal = "I don't know this tongue yet, sadly. I will work harder to learn it, but in the mean time, please ask me something in another language please."
                    document.getElementById("ChatMain").innerHTML += '<div class="d-flex justify-content-start"><span class="small mb-1 text-muted">'+new Date().toDateString()+'</span>&ensp;<span class="small mb-1">'+this.name+'</span></div><div class="d-flex flex-row justify-content-start mb-4 pt-1"><div>'+Refusal+'</div><img src="ressources/'+this.name+'.jpg"alt="avatar 1" style="width: 85px; height: 100%;"></div>';
                }
            }
            else if (command == this.name + "  how do you introduce yourself in "+targetTongue+"?"){
                const strPresentation = "Hello, I am (name), I am (age) years old and live in (location)";
                const url = 'https://rapid-translate-multi-traduction.p.rapidapi.com/t';
                const tarCode = this.listOfTongues(targetTongue);
                if(tarCode!="Unknown"){
                    const options = {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'X-RapidAPI-Key': '0450222e5fmshb7274e958edd20bp14a12fjsnba3b9c3bce32',
                            'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
                        },
                        body: {
                            from: 'en',
                            to: tarCode,
                            q: strPresentation
                        }
                    };
                    try {
                        const response = await fetch(url, options);
                        const result = await response.text();
                        const print = result.slice(3);
                        const messResponse = "To present yoursel in "+targetTongue+", just say : "+print;
                        document.getElementById("ChatMain").innerHTML += '<div class="d-flex justify-content-start"><span class="small mb-1 text-muted">'+new Date().toDateString()+'</span>&ensp;<span class="small mb-1">'+this.name+'</span></div><div class="d-flex flex-row justify-content-start mb-4 pt-1"><div>'+messResponse+'</div><img src="ressources/'+this.name+'.jpg"alt="avatar 1" style="width: 85px; height: 100%;"></div>';
                    } catch (error) {
                        console.error(error);
                    }
                }
                else{
                    const Refusal = "I don't know this tongue yet, sadly. I will work harder to learn it, but in the mean time, please ask me something in another language please."
                    document.getElementById("ChatMain").innerHTML += '<div class="d-flex justify-content-start"><span class="small mb-1 text-muted">'+new Date().toDateString()+'</span>&ensp;<span class="small mb-1">'+this.name+'</span></div><div class="d-flex flex-row justify-content-start mb-4 pt-1"><div>'+Refusal+'</div><img src="ressources/'+this.name+'.jpg"alt="avatar 1" style="width: 85px; height: 100%;"></div>';
                }
            }
            else {
                //Call ChatGPT
            }
        }
        else if(command == "Help"){
            stringReturn = "To translate a word from your tongue to a foreign language, simply ask : "+this.name+" can you translate 'the word you want' in 'the foreign language', please. ";
            stringReturn += "To know how to intruduce yourself in a foreign language, please ask : "+this.name+" how do you introduce yourself in 'intended language'?";
            stringReturn += "Please do not forget to start the name of a language by an uppercase letter.";
            stringReturn += "You may also call my name to ask me for anything else, but please be civil.";
        }
    }
    listOfTongues(tongueWanted){
        if(tongueWanted == "Afrikaans"){
            return "af";
        }
        else if(tongueWanted == "Albanian"){
            return "sq";
        }
        else if(tongueWanted == "Amharic"){
            return "am";
        }
        else if(tongueWanted == "Arabic"){
            return "ar";
        }
        else if(tongueWanted == "Armenian"){
            return "hy";
        }
        else if(tongueWanted == "Azeerbaijani"){
            return "az";
        }
        else if(tongueWanted == "Bashkir"){
            return "ba";
        }
        else if(tongueWanted == "Basque"){
            return "eu";
        }
        else if(tongueWanted == "Belarussian"){
            return "be";
        }
        else if(tongueWanted == "Bengali"){
            return "bn";
        }
        else if(tongueWanted == "Bosnian"){
            return "bs";
        }
        else if(tongueWanted == "Bulgarian"){
            return "bg";
        }
        else if(tongueWanted == "Burmese"){
            return "my";
        }
        else if(tongueWanted == "Catalan"){
            return "ca";
        }
        else if(tongueWanted == "Cebuano"){
            return "ceb";
        }
        else if(tongueWanted == "Chichewa"){
            return "ny";
        }
        else if(tongueWanted == "Chinese"){
            return "zh-TW";
        }
        else if(tongueWanted == "Corsican"){
            return "co";
        }
        else if(tongueWanted == "Croatian"){
            return "hr";
        }
        else if(tongueWanted == "Czech"){
            return "cs";
        }
        else if(tongueWanted == "Danish"){
            return "da";
        }
        else if(tongueWanted == "Dutch"){
            return "nl";
        }
        else if(tongueWanted == "English"){
            return "en";
        }
        else if(tongueWanted == "Esperanto"){
            return "eo";
        }
        else if(tongueWanted == "Estonian"){
            return "et";
        }
        else if(tongueWanted == "Finnish"){
            return "fi";
        }
        else if(tongueWanted == "French"){
            return "fr";
        }
        else if(tongueWanted == "Frisian"){
            return "fi";
        }
        else if(tongueWanted == "Galician"){
            return "gl";
        }
        else if(tongueWanted == "Georgian"){
            return "ka";
        }
        else if(tongueWanted == "German"){
            return "de";
        }
        else if(tongueWanted == "Greek"){
            return "el";
        }
        else if(tongueWanted == "Gujarati"){
            return "gu";
        }
        else if(tongueWanted == "Creole"){
            return "ht";
        }
        else if(tongueWanted == "Haussa"){
            return "ha";
        }
        else if(tongueWanted == "Hawaiian"){
            return "haw";
        }
        else if(tongueWanted == "Hebrew"||tongueWanted=="Jewish"){
            return "iw";
        }
        else if(tongueWanted == "Hill Mari"){
            return "mrj";
        }
        else if(tongueWanted == "Hindi"){
            return "hi";
        }
        else if(tongueWanted == "Hmong"){
            return "hmn";
        }
        else if(tongueWanted == "Hungarian"){
            return "hu";
        }
        else if(tongueWanted == "Icelandic"){
            return "is";
        }
        else if(tongueWanted == "Ingbo"){
            return "ig";
        }
        else if(tongueWanted == "Indonesian"){
            return "id";
        }
        else if(tongueWanted == "Irish"){
            return "ga";
        }
        else if(tongueWanted == "Italian"){
            return "it";
        }
        else if(tongueWanted == "Japanese"){
            return "ja";
        }
        else if(tongueWanted == "Javanese"){
            return "jw";
        }
        else if(tongueWanted == "Kannada"){
            return "kn";
        }
        else if(tongueWanted == "Kazakh"){
            return "kk";
        }
        else if(tongueWanted == "Khmer"){
            return "km";
        }
        else if(tongueWanted == "Korean"){
            return "ko";
        }
        else if(tongueWanted == "Kurdish"){
            return "ku";
        }
        else if(tongueWanted == "Kyrgyz"){
            return "ky";
        }
        else if(tongueWanted == "Lao"){
            return "lo";
        }
        else if(tongueWanted == "Latin"){
            return "la";
        }
        else if(tongueWanted == "Latvian"){
            return "lv";
        }
        else if(tongueWanted == "Lithuanian"){
            return "lt";
        }
        else if(tongueWanted == "Luxembourgish"){
            return "lb";
        } 
        else if(tongueWanted == "Macedonian"){
            return "mk";
        }
        else if(tongueWanted == "Malagasy"){
            return "mg";
        }
        else if(tongueWanted == "Malay"){
            return "ms";
        }
        else if(tongueWanted == "Malayalam"){
            return "ml";
        }
        else if(tongueWanted == "Maltese"){
            return "mt";
        }
        else if(tongueWanted == "Maori"){
            return "mi";
        }
        else if(tongueWanted == "Marathi"){
            return "mr";
        }
        else if(tongueWanted == "Mari"){
            return "mhr";
        }
        else if(tongueWanted == "Mongolian"){
            return "mn";
        }
        else if(tongueWanted == "Nepali"){
            return "ne";
        }
        else if(tongueWanted == "Norwegian"){
            return "no";
        }
        else if(tongueWanted == "Pashto"){
            return "ps";
        }
        else if(tongueWanted == "Papiamento"){
            return "pap";
        }    
        else if(tongueWanted == "Persian"){
            return "fa";
        }
        else if(tongueWanted == "Polish"){
            return "pl";
        }
        else if(tongueWanted == "Portuguese"){
            return "pt";
        }
        else if(tongueWanted == "Punjabi"){
            return "pa";
        }
        else if(tongueWanted == "Romanian"){
            return "ro";
        }
        else if(tongueWanted == "Russian"){
            return "ru";
        }
        else if(tongueWanted == "Samoan"){
            return "sm";
        }
        else if(tongueWanted == "Gaelic"){
            return "gd";
        }
        else if(tongueWanted == "Serbian"){
            return "sr";
        }
        else if(tongueWanted == "Sesotho"){
            return "st";
        }
        else if(tongueWanted == "Shona"){
            return "sn";
        }
        else if(tongueWanted == "Sindhi"){
            return "sd";
        }
        else if(tongueWanted == "Sinhala"){
            return "si";
        }
        else if(tongueWanted == "Slovak"){
            return "sk";
        }
        else if(tongueWanted == "Slovenian"){
            return "sl";
        } 
        else if(tongueWanted == "Somali"){
            return "so";
        }
        else if(tongueWanted == "Spanish"){
            return "es";
        }
        else if(tongueWanted == "Sundanese"){
            return "su";
        }
        else if(tongueWanted == "Swahili"){
            return "sw";
        }
        else if(tongueWanted == "Swedish"){
            return "sv";
        }
        else if(tongueWanted == "Tagalog"){
            return "tl";
        }
        else if(tongueWanted == "Tajik"){
            return "tg";
        }
        else if(tongueWanted == "Tamil"){
            return "ta";
        }
        else if(tongueWanted == "Tatar"){
            return "tt";
        }
        else if(tongueWanted == "Telugu"){
            return "te";
        }
        else if(tongueWanted == "Thai"){
            return "th";
        }
        else if(tongueWanted == "Turkish"){
            return "tr";
        }
        else if(tongueWanted == "Udmurt"){
            return "udm";
        }    
        else if(tongueWanted == "Ukrainian"){
            return "uk";
        }
        else if(tongueWanted == "Urdu"){
            return "ur";
        }
        else if(tongueWanted == "Uzbek"){
            return "uz";
        }
        else if(tongueWanted == "Vietnamese"){
            return "vi";
        }
        else if(tongueWanted == "Welsh"){
            return "cy";
        }
        else if(tongueWanted == "Xhosa"){
            return "xh";
        }
        else if(tongueWanted == "Yiddish"){
            return "yi";
        }
        else if(tongueWanted == "Yoruba"){
            return "yo";
        }
        else if(tongueWanted == "Zulu"){
            return "zu";
        }
        else{
            return "Unknown";
        }
    }
}

class MapBot extends Bot{
    understandCommand(command, languageForLocalities){
        super(command);
        if(command.indexOf(this.name)!==-1){
            const tileX = this.getRandNumberForTiles();
            const tileY = this.getRandNumberForTiles();
            const zoomZ = 3;
            if(command == this.name + ", can you show me a random map, please?"){

                const url = 'https://maptiles.p.rapidapi.com/local/osm/v1/'+zoomZ+'/'+tileX+'/'+tileY+'.png';
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '0450222e5fmshb7274e958edd20bp14a12fjsnba3b9c3bce32',
                        'X-RapidAPI-Host': 'maptiles.p.rapidapi.com'
                    }
                };

                try {
                    const response = await fetch(url, options);
                    const result = await response.text();
                    document.getElementById("ChatMain").innerHTML += '<div class="d-flex justify-content-start"><span class="small mb-1 text-muted">'+new Date().toDateString()+'</span>&ensp;<span class="small mb-1">'+this.name+'</span></div><div class="d-flex flex-row justify-content-start mb-4 pt-1"><div>'+result+'</div><img src="ressources/'+this.name+'.jpg"alt="avatar 1" style="width: 85px; height: 100%;"></div>';
                } catch (error) {
                    console.error(error);
                }
            }
            else if (command == this.name + ", can you show me a random map but with the localities in "+languageForLocalities+", please?"){
                const url;
                if(languageForLocalities == "French"){
                    url = 'https://maptiles.p.rapidapi.com/fr/map/v1/'+zoomZ+'/'+tileX+'/'+tileY+'.png';
                }
                else if(languageForLocalities == "Spanish"){
                    url = 'https://maptiles.p.rapidapi.com/es/map/v1/'+zoomZ+'/'+tileX+'/'+tileY+'.png';
                }
                else { //English by default
                    url = 'https://maptiles.p.rapidapi.com/en/map/v1/'+zoomZ+'/'+tileX+'/'+tileY+'.png';
                }
                
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '0450222e5fmshb7274e958edd20bp14a12fjsnba3b9c3bce32',
                        'X-RapidAPI-Host': 'maptiles.p.rapidapi.com'
                    }
                };

                try {
                    const response = await fetch(url, options);
                    const result = await response.text();
                    document.getElementById("ChatMain").innerHTML += '<div class="d-flex justify-content-start"><span class="small mb-1 text-muted">'+new Date().toDateString()+'</span>&ensp;<span class="small mb-1">'+this.name+'</span></div><div class="d-flex flex-row justify-content-start mb-4 pt-1"><div>'+result+'</div><img src="ressources/'+this.name+'.jpg"alt="avatar 1" style="width: 85px; height: 100%;"></div>';
                } catch (error) {
                    console.error(error);
                }
            }
            else {
                //Call ChatGPT
            }
        }
        else if(command == "Help"){
            stringReturn = "To see a map of a random area of the world, simply ask : "+this.name+", can you show me a random map, please?";
            stringReturn += "To see the map of a random area, but with the names in a certain tongue kindly ask : "+this.name+", random map but with the localities in 'language', please?";
            stringReturn += "Please, bear in mind I am not LinguisticEnthousiast, I only know English, French and Spanish.";
            stringReturn += "You may also call my name to ask me for anything else, but please be civil.";
        }
    }
    getRandNumberForTiles(){
        return Math.floor(Math.random()*9)+1;
    }
}

function onClick(elem){
    var $elem = $(elem);
    var valueElem = $elem.val();
    var ove = RugbyBot;
    ove.name = "OvalBallEnjoyer";
    var we = MapBot;
    we.name = "WorldExplorer";
    var li = LinguistBot;
    li.name = "LinguisticEnthusiast";
    if (valueElem != ''){
        if(valuelElem.indexOf("LinguisticEnthusiast") !== -1){
            li.understandCommand(valueElem);
        }
        else if(valueElem.indexOf("OvalBallEnjoyer") !== -1){
            ove.understandCommand(valueElem);
        }
        else if(valueElem.indexOf("WorldExplorer")){
            we.understandCommand(valueElem);
        }
        else if(valueElem == "Help" || valueElem=="What can you all do for me?"){
            li.understandCommand(valueElem);
            ove.understandCommand(valueElem);
            we.understandCommand(valueElem);
        }
        else{
            document.getElementById("ChatMain").innerHTML += '<div class="d-flex justify-content-start"><span class="small mb-1 text-muted">'+new Date().toDateString()+'</span>&ensp;<span class="small mb-1">anonymousBot</span></div><div class="d-flex flex-row justify-content-start mb-4 pt-1"><div>Sorry, I have failed to understand how to use OpenAI API, and hereby accept the total failure of this course.</div><img src="ressources/'+this.name+'.jpg"alt="avatar 1" style="width: 85px; height: 100%;"></div>';
        }
    }
}