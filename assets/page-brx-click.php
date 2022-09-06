<?php
	get_header();
?>
<div class="container-fluid full-width-container ">
	<div class="text-center">
		<h1 class="display-4 text-center mb-3">Clikup to Discord API</h1>
		<button id="brx-get" class="btn  brx-get btn-primary my-3" >GET</button>
		<button id="brx-post" class="btn  brx-post btn-info" >POST</button>
		<button id="brx-update" class="btn  brx-update btn-warning" >PUT/PATCH</button>
		<button id="brx-delete" class="btn  brx-delete btn-danger" >DELETE</button>
		<button id="brx-sim" class="btn  brx-sim btn-secondary" >Sim Requests</button>
		<button id="brx-headers" class="btn  brx-headers btn-secondary" >Custom Headers</button>
		<button id="brx-transform" class="btn brx-transform btn-secondary">Transform</button>
		<button id="brx-error" class="btn brx-error btn-secondary">Error Handling</button>
		<button id="brx-cancel" class="btn brx-cancel btn-secondary">Cancel</button>
        <label>
            <input type="text" value="" class="brx-placeholder" placeholder="JSON Placeholder.." />
        </label>
    </div>
	<hr />
	<div id="result"></div>
</div>
<?php
    get_footer();
