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

	function update_mood($data, $user_id) {
		$this->db->where('user_id', $user_id);
		return $this->db->update('user',$data);
	}

	function add_play_count($data) {
		return $this->db->insert('interactions', $data);
	}

	/*  GET TOP 15 MOST PLAYED SONGS  */
	function get_most_played() {
		$this->db->select('songs.song_id, songs.title, songs.artist, songs.album_art, count(interactions.song_id) as play')->from('songs')->order_by('play','desc')->limit(15);
		$this->db->join('interactions', 'songs.song_id = interactions.song_id');
		$this->db->group_by('songs.song_id');
		$songs = $this->db->get();
		return $songs->result();

	}

	/*  GET RECOMMENDATIONS - where current hour is <= n && >= m && d <> current day (n and m is span of time i.e. 13-15 Military time: d = day formatted) 
		
		RECOMMENDATIONS WILL BE RETRIEVED BY FILTERING:
		1. Time the user listened to x music.
		2. Current mood.
		3. Combine the two (above) and retrieve all of it except songs you listen on the current day.

		CATEGORIZATION OF TIME (Military Time):
		01-03 - Midnight
		04-06 - Early Morning
		07-11 - Morning
		12-13 - Noon
		14-17 - Afternoon
		18-23 - Night 
	*/
	function get_recommendations($cur_hour, $cur_day, $mood) {

		
		switch ($cur_hour) {
			case $cur_hour >= 1 && $cur_hour <= 3:
				$where = "DATE_FORMAT(interactions.date_listened, '%H') BETWEEN 01 AND 03 AND DATE_FORMAT(interactions.date_listened, '%d') <> '$cur_day' AND interactions.mood = '$mood'";
				break;
			case $cur_hour >= 4 && $cur_hour <= 6:
				$where = "DATE_FORMAT(interactions.date_listened, '%H') BETWEEN 04 AND 06 AND DATE_FORMAT(interactions.date_listened, '%d') <> '$cur_day' AND interactions.mood = '$mood'";
				break;
			case $cur_hour >= 07 && $cur_hour <= 11:
				$where = "DATE_FORMAT(interactions.date_listened, '%H') BETWEEN 07 AND 11 AND DATE_FORMAT(interactions.date_listened, '%d') <> '$cur_day' AND interactions.mood = '$mood'";
				break;
			case $cur_hour >= 12 && $cur_hour <= 13:
				$where = "DATE_FORMAT(interactions.date_listened, '%H') BETWEEN 12 AND 13 AND DATE_FORMAT(interactions.date_listened, '%d') <> '$cur_day' AND interactions.mood = '$mood'";
				break;
			case $cur_hour >= 14 && $cur_hour <= 17:
				$where = "DATE_FORMAT(interactions.date_listened, '%H') BETWEEN 14 AND 17 AND DATE_FORMAT(interactions.date_listened, '%d') <> '$cur_day' AND interactions.mood = '$mood'";
				break;
			case $cur_hour >= 18 && $cur_hour <= 23:
				$where = "DATE_FORMAT(interactions.date_listened, '%H') BETWEEN 18 AND 23 AND DATE_FORMAT(interactions.date_listened, '%d') <> '$cur_day' AND interactions.mood = '$mood'";
				break;
			default:
				# code...
				break;
		}

		$this->db->select('songs.song_id, songs.title, songs.artist, songs.album_art, songs.year, count(interactions.song_id) as play_count')->from('songs');
		$this->db->join('interactions', 'songs.song_id = interactions.song_id');
		$this->db->where($where);
		$this->db->group_by('songs.song_id');
		$recommended_songs = $this->db->get();
		return $recommended_songs->result();
	}

	function get_discover_songs() {
		$this->db->select('songs.song_id, songs.title, songs.artist, songs.album_art, songs.year, count(interactions.song_id) as play_count')->from('songs');
		$this->db->join('interactions', 'songs.song_id = interactions.song_id','left');
		$this->db->group_by('songs.song_id');
		$this->db->order_by('play_count','asc')->limit(25);
		$discovery = $this->db->get();
		return $discovery->result();
	}

	function get_matched_songs($string)  {
		$this->db->select('title, artist, album_art')->from('songs');
		$this->db->like('title', $string);
		$this->db->or_like('artist', $string);
		$results = $this->db->get();
		return $results->result();
	}

	// function get_weekly_trend($song) {
	// 	$this->db->select("count(song_id) as num_play, date_format(date_listened, '%Y-%m-%d') as weekd")->from('interactions');
	// 	$this->db->where('song_id', $song);
	// 	$this->db->where("date_format(date_listened, '%Y-%m-%d') BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()");
	// 	$this->db->group_by("weekd");
	// 	$result = $this->db->get();
	// 	return $result->result();
	// }

	function get_weekly_trend() {
		$this->db->select("count(song_id) as songs_played,	date_format(date_listened, '%Y-%m-%d') as weekd")->from('interactions')->order_by('songs_played','desc');
		$this->db->where("date_format(date_listened, '%Y-%m-%d') BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()");
		$this->db->group_by('weekd');
		$weekly_played = $this->db->get();
		return $weekly_played->result();
	}



	/*
		 select songs.title, date_format(interactions.date_listened, '%Y-%m-%d'), group_concat(interactions.mood) from interactions join songs on songs.song_id = interactions.song_id WHERE  date_format(interactions.date_listened, '%Y-%m-%d') BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE() AND songs.title = "Shake It Off" GROUP BY date_format(interactions.date_listened, '%Y-%m-%d');

		  select count(song_id), date_format(date_listened, '%Y-%m-%d') as weekd from interactions WHERE date_format(date_listened, '%Y-%m-%d') BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE() GROUP BY weekd;
	*/

}

?>