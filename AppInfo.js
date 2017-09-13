/**
 * @flow
 * Created by leiyouwho on 7/25/16.
 */

'use strict';
const port = 3003;
const host = 'localhost';
const sentryDSN = 'http://b1bc97e8dc2b4293b166302d2264de5c@sentry.hsohealth.com/8';
let prod;
try {
  prod = process.env.NODE_ENV === 'production';
} catch (e) {
  prod = false;
}

module.exports = {
  // dev
  port,
  host,
  // prod
  sentryDSN,
  prod,
};
