//  https://api.dictionaryapi.dev/api/v2/entries/en/<word>

// ⇑ API

const input = document.querySelector("input")

const container = document.querySelector(".container-fluid")
// const synonym = document.querySelector(".synonym")
input.addEventListener("keydown",(event)=>{
    let ex;
    let phonetic;
    let syns ;
    let href ;
    let randsyns ;
    if(event.keyCode == 13){
        // console.log(9);
        
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
        .then(res=>{
        // console.log(res.status);
        if (res.status < 450 & res.status > 350){
            throw new Error(`"${input.value}" doesn't exist in English`);
            
        }    


            return res.json()
        })
        .then(res=>{
            console.log(res)
            container.innerHTML =""
            let resmean = res[0].meanings
            console.log(resmean)

         resmean.forEach(meaning => {
                if(meaning.definitions[0].example){
                    ex =meaning.definitions[0].example
                }else{ex=""}
                if (res[0].phonetic) {
                    phonetic = res[0].phonetic
                } else {
                    phonetic = ""
                    
                }
                if (!meaning.synonyms.length == 0) {
                    randsyns = meaning.synonyms
                    let rr = Math.floor(Math.random()*randsyns.length)
                    console.log(rr);
                    syns = randsyns[rr]
                }else{
                    syns = ""
                }
                console.log(11111);
                if(res[0].phonetics[0]?.audio){
                 href =   res[0].phonetics[0].audio
                }else if (res[0].phonetics[1]?.audio) {
                    
                    href =   res[0].phonetics[1].audio
                    
                }else if(res[0].phonetics[2]?.audio){
                    
                    href =   res[0].phonetics[2].audio
                }
                else {
                    
                    href =""
                }
                
                container.insertAdjacentHTML("afterbegin",` <div class="info">
                    <div class="head-info">
                    <span class="part-speach">${meaning.partOfSpeech}</span>
                    <span class="word-phonetic"><h1>${res[0].word}</h1><span class="phonetic">${phonetic}</span></span>
                    <span class="play ps-3 pe-3 p-2 rounded rounded-circle" > <a class="a" href="${href}"><i class="bi bi-volume-up fs-2 fw-bold"></i></a></span>
                    
                    </div>
                    <div class="def">${meaning.definitions[0].definition}</div>
                    <div class="synonym">synonyms :   ${syns} </div>
                    <div class="example">${ex}</div>
                    </div>`)
                    
                    // let audio = document.querySelectorAll("audio")
                    // function playe() {
                        //     audio[0].play()
                        //     console.log(audio);
                        // }
                        
                        
                    });
                    
                    
                    
                    
                    
                })
                .catch(err=>{
                    container.innerHTML =""
                    console.log(typeof(err))
                    if (err =='TypeError: Failed to fetch') {
                        
                        container.insertAdjacentHTML("afterbegin",`<p class="err">lack of internet or poor connection</p>`) 
                        
                    }else{
                        
                        console.log(err);
                        container.insertAdjacentHTML("afterbegin",`<p class="err">${err}</p>`) 
                    }
                    
                })
                
        
        
    }
})




