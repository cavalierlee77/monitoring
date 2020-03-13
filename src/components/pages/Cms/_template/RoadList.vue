<template>
	<section>
		<header></header>
		<div class="querybox-road" v-for="(roads, index) in roadList" :key="index">
			<div v-for="road in roads" :key="road.id">
				<p @click="changeList(road.id)">{{ road.name }}</p>
			</div>
		</div>
	</section>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		name: 'inputs',
		props: {
			inpData: {
				type: Array,
				default: function() {}
			},
			infoData: {
				type: Object,
				default: function() {}
			}
		},
		data() {
			return {}
		},
		computed: {
			...mapState({
				roadList: state => state.cms.roadList
			})
		},
		mounted() {},
		methods: {
			changeList(val) {
				this.$store.dispatch('getCmsList', val)
			}
		}
	}
</script>
<style scoped>
	header {
		padding: 10px 10px 10px 10px;
		font-size: 16px;
		font-weight: 700;
	}
	.querybox-road {
		padding: 10px 0px 10px 0px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.item_list p {
		position: relative;
		display: inline-block;
		width: 120px;
		text-align: left;
		padding-left: 20px;
	}
	.item_list .inner_reset .el-input__inner {
		background-color: #fafafa;
		color: #5b5c5f;
	}
</style>
