<template>
	<div class="wrap-body">
		<div class="wrap-login">
			<div class="user">
				<i></i>
				<div>
					<el-input id="uid" v-model="username" placeholder="用户名"></el-input>
				</div>
			</div>
			<div class="password">
				<i></i>
				<div>
					<el-input id="pid" type="password" v-model="password" placeholder="密码"></el-input>
				</div>
			</div>
			<div>
				<el-checkbox v-model="remember">记住密码</el-checkbox>
				<span></span>
			</div>
			<div><button @click="doLogin">登 录</button></div>
			<div class="errorInfo">
				<span>{{ errorInfo }}</span>
			</div>
		</div>
	</div>
	<!-- <div id="body">
		<div style="width: 100%; margin: 0 auto;">
			<div class="logo"></div>
			<div class="lansekuang"></div>
			<div class="lansekuang2"></div>
			<div class="login_title"></div>
			<div class="login_btns">
				<div class="duihuakuang">
					<div class="login_flag">
						<el-radio v-model="flag" label="1">分局</el-radio>
						<el-radio v-model="flag" label="2">站级</el-radio>
					</div>
					<div class="login_username">
						<el-input id="uid" v-model="username" placeholder="用户名"></el-input>
						<div class="lu_div"></div>
					</div>
					<div class="login_password">
						<el-input id="pwd" type="password" v-model="password" placeholder="密码"></el-input>
						<div class="lp_div"></div>
					</div>
					<div class="login_remember">
						<label>
							<el-checkbox v-model="checked">记住密码</el-checkbox>
						</label>
					</div>
					<div class="login_tips">{{ errorInfo }}</div>
					<div class="login_btn_wrap" @click="doLogin">
						登 录
					</div>
				</div>
			</div>
		</div>
	</div> -->
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				remember: false,
				errorInfo: ''
			}
		},
		mounted() {},
		methods: {
			doLogin() {
				// const self = this
				// if (self.checked === true) {
				// 	self.setCookie(self.username, self.password, 30)
				// } else {
				// 	self.clearCookie()
				// }
				const userParam = {
					loginId: this.username,
					password: this.password
				}
				this.$store.dispatch('getUserInfo', userParam).then(res => {
					this.$router.push('/main/checklayout/unchecktable')
				})
			}
		},
		watch: {
			flag: {
				handler: function(val) {
					this.$store.commit('changeMenu', val)
				},
				immediate: true
			}
		}
	}
</script>

<style scoped>
	header,
	.black_bar,
	footer {
		width: 0 !important;
		height: 0 !important;
	}
	body {
		font-size: 14px;
		font-family: 'Microsoft YaHei';
		overflow: hidden;
		position: absolute;
		width: 100%;
		height: 100%;
	}

	#body {
		width: 100% !important;
		height: 100% !important;
	}

	#body {
		background: url(../../assets/login/images/login1920.webp) no-repeat;
		background-size: 100% 100%;
		left: 0px;
		height: 100%;
		width: 100%;
		border: none;
	}

	.login_btns {
		position: absolute;
		z-index: 1002;
		top: 50%;
		left: 50%;
		margin-left: -548px;
		margin-top: -312px;
		height: 560px;
		width: 1110px;
		background: url(../../assets/login/images/greenDlgl.webp) no-repeat 49.9% 47%;
		background-size: 171.9% 205%;
		text-align: center;
	}

	.login_flag {
		position: relative;
		top: -80px;
		background-color: #ffffff;
		border-radius: 4px;
		border: 1px solid #e0e0e0;
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.duihuakuang {
		position: absolute;
		top: 179px;
		right: 104px;
		width: 350px;
		height: 285px;
	}

	.login_username {
		position: absolute;
		top: 12px;
		left: 66px;
		width: 260px;
		height: 30px;
		text-align: center;
	}

	.login_password {
		position: absolute;
		top: 87px;
		left: 66px;
		width: 260px;
		height: 30px;
	}

	.login_remember {
		position: absolute;
		left: 40px;
		width: 280px;
		top: 166px;
		margin: 7px 0 0 !important;
		height: 30px;
		line-height: 30px;
		text-align: left;
		color: #bfd8e8;
		font-size: 14px;
	}
	.login_remember .el-checkbox {
		color: #fff;
	}

	.login_tips {
		position: absolute;
		top: 165px;
		left: 22px;
		color: red;
		text-shadow: 1px -1px 3px #fff, 1px 1px 3px #fff, -1px -1px 3px #fff, -1px 1px 3px #fff;
		font-weight: bold;
	}

	.login_username input {
		background-color: transparent;
	}

	.login_password input {
		background-color: transparent;
	}

	.login_btns .duihuakuang > div {
		margin: 18px auto;
	}

	.login_btns .duihuakuang input {
		border: none;
		float: left;
		font-size: 18px;
		width: 100%;
		color: #bfd8e8;
		margin: 0;
		padding: 0;
		outline: none;
	}

	.login_btns .duihuakuang input[type='checkbox'] {
		width: 30px;
		position: absolute;
		left: -26px;
		top: 8px;
	}

	/*- 用于修改提示语placeholder样式 -*/
	::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #bfd8e8;
	}

	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #bfd8e8;
	}

	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #bfd8e8;
	}

	:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #bfd8e8;
	}

	.login_btn_wrap {
		position: absolute;
		width: 348px;
		height: 48px;
		background: #2d6dc1;
		border-radius: 1px;
		text-align: center;
		line-height: 48px;
		font-size: 18px;
		color: #fff;
		letter-spacing: 4px;
		cursor: pointer;
		bottom: 2px;
		transition: all 150ms ease-in;
	}

	.login_btn_wrap:hover {
		box-shadow: 3px 3px 6px rgba(102, 102, 102, 0.9);
		bottom: 2px;
		transition: all 150ms ease-out;
	}
</style>
