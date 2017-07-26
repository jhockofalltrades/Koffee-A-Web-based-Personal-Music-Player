<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

Class Playlist extends CI_Model {

<<<<<<< HEAD
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

	function update_mood($data, $user_id) {
		$this->db->where('user_id', $user_id);
		return $this->db->update('user',$data);
	}

	function add_play_count($data) {
		return $this->db->insert('interactions', $data);
	}

	function get_recommendations() {
		$this->db->select('songs.song_id, songs.title,songs.album_art, count(interactions.song_id) as play')->from('songs')->order_by('play','desc');
		$this->db->join('interactions', 'songs.song_id = interactions.song_id');
		$this->db->group_by('songs.song_id');
		$songs = $this->db->get();
		return $songs->result();

	}

	// function get_most_played() {

	// }
=======
	function loadPlaylists($folder) {
		
		
		return $songs;
	}

	function limitString($string) {
		return strlen($string) > 25 ? substr($string,0,25)."..." : $string;
	}

>>>>>>> origin/master
	

}

?>