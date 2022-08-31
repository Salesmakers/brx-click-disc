<?php
	/**
	 * Main plugin class
	 *
	 * @link       https://github.com/Salesmakers
	 * @since      1.0.0
	 *
	 * @package    Brx_Click_Disc
	 * @subpackage Brx_Click_Disc/inc
	 */

	if ( ! defined( 'ABSPATH' ) ) {
		exit;
	}
	/**
	 * Fired during plugin activation.
	 *
	 * This class defines all code necessary to run during the plugin's activation.
	 *
	 * @since      1.0.0
	 * @package    Brx_Click_Disc
	 * @subpackage Brx_Click_Disc/inc
	 * @author     Anton Kantardzhiev <anton.kantartzhiev@salesmakers.be>
	 */
	class BrxClickDisc {
		protected string $brxClickIni;
		protected string $brxClickSrc;
		protected array $runingConnections = [];

		public function __construct() {
			$this->runingConnections = $this->get_connections();
			$this->brxClickIni = BRX_URL ."build/index.js";
			$this->brxClickSrc = BRX_URL ."src/index.js";
		}


		public function run(){
			// todo initialize automated check and integration of the index

//			if( exec('grep '.escapeshellarg($_GET[$connection]).$this->brxClickSrc)) {
//				 do stuff
//			}
//			$file = file($this->brxClickIni, FILE_SKIP_EMPTY_LINES);
//			foreach ($this->runingConnections as $connection => $to){
//          if(!in_array($connection , $file ))
//			}
			add_action('wp_enqueue_scripts', array($this, 'initialize_scripts'));

}

		private function get_connections(): array {
			$connections = array(
				'Clickup' => 'Discord',
			);
			return $connections;
		}
		public function initialize_scripts(  ): void {

			wp_enqueue_script('brxClickDisc', $this->brxClickIni );

		}


	}
