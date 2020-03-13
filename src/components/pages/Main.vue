<template>
	<div class="wrap-main">
		<el-container>
			<el-header style="height:72px;">
				<div ref="_header">
					<my-header></my-header>
				</div>
			</el-header>
			<el-container>
				<el-aside width="180px">
					<left-menu style="height:100%"></left-menu>
				</el-aside>
				<el-main class="main">
					<transition name="move" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		components: {
			MyHeader: () => import(/* webpackChunkName: "entryApp" */ '../common/Header'),
			LeftMenu: () => import(/* webpackChunkName: "entryApp" */ '../common/LeftMenu')
		},
		mounted: function() {
			const self = this
			this.$store.dispatch('getHeight')
			window.onresize = function() {
				self.$store.dispatch('getHeight')
			}
		},
		computed: {},
		methods: {},
		watch: {
			flag: {
				handler: function(val) {
					this.$store.commit('changeIsFlag', val)
					this.$store.commit('changeMenu', val)
				},
				immediate: true
			}
		}
	}
</script>

<style scoped>
	.el-header {
		padding: 0;
		height: 72px;
	}

	.wrapper {
		height: 100%;
		width: 100%;
		/*overflow: hidden;*/
	}

	.main {
		padding: 0px;
		background-color: #eff1f4;
		position: relative;
	}

	.clear {
		zoom: 1;
	}
	.clear:after {
		content: '';
		display: block;
		clear: both;
	}
</style>
