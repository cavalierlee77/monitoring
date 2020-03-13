<template>
	<div>
		<el-menu
			:default-active="onRoutes"
			class="el-menu-vertical-demo"
			background-color="#313131"
			text-color="#fff"
			active-text-color="#c0c0c0"
			@open="handleOpen"
			@close="handleClose"
			@select="handleMenuItemClick"
			unique-opened
		>
			<template v-for="menuItem in leftMenus">
				<template v-if="menuItem.hasChild == false">
					<el-menu-item v-bind:index="menuItem.index" v-show="!menuItem.hot" :key="menuItem.index">
						<i v-bind:class="[menuItem.imgClass]"></i>
						<span slot="title"> {{ menuItem.title }}</span>
					</el-menu-item>
				</template>
				<template v-else>
					<el-submenu v-bind:index="menuItem.index" :key="menuItem.index">
						<template slot="title">
							<i v-bind:class="[menuItem.imgClass]"></i>
							<span>{{ menuItem.title }}</span>
						</template>
						<template v-for="subItem in menuItem.child">
							<el-menu-item v-bind:index="subItem.index" :key="subItem.index">{{
								subItem.title
							}}</el-menu-item>
						</template>
					</el-submenu>
				</template>
			</template>
		</el-menu>
	</div>
</template>
<script>
	import { mapState } from 'vuex'

	export default {
		data: function() {
			return {
				form: {}
			}
		},
		methods: {
			handleOpen(key, keyPath) {},
			handleClose(key, keyPath) {},
			handleMenuItemClick(key, keyPath) {
				this.$router.push('/' + key)
			},
			dis() {
				const user = this.$store.state.common.loginUser.userName
				if (item.title === 'cms') {
					item.hot = true
				}
			}
		},
		created() {},
		mounted() {
			this.dis()
		},
		computed: {
			onRoutes() {
				return this.$route.path.replace('/', '')
			},
			...mapState({
				leftMenus: state => state.common.leftMenus
			})
		}
	}
</script>

<style scoped>
	@import '../../../static/css/my-font-style.css';

	.el-menu-vertical-demo {
		height: 100%;
	}
	.barspan {
		color: red;
		float: right;
	}
	.el-badge .barspan {
		left: -20px;
	}
	.el-menu-item {
		background-color: #fff;
	}
	.el-submenu .el-menu-item {
		min-width: 0px;
	}
</style>
