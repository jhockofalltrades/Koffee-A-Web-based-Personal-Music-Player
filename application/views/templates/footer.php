

	<form action="" method="post" id="count-song">
		<input type="hidden" id="cur-title" name="cur-title" value="">
		<input type="hidden" id="cur-artist" name="cur-artist" value="">
	</form>
	<input type="hidden" id="base-url" value="<?=base_url()?>">
	<input type="hidden" id="user-id" value="<?=$this->session->userdata('user_id')?>">
	<script src="<?=base_url()?>assets/js/jquery.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/chartjs/dist/Chart.bundle.min.js" type="text/javascript"></script>
    <script src="<?=base_url()?>assets/js/helpers.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/custom.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/audio.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/server.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/account-setting.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/timer.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/mood.js" type="text/javascript"></script>
	<script src="<?=base_url()?>assets/js/average-color.js" type="text/javascript"></script>

</body>
</html>

