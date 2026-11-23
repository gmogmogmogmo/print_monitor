const temp = document.querySelector('.text')
const PI = `http://${location.hostname}`
const stream = document.getElementById("stream")

fetch(`${PI}:3000/on`)
    .then(() => {
        setTimeout(() => {
         stream.src = `${PI}:8080/stream`
        }, 1500)
    })

// temp.textContent = "update here"