
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    
    const location = search.value;

    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetch('/weather?adress=' + location).then((response) =>{
    response.json().then((data) =>{
        if(data.error) return message1.textContent = 'Greska:' + data.error;
        message1.textContent = data.location;
        message2.textContent = data.forecast;
    })
})

})
