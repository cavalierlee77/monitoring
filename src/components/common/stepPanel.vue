<template>
	<div class="step-panel-wrapper">
		<div class="row">
			<div class="col-12">
				<header>
					审核时间轴
				</header>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="hidscrolled">
					<div class="VivaTimeline">
						<div class="events" v-for="(item, index) in stepLabel" :key="index">
							<div class="events-body">
								<ul>
									<li>{{ item.name }}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'StepPanel',
		props: {
			stepLabel: {
				type: Array,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {}
		},
		mounted: function() {},
		methods: {}
	}
</script>

<style lang="scss">
	.step-panel-wrapper {
		padding: 10px 20px;
	}
	.step-panel-wrapper header {
		font-size: 16px;
		padding: 5px 0px 5px 0px;
		font-weight: 600;
		color: #000;
	}
	.VivaTimeline {
		bottom: 0;
	}
	.events {
		padding: 10px 10px 10px 10px;
		border: 1px solid #e0e0e0;
		display: inline-block;
	}
</style>
