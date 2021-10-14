//const { exists } = require("../../models/Warehouse");

//grabs company to add warehouse to
function getCompany()
{
    /*
        const container = document.getElementById('_ownerId');

        const qs = new URLSearchParams(window.location.search);
        const owner = qs.get('company');

        const option = document.createElement('option');
        option.value = `${owner}`;
        option.innerText = `${owner}`;
        container.append(option);*/

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/companies');
    xhr.onload = function ()
    {
        const companies = JSON.parse(xhr.response);
        const container = document.getElementById('_ownerId');

        const qs = new URLSearchParams(window.location.search);
        const owner = qs.get('company');

        if(xhr.status == 200)
        {
            for(company of companies)
            {
                if(company.name == owner)
                {
                    const option = document.createElement('option');
                    option.value = `${owner}`;
                    option.innerText = `${owner}`;
                    container.append(option);
                }
            }
        }
        else
        {
            container.innerText = 'Company doesn\'t exist. Add it on the home page.';
        }
        
    }
    xhr.send();
}

window.addEventListener('DOMContentLoaded', ()=>{
    getCompany();
})