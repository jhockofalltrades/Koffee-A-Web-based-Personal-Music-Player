<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

Class Playlist extends CI_Model {

	function loadPlaylists($folder) {
		
		
		return $songs;
	}

	function limitString($string) {
		return strlen($string) > 25 ? substr($string,0,25)."..." : $string;
	}

	

}

?>