<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Music Player</title>
	<link rel="stylesheet" href="<?=base_url()?>assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="<?=base_url()?>assets/css/style.css">
	<link rel="stylesheet" href="<?=base_url()?>assets/font-awesome-4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="<?=base_url()?>assets/css/animations.css">
	<link rel="icon" href="<?=base_url()?>assets/favicon.ico?v=2" type="image/x-icon" />
</head>
<body>

<?php if($this->session->userdata('user_id') == TRUE) :?>

	<!-- NAV -->
	<nav class="navbar navbar-default" style="  background: linear-gradient(to right, #de6161, #2657eb);">

	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>

	      <a class="navbar-brand" href="" style="display: flex; align-items: center; color: white !important">Most Played</a>
	    </div>
	    <ul id="most-played" class="navbar-left navbar-nav nav">
	    	
	    </ul>
	    <!-- Collect tshe nav links, forms, and other content for toggling -->
	    <div class="collaspanse navbar-collapse" id="bs-example-navbar-collapse-1">

	      <ul class="nav navbar-nav navbar-right">
	      
	            <li class="dropdown">
		          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><?=$this->session->userdata('username')?>&nbsp;&nbsp;<i class="fa fa-angle-down"></i></a>
		          <ul class="dropdown-menu">
		            <li><a href="<?=base_url()?>koffee/account"><i class="fa fa-user-circle"></i>&nbsp;&nbsp;Account</a></li>

		            <li role="separator" class="divider"></li>
		            <li><a href="<?=base_url()?>koffee/logout"><i class="fa fa-sign-out"></i>&nbsp;&nbsp;Logout</a></li>

		          </ul>
		        </li>

	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>

	<!-- END -->

<?php endif; ?>
