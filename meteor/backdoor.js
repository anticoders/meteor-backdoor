Backdoor = {};
Plugins  = {};

Backdoor.assertCanEnter = function (userId) {
  throw new Error('you cannot enter');
};

Plugins.either = function either (first) {
  return { or: function (second) {
    return function (arg1, arg2) { return arg1 ? first(arg1) : second(arg2) };
  }};
};
