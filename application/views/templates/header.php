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
	<!-- NAV -->
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="" style="display: flex; align-items: center;">Koffee</a>
	    </div>
		 <form class="navbar-form navbar-left">
	        <div class="form-group">
	          <input type="text" id="search" class="form-control" placeholder="Search a song" size="76">
	        </div>
	      </form>
	    <!-- Collect tshe nav links, forms, and other content for toggling -->
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav navbar-right">
	      
	            <li class="dropdown">
		          <a href="#" class="dropdown-toggle title" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Jack Owen <span class="caret"></span></a>
		          <ul class="dropdown-menu">
		            <li><a href="#"><i class="fa fa-user-circle"></i>&nbsp;&nbsp;Account</a></li>
		            <li><a href="#"><i class="fa fa-gear"></i>&nbsp;&nbsp;Gen. Settings</a></li>
		            <li role="separator" class="divider"></li>
		            <li><a href="#"><i class="fa fa-sign-out"></i>&nbsp;&nbsp;Logout</a></li>
		          </ul>
		        </li>

	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>
	<!-- END -->