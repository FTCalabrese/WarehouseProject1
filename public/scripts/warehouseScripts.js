
function getInventory(warehouseID = undefined) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/warehouse');
    xhr.onload = function ()
    {
        let warehouseCount = 0;
        const inventory = JSON.parse(xhr.response);
        const container = document.getElementById('inventory');
        const navbar = document.getElementById('warehouse-tabs');
        const navpage = document.getElementById('myTabContent');
        const header = document.getElementById('company-name');
        const buttonSlot = document.getElementById('addItemButton');

        //pull the current company from the URL. This was passed by companyScript.js in index.html
        const qs = new URLSearchParams(window.location.search);
        const owner = qs.get('company');
        header.innerHTML = `<b>${qs.get('company')}'s Inventory</b>`;

        buttonSlot.innerHTML = `<a href='/forms/item?company=${qs.get('company')}'><button type="button" class='btn btn-danger'>Add inventory</button></a>`

        if(xhr.status == 200 && warehouseID === undefined)
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
                    const tab = document.createElement('div');
                    li.classList = "nav-item";
                    li.innerHTML = `<button class="nav-link" onclick="filterTable('${item.warehousename}')" id="profile-tab" data-bs-toggle="tab" data-bs-target="#w${warehouseCount}" type="button" role="tab" aria-controls="profile" aria-selected="false" style="color: black">${item.warehousename}</button>`;
                    tab.classList = "tab-pane fade";
                    tab.id = `w${warehouseCount}`;
                    tab.innerHTML = `${item.warehousename}, <b>Available: ${item.inventory}/${item.capacity} pallets</b>`;
                    navbar.append(li);
                    navpage.append(tab);

                    //print the warehouse's inventory
                    for(let i = 0; i < item.items.length; i++)
                    {
                        const div = document.createElement('tr');

                        div.innerHTML = `<td>${item.warehousename}</td>
                        <td class="overflow">${item.items[i].name}</td>
                        <td>${item.items[i].quantity}</td>
                        <td>${item.items[i].pallets}</td>
                        <td><button type="button" id="edit${warehouseCount},${i}" style='width:50px' class='btn btn-warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brush" viewBox="0 0 16 16">
                        <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"/>
                      </svg></button></td>
                        <td><button type="button" id="${warehouseCount},${i}" style='width:50px' class='btn btn-danger'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg></button></td>
                        `
                        container.append(div);
                        const button = document.getElementById(`${warehouseCount},${i}`);
                        const editButton = document.getElementById(`edit${warehouseCount},${i}`);
                        button.value = `${item.warehousename}/${item.items[i].name}/${item.items[i].quantity}/${item.items[i].pallets}`;
                        editButton.value = `${item.warehousename}/${item.items[i].name}/${item.items[i].quantity}/${item.items[i].pallets}`;
                        button.onclick = deleteItem;
                        editButton.onclick = openEditMenu;
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

//deletes table, calls appropritate filter function
function filterTable(warehouseName){
    const data = document.getElementById('database-table');
    if(data === null) return; //prevents button spam breaking frontend
    data.remove();

    if(warehouseName == '') getUnfilteredInventory();
    else getFilteredInventory(warehouseName);
}

//#region EDITING

function openEditMenu(e)
{
    //if already open, close.
    if(document.getElementById(`editbox${e.target.value}`) !== null)
    {
        e.target.parentNode.removeChild(document.getElementById(`editbox${e.target.value}`));
        return;
    }

    //else open
    const values = e.target.value.split('/');
    const editBox = document.createElement('form');
    
           editBox.classList = 'centered form';
           editBox.id = `editbox${e.target.value}`;

           editBox.innerHTML = `
                    <div> Item: <input id="item${e.target.value}" type="text" name="newname" autocomplete="off" required/></div>
                    <div> Quantity: <input id='quantity${e.target.value}' type="number" name="newquantity" autocomplete="off" required/></div>
                    <div> Pallets: <input id='pallets${e.target.value}' type="number" name="newpallets" autocomplete="off" required/></div>
                    <div><button type="button" onclick="callEditItem('${e.target.value}')" style='width:50px' class='btn btn-danger'>ok</button><div></div>`;
            
            e.target.parentNode.append(editBox);
            document.getElementById(`item${e.target.value}`).value = values[1];
            document.getElementById(`quantity${e.target.value}`).value = values[2];
            document.getElementById(`pallets${e.target.value}`).value = values[3];  
}


function callEditItem(original)
{
    newname =  document.getElementById(`item${original}`).value;
    newname = newname.toLowerCase();
    newname = newname.replaceAll('/','');
    newquantity =  document.getElementById(`quantity${original}`).value;
    newpallets =  document.getElementById(`pallets${original}`).value;
    editItem(original, newname, newquantity, newpallets);
}

function editItem(original, newname, newquantity, newpallets)
{
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `/warehouse/update/${original}/${newname}/${newquantity}/${newpallets}`);
    xhr.onload = function(){

        if(xhr.status === 200)
        {
           console.log( `/warehouse/update/${original}/${newname}/${newquantity}/${newpallets}`);
        }
    }
    xhr.send();
}

//#endregion

//tells backend to delete a given item, and removes it from the front end
function deleteItem(e)
{
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `/warehouse/delete/${e.target.value}`);//DELETE FROM DB

    xhr.onload = function(){

        if(xhr.status === 200)
        {
            console.log(`/warehouse/delete/${e.target.value}`);
           e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        }
    }
    xhr.send();
}

//reloads the inventory with a given warehouse filter
//does not reload or change the tabs like getInventory() does
function getFilteredInventory(warehouseFilter)
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/warehouse');
    xhr.onload = function ()
    {
        let warehouseCount = 0;
        const inventory = JSON.parse(xhr.response);
        const tableContainer = document.getElementById('table-container');
        const header = document.getElementById('company-name');

        //re-create the table 
        const table = document.createElement('div');
        table.id = 'database-table';
        table.innerHTML=`<table style='table-layout: fixed;' class=" table table-striped">
        <thead>
          <tr>
            <th scope="col">Warehouse</th>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Pallets</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody id='inventory'>
        </tbody>
      </table>`;

        tableContainer.append(table);
        const container = document.getElementById('inventory');

        //pull the current company from the URL. This was passed by companyScript.js in index.html
        const qs = new URLSearchParams(window.location.search);
        const owner = qs.get('company');
        header.innerHTML = `<b>${qs.get('company')}'s Inventory</b>`;
        
        if(xhr.status == 200)
        {
            //for every warehouse...
            for(item of inventory)
            {
                //if the owner of the warehouse is the same as the company whose page we're on, AND it matches the given filter
                if(item._ownerId == owner.toString() && item.warehousename == warehouseFilter)
                {
                    warehouseCount++;

                    //print the warehouse's inventory
                    for(let i = 0; i < item.items.length; i++)
                    {
                        const div = document.createElement('tr');

                        div.innerHTML = `<td>${item.warehousename}</td>
                        <td class="overflow">${item.items[i].name}</td>
                        <td>${item.items[i].quantity}</td>
                        <td>${item.items[i].pallets}</td>
                        <td><button type="button" id="edit${warehouseCount},${i}" style='width:50px' class='btn btn-warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brush" viewBox="0 0 16 16">
                        <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"/>
                        </svg></button></td>
                        <td><button type="button" id="${warehouseCount},${i}" style='width:50px' class='btn btn-danger'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg></button></td>`

                        container.append(div);
                        const button = document.getElementById(`${warehouseCount},${i}`);
                        const editButton = document.getElementById(`edit${warehouseCount},${i}`);
                        button.value = `${item.warehousename}/${item.items[i].name}/${item.items[i].quantity}/${item.items[i].pallets}`;
                        editButton.value = `${item.warehousename}/${item.items[i].name}/${item.items[i].quantity}/${item.items[i].pallets}`;
                        button.onclick = deleteItem;
                        editButton.onclick = openEditMenu;
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

function getUnfilteredInventory()
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/warehouse');
    xhr.onload = function ()
    {
        let warehouseCount = 0;
        const inventory = JSON.parse(xhr.response);
        const tableContainer = document.getElementById('table-container');
        const header = document.getElementById('company-name');

        //re-create the table 
        const table = document.createElement('div');
        table.id = 'database-table';
        table.innerHTML=`<table style='table-layout: fixed;' class=" table table-striped">
        <thead>
          <tr>
            <th scope="col">Warehouse</th>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Pallets</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody id='inventory'>
        </tbody>
      </table>`;

        tableContainer.append(table);
        const container = document.getElementById('inventory');

        //pull the current company from the URL. This was passed by companyScript.js in index.html
        const qs = new URLSearchParams(window.location.search);
        const owner = qs.get('company');
        header.innerHTML = `<b>${qs.get('company')}'s Inventory</b>`;
        
        if(xhr.status == 200)
        {
            //for every warehouse...
            for(item of inventory)
            {
                //if the owner of the warehouse is the same as the company whose page we're on
                if(item._ownerId == owner.toString())
                {
                    warehouseCount++;

                    //print the warehouse's inventory
                    for(let i = 0; i < item.items.length; i++)
                    {
                        const div = document.createElement('tr');

                        div.innerHTML = `<td>${item.warehousename}</td>
                        <td class="overflow">${item.items[i].name}</td>
                        <td>${item.items[i].quantity}</td>
                        <td>${item.items[i].pallets}</td>
                        <td><button type="button" id="edit${warehouseCount},${i}" style='width:50px' class='btn btn-warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brush" viewBox="0 0 16 16">
                        <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"/>
                        </svg></button></td>
                        <td><button type="button" id="${warehouseCount},${i}" style='width:50px' class='btn btn-danger'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg></button></td>`

                        container.append(div);
                        const button = document.getElementById(`${warehouseCount},${i}`);
                        const editButton = document.getElementById(`edit${warehouseCount},${i}`);
                        button.value = `${item.warehousename}/${item.items[i].name}/${item.items[i].quantity}/${item.items[i].pallets}`;
                        editButton.value = `${item.warehousename}/${item.items[i].name}/${item.items[i].quantity}/${item.items[i].pallets}`;
                        button.onclick = deleteItem;
                        editButton.onclick = openEditMenu;
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