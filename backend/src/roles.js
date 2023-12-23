import AccessControl from 'accesscontrol';
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('user').readAny('travel');
  ac.grant('admin').extend('user').readAny('user');
  ac.grant('admin').extend('user').deleteAny('user');
  ac.grant('admin').extend('user').deleteAny('travel');
  ac.grant('accountant').extend('user').updateAny('travel');
  ac.grant('employee').extend('user').createAny('travel');

  return ac;
})();
