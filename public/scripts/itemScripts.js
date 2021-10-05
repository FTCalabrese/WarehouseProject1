function getItems() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/item');
    xhr.onload = function ()
    {
        const inventory = JSON.parse(xhr.response);
        const container = document.getElementById('items');

        if(xhr.status == 200)
        {
            for(item of inventory)
            {
                const div = document.createElement('div');
                div.classList = 'container-item card';
                div.innerHTML = `<h3><b>${item.name}</b></h3>`;
                container.append(div);

                const divBody = document.createElement('div');
                div.classList = ' container-item card-body';
                divBody.innerHTML = `
                <p class="card-text">Quantity: ${item.quantity}</p>
                <p class="card-text">Pallets: ${item.size}</p>
                <a href="#" class="btn spaced btn-secondary">- </a> <a href="#" class="btn spaced btn-secondary">+</a>`;
                div.append(divBody);
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
    getItems();
})
