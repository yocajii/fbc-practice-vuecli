module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "My Memo",
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/style.scss";`,
      },
    },
  },
};
