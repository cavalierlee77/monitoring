<template>
	<div class="">
		<header>
			<i class="el-icon-info"></i>
			<i class="el-icon-picture upload" v-if="show_upload_icon"></i>
			<input
				type="file"
				v-if="show_upload_icon"
				ref="clear_files"
				multiple
				class="file_uploader"
				@change="action"
			/>
		</header>
		<ul class="pic_ul">
			<template v-for="(item, index) in url">
				<li class="piclist" :key="index" :style="{ height: wi / Xcol + 20 + 'px', width: wi / Xcol + 'px' }">
					<i
						class="el-icon-refresh"
						style="position: relative; color: red; float: right"
						@click="refrash(item)"
						v-if="item.indexOf('.jpg') != -1 || item.indexOf('.png') != -1 || item.indexOf('.mp4') != -1"
					>
					</i>
					<img
						data-magnify="gallery"
						:data-src="item"
						:src="item"
						:style="{ height: wi / Xcol - 20 + 'px', width: wi / Xcol + 'px' }"
						v-if="item.indexOf('.jpg') != -1 || item.indexOf('.png') != -1"
					/>
					<video
						:style="{ height: wi / Xcol - 20 + 'px', width: wi / Xcol + 'px' }"
						:src="item"
						controls="controls"
						v-if="item.indexOf('.mp4') != -1"
					></video>
				</li>
			</template>
			<template v-for="(item, index) in urladd">
				<li
					class="piclist"
					:key="index + url.length"
					:style="{ height: wi / Xcol + 20 + 'px', width: wi / Xcol + 'px' }"
					v-if="
						!(item.url.indexOf('.jpg') != -1) &&
							!(item.url.indexOf('.png') != -1) &&
							!(item.url.indexOf('.mp4') != -1)
					"
				>
					<i
						class="el-icon-delete"
						style="position: relative; color: red; float: right"
						@click="delpic(item)"
					>
					</i>
					<img
						data-magnify="gallery"
						:data-src="item.url"
						:src="item.url"
						:style="{ height: wi / Xcol - 20 + 'px', width: wi / Xcol + 'px' }"
					/>
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
	export default {
		name: '',
		props: {
			picture_video_data: {
				type: Array,
				default: function() {
					return {}
				}
			},
			show_upload_icon: {
				type: Boolean,
				default: function() {
					return false
				}
			},
			Xcol: {
				type: Number,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
				url: [],
				urladd: [],
				wi: 0,
				files: []
			}
		},
		components: {},
		beforeMount() {
			this.getPanelWidth()
		},
		mounted() {},
		methods: {
			rest() {
				this.urladd = []
				this.files = []
			},
			getPanelWidth() {
				this.$nextTick(function() {
					this.wi = this.$el.offsetWidth - 102
					const self = this
					$(window).resize(function() {
						self.wi = self.$el.offsetWidth - 102
					})
				})
			},
			refrash(val) {
				this.url.forEach((item, index) => {
					if (item == val) {
						this.url.splice(index, 1, val.substring(0, val.lastIndexOf('?')) + '?' + Math.random())
					}
				})
			},
			delpic(val) {
				this.files.forEach((item, index) => {
					if (item.name === val.name) {
						this.files.splice(index, 1)
					}
				})
				this.urladd.forEach((item, index) => {
					if (item.url === val.url) {
						this.urladd.splice(index, 1)
					}
				})
				this.$refs.clear_files.value = ''
				this.$emit('action', this.files)
			},
			action($event) {
				const fileobj = $event.target.files
				const fileArr = []
				for (let i = 0; i < fileobj.length; i++) {
					fileArr.push(fileobj[i])
				}
				if (this.files.length == 0) {
					this.files = fileArr
					for (let l = 0; l < fileArr.length; l++) {
						this.urladd.push({
							url: URL.createObjectURL(fileArr[l]),
							name: fileArr[l].name
						})
					}
				} else {
					let flag = false
					const norepeatArr = []
					for (let j = 0; j < fileArr.length; j++) {
						for (let k = 0; k < this.files.length; k++) {
							if (fileArr[j].name == this.files[k].name) {
								this.$message.info('添加重复')
								flag = true
							}
						}
						if (!flag) {
							norepeatArr.push(fileArr[j])
							this.urladd.push({
								url: URL.createObjectURL(fileArr[j]),
								name: fileArr[j].name
							})
							flag = false
						}
					}
					this.files = this.files.concat(norepeatArr)
				}
				this.$refs.clear_files.value = ''
				this.$emit('action', this.files)
			}
		},
		watch: {
			picture_video_data: {
				handler(val, oldval) {
					this.url = val
				},
				immediate: true
			},
			url: {
				handler(val, oldval) {},
				immediate: true
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
	.pic_ul {
		padding: 0px 0px 0px 20px;
	}
	.piclist {
		margin: 2px 2px;
		border-radius: 2px;
		border: 1px solid #e0e0e0;
		cursor: pointer;
		transition-duration: 0.5s;
		display: inline-block;
		padding: 5px 5px 5px 5px;
		background-color: #fff;
	}
	.piclist video {
		object-fit: fill;
	}
	.upload {
		position: absolute;
		font-size: 30px;
		right: 30px;
		cursor: pointer;
	}
	.file_uploader {
		opacity: 0;
		cursor: pointer;
		width: 30px;
		right: 30px;
		position: absolute;
	}
</style>
