<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

Class Playlist extends CI_Model {

	function add_song($data) {
		return $this->db->insert('songs', $data);
	}

	function check_existing_song($title, $artist) {
		$this->db->select()->from('songs')->where(['title' => $title, 'artist' => $artist ]);
		$result = $this->db->get();
		return ($result->first_row()) ? true : false;
	}


	function get_song_id($title, $artist) {
		$this->db->select()->from('songs')->where(['title' => $title, 'artist' => $artist]);
		$song_id = $this->db->get();
		return $song_id->row('song_id');
	}

	function add_play_count($data) {
		return $this->db->insert('interactions', $data);
	}

	// function get_recommendations() {

	// }

	// function get_most_played() {

	// }
	

}

?>