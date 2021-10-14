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

window.addEventListener('DOMContentLoaded', ()=>{
    getWarehouses();
})