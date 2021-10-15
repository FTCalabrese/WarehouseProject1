//const { exists } = require("../../models/Warehouse");

//grabs company to add warehouse to
function getCompany()
{
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

function submitItem()
{
    const _ownerId = document.getElementById('_ownerId').value;
    const warehousename = document.getElementById('warehousename').value;
    const capacity = document.getElementById('capacity').value;
    const textfield = document.getElementById('form-notification');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/forms/${_ownerId}/${warehousename}/${capacity}`);
    xhr.onload = function ()
    {
        if(xhr.status == 201)
        {
            textfield.innerText = `${warehousename} added successfully.`;
        }
        else
        {
            textfield.innerText = `failed to add ${warehousename}.\ncheck that it doesn't already exist in another company.`;
        }
    }
    xhr.send();
}

function submitForm() {

    //clean data
    document.getElementById('capacity').value = Math.abs(document.getElementById('capacity').value);

    submitItem();

   //clear fields
    setTimeout(()=>{
        document.getElementById('form').reset(); 
    }, 1000);  
}