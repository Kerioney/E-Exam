const RBAC = require('easy-rbac');
const opts = require('./Policy/index');

const rbac = RBAC.create(opts);
// creat ruleBase to the options
module.exports = rbac;
