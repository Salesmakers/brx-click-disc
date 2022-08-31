<?php
	declare(strict_types=1);
	/**
	 * The plugin bootstrap file
	 *
	 * This file is read by WordPress to generate the plugin information in the plugin
	 * admin area. This file also includes all of the dependencies used by the plugin,
	 * registers the activation and deactivation functions, and defines a function
	 * that starts the plugin.
	 *
	 * @link              https://github.com/Salesmakers
	 * @since             1.0.0
	 * @package           Brx_Click_Disc
	 *
	 * @wordpress-plugin
	 * Plugin Name:       Breex click disc
	 * Plugin URI:        https://salesmakers.be/
	 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
	 * Version:           1.0.0
	 * Author:            Anton Kantartzhiev
	 * Author URI:        https://github.com/Salesmakers
	 * Text Domain:       brx-click-disc
	 * Domain Path:       /languages
	 */

	// If this file is called directly, abort.
	if ( ! defined( 'WPINC' ) ) {
		die;
	}

	/**
	 * Currently plugin version.
	 * Start at version 1.0.0 and use SemVer - https://semver.org
	 * Rename this for your plugin and update it as you release new versions.
	 */
	define( 'BRX_CLICK_DISC_VERSION', '1.0.0' );
	define( 'BRX_URL',  plugin_dir_url(__FILE__) );

	/**
	 * The code that runs during plugin activation.
	 * This action is documented in includes/class-breex-site-manager-activator.php
	 */
	function activate_brx_click_disc() {
		require_once plugin_dir_path( __FILE__ ) . 'inc/BrxClickDiscActivator.php';
		BrxClickDiscActivator::activate();
	}

	/**
	 * The code that runs during plugin deactivation.
	 * This action is documented in includes/class-breex-site-manager-deactivator.php
	 */
	function deactivate_brx_click_disc() {
		require_once plugin_dir_path( __FILE__ ) . 'inc/BrxClickDiscDeactivator.php';
		BrxClickDiscDeactivator::deactivate();
	}

	register_activation_hook( __FILE__, 'activate_brx_click_disc' );
	register_deactivation_hook( __FILE__, 'deactivate_brx_click_disc' );

	/**
	 * The core plugin class that is used to define internationalization,
	 * admin-specific hooks, and public-facing site hooks.
	 */
	require plugin_dir_path( __FILE__ ) . 'inc/BrxClickDisc.php';

	/**
	 * Begins execution of the plugin.
	 *
	 * Since everything within the plugin is registered via hooks,
	 * then kicking off the plugin from this point in the file does
	 * not affect the page life cycle.
	 *
	 * @since    1.0.0
	 */
	function run_brx_click_disc() {

		$plugin = new BrxClickDisc();
		$plugin->run();

	}
	run_brx_click_disc();

