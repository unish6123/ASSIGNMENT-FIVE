fetch('/hits' + location.pathname + '-page')
    .then(response => response.text())
    .then(txt => {
        document.getElementById('hits').innerText = "The number of hits is " + txt;
    });
