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

    function resultSearch(data, search){
        let tabResult = [];
        let searchOk = false;
        let html = '';
        let currentLine ='';
        data.forEach(function(enregistrement){
            currentLine += '<tr>';
            for(key in enregistrement){
                currentLine += '<td>';
                if('object' !== typeof(enregistrement[key])){
                    
                    if(enregistrement[key].toString().toLowerCase().indexOf(search.toLowerCase()) >= 0){
                        currentLine += `<mark>${enregistrement[key]}</mark>`;
                        searchOk = true
                    }else{
                        currentLine += `${enregistrement[key]}`;
                    }
                }else{
                    for(subKey in enregistrement[key]){
                        if('object' !== typeof(enregistrement[key][subKey])){
                            if(enregistrement[key][subKey].toString().toLowerCase().indexOf(search.toLowerCase()) >= 0){
                                currentLine += `<mark>${enregistrement[key][subKey]}</mark><br />`;
                                searchOk = true
                            }else{
                                currentLine += `${enregistrement[key][subKey]}<br />`;
                            }
                        }
                        
                    }
                }
                currentLine += '</td>';
            }
            currentLine += '</tr>';
            if(searchOk){
                tabResult.push(enregistrement);
                html += currentLine;
            }
            searchOk = false;
            currentLine = '';
        });
        console.log(tabResult);
        if(tabResult.length === 0){
            return false;
        }else{
            //console.log(html);
            return html;
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
                    fetch('./ressources/users.json')
                    .then( function(reponse){
                        return reponse.json();
                    })
                    .then(function(data){
                        //console.log(data);
                        let modalResult = document.querySelector('#modalResult');
                        let result = resultSearch(data, search);
                        if(result !== ''){
                            document.querySelector('#resSearchBody').innerHTML = result;
                            modalResult.click();
                        }
                    }).catch(function(error){
                        console.log(error.message);
                    })
                    .finally(function(){
                        console.log('traitement terminé');
                    });
                }
            }
        });
    });

    ( function(test){
        console.log(test);
    })('mon test'); // fonction auto exécutée

    /* objet litéral */

    let obj = {
        nom: 'Duflot',
        prenom: 'Nicolas',
        bDP: function(){
            return 'une blague de papa';
        }
    };

    console.log(obj.nom, obj.prenom, obj.bDP());

});