console.log('Hello')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message_one = document.querySelector('#message-1')
const message_two = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    message_one.textContent = "Loading..."
    message_two.textContent = ''

    e.preventDefault()
    address = search.value
    const url = "http://localhost:3000/weather?address=" + address

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message_one.textContent = data.error
            }
            else {
                // console.log(data.forecast)
                // console.log(data.location)
                message_one.textContent = data.location
                message_two.textContent = data.forecast
            }
        })
    })
})