<?php
defined('BASEPATH') OR exit('No direct script access allowed');

Class User extends CI_Model {

	
	function add_user($data) {
		return $this->db->insert('user', $data);
	}

	function check_username($value) {
		$this->db->select('user_id')->from('user');
		$this->db->where('username',$value);	
		$result = $this->db->get();
		return $result->first_row();
	}

	function get_user($sess_id) {
		$this->db->select()->from('user')->where('user_id', $sess_id);
		$result = $this->db->get();
		return $result->row('username');
	}


	function login($username, $password) {
		$where = array(
			'username' => $username,
			'password' => md5($password)
			);

		$this->db->select()->from('user')->where($where);
		$query = $this->db->get();
		return $query->first_row();
	}


}

?>