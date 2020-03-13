<template>
	<div>
		<header>
			<i></i><span></span>
			<div class="close">×</div>
		</header>
		<section>
			<div class="wrap-out-window">
				<div class="wrap-in-window">
					<p></p>
					<ul class="minNav">
						<li v-for="(nav, index) in infoData.text" :key="index">{{ index }}</li>
					</ul>
				</div>
			</div>
			<div class="toolsTab">
				<select name="" id="">
					<option value="">--字号--</option>
				</select>
				<select name="" id="">
					<option value="">--颜色--</option>
				</select>
				<select name="" id="">
					<option value="">----</option>
				</select>
				<i></i
				><!-- 图标 -->
			</div>
			<div class="wrap-textarea">
				<textarea name="" id=""></textarea>
			</div>
			<div class="wrap-funcbtns">
				<input type="button" value="添加" @click="add()" />
				<input type="button" value="删除" @click="del()" />
				<input type="button" value="发布" @click="sent()" />
				<input type="button" value="模板" @click="models()" />
				<input type="button" value="" />
			</div>
		</section>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		name: '',
		data() {
			return {
				resizeQueryHeight: {},
				dialogVisible: false,
				checkedList: [],
				selData: {}
			}
		},
		props: {
			infoData: {
				type: Object,
				default: function() {}
			}
		},
		components: {
			Pagination: () => import(/* webpackChunkName: "Cms" */ '../../common/Pagination.vue'),
			CheckedDetails: () => import(/* webpackChunkName: "Cms" */ './_template/Details')
		},
		computed: {
			...mapState({
				height: state => state.common.layoutHgt - 114,
				HeadList: state => state.cms.nowTab,
				tools: state => state.cms.tools
			})
			// page: function() {
			//     return this.$store.state.cms[this.tabType.page];
			// }
		},
		methods: {
			ChangePage(val) {
				this.$store.commit('setHisNowPage', val)
				this.getHistoryData(this.selData[this.nowTab])
			},
			changeQueryHeight(val = 0, tab = this.nowTab) {
				this.$set(this.resizeQueryHeight, this.nowTab, val)
			},
			getCheckedData(val) {
				this.checkedList = val.concat()
				this.dialogToggle()
			},
			dialogToggle() {
				this.dialogVisible = !this.dialogVisible
			}
		},
		mounted() {}
	}
</script>

<style scoped>
	header {
		border-bottom: 1px solid #000;
		font-size: 16px;
	}
	div[class*='wrap'] {
		margin-bottom: 20px;
	}
</style>
