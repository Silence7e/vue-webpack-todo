<script>
export default {
  props: {
    panes: {
      type: Array,
      required: true,
    },
  },
  render() {
    const contents = this.panes.map(pane => (pane.active ? pane.$slots.default : null));
    return (
      <div class="tab-content">
        {contents}
      </div>
    );
  },
};
</script>
