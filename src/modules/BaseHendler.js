import axios from "axios";
import Qs from 'qs';

class BaseHendler {

    constructor() {
        this.content = document.getElementById('connetion-display');
        this.form = document.getElementById('newBrxInp');
        this.modalBtn = document.getElementById('addField');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', this.addNewConnection.bind(this));
        this.modalBtn.addEventListener('click', this.addInputField.bind(this));
    }

    async addNewConnection(e) {
        e.preventDefault();

        let inputFields = [];
        let baseUrl = document.getElementById('newBrxUrl').value;
        let newName = document.getElementById('newBrxApiName').value;
        let values = Array.from(document.querySelectorAll('.newBrx')).map(item => item.value);
        console.log(values);

        try {
            var ourInputForm = {
                'action': 'add_new_brx_base_path',
                'url': baseUrl,
                'name': newName,
                'values': values
            };

            axios.post(brX.ajaxUrl, Qs.stringify(ourInputForm)).then((response) => {
                window.location.reload();
            });

        } catch (e) {
            console.log(e)

        }

    }

    addInputField() {
        this.modalBtn.insertAdjacentHTML('beforebegin',
            '<div class="form-group row">\n' +
            '                                    <label class="col-sm-2 col-form-label">Field</label>\n' +
            '                                    <div class="col-sm-10">\n' +
            '                                        <input type="text" class="form-control newBrx" placeholder="name:value">\n' +
            '                                    </div>\n' +
            '                                </div>');
    }
}

export default BaseHendler;
