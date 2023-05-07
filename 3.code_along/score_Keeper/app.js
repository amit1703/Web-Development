const p1score = document.querySelector('#firstplayer');
const p2score = document.querySelector('#secondplayer');
const btnp1 = document.querySelector('#addtopone');
const btnp2 = document.querySelector('#addtoptwo');
const reset = document.querySelector('#reset');
const rounds = document.querySelector('#rounds').value;
let   p2rounds = 0;
let   p1rounds = 0;

        
        btnp1.addEventListener('click', (e) =>{
                p1rounds  = p1rounds +1 ; 
                p1score.innerHTML = p1rounds;
                if(p1rounds == 5  )
                {
                    p1score.style.color = "green"
                    p2score.style.color = "red"
                  
                }
                if(p2rounds == 5  )
                {
                    p2score.style.color = "green"
                    p1score.style.color = "red"
                   
                }
        })
        btnp2.addEventListener('click', (e) =>{
                p2rounds  = p2rounds +1;
                p2score.innerHTML = p2rounds
                
                if(p1rounds == 5  )
                {
                    p1score.style.color = "green"
                    p2score.style.color = "red"
                  

        
                }
                if(p2rounds == 5  )
                {
                    p2score.style.color = "green"
                    p1score.style.color = "red"
                   
                }
        })
       
    
