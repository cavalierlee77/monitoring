<template>
	<div class="wrap-out clear">
		<i-dialog :dialogVisible="dialogVisible" @action="dialogToggle">
			<cms
				v-for="(checked, index) in cmsList"
				:key="index"
				:iDetail="checked"
				:detTitle="index + 1 + ' / ' + cmsList.length"
			></cms>
		</i-dialog>
		<section class="wrap-in">
			<road-list></road-list>
		</section>
		<!-- <xu-pagination @action="ChangePage" :page="page"></xu-pagination> -->
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
				cmsList: [],
				selData: {}
			}
		},
		components: {
			iDialog: () => import(/* webpackChunkName: "Cms" */ '../../common/Dialog.vue'),
			Pagination: () => import(/* webpackChunkName: "Cms" */ '../../common/Pagination.vue'),
			RoadList: () => import(/* webpackChunkName: "Cms" */ './_template/RoadList'),
			Cms: () => import(/* webpackChunkName: "Cms" */ './_template/Cms'),
			Inputs: () => import(/* webpackChunkName: "Cms" */ './_template/Inputs')
		},
		computed: {
			...mapState({
				height: state => state.common.layoutHgt - 114
			})
			// page: function() {
			// 	return this.$store.state.cms[this.tabType.page]
			// }
		},
		methods: {
			ChangePage(val) {
				this.$store.commit('setHisNowPage', val)
				// this.getRoadList(this.selData[this.nowTab])
				this.getCmsList(this.selData[this.nowTab])
			},
			getCmsData(val = {}) {
				for (const [k, v] of Object.entries(val)) {
					if (
						Object.is(this.selData[this.nowTab][k], undefined) ||
						!Object.is(this.selData[this.nowTab][k], v)
					) {
						const _page = { currentPage: 1, pageSize: this.page.pageSize }
						this.$store.commit('setHisNowPage', _page)
						break
					}
				}
				this.selData[this.nowTab] = Object.assign({}, val)
				const fm = {
					pageSize: this.page.pageSize,
					currentPage: this.page.currentPage,
					queryType: '1',
					...val
				}
				this.getCmsList(this.selData[this.nowTab])
			},
			changeQueryHeight(val = 0, tab = this.nowTab) {
				this.$set(this.resizeQueryHeight, this.nowTab, val)
			},
			getCheckedData(val) {
				this.cmsList = val.concat()
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
	.layout {
		background-color: #fff;
		margin: 10px 10px 10px 10px;
		padding: 10px 10px 10px 10px;
	}
	.cut_time_info {
		margin: 0;
		background-color: #f0f9eb;
		color: #67c23a;
		font-size: 15px;
		width: 100%;
		padding: 8px 16px;
		box-sizing: border-box;
		border-radius: 4px;
		position: relative;
		overflow: hidden;
		opacity: 1;
		vertical-align: middle;
		transition: opacity 0.2s;
		margin-bottom: 10px;
	}
	.cut_time_info .left {
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.cut_time_info .right {
		cursor: pointer;
		font-size: 20px;
		float: right;
	}
	.cut_time_info p {
		margin: 0px 20px 0px 10px;
	}
</style>
