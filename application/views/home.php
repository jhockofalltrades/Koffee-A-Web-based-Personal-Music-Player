<div class="container">
	
		<?php if($songs_added > 0) : ?>
			<div class="alert alert-warning alert-dismissible" role="alert">
			  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&#x2715;</span></button>
			  <strong>Hey! You have added <?=$songs_added?> new songs today.
			</div>
		<?php endif; ?>
	
		<div id="full-screen-player">
		 	<!-- PLAYER -->
			<div id="player">
				<div id="side">
					<span id="shuffle" class="control-widget" data-toggle="tooltip" data-placement="top" title="Shuffle">
						<img src="<?=base_url()?>assets/widget/svg/004-arrows-1.svg" class="widget-svg" alt="">
					</span> <br>
					<span id="repeat" class="control-widget" data-toggle="tooltip" data-placement="top" title="Repeat">
						<img src="<?=base_url()?>assets/widget/svg/001-arrows.svg" class="widget-svg" alt="">
					</span> <br>
					<span id="chill-mode" class="control-widget" data-toggle="tooltip" data-placement="top" title="Chill Mode">
						<img src="<?=base_url()?>assets/widget/svg/003-food.svg" class="widget-svg" alt="">
					</span> <br>
					<span id="clock" class="control-widget" data-toggle="tooltip" data-placement="top" title="Set Airplay Duration">
						<img src="<?=base_url()?>assets/widget/svg/005-clock.svg" class="widget-svg" alt="">
					</span> <br>
					<span id="zoom" class="control-widget" data-toggle="tooltip" data-placement="top" title="Full Screen">
						<img src="<?=base_url()?>assets/widget/svg/006-arrows-2.svg" class="widget-svg" alt="">
					</span> <br>
					<span id="dark-mode" class="control-widget" data-toggle="tooltip" data-placement="top" title="Night Mode">
						<img src="<?=base_url()?>assets/widget/svg/002-moon.svg" class="widget-svg" alt="">
					</span>
				</div>

				<div id="main">
					<img src="<?=base_url()?>assets/album-cover.png" alt="" class="img-responsive" id="album-art" width="260px" height="260px" >
					<small id="playing-playlist"></small>
					<h2 id="playing"></h2>
					<span id="artist"></span>

					<!-- &nbsp;&nbsp;&#8226;&nbsp;&nbsp; -->
					<div id="audio-controls">
						<button id="prev"><i class="fa fa-step-backward"></i></button>
						<button id="play"><i class="fa fa-play"></i></button>
						<button id="next"><i class="fa fa-step-forward"></i></button>
					</div>

					<span id="timer" class="pull-right badge"></span>

					<div id="audio-sliders">
						<progress id="seekbar" value="0" max="1"></progress>
						<span class="pull-right" id="volume-control">
							<i class="fa fa-volume-off" id="mute"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<i class="fa fa-minus" id="vol-min"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<i class="fa fa-plus" id="vol-max"></i>
						</span>
					</div>
					
				</div>

			</div>

			<div id="controls">
				<!-- <button class="control-btn" id="prev"><i class="fa fa-step-backward"></i>&nbsp;Prev</button>
				<button class="control-btn" id="next"><i class="fa fa-step-forward"></i>&nbsp;Next</button> -->
				<audio controls id="audio">
					<source src="" type="audio/mp3">
				</audio>	
			</div>

		</div>
</div>

<div class="container" id="contents">
		<!-- PLAYLISTS / SONGS -->
		<div class="row" id="track-lists">
			<div class="col-lg-3">
				<h4 class="title">Personal</h4>
				<!-- RECOMMENDATION -->
					<ul class="list-group">
						<a href="" id="trend" class="list-group-item"><i class="fa fa-search" style="color: #34495e"></i>&nbsp;&nbsp;&nbsp;Search</a>
						<a href="" id="top-fifteen" class="list-group-item"><i class="fa fa-area-chart" style="color: #8e44ad"></i>&nbsp;&nbsp;Your Charts</a>
						<a href="" id="recommendations" class="list-group-item"><i class="fa fa-tags" style="color: #d35400"></i>&nbsp;&nbsp;Recommendations</a>
						<a href="" id="discovery" class="list-group-item"><i class="fa fa-fire" style="color: #c0392b;"></i>&nbsp;&nbsp;&nbsp;Discover Songs</a>
					</ul>
				<br>
				<h4 class="title">Playlists</h4>
				<!-- AVAILABLE PLAYLISTS -->
					<ul class="list-group">
					<?php foreach($songs as $folder) :?>	
						
							<?php if($folder->isDir()) :?>
								<a class=" list-group-item folder-playlist" href="<?=$folder->getFilename()?>"><img src="<?=base_url()?>assets/album-cover.png" alt="" class="img-responsive list-group-thumb"><?=str_replace('-',' ', $folder->getFilename())?></a>
							<?php endif ;?>
						
					<?php endforeach; ?>
				</ul>
			</div>
			<div class="col-lg-9">
				<div id="playlist">
					<div id="track-header">
						<h4 class="title">Tracks</h4><h4 id="playlist-title" class="text-right"></h4>
					</div>
					
					
					<div id="container" class="panel panel-default">
						<div class="panel-body">
							<!-- PLACEHOLDER -->
							<div id="placeholder">
								<h1 class="light-font text-center">Select your playlist</h1>
								<p class="text-center">Choose any of your saved playlist and play your favorite songs.</p>
							</div>

								<!-- RECOMENDATIONS -->
							<div id="recommendations-container">
								 <div id="recommendations-body">
								 	<h2 class="light-font text-center">Getting your Recommendations...</h2>
								 	<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>
								 </div>
							</div>
							<!-- DISCOVERY -->
							<div id="discovery-container">
								<div class="container-fluid">
								 <div id="discovery-body">
								 	<h2 class="light-font text-center">Fetching your songs...</h2>
								 	<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>
								 </div>
								</div>
							</div>
							<!-- CHART -->
							<div id="chartjs">
								<div class="panel-body">
									<div id="placeholder1">
										<h1 class="light-font text-center">Most played Chart</h1>
										<canvas id="myChart" width="400" height="300"></canvas>
									</div>
									
									<div id="placeholder2">
										<h1 class="light-font text-center">Listening Activity Chart</h1>
										<canvas id="myChartweekly" width="400" height="300"></canvas>
									</div>
								</div>
							</div>
							<!-- MUSIC TREND -->
							<div id="trend-container">
								<div class="panel-body">
									<div class="form-group">
										<h1 class="light-font text-center">Search your favorite song</h1>
										<p class="text-center">Choose any of your saved songs and see your interactions within the week.</p>
								
											<form action="" method="post" id="trend-search">
												<input type="text" name="search-song" id="search-song" placeholder="Search a song or the artist" class="form-control">
												<button id="search-btn" type="submit"><i class="fa fa-play"></i>&nbsp;&nbsp;<strong>Play</strong></button>
											</form>
											<div id="results">
												
											</div>
									
									</div>
								</div>
							</div>
							<!-- end -->
								<!-- HIDDEN PLAYLISTS -->
								<?php foreach($songs as $className) :?>	
									<?php if($className->isDir()) :?>
									<div class="hidden-playlists" id="<?=$className->getFilename()?>">
									<table class="table table-hover table-striped" style="white-space: nowrap;">
										<thead>
											<tr>
												<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
												<th>Song</th>
												<th>Artist</th>
												<th>Album</th>		
												<th>Length</th>								
											</tr>
										</thead>
										<tbody id="<?=$className->getFilename()?>">
												<?php 

													$id3v2 = new getID3;
													$songsUnderPlaylist = new FilesystemIterator($className->getPathname());
												?>
												<?php foreach($songsUnderPlaylist as $song) : ?>
													<?php if($song->isFile()) : ?>
													<?php if($song->getExtension() != 'mp3') : ?>
														<tr colspan="1">
															<td>
																<a href="" class="music-entry"><i class="fa fa-times"></i></a>
															</td>
															<td>
																<?=$song->getFilename()?><kbd class="pull-right">Not Supported</kbd>
															</td>	
															<td></td>
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

																<a href="<?=base_url()?>songs/<?=$className->getFilename()?>/<?=$song->getFilename()?>" class="music-entry"><i class="fa fa-play"></i></a>

															</td>
															<td>
																<?php 
																	
																	$album_art = '';
																	if(isset($metadata['comments']['picture'][0])) {
																		
																		 $album_art='data:'.$metadata['comments']['picture'][0]['image_mime'].';charset=utf-8;base64,'.base64_encode($metadata['comments']['picture'][0]['data']);
																	} else {
																		$album_art = 'assets/album-cover.png';
																	}
																?>
																
																<?php 
																	$title = (isset($metadata['tags_html']['id3v2']['title'])) ? $metadata['tags_html']['id3v2']['title'][0] : $song->getBasename('.mp3');
																	if(strlen($title) > 30) {
																		echo substr($title , 0, 30) . ' ...';
																	} else {
																		echo $title;
																	}
																 ?>
																
																<!-- TITLE -->
																<input type="hidden" id="hidden-title" value="<?=(isset($metadata['tags_html']['id3v2']['title'])) ? $metadata['tags_html']['id3v2']['title'][0] : $song->getBasename('.mp3') ?>">
																<!-- ALBUM ART -->
																<input type="hidden" id="hidden-album" value="<?=@$album_art?>">
															</td>
															<td>
																<?=(isset($metadata['tags_html']['id3v2']['artist'])) ? $metadata['tags_html']['id3v2']['artist'][0] : 'Unknown'?> 
															</td>
															<td>
																<?=(isset($metadata['tags_html']['id3v2']['album'])) ? $metadata['tags_html']['id3v2']['album'][0] : 'Unknown' ?>
															</td>
															<td>
																<?=isset($metadata['playtime_string']) ? $metadata['playtime_string'] : 'Unknown'?>
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
					</div>
					
				</div>
			</div>
		</div>
	</div>


<div class="modal fade" id="set-timer" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div class="modal-dialog modal-sm" role="document">
  	
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" id="close-timer" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" style="color: white !important">&#x2715;</span></button>
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
