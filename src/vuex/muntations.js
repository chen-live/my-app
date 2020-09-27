export default {
  INCREMENT(state) {
    state.count += 1;
  },
  UPDATE_ISLOADING(state) {
    state.isLoading = state.isLoading ? false : true;
  },
}