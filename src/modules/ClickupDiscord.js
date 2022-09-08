import FormData from 'form-data';
import axios from "axios";
import Qs from 'qs';
// import fs from 'fs';

class ClickupDiscord {

    constructor() {
        if (!brX.base['cklickupDiscord']) {
            return
        }
        this.base = brX.base['cklickupDiscord'];
        // axios.defaults.headers.common['X-Auth-Token'] =  this.base.token;

        this.initializeForm();
        this.getBtn = document.querySelector('.brx-get');
        this.postBtn = document.querySelector('.brx-post');
        this.updateBtn = document.querySelector('.brx-update');
        this.deleteBtn = document.querySelector('.brx-delete');
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
        this.deleteBtn.addEventListener('click', this.removeData.bind(this));
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

        // return axios.create({
        //     baseURL: this.base.url,
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //         Authorization: `Bearer ${this.base.token}`
        //     },
        // });

        return {
            headers: {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: `Bearer ${this.base.token}`
                }
            }
        };
    }

    initializeForm() {

        document.getElementById('newConApp').insertAdjacentHTML('beforebegin', `
            <div class="text-center form">
                <div class="activation-btns ">
                    <h1 class="display-4 text-center mb-3">Clikup to Discord API</h1>
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
                        <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
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

        let config = {
            method: 'get',
            url: (this.base.url + this.prepend),
            headers: {
                'Authorization': `Bearer ${this.base.token}`,
                'Content-Type': 'application/json'
            }
        };

        axios(config)
            .then(response =>
                this.showToFront(response.data)
            ).catch(function (error) {
            console.log(error);
        });

        // axios(config)
        //     .then(function (response) {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }

    addData(e) {
        e.preventDefault();

        const form = new FormData();

        form.append('filename', '')
        form.append('attachment', fs.createReadStream('./img.png'));

        const headers = form.getHeaders();

        headers.authorization = `Bearer ${your_api_token}`;

        axios({
            method: 'post',
            url: (this.base.url + this.prepend),
            data: form,
            headers,
        })
            .then(() => console.log('success'))
            .catch(() => console.log('fail'));

    }

    updateData(e) {
        e.preventDefault();
        console.log('Upp Request');
    }

    removeData(e) {
        e.preventDefault();
        console.log('Rem  Request');
    }

    getGeneralData(e) {
        e.preventDefault();
        console.log('GeneralRequest');
    }

    customHeaders(e) {
        e.preventDefault();
        console.log('Custom Request');
    }

    transformResponse(e) {
        e.preventDefault();
        console.log(' Request');
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
