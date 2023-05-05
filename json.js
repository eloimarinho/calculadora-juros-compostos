function chamarAPI(url){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    var taxas = xhr.responseText;
    taxas = JSON.parse(taxas);
    return taxas;
};

/*function post(payload) {
    var request = new XMLHttpRequest();
    request.open('POST', 'https://www.dadosdemercado.com.br/m', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(payload));
};*/

function calcularTaxa(taxa, tempoEmDias){
    let calculoTaxa =  (((Math.pow(1+(taxa/100),(tempoEmDias))))-1)*100;
    return calculoTaxa.toFixed(2);
};

function chamarValorApi(taxa, url, periodo, periodoTipo){
    let localDaTaxa = chamarAPI(url);
    if(periodo > 1){
        return document.querySelector(`.${taxa}`).textContent = `${calcularTaxa(localDaTaxa[9].valor, periodo)}% ao ${periodoTipo}`;                  
    }else{
        localDaTaxa = parseFloat(localDaTaxa[9].valor);
        return document.querySelector(`.${taxa}`).textContent = `${localDaTaxa.toFixed(2)}% ao ${periodoTipo}`;
    };
};
chamarValorApi("selic","https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/10?formato=json", 252, "ano");
chamarValorApi("poupanca", "https://api.bcb.gov.br/dados/serie/bcdata.sgs.25/dados/ultimos/10?formato=json", 1 , "mês");

