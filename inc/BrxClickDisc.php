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
			$this->brxClickIni       = BRX_URL . "build/index.js";
			$this->brxClickSrc       = BRX_URL . "src/index.js";
			$this->templates         = array(
				'assets/page-brx-click.php' => 'Brx click template',
			);
		}


		public function run() {

			// todo initialize automated check and integration of the index

//			if( exec('grep '.escapeshellarg($_GET[$connection]).$this->brxClickSrc)) {
//				 do stuff
//			}
//			$file = file($this->brxClickIni, FILE_SKIP_EMPTY_LINES);
//			foreach ($this->runingConnections as $connection => $to){
//          if(!in_array($connection , $file ))
//			}

			add_action( 'wp_enqueue_scripts', array( $this, 'initialize_scripts' ) );
			add_filter( 'theme_page_templates', array( $this, 'brx_front_template' ), 10, 3 );
			add_filter( 'template_include', array( $this, 'select_brx_template' ), 10, 3 );
			add_action( 'wp_ajax_add_new_brx_base_path', array( $this, 'add_new_brx_base_path' ) );
			add_action( 'wp_ajax_nopriv_add_new_brx_base_path', array( $this, 'add_new_brx_base_path' ) );
		}

		private function get_connections(): array {
			$connections = array(
				'Clickup' => 'Discord',
			);

			return $connections;
		}

		public function initialize_scripts(): void {
			wp_enqueue_script( 'bootstrap-bundle',
				'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js',
				array( 'jquery' ),
				'1.0.0',
				true );
			wp_enqueue_style( 'bootstrap-css',
				'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css',
				'',
				'1.0.0',
				'all' );
//			wp_enqueue_style( 'brxClickStyle', BRX_PATH . 'assets/brx-click-tyle.css'  );
			wp_enqueue_script( 'brxClickDisc', $this->brxClickIni, array( 'jquery' ), '1.0.0', true );

			wp_localize_script( 'brxClickDisc', 'brX', array(
				'base'    => $this->get_base_paths(),
				'ajaxUrl' => admin_url( "admin-ajax.php" ),
			) );

		}

		public function brx_front_template( $page_templates, $theme, $post ) {
			$page_templates = array_merge( $page_templates, $this->templates );

			return $page_templates;
		}

		public function select_brx_template( $template ) {
			global $post;

			if ( ! $post ) {
				return $template;
			}
			$page_template_name = get_post_meta( $post->ID, '_wp_page_template', true );

			if ( ! isset( $this->templates[ $page_template_name ] ) ) {
				return $template;
			}

			$breex_template = BRX_PATH . $page_template_name;
			if ( file_exists( $breex_template ) ) {
				return $breex_template;
			}

			return $template;
		}

		private function get_base_paths() {

			$data = get_option( 'brx_base', false );
			if ( ! $data ) {
				return array();
			}

			return $data;
		}

//todo add additional hashing for each
		public function add_new_brx_base_path() {

			$data = get_option( 'brx_base', false );

			$newUrl = esc_url( $_POST['url'] );
			$name   = sanitize_text_field( $_POST['name'] );


			if ( ! $data ) {
				$data = array();
			}
			$values = [];

			if ( isset( $_POST['values'] ) ) {

				array_filter( $_POST['values'],
					function ( $val ) use ( &$values ) {
						$newValue                                       = explode( ':', $val );
						$values[ sanitize_text_field( $newValue [0] ) ] = sanitize_text_field( $newValue[1] );
					}
				);
			}
			$values['name'] = ucfirst( $name );
			$values['url']  = $newUrl;


			$data[ $name ] = $values;

			update_option( 'brx_base', $data );
			if ( $data[ $name ] ) {
				wp_send_json_success( json_encode( $data[ $name ] ) );
			} else {
				wp_send_json_error();
			}
			wp_die();
		}

	}
