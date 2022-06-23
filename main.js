const fillForm = (adress) => {
    document.getElementById('adress').value = adress.logradouro;
    document.getElementById('district').value = adress.bairro;
    document.getElementById('city').value = adress.localidade;
    document.getElementById('state').value = adress.uf;
}

const cleanForm = (adress) => {
    document.getElementById('adress').value = '';
    document.getElementById('district').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
}


const isNumber = (number) => /^[0-9]+$/.test(number);
const validCEP = (cep) => cep.length == 8 && isNumber;

const searchCep = async() => {
    cleanForm();
    
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if (validCEP(cep)) {
        const date = await fetch(url);
        const adress = await date.json();
        if(adress.hasOwnProperty('erro')) {
            document.getElementById('adress').value = 'CEP não localizado!';
        } else {
            fillForm(adress);
        }
    } else {
        document.getElementById('adress').value = 'CEP inválido!';
    }

}

document.getElementById('cep').addEventListener('focusout', searchCep);