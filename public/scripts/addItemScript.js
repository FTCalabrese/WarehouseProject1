//pulls available warehouses to be added to
function getWarehouses()
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/warehouse');
    xhr.onload = function ()
    {
        const warehouses = JSON.parse(xhr.response);
        const container = document.getElementById('warehousename');
        const header = document.getElementById('addingTo');

        const qs = new URLSearchParams(window.location.search);
        const owner = qs.get('company');
        header.innerHTML = `<b>${qs.get('company')}</b>`;

        if(xhr.status == 200)
        {
            for(warehouse of warehouses)
            {
                if(warehouse._ownerId == owner)
                {
                    const option = document.createElement('option');
                    option.value = `${warehouse.warehousename}`;
                    option.innerText = `${warehouse.warehousename}`;
                    container.append(option);
                }
            }
        }
        else
        {
            container.innerText = 'Warehouse is empty';
        }
        
    }
    xhr.send();
}

function submitItem()
{
    const warehousename = document.getElementById('warehousename').value;
    const itemName = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const pallets = document.getElementById('pallets').value;
    const textfield = document.getElementById('form-notification');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/warehouse/${warehousename}/${itemName}/${quantity}/${pallets}`);
    xhr.onload = function ()
    {
        if(xhr.status == 201)
        {
            textfield.innerText = `${itemName} added successfully.`;
        }
        else
        {
            textfield.innerText = `failed to add ${itemName}.\ncheck that it doesn't already exist,\nor exceed the capacity of the warehouse.`;
        }
    }
    xhr.send();
}

function submitForm() {

    //clean data
    document.getElementById('name').value = document.getElementById('name').value.toLowerCase();
    document.getElementById('name').value = document.getElementById('name').value.replaceAll('/','');
    document.getElementById('quantity').value = Math.abs(document.getElementById('quantity').value);
    document.getElementById('pallets').value = Math.abs(document.getElementById('pallets').value);

    submitItem();

   //clear fields
    setTimeout(()=>{
        const selectedWarehouse = document.getElementById('warehousename').value;
        document.getElementById('form').reset(); 
         document.getElementById('warehousename').value = selectedWarehouse;
    }, 1000);  
}

window.addEventListener('DOMContentLoaded', ()=>{
    getWarehouses();
})

