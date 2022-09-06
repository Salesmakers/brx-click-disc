import axios from "axios";

class ClickupDiscord {

    constructor(CDBase) {
        this.base = CDBase;
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
        this.prepend ='';
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

    setPlaceHolder(e){
        e.preventDefault();
        if(e.target.value){
            this.prepend = e.target.value;
        }
        console.log(this.prepend);
    }

    async oAuth2autentication() {
        return axios.create({
            baseURL: this.base.url,
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${this.base.token}`
            },
        });
    }

    getData(e){
        e.preventDefault();

        console.log(this.base)
        // axios.get({
        //     method:'get',
        //     url: this.base.url
        // }).then(res=> console.log(res))
        //     .catch(err=> alert(err));
    }

    addData(e){
        e.preventDefault();
        console.log('Add Request');
    }

    updateData(e){
        e.preventDefault();
        console.log('Upp Request');
    }

    removeData(e){
        e.preventDefault();
        console.log('Rem  Request');
    }

    getGeneralData(e){
        e.preventDefault();
        console.log('Get General Request');
    }

    customHeaders(e){
        e.preventDefault();
        console.log('Custom Request');
    }

    transformResponse(e){
        e.preventDefault();
        console.log(' Request');
    }

    errorHandling(e){
        e.preventDefault(e);
        console.log(' Request');
    }

    showOutput(res) {
        document.getElementById('res').innerHTML = `
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
