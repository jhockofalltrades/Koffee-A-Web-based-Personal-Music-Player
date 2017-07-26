<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Music Player</title>
	<link rel="stylesheet" href="<?=base_url()?>assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="<?=base_url()?>assets/css/style.css">
	<link rel="stylesheet" href="<?=base_url()?>assets/font-awesome-4.7.0/css/font-awesome.min.css">
	<link href="https://fonts.googleapis.com/css?family=Lilita+One|Pontano+Sans" rel="stylesheet">

</head>
<body>
<<<<<<< HEAD
<?php if($this->session->userdata('user_id') == TRUE) :?>

	<!-- NAV -->
	<nav class="navbar navbar-default" style="background-color: #1e3c72;">
=======
	<!-- NAV -->
	<nav class="navbar navbar-default">
>>>>>>> origin/master
	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
<<<<<<< HEAD
	      <a class="navbar-brand" href="" style="display: flex; align-items: center; color: white !important">Most Played</a>
	    </div>
	    <ul id="most-played" class="navbar-left navbar-nav nav">
	    	<!-- <li style="padding-top: 7px; color: white"><i class="fa fa-circle-o"></i>&nbsp;&nbsp;Play your favorite tracks and directly access it here.</li style="padding-top: 7px; color: white"> -->
	    	<img src="<?=base_url()?>assets/download.png" alt="" class="img-responsive img-circle most-played-thumb">
	    	<img src="<?=base_url()?>assets/album-cover.jpg" alt="" class="img-responsive img-circle most-played-thumb">
	    	<img src="<?=base_url()?>assets/album-cover.jpg" alt="" class="img-responsive img-circle most-played-thumb">
	    	<img src="<?=base_url()?>assets/album-cover.jpg" alt="" class="img-responsive img-circle most-played-thumb">
	    	<img src="<?=base_url()?>assets/album-cover.jpg" alt="" class="img-responsive img-circle most-played-thumb">
	    	<img src="<?=base_url()?>assets/album-cover.jpg" alt="" class="img-responsive img-circle most-played-thumb">
	    </ul>
	    <!-- Collect tshe nav links, forms, and other content for toggling -->
	    <div class="collaspanse navbar-collapse" id="bs-example-navbar-collapse-1">
=======
	      <a class="navbar-brand" href="" style="display: flex; align-items: center;">Koffee</a>
	    </div>
		 <form class="navbar-form navbar-left">
	        <div class="form-group">
	          <input type="text" id="search" class="form-control" placeholder="Search a song" size="76">
	        </div>
	      </form>
	    <!-- Collect tshe nav links, forms, and other content for toggling -->
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
>>>>>>> origin/master
	      <ul class="nav navbar-nav navbar-right">
	      
	            <li class="dropdown">
		          <a href="#" class="dropdown-toggle title" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Jack Owen <span class="caret"></span></a>
		          <ul class="dropdown-menu">
		            <li><a href="#"><i class="fa fa-user-circle"></i>&nbsp;&nbsp;Account</a></li>
<<<<<<< HEAD
		            <li role="separator" class="divider"></li>
		            <li><a href="<?=base_url()?>koffee/logout"><i class="fa fa-sign-out"></i>&nbsp;&nbsp;Logout</a></li>
=======
		            <li><a href="#"><i class="fa fa-gear"></i>&nbsp;&nbsp;Gen. Settings</a></li>
		            <li role="separator" class="divider"></li>
		            <li><a href="#"><i class="fa fa-sign-out"></i>&nbsp;&nbsp;Logout</a></li>
>>>>>>> origin/master
		          </ul>
		        </li>

	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>
<<<<<<< HEAD
	<!-- END -->

<?php endif; ?>
=======
	<!-- END -->
>>>>>>> origin/master
