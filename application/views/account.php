<div class="container">
	<span class="back-arrow"><a href="<?=base_url()?>koffee/app"><i class="fa fa-long-arrow-left"></i>&nbsp;&nbsp;back</a></span>
	<h3><i class="fa fa-cog"></i>&nbsp;Account setting</h3>
	<table class="table striped table-hover">
		<tbody>
			<tr id="setting-tds">
				<td><strong>Name</strong></td>
				<td><?=$this->session->userdata('username')?><span id="name-banner" style="color: #2ecc71"></span>
				<form action="" method="post" id="set-name-form" class="setting-form">
					<input type="text" class="form-control-sm" name="set-username" id="set-username">

					<button class="btn-sm" type="submit" id="change-name">Change</button>
				</form>
				</td>
				<td><i class="fa fa-pencil control-setting" id="set-name"></i></td>
			</tr>
			<tr>
				<td><strong>Password</strong></td>
				<td>&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;<span id="passw-banner" style="color: #2ecc71"></span>
				<form action="" id="set-pass-form" class="setting-form">
					<input type="password" class="form-control-sm" name="set-passw" id="set-passw">
					<button class="btn-sm" type="submit" id="change-pass">Change</button>
				</form>
				</td>
				<td><i class="fa fa-pencil control-setting" id="set-pass"></i></td>
			</tr>
		</tbody>
	</table>
	<small  style="color: #bdc3c7" class="pull-right"><i class="fa fa-exclamation-circle"></i>&nbsp;Changes will appear after you logout</small>
</div>