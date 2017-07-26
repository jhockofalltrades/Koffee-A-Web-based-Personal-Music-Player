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
			if($song->isFile()) {
				/*GET ID3 TAGS*/
				$metadata = $id3v2->analyze($song->getPathname());
				getid3_lib::CopyTagsToComments($metadata);

				$data = [
					'title'     => isset($metadata['tags_html']['id3v2']['title']) ? $metadata['tags_html']['id3v2']['title'][0] : $song->getBasename('.mp3'),
					'artist'    => isset($metadata['tags_html']['id3v2']['artist']) ? $metadata['tags_html']['id3v2']['artist'][0] : 'Unknown',
					'genre'     => isset($metadata['tags_html']['id3v2']['album']) ? $metadata['tags_html']['id3v2']['album'][0] : 'Unknown',
					'album_art' => isset($metadata['comments']['picture'][0]) ? 'data:'.$metadata['comments']['picture'][0]['image_mime'].';charset=utf-8;base64,'.base64_encode($metadata['comments']['picture'][0]['data']) : 'assets/album-cover.jpg'
				];

				if($this->playlist->check_existing_song($data['title'], $data['artist'])) {

				} else {
					$this->playlist->add_song($data);
					$songs_added += 1;
				}
			}
		}

		$data['songs'] = $songs;
		$data['songs_added'] = $songs_added;
		$this->load->view('templates/header');
		$this->load->view('home', $data);
		$this->load->view('templates/footer');

		
	}

	function update_mood() {
		if($this->session->userdata('user_id') == FALSE ) {
			redirect('koffee/','refresh');
		}

		$updated = false;
		$mood = $this->input->post('mood');
		$data = [
			'current_mood' => $mood
		];

		// Update the current mood
		$this->session->set_userdata(['current_mood' => $mood]);

		$new_mood = $this->playlist->update_mood($data, $this->session->userdata('user_id'));

		if($new_mood) {
			$updated = true;
		}

		echo json_encode(['success' => $updated]);
		
	}

	// ====== AJAX Request =========
	function load_most_played() {

		header('Content-Type: application/json'); 

		$songs = $this->playlist->get_recommendations();
		
		$json = json_encode($songs);	

		echo $json;
	}

	// ======= AJAX Request =========
	function new_song_count() {
		$success = false;

		$song_id = $this->playlist->get_song_id($this->input->post('cur-title'), $this->input->post('cur-artist'));
		$user_id = $this->session->userdata('user_id');
		$mood    = $this->session->userdata('current_mood');

		$data = [
			'user_id' => $user_id,
			'song_id' => $song_id,
			'mood' 	  => $mood
		];

		$new_count = $this->playlist->add_play_count($data);

		if($new_count) {
			$success = true;
		}

		echo json_encode(['success' => $success]);

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
		$newdata = ['user_id' => ''];
		$this->session->unset_userdata($newdata);
		$this->session->sess_destroy();
		redirect('/', 'refresh');
	}


}
