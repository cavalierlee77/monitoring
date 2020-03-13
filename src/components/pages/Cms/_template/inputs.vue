<template>
	<section>
		<header><i class="el-icon-info"></i> 查验信息</header>
		<el-row v-for="(rowdata, index) in inpData" :key="index">
			<el-col :span="6" v-for="(coldata, index) in rowdata" :key="index">
				<div class="item_list">
					<label for="">{{ coldata.name }}</label>
					<el-input
						v-model="infoData[coldata.value]"
						suffix-icon="el-icon-view"
						readonly
						class="inner_reset"
					></el-input>
				</div>
			</el-col>
		</el-row>
	</section>
</template>

<script>
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
		mounted() {},
		methods: {}
	}
</script>
<style scoped>
	header {
		padding: 10px 10px 10px 10px;
		font-size: 16px;
		font-weight: 700;
	}
	.item_list {
		padding: 10px 0px 10px 0px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.item_list label {
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
