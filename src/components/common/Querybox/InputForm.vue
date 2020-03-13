<script>
export default {
  render: function(createElement) {
    console.log("render");
    console.log("render" + this.inputsInfo);
    // return createElement("span", "test");
    return createElement({
      template: "<span>test</span>"
    });
  },
  props: {
    inputsInfo: Object
  }
};
</script>

<style></style>
