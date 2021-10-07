function getInventory() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/warehouse');
    xhr.onload = function ()
    {
        let warehouseCount = 0;
        const inventory = JSON.parse(xhr.response);
        const container = document.getElementById('inventory');
        const navbar = document.getElementById('warehouse-tabs');
        const header = document.getElementById('company-name');

        //pull the current company from the URL. This was passed by companyScript.js in index.html
        const qs = new URLSearchParams(window.location.search);
        const owner = qs.get('company');
        header.innerHTML = `<b>${qs.get('company')}'s Inventory</b>`;

        if(xhr.status == 200)
        {
            //for every warehouse...
            for(item of inventory)
            {
                //if the owner of the warehouse is the same as the company whose page we're on...
                if(item._ownerId == owner.toString())
                {
                    warehouseCount++;

                    //create a navbar tab for the warehouse
                    const li = document.createElement('li');
                    li.innerHTML =  `<li class="nav-item">
                    <a class="nav-link" href="#" style="color: black">${item.warehousename}</a>
                    </li>`;
                    navbar.append(li);

                    //print the warehouse's inventory
                    for(let i = 0; i < item.items.length; i++)
                    {
                        const div = document.createElement('tr');

                        //if(i%2 == 0)div.classList = 'white';
                        //else div.classList = 'lightgrey ';
                        div.innerHTML = `<td>${item.warehousename}</td>
                        <td class="overflow">${item.items[i].name}</td>
                        <td>${item.items[i].quantity}</td>
                        <td>${item.items[i].pallets}</td>
                        <td><button type="button" id="edit${warehouseCount},${i}" style='width:50px' class='btn btn-warning'>o</button></td>
                        <td><button type="button" id="${warehouseCount},${i}" style='width:50px' class='btn btn-danger'>-</button></td>
                        `
                        container.append(div);
                        const button = document.getElementById(`${warehouseCount},${i}`);
                        button.value = `${item.warehousename}/${item.items[i].name}/${item.items[i].quantity}/${item.items[i].pallets}`;
                        button.onclick = deleteItem;
                    }
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
    getInventory();
})

function deleteItem(e)
{
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `/warehouse/delete/${e.target.value}`);//DELETE FROM DB

    xhr.onload = function(){

        if(xhr.status === 200)
        {
           e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        }
    }
    
    xhr.send();
}