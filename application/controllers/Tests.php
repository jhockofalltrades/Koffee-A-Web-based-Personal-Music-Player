<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

Class Tests extends CI_Controller {

	function test() {
		
		$this->unit->active(TRUE);
		$test = 1 + 1;

		$expected_result = 2;

		$test_name = 'Adds one plus one';

		$this->unit->run($test, $expected_result, $test_name);
	}
}

?>