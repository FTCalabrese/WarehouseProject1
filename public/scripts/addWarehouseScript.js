function getCompany()
{
        const container = document.getElementById('_ownerId');

        const qs = new URLSearchParams(window.location.search);
        const owner = qs.get('company');

        
        const option = document.createElement('option');
        option.value = `${owner}`;
        option.innerText = `${owner}`;
        container.append(option);
}

window.addEventListener('DOMContentLoaded', ()=>{
    getCompany();
})