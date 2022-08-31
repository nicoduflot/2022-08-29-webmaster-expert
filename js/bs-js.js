window.addEventListener('DOMContentLoaded', function() {
    let btnProgress01 = document.querySelector('#btnProgress01');
    let progress01 = document.querySelector('#progress01');
    let btnProgress01Reset = document.querySelector('#btnProgress01Reset');

    function progress(valCurrent, valMax, timer, idProgress){
        if(valCurrent < valMax){
            document.querySelector(idProgress).style.setProperty('width', `${valCurrent}%`);
            valCurrent += Math.floor(Math.random() * 20 + 5);
            let next = function(){
                progress(valCurrent, valMax, timer, idProgress);
            };
            setTimeout(next, timer);
        }else{
            document.querySelector('#progress01').style.setProperty('width', `100%`);
        }
    }

    btnProgress01.addEventListener('click', function () {
        progress01.style.setProperty('width', '0');
        let [valMin, valMax] = [0, 100];//destructuration
        progress(valMin, valMax, 500, '#progress01');
    });

    btnProgress01Reset.addEventListener('click', function(){
        progress01.style.setProperty('width', '0');
    });

    let navbarSearch = document.querySelector('#navbarSearch');
    console.log(navbarSearch);
    navbarSearch.addEventListener('click', function(event){
        event.preventDefault(); // empêche ce que déclenche le 'click' sur le bouton de type submit.
        let formElt = event.target.parentNode.childNodes;
        let search = '';
        formElt.forEach( function(elt){
            if(elt.localName === 'input'){
                //console.log(elt);
                search = elt.value;
                if(search.length >= 3){
                    console.log(search);
                }
            }
        });
    });

    ( function(test){
        console.log(test);
    })('mon test'); // fonction auto exécutée
});