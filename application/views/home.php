<div class="container">
<<<<<<< HEAD
		<?php if($songs_added > 0) : ?>
			<div class="alert alert-warning alert-dismissible" role="alert">
			  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&#x2715;</span></button>
			  <strong>Hey!</strong> You have added <?=$songs_added?> new songs today.
			</div>
		<?php endif; ?>
=======

>>>>>>> origin/master
		<div id="full-screen-player">
			<!-- PLAYER -->
			<div id="player">
				<div id="main">
<<<<<<< HEAD
					<span id="timer" class="pull-right"></span>
					<img src="<?=base_url()?>assets/album-cover.jpg" alt="" class="img-responsive" id="album-art" width="260px" height="260px" >
=======
					<img src="assets/album-cover.jpg" alt="" class="img-responsive" id="album-art" width="260px" height="260px" >
>>>>>>> origin/master
					<h2 id="playing"></h2>
					<span id="artist"></span>
				</div>
				<div id="side">
					<span id="shuffle" class="control-widget" data-toggle="tooltip" data-placement="right" title="Shuffle"><i class="fa fa-random"></i></span> <br>
					<span id="repeat" class="control-widget" data-toggle="tooltip" data-placement="right" title="Repeat"><i class="fa fa-exchange"></i></span> <br>
					<span id="coffee" class="control-widget" data-toggle="tooltip" data-placement="right" title="Chill Mode"><i class="fa fa-coffee"></i></span> <br>
<<<<<<< HEAD
					<span id="clock" class="control-widget" data-toggle="tooltip" data-placement="right" title="Set Airplay Duration"><i class="fa fa-hourglass-half"></i></span> <br>
					<span id="zoom" class="control-widget" data-toggle="tooltip" data-placement="right" title="Full Screen"><i class="fa fa-expand"></i></span> <br>
					<span id="dark-mode" class="control-widget" data-toggle="tooltip" data-placement="right" title="Dark Mode"><i class="fa fa-adjust"></i></span>
				</div>

=======
					<span id="heart" class="control-widget" data-toggle="tooltip" data-placement="right" title="Like"><i class="fa fa-heart"></i></span> <br>
					<span id="zoom" class="control-widget" data-toggle="tooltip" data-placement="right" title="Full Screen"><i class="fa fa-expand"></i></span> <br>
					<span id="dark-mode" class="control-widget" data-toggle="tooltip" data-placement="right" title="Dark Mode"><i class="fa fa-adjust"></i></span>
				</div>
>>>>>>> origin/master
			</div>

			<div id="controls">
				<button class="control-btn" id="prev"><i class="fa fa-step-backward"></i>&nbsp;Prev</button>
				<button class="control-btn" id="next"><i class="fa fa-step-forward"></i>&nbsp;Next</button>
				<audio controls id="audio">
					<source src="" type="audio/mp3">
				</audio>	
			</div>

		</div>
		<div class="row" id="track-lists">
			<div class="col-lg-3">
			<!-- AVAILABLE PLAYLISTS -->
				<h3 class="title">Your Playlists</h3>
<<<<<<< HEAD
=======
				<a href="index.php" class="folder-playlist" id="all-songs-trigger">All Songs</a> <br>
>>>>>>> origin/master
				<?php foreach($songs as $folder) :?>	
					<?php if($folder->isDir()) :?>
						<a class="folder-playlist" href="<?=$folder->getFilename()?>"><?=str_replace('-',' ', $folder->getFilename())?></a> <br>
					<?php endif ;?>
				<?php endforeach; ?>

				<br>
				<br>
				<br>
				<button id="pauseBtn"><i class="fa fa-stop-circle"></i>&nbsp;&nbsp;PAUSE</button>
			</div>
			<div class="col-lg-9">
				<div id="playlist">
					<div id="track-header">
						<h3 class="title">Tracks</h3><h4 id="playlist-title" class="text-right"></h4>
					</div>
					<!-- HIDDEN PLAYLISTS -->
					<div id="container">
					
								
								<?php foreach($songs as $className) :?>	
									<?php if($className->isDir()) :?>
									<div class="hidden-playlists" id="<?=$className->getFilename()?>">
									<table class="table table-striped table-hover" style="white-space: nowrap;">
										<thead>
											<tr>
												<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
												<th>Song</th>
												<th>Artist</th>
												<th>Album</th>
												<th>Genre</th>
												
											</tr>
										</thead>
										<tbody>
												<?php 

													$id3v2 = new getID3;
													$songsUnderPlaylist = new FilesystemIterator($className->getPathname());
												?>
												<?php foreach($songsUnderPlaylist as $song) : ?>
													<?php if($song->isFile()) : ?>
													<?php if($song->getExtension() != 'mp3') : ?>
														<tr>
															<td>
																<a href="" class="music-entry"><i class="fa fa-times"></i></a>
															</td>
															<td>
																<?=$song->getFilename()?><kbd class="pull-right">Not Supported</kbd>
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
<<<<<<< HEAD
																<a href="<?=base_url()?>songs/<?=$className->getFilename()?>/<?=$song->getFilename()?>" class="music-entry"><i class="fa fa-play"></i></a>
=======
																<a href="<?=$song->getPathname()?>" class="music-entry"><i class="fa fa-play"></i></a>
>>>>>>> origin/master
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
																
																<?=(isset($metadata['tags_html']['id3v2']['title'])) ? $metadata['tags_html']['id3v2']['title'][0] : $song->getBasename('.mp3') ?> 

																<input type="hidden" value="<?=@$album_art?>">
															</td>
															<td>
																<?=(isset($metadata['tags_html']['id3v2']['artist'])) ? $metadata['tags_html']['id3v2']['artist'][0] : 'Unknown'?> 
															</td>
															<td>
																<?=(isset($metadata['tags_html']['id3v2']['album'])) ? $metadata['tags_html']['id3v2']['album'][0] : 'Unknown' ?>
															</td>
															<td>
																<?=(isset($metadata['tags_html']['id3v2']['genre'])) ? $metadata['tags_html']['id3v2']['genre'][0] : 'Unknown'?>
															</td>
															

														</tr>
													<?php endif; ?>
												<?php endif; ?>
												<?php endforeach; ?>
									
										</tbody>
											</table>
											</div>
									<?php endif ;?>
								<?php endforeach; ?>
							
					
					</div>
<<<<<<< HEAD
			

			
=======
					<!-- ALL SONGS -->

					<!-- table -->
					<table class="table table-striped table-hover" style="white-space: nowrap;">
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
												<?=$song->getFilename()?><kbd class="pull-right">Not Supported</kbd>
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
												<a href="<?=$song->getPathname()?>" class="music-entry"><i class="fa fa-play"></i></a>
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
												
												<?=(isset($metadata['tags_html']['id3v2']['title'])) ? $metadata['tags_html']['id3v2']['title'][0] : $song->getBasename('.mp3') ?> 

												<input type="hidden" value="<?=@$album_art?>">
											</td>
											<td>
												<?=(isset($metadata['tags_html']['id3v2']['artist'])) ? $metadata['tags_html']['id3v2']['artist'][0] : 'Unknown'?> 
											</td>
											<td>
												<?=(isset($metadata['tags_html']['id3v2']['album'])) ? $metadata['tags_html']['id3v2']['album'][0] : 'Unknown' ?>
											</td>
											<td>
												<?=(isset($metadata['tags_html']['id3v2']['genre'])) ? $metadata['tags_html']['id3v2']['genre'][0] : 'Unknown'?>
											</td>
											

										</tr>
									<?php endif; ?>
								<?php endif; ?>
							<?php endforeach; ?>
							</tbody>
						</table>
					<!-- table -->
>>>>>>> origin/master

				</div>
			</div>
		</div>
	</div>


<<<<<<< HEAD
<div class="modal fade" id="set-timer" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div class="modal-dialog modal-sm" role="document">
  	
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" id="close-timer" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&#x2715;</span></button>
        <h4 class="modal-title" id="myModalLabel">Set Custom Airplay Duration</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
        	<small>In minutes</small>
        	<input type="number" id="time-limit" class="form-control">
        </div>
        <div class="form-group">
        
        </div>
        <div class="modal-footer">
        	<button class="btn btn-sm btn-default pull-right" id="set-time-limit"  data-dismiss="modal"><i class="fa fa-check"></i>&nbsp;Set</button>
      	</div>
      </div>
    </div>
  </div>
</div>
=======
	<!-- <h1>Video</h1>
	<video controls height="300px" width="400px" id="video">
		<source src="http://jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm" type="video/webm">
		<source src="http://jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv" type="video/ogv">
		<source src="http://jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v" type="video/m4v">
	</video>
 -->
>>>>>>> origin/master
