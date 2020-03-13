<template>
	<section>
		<div class="wrapper">
			<header>{{ detTitle }}</header>
			<inputs-box :inpData="inpData" :infoData="iDetail"></inputs-box>
			<pic-mov :Xcol="4" :picture_video_data="picture_video_data"></pic-mov>
			<timeline :time_line_data="time_line_data"></timeline>
		</div>
	</section>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'iDetail',
		props: {
			iDetail: {
				type: Object,
				default: function() {}
			},
			detTitle: {
				type: String,
				default: function() {}
			}
		},
		data() {
			return {
				picture_video_src: [
					'picSource',
					'otherPics',
					'driLicenseCopyPics',
					'truckHeadPics',
					'stationMasterPics'
				],
				picture_video_data: [],
				time_line_data: [],
				numm: 0
			}
		},
		components: {
			InputsBox: () => import('./inputs'),
			PicMov: () => import('../../../../common/preview/picpanel'),
			Timeline: () => import('../../../../common/timelinepanel')
		},
		mounted() {},
		computed: {
			...mapState({
				nowTab: state => state.history.nowTab,
				cartabs: state => state.common.cartabs,
				inputList: state => {
					const _type = state.history.nowTab
					let _inputList = 'GreenCarInpRel'
					if (_type) {
						_inputList = state.history.hisRelevance[_type].selRelevance
					}
					return state.history[_inputList]
				},
				alurl: state => state.alurl,
				txurl: state => state.txurl
			}),
			inpData: function() {
				const _arr = this.inputList
				const _arr_ = []
				_arr.forEach((item, index) => {
					const _key = Object.keys(item)[0]
					if (!_arr_[parseInt(index / 4)]) {
						_arr_[parseInt(index / 4)] = []
					}
					_arr_[parseInt(index / 4)].push({
						name: item[_key],
						value: _key
					})
				})
				return _arr_.concat()
			}
		},
		methods: {
			setPictureVideoUrl(data, src, prefix) {
				if (!data) return
				let url = []
				for (let i = 1; i < src.length; i++) {
					if (!data[src[i]]) continue
					url = url.concat(data[src[i]].split(';'))
				}
				if (data[src[0]] === '1' && url.length > 0) {
					url = url.map(item => prefix + item)
				}
				if (data[src[0]] === '2' && url.length > 0) {
					url = url.map(item =>
						item.slice(item.length - 4, item.length) === '.mp4'
							? prefix + item + '?sign=' + data.sign
							: prefix + item + '!sl?sign=' + data.sign
					)
				}
				return url
			},
			setTimelineData(val) {
				this.time_line_data = [
					{
						timelineList: {
							查验时间: val.checkTime,
							查验员: val.checkorName,
							查验结论: val.isGcTrunckName
						},
						listKeyData: {},
						iscomplete: true
					}
				]
				const timeLineData = val.verifySuggestList.map(item => {
					let _iscomplete
					if (item.verifyStatus === '3') _iscomplete = true
					if (item.verifyStatus === '2') _iscomplete = false
					const _object = {}
					_object['审核时间'] = item.verifyTime
					_object[item.roleName] = item.verifyOperatorName
					_object['审核结论'] = item.verifySuggestSelect
					if (item.verifyStatus === '2' && item.verifySuggest) {
						_object['详情'] = item.verifySuggest
					}
					return {
						timelineList: _object,
						listKeyData: item,
						iscomplete: _iscomplete
					}
				})
				this.time_line_data = this.time_line_data.concat(timeLineData)
			}
		},
		watch: {
			iDetail: {
				handler(val, oldval) {
					const _self = this
					_self.cartabs.forEach(item => {
						if (item.ename === _self.nowTab) {
							_self.currentView = _self.nowTab
						}
					})
					this.picture_video_data = []
					this.picture_video_data = this.setPictureVideoUrl(val, this.picture_video_src, this.alurl)
					this.setTimelineData(val)
				},
				immediate: true
				// deep: true
			}
		}
	}
</script>
<style scoped>
	header {
		border-bottom: 1px solid #000;
		font-size: 16px;
	}
	div[class*='wrapper'] {
		margin-bottom: 20px;
	}
</style>
