<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once(APPPATH.'libraries/GetID3/getid3/getid3.php');
class Koffee extends CI_Controller {
	
	function index() {
		if($this->session->userdata('user_id') == TRUE ) {
			redirect('koffee','refresh');
		}
		$this->load->view('templates/header');
		$this->load->view('login');
		$this->load->view('templates/footer');
	}

	function login()  {
		if($this->session->userdata('user_id') == TRUE ) {
			redirect('koffee/','refresh');
		}
			$existing = false;

			$username = $this->input->post('username', true);
			$password = $this->input->post('password', true);
		
			if( !empty($username) && !empty($password) ) {

				$user = $this->user->login(trim($username),trim($password));

				if( $user ) {
					$existing = true; //Set existing to TRUE
					$data = [
						'user_id' => $user->user_id,
						'username' => $user->username
					];
					$this->session->set_userdata($data);
				}
			}

			echo json_encode(['user' => $existing]);
	}

	function signup() {
		if($this->session->userdata('user_id') == TRUE ) {
			redirect('koffee/app','refresh');
		}
		$this->load->view('templates/header');
		$this->load->view('signup');
		$this->load->view('templates/footer');
	}

	function mood() {
		
		$this->load->view('templates/header');
		$this->load->view('mood');
		$this->load->view('templates/footer');
	}



	// ====== AJAX Request =======
	function add_user() {

		$added = false;
		$empty = false;
		$match = true;
		$username = $this->input->post('username');
		$password = $this->input->post('password');
		$verify_pass = $this->input->post('repassword');
		// Check if any field is not empty
		if(empty($username) || empty($password)) {

			$empty = true;

		} else {
			 if($password != $verify_pass) {
				$match = false;
			} else {
				$data = [
					'username' => trim($username),
					'password' => trim(md5($password))
				];

				// Add to datbase
				$new_user = $this->user->add_user($data);

				$added = true;
			}
			
		}

		echo json_encode(['added'=> $added, 'empty' => $empty , 'passwordNotMatched' => $match]);
		
	}

	/*HOME*/
	function app() {
		if($this->session->userdata('user_id') == FALSE ) {
			redirect('koffee/','refresh');
		}
		$this->load->library('getID3/getid3/getid3');

		$songs = new RecursiveDirectoryIterator('./songs');
		$songs->setFlags(RecursiveDirectoryIterator::SKIP_DOTS);
		$songs = new RecursiveIteratorIterator($songs, RecursiveIteratorIterator::SELF_FIRST);

		
		$id3v2 = new getID3;
		/*RENAME FILENAME FOR URL: Need to be remove*/
		foreach ($songs as $old_name) {
			rename($old_name->getPathname(), str_replace(' ', '-', $old_name->getPathname()));
		}


		$songs_added = 0;

		foreach($songs as $song) {
			/*GET ID3 TAGS*/
			$metadata = $id3v2->analyze($song->getPathname());
			getid3_lib::CopyTagsToComments($metadata);

			$data = [
				'title'     => isset($metadata['tags_html']['id3v2']['title']) ? $metadata['tags_html']['id3v2']['title'][0] : $song->getBasename('.mp3'),
				'artist'    => isset($metadata['tags_html']['id3v2']['artist']) ? $metadata['tags_html']['id3v2']['artist'][0] : 'Unknown',
				'genre'     => isset($metadata['tags_html']['id3v2']['album']) ? $metadata['tags_html']['id3v2']['album'][0] : 'Unknown',
				'album_art' => isset($metadata['tags_html']['id3v2']['genre']) ? $metadata['tags_html']['id3v2']['genre'][0] : 'Unknown'
			];

			if($this->playlist->check_existing_song($data['title'], $data['artist'])) {

			} else {
				$this->playlist->add_song($data);
				$songs_added += 1;
			}
		}

		$data['songs'] = $songs;
		$data['songs_added'] = $songs_added;
		$this->load->view('templates/header');
		$this->load->view('home', $data);
		$this->load->view('templates/footer');

		
	}

	// ====== AJAX Request =========
	function load_most_played() {

		header('Content-Type: application/json'); 

		$msg = $this->chat_thread->get_msg();
		
		$json = json_encode($msg);	

		echo $json;
	}

	// ======= AJAX Request =========
	function new_song_count() {
		$song_id = $this->playlist->get_song_id($this->input->post('title'), $this->input->post('artist'));
		$user_id = $this->session->userdata('user_id');
		$mood    = $this->input->post('mood');

		$data = [
			'user_id' => $user_id,
			'song_id' => $user_id,
			'mood' 	  => $mood
		];

		$this->playlist->add_play_count($data);

	}

	function cur_user() {
		header('Content-Type: application/json'); 

		$user_id = $this->chat_thread->get_id($this->session->user_id);
		$user = $this->chat_thread->get_user($user_id);
		echo json_encode(['user' => $user]);
	}

	function logout() {
		if($this->session->userdata('user_id') == FALSE ) {
			redirect('koffee','refresh');
		}
		$newdata = array('user_id' => '');
		$this->session->unset_userdata($newdata);
		$this->session->sess_destroy();
		redirect('/', 'refresh');
	}


}
