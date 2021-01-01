import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig();

export default merge(baseConfig, {
  input: './promo-bar.js',
  output: [
    {
      file: './dist/promo-bar.js',
    },
  ],
});
