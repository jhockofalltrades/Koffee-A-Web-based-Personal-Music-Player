<?php 
	require('./getID3/getid3/getid3.php');
	

	$songs = new RecursiveDirectoryIterator('./songs');
	$songs->setFlags(RecursiveDirectoryIterator::SKIP_DOTS);
	$songs = new RecursiveIteratorIterator($songs, RecursiveIteratorIterator::SELF_FIRST);

	/*RENAME FILENAME FOR URL: Need to be remove*/
	foreach ($songs as $old_name) {
		rename($old_name->getPathname(), str_replace(' ', '-', $old_name->getPathname()));
	}
	
	
	function limitString($string) {
		return strlen($string) > 25 ? substr($string,0,25)."..." : $string;
	}

 
	


?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Music Player</title>
	<link rel="stylesheet" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/style.css">
	<link rel="stylesheet" href="assets/font-awesome-4.7.0/css/font-awesome.min.css">
	<link href="https://fonts.googleapis.com/css?family=Lilita+One|Pontano+Sans" rel="stylesheet">

</head>
<body>
	<div class="container">
		<!-- MENU -->
		<br>
		
		<div class="dropdown pull-right">
		  <button class="menu dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		    <img src="./assets/download.png" alt="Profile" id="profile"><span class="title">Jack Owen</span>
		  </button>
		  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
		    <a class="dropdown-item" href="#">Profile</a>
		    <a class="dropdown-item" href="#">logout</a>
		    <a class="dropdown-item" href="#">Something else here</a>
		  </div>
		</div>
	
		<br><br>
		<!-- PLAYER -->
		<div id="player">
			<div id="main">
				<img src="assets/album-cover.jpg" alt="" class="img-responsive" id="album-art" width="260px" height="260px" >
				<h2 id="playing"></h2>
				<span id="artist"></span>
			</div>
			<div id="side">
				<span id="shuffle" class="control-widget"><i class="fa fa-random"></i></span> <br>
				<span id="repeat" class="control-widget"><i class="fa fa-exchange"></i></span> <br>
				<span id="coffee" class="control-widget"><i class="fa fa-coffee"></i></span> <br>
				<span id="heart" class="control-widget"><i class="fa fa-heart"></i></span> <br>
				<span id="zoom" class="control-widget"><i class="fa fa-expand"></i></span> <br>
				<span id="dark-mode" class="control-widget"><i class="fa fa-adjust"></i></span>
			</div>
		</div>

		<div id="controls">
			<button class="control-btn" id="prev"><i class="fa fa-step-backward"></i>&nbsp;Prev</button>
			<button class="control-btn" id="next"><i class="fa fa-step-forward"></i>&nbsp;Next</button>
			<audio controls id="audio">
				<source src="" type="audio/mp3">
			</audio>	
		</div>
		<div class="row">
			<div class="col-lg-3">
			<!-- AVAILABLE PLAYLISTS -->
				<h3 class="title">Your Playlists</h3>
				<a href="index.php" class="folder-playlist" id="all-songs-trigger">All Songs</a> <br>
				<?php foreach($songs as $folder) :?>	
					<?php if($folder->isDir()) :?>
						<a class="folder-playlist" href="<?=$folder->getFilename()?>"><?=str_replace('-',' ', $folder->getFilename())?></a> <br>
					<?php endif ;?>
				<?php endforeach; ?>
			</div>
			<div class="col-lg-9">
				<div id="playlist">
					<h3 id="playlist-title" class="title">Tracks</h3>
					<!-- HIDDEN PLAYLISTS -->
					<div id="container">
					<?php foreach($songs as $className) :?>	
						<?php if($className->isDir()) :?>
							
								<div class="hidden-playlists" id="<?=$className->getFilename()?>">
									<?php 
										$id3v2 = new getID3;
										$songsUnderPlaylist = new FilesystemIterator($className->getPathname());
									?>
									<?php foreach($songsUnderPlaylist as $song) : ?>
										<?php if($song->isFile()) : ?>
											<?php if($song->getExtension() != 'mp3') : ?>
												<a href="<?=$song->getPathname()?>" class="list-group-item"><?=$song->getFilename()?><kbd class="pull-right">Not Supported</kbd></a>
											<?php else : ?>
												<a href="<?=$song->getPathname()?>" class="list-group-item"><?=str_replace('-',' ', $song->getBasename('.mp3'))?><span class="pull-right"><i class="fa fa-ellipsis-v"></i></span></a>
												<ul>
													<?php 
														$metadata = $id3v2->analyze('./songs/mean.mp3');
													?>
													<li><?=$metadata['id3v2']['comments']['album'][0]?></li>
													<li><?=$metadata['id3v2']['comments']['genre'][0]?></li>
													</ul>
											<?php endif; ?>
										<?php endif; ?>
									<?php endforeach; ?>
								</div>
							
						<?php endif ;?>
					<?php endforeach; ?>
					</div>
					<!-- ALL SONGS -->

					<!-- table -->
					<table class="table table-striped table-condensed table-condensed" style="white-space: nowrap;">
							<thead>
								<tr>
									<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
									<th>Song</th>
									<th>Artist</th>
									<th>Album</th>
									<th>Genre</th>
									
								</tr>
							</thead>
							<tbody id="all-songs">
							<?php foreach($songs as $song) : ?>
								<?php if($song->isFile()) : ?>
									<?php if($song->getExtension() != 'mp3') : ?>
										<tr>
											<td>
												<a href="" class="music-entry"><i class="fa fa-times"></i></a>
											</td>
											<td>
												<?=limitString($song->getFilename())?><kbd class="pull-right">Not Supported</kbd>
											</td>
											<td>
												
											</td>
											<td></td>
											<td></td>
											
											
										</tr>
									<?php else : ?>
										<?php 
											/*GET ID3 TAGS*/
											$metadata = $id3v2->analyze($song->getPathname());
											getid3_lib::CopyTagsToComments($metadata);
										?>
										<tr>
											<td>
												<a href="<?=$song->getPathname()?>" class="music-entry"><i class="fa fa-play-circle-o"></i></a>
											</td>
											<td>
												<?php 
													
													$album_art = '';
													if(isset($metadata['comments']['picture'][0])) {
														
														 $album_art='data:'.$metadata['comments']['picture'][0]['image_mime'].';charset=utf-8;base64,'.base64_encode($metadata['comments']['picture'][0]['data']);
													} else {
														$album_art = 'assets/album-cover.jpg';
													}
												?>
												
												<?=(isset($metadata['tags_html']['id3v2']['title'])) ? limitString($metadata['tags_html']['id3v2']['title'][0]) : limitString($song->getBasename('.mp3')) ?> 

												<input type="hidden" value="<?=@$album_art?>">
											</td>
											<td>
												<?=(isset($metadata['tags_html']['id3v2']['artist'])) ? $metadata['tags_html']['id3v2']['artist'][0] : 'n/a'?> 
											</td>
											<td>
												<?=(isset($metadata['tags_html']['id3v2']['album'])) ? $metadata['tags_html']['id3v2']['album'][0] : 'n/a' ?>
											</td>
											<td>
												<?=(isset($metadata['tags_html']['id3v2']['genre'])) ? $metadata['tags_html']['id3v2']['genre'][0] : 'n/a'?>
											</td>
											

										</tr>
									<?php endif; ?>
								<?php endif; ?>
							<?php endforeach; ?>
							</tbody>
						</table>
					<!-- table -->

				</div>
			</div>
		</div>
	</div>


	<!-- <h1>Video</h1>
	<video controls height="300px" width="400px" id="video">
		<source src="http://jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm" type="video/webm">
		<source src="http://jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv" type="video/ogv">
		<source src="http://jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v" type="video/m4v">
	</video>
 -->
	<script src="assets/js/jquery.js" type="text/javascript"></script>
	<script src="assets/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="assets/js/custom.js" type="text/javascript"></script>
	
</body>
</html>

