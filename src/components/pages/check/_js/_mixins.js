export const mix = {
  methods: {
    object_copy(...rest) {
      if (rest.length !== 3) return;
      const [relative, srcs, tags] = rest;
      const srcs_keys_arr = Object.keys(srcs);
      const resultArr = {};
      Object.keys(relative).map(v => {
        if (!srcs_keys_arr.includes(relative[v])) return;
        resultArr[v] = srcs[relative[v]];
      });
      return Object.assign(tags, resultArr);
    },
    array_to_object(left, right) {
      const obj = {};
      for (let i = 0; i < left.length; i++) {
        obj[left[i]] = right[i];
      }
      return obj;
    }
  }
};
