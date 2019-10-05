import { isSimpleObject } from './isSimpleObject';

const shouldFail = {};

if (isSimpleObject(shouldFail)) {
  shouldFail.hello;
}
