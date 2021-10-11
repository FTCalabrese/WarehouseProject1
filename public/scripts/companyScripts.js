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
                <a href="/warehouse/inventory?company=${company.name}" class="btn btn-warning">view warehouses</a>`;
                div.append(divBody);
            }

                const div = document.createElement('div');
                div.classList = ' card';
                div.innerHTML = `<h3><b>add additional company</b></h3>`;
                container.append(div);

                const divBody = document.createElement('div');
                div.classList = 'grey card-body';
                divBody.innerHTML = `
                <p class="card-text"></p>
                <a href="/forms/newcompany" class="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg></a>`;
                div.append(divBody);
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