function getCompanies() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/companies');
    xhr.onload = function ()
    {
        const companies = JSON.parse(xhr.response);
        const container = document.getElementById('companies');

        if(xhr.status == 200)
        {
            for(company of companies)
            {
                const div = document.createElement('div');
                div.classList = ' card';
                div.innerHTML = `<h3><b>${company.name}</b></h3>`;
                container.append(div);

                const divBody = document.createElement('div');
                div.classList = 'white card-body';
                divBody.innerHTML = `
                <p class="card-text">${company.desc}</p>
                <a href="/warehouse/inventory?company=${company.name}" class="btn btn-warning">view warehouses </a>`;
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
    getCompanies();
})