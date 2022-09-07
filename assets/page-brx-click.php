<?php
	if ( ! defined( 'WPINC' ) ) {
		die;
	}

	if ( ! current_user_can( 'activate_plugins' ) ) {
		wp_safe_redirect( home_url() );
	}

	get_header();
?>
    <div class=" container container-fluid full-width-container vh-100">
        <div id="connetion-display">


        <div class="text-center form pt-5" >


            <button id="newConApp" type="button" class="btn btn-secondary btn-lg pl-5 pr-5" data-toggle="modal" data-target="#addNewConnection">
                +
            </button>
            <div class="modal fade" id="addNewConnection" tabindex="-1" role="dialog"
                 aria-labelledby="addNewConnectionTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addNewConnectionTitle">Add new API pipeline</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="newBrxInp"  name="newBrxInp" method="POST" action="">
                                <div class="form-group row">
                                    <label for="newBrxApiName" class="col-sm-2 col-form-label">Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="newBrxApiName" placeholder="data">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="newBrxUrl" class="col-sm-2 col-form-label">Url</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="newBrxUrl" placeholder="https://...">
                                    </div>
                                </div>
                                <button class="btn btn-secondary" type="button" id="addField">Add Field</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" form="newBrxInp">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
<?php
	get_footer();
