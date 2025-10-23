module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIds: true,
          removeUnknownContent: true,
          removeUselessDefs: true,
          removeEmptyAttrs: true,
          removeHiddenElems: true,
          removeEmptyText: true,
          removeEmptyContainers: true,
          cleanupEnableBackground: true,
          minifyStyles: true,
          convertStyleToAttrs: true,
          convertColors: true,
          convertPathData: true,
          convertTransform: true,
          removeUnusedNS: true,
          sortAttrs: true,
          removeTitle: false,
          removeDimensions: true,
        },
      },
    },
  ],
};
