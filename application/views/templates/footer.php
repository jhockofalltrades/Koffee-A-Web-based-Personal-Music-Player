

	<form action="" method="post" id="count-song">
		<input type="hidden" id="cur-title" name="cur-title" value="">
		<input type="hidden" id="cur-artist" name="cur-artist" value="">
	</form>

	  <!-- inject:js -->
	<input type="hidden" id="base-url" value="<?=base_url()?>">
	<input type="hidden" id="user-id" value="<?=$this->session->userdata('user_id')?>">
	<script src="<?=base_url()?>assets/js/jquery.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/bootstrap.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.6/Chart.bundle.min.js"></script>
    <script src="<?=base_url()?>assets/js/helpers-raw.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/custom-raw.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/audio-raw.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/server-raw.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/account-setting-raw.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/timer-raw.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/mood-raw.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/average-color-raw.js" type="text/javascript"></script>
  	  <!-- endinject -->
</body>
</html>

