import FormData from 'form-data';
import axios from "axios";



class ClickupDiscord {

    constructor() {
        if (!brX.base['cklickupDiscord']) {
            return
        }
        this.base = brX.base['cklickupDiscord'];
        axios.defaults.headers.common['X-Auth-Token'] = this.base.token;

        this.initializeForm();
        this.getBtn = document.querySelector('.brx-get');
        this.postBtn = document.querySelector('.brx-post');
        this.updateBtn = document.querySelector('.brx-update');
        this.simBtn = document.querySelector('.brx-sim');
        this.headersBtn = document.querySelector('.brx-headers');
        this.transformBtn = document.querySelector('.brx-transform');
        this.errorBtn = document.querySelector('.brx-error');
        this.token = this.oAuth2autentication();
        this.placeHolder = document.querySelector('.brx-placeholder');
        this.prepend = '';

        this.events();
    }

    events() {
        this.getBtn.addEventListener('click', this.getData.bind(this));
        this.postBtn.addEventListener('click', this.addData.bind(this));
        this.updateBtn.addEventListener('click', this.updateData.bind(this));
        this.simBtn.addEventListener('click', this.getGeneralData.bind(this));
        this.headersBtn.addEventListener('click', this.customHeaders.bind(this));
        this.transformBtn.addEventListener('click', this.transformResponse.bind(this));
        this.errorBtn.addEventListener('click', this.errorHandling.bind(this));
        this.placeHolder.addEventListener('input', this.setPlaceHolder.bind(this));
    }

    setPlaceHolder(e) {
        e.preventDefault();
        if (e.target.value) {
            this.prepend = e.target.value;
        }
        console.log(this.prepend);
    }

    async oAuth2autentication() {

        return {
            headers: {
                'content-type': 'application/json',
                headers: {
                    Authorization: `Bearer ${this.base.token}`
                }
            }
        }
    }

    initializeForm() {

        document.getElementById('newConApp').insertAdjacentHTML('beforebegin', `
            <div class="text-center form">
                <div class="activation-btns ">
                    <h1 class="display-4 text-center mb-3">${this.base.name}</h1>
                    <button id="brx-get" class="btn  brx-get btn-primary my-3">GET</button>
                    <button id="brx-post" class="btn  brx-post btn-info">POST</button>
                    <button id="brx-update" class="btn  brx-update btn-warning">PATCH</button>
                    <button id="brx-delete" class="btn  brx-delete btn-danger">DELETE</button>
                    <button id="brx-sim" class="btn  brx-sim btn-secondary">Sim Requests</button>
                    <button id="brx-headers" class="btn  brx-headers btn-secondary">Custom Headers</button>
                    <button id="brx-transform" class="btn brx-transform btn-secondary">Transform</button>
                    <button id="brx-error" class="btn brx-error btn-secondary">Error Handling</button>
                    <button id="brx-cancel" class="btn brx-cancel btn-secondary">Cancel</button>
                </div>

                <div class="input-group col-12">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">${this.base.url}</span>
                    </div>
                    <input type="text" aria-describedby="basic-addon3" value="" id="basic-url"
                           class="brx-placeholder form-control" placeholder="JSON Placeholder.."/>
                </div>

                <div class="input-group col-5 mt-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Body settings</span>
                    </div>
                    <textarea class="form-control" aria-label="With textarea"></textarea>
                </div>
            </div>
            <hr/>
            <div id="result"></div>
        </div>
           `);
    }


    getData(e) {
        e.preventDefault();

        // let config = {
        //     method: 'get',
        //     url: (this.base.url + this.prepend),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-Api-Key': this.base.client_id,
        //         'Authorization': `Bearer ${this.base.token}`,
        //         "Accept": "application/json",
        //     }
        // };
        // //Cross-Origin Resource Sharing
        // axios(config)
        //     .then(response =>
        //         this.showToFront(response.data)
        //     ).catch(function (error) {
        //     console.log(error);
        // });
        let data ={}
        let text ='';
        const preFix= 'https://app.clickup.com/t/';
        for(let task of data.tasks){
            if ((task.due_date !== null) ) {

let assignee =task.assignees[task.assignees.length -1];
let  assigned_to = assignee.username.toString() ;


                text += ` <p>Task : ${task.name} with link: ${preFix+task.id} , asignd to ${assigned_to} due date  ${ task.due_date } that it's still  ${task.status.status.toString()}</p>`;
            }

        }
         document.getElementById('result').insertAdjacentHTML('beforeend',text );
    }

    addData(e) {
        e.preventDefault();

        const form = new FormData();
        const headers = form.getHeaders();

        headers.authorization = `Bearer ${this.base.token}`;

        axios({
            method: 'get',
            url: (this.base.url + this.prepend),
            headers,
        })
            .then(() => console.log(JSON.stringify(response.data)))
            .catch(() => console.log('fail'));

    }

    updateData(e) {
        let today = (new Date().getTime());
        var config = {
            url: 'https://api.clickup.com/api/v2/team/2583465/task?&statuses%5B%5D=in progress&due_date_lt=' + today,
        };

        axios.get(config, this.oAuth2autentication)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    removeData(e) {
        e.preventDefault();
        console.log(this.base);
    }

    getGeneralData(e) {
        e.preventDefault();
        console.log('GeneralRequest');
    }

    customHeaders(e) {
        e.preventDefault();

        let config = {
            method: 'post',
            url: this.base.url+this.prepend,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    transformResponse(e) {
        e.preventDefault();
        var request = new XMLHttpRequest();


        request.open('POST',
            this.base.url+this.prepend);

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);
            }
        };

        request.send();
    }

    errorHandling(e) {
        e.preventDefault(e);
        console.log(' Request');
    }

    showToFront(res) {
        document.getElementById('result').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
    }

//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${clickupDiscordAuth}`);
//
//     let raw = "";
//
//     let options = {
//         method: 'GET',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };
//
//     fetch("https://api.clickup.com/api/v2/team", options)
//      .then(response => response.text())
//      .then(result => console.log(result))
//      .catch(error => console.log('error', error));

}

export default ClickupDiscord;
