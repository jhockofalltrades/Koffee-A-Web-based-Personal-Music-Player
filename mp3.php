<?php 

require('./getID3/getid3/getid3.php');


	$id3v2 = new getID3;
	$metadata = $id3v2->analyze('./songs/Lady-Gaga/3.-Joanne.mp3');
	getid3_lib::CopyTagsToComments($metadata);
	
	
	echo header('Content-Type: image/jpeg');

	echo @$metadata['comments']['picture'][0]['data'];

?>