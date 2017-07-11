<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once(APPPATH.'libraries/GetID3/getid3/getid3.php');
class Koffee extends CI_Controller {
	
	function index() {
		if($this->session->userdata('user_id') == TRUE ) {
			redirect('chat/app','refresh');
		}
		$this->load->view('templates/header');
		$this->load->view('login');
		$this->load->view('templates/footer');
	}

	function login()  {
		if($this->session->userdata('user_id') == TRUE ) {
			redirect('chat/app','refresh');
		}
			$existing = false;

			$username = $this->input->post('username', true);
			$password = $this->input->post('password', true);
		
			if( !empty($username) && !empty($password) ) {

				$user = $this->chat_thread->login(trim($username),trim($password));

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
			redirect('chat/app','refresh');
		}
		$this->load->view('header');
		$this->load->view('signup');
		$this->load->view('footer');
	}

	// ====== AJAX Request =======
	function add_user() {

		$added = false;
		$username = false;
		$empty = false;

		$username = $this->input->post('username');
		$password = $this->input->post('password');
		$verify_pass = $this->input->post('repassword');
		// Check if any field is not empty
		if(empty($username) || empty($password)) {

			$empty = true;

		} else {
			//Check for existing username
			$auth_user = $this->chat_thread->check_username($username);

			if( !empty($auth_user) ) {
				$username = true;
			} else {
				$data = [
					'username' => trim($username),
					'password' => trim(md5($password))
				];

				// Add to datbase
				$new_user = $this->chat_thread->add_user($data);

				$added = true;
			}
		}

		echo json_encode(['added'=> $added, 'empty' => $empty ,'hasExistingUsername' => $username]);
		
	}

	/*HOME*/
	function app() {
		// if($this->session->userdata('user_id') == FALSE ) {
		// 	redirect('chat/','refresh');
		// }
		$this->load->library('getID3/getid3/getid3');

		$songs = new RecursiveDirectoryIterator('./songs');
		$songs->setFlags(RecursiveDirectoryIterator::SKIP_DOTS);
		$songs = new RecursiveIteratorIterator($songs, RecursiveIteratorIterator::SELF_FIRST);

		/*RENAME FILENAME FOR URL: Need to be remove*/
		foreach ($songs as $old_name) {
			rename($old_name->getPathname(), str_replace(' ', '-', $old_name->getPathname()));
		}


		$data['songs'] = $songs;
	

		$this->load->view('templates/header');
		$this->load->view('home', $data);
		$this->load->view('templates/footer');
	}

	// ====== AJAX Request =========
	function load_msg() {

		header('Content-Type: application/json'); 

		$msg = $this->chat_thread->get_msg();
		
		$json = json_encode($msg);	

		echo $json;
	}

	// ======= AJAX Request =========
	function new_msg() {

		$msg = $this->input->post('msg', true);
		$user = $this->input->post('user', true);

		$data = ['message' => $msg,'user_id' => $user];

		$this->chat_thread->add_msg($data);

		echo json_encode(['sent'=>true]);
	}

	function cur_user() {
		header('Content-Type: application/json'); 

		$user_id = $this->chat_thread->get_id($this->session->user_id);
		$user = $this->chat_thread->get_user($user_id);
		echo json_encode(['user' => $user]);
	}

	function logout() {
		if($this->session->userdata('user_id') == FALSE ) {
			redirect('chat/app','refresh');
		}
		$newdata = array('user_id' => '');
		$this->session->unset_userdata($newdata);
		$this->session->sess_destroy();
		redirect('/', 'refresh');
	}


}
