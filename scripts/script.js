document.querySelector('button').addEventListener('click', getUsers);

function getUsers() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/users', true);

    // OPTIONAL
    console.log('READYSTATE: ', xhr.readyState);

    // OPTIONAL - used for loaders
    xhr.onprogress = function () {
        console.log('READYSTATE: ', xhr.readyState);
    }

    xhr.onload = function () {
        console.log('READYSTATE: ', xhr.readyState);
        if (this.status == 200) {
            let users = JSON.parse(this.responseText);
            let output = '';
            for (let i in users) {
                output += `
                    <div class="user">
                        <img src="${users[i].avatar_url}" width="70" height="70">
                        <ul>
                            <li>ID: ${users[i].id}</li>
                            <li>Login: ${users[i].login}</li>
                        </ul>
                    </div>`;
            }
            document.querySelector('#users').innerHTML = output;
        } else if (this.status = 404) {
            document.querySelector('#users').innerHTML = 'Not Found';
        }
    }

    xhr.onerror = function () {
        console.log('Request Error...');
        document.querySelector('#users').innerHTML = 'Request Error...';
    }

    xhr.send();

    // readyState Values
    // 0: request not initialized 
    // 1: server connection established
    // 2: request received 
    // 3: processing request 
    // 4: request finished and response is ready

    // HTTP Statuses
    // 200: "OK"
    // 403: "Forbidden"
    // 404: "Not Found"
}