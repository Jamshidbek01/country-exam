const button = document.querySelector('.btn')
button.addEventListener('click', (e) => {
    e.preventDefault()
    let input = document.querySelector('.name').value.toLowerCase()
    const api = `https://restcountries.com/v3.1/name/${input}`
    const request = new XMLHttpRequest()
    request.addEventListener('readystatechange', () => {
        if (request.readyState != 4) {
            document.querySelector('.overflow').classList.add('active')
            document.querySelector('.lds-roller').classList.add('active')
        } else if (request.status == 200 && request.readyState == 4) {
            country(JSON.parse(request.responseText));
            document.querySelector('.overflow').classList.remove('active')
            document.querySelector('.lds-roller').classList.remove('active')
        } else {
            document.querySelector('.overflow').classList.remove('active')
            document.querySelector('.lds-roller').classList.remove('active')
            document.querySelector('.country').innerHTML = `<div class="title">Error, ${request.status} not found!</div>`
        }
    })
    function country(data) {
        let ele = document.querySelector('.country')
        let lang
        for (let i = 0; i < Object.values(data[0].languages).length; i++) {
            lang = Object.values(data[0].languages)[i];
        }
        ele.innerHTML = `
        <img src="${data[0].flags.svg}" alt="">
        <div class="name">${data[0].name.common}</div>
        <p><span>Capital: </span>${data[0].capital}</p>
        <p><span>Continent: </span>${data[0].continents[0]}</p>
        <p><span>Population: </span>${data[0].population}</p>
        <p><span>Currency: </span>${Object.values(data[0].currencies)[0].name}</p>
        <p><span>Common Languages: </span>${lang}</p>
        `
    }
    request.open('GET', api)
    request.send()
})