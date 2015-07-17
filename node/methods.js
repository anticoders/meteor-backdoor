(function () {
  "use strict";

  exports.promise = function (code, args) {

    if (arguments.length < 2) {
      args = [];
    }

    if (!Array.isArray(args)) {
      throw new Error('"args" must be an array');
    }

    var ddpClient = {};
    var closure   = {};
    var context   = {};

    callDDPMethod(ddpClient, '/backdoor/promise',
      [
        context,
        closure(),
        code.toString(),
        clean(context, args)
      ],
      getSetter(context),
      closure,
      cb
    );
  }

  exports.execute = function (code, args) {

    if (arguments.length < 2) {
      args = [];
    }

    if (!Array.isArray(args)) {
      throw new Error('"args" must be an array');
    }

    var ddpClient = {};
    var closure   = {};
    var context   = {};

    callDDPMethod(ddpClient, '/backdoor/execute',
      [
        context,
        closure(),
        code.toString(),
        clean(context, args)
      ],
      getSetter(context),
      closure,
      cb
    );
  }

  exports.wait = function (timeout, message, code, args) {

    if (arguments.length < 4) {
      args = [];
    }

    if (!Array.isArray(args)) {
      throw new Error('"args" must be an array');
    }

    var ddpClient = {};
    var closure   = {};
    var context   = {};

    callDDPMethod(ddpClient, '/backdoor/wait',
      [
        context,
        closure(),
        timeout,
        message,
        code.toString(),
        clean(context, args)
      ],
      getSetter(context),
      closure,
      cb
    );
  }


  function clean(self, args) {
    return args.map(function (value) {
      return typeof value === 'function' ? value.call(self) : value;
    });
  }

  function callDDPMethod (ddpClient, name, args, context, closure, cb) {
    "use strict";

    if (!ddpClient) {
      return cb(new Error('invalid ddpClient'));
    }
    ddpClient.call(name, args, function (err, feedback) {
      if (feedback && feedback.closure) {
        closure(feedback.closure);
      }
      if (feedback && feedback.context) {
        context(feedback.context);
      }
      if (err) {
        return cb(err);
      }
      if (!feedback) {
        return cb(new Error('no feedback provided'));
      }
      if (feedback.error) {
        return cb(new Error(feedback.error));
      }
      cb(null, feedback.value);
    });
  }

  function getSetter(object) {

    return function setter (updates) {
      Object.keys(updates).forEach(function (key) {
        object[key] = updates[key];
      });
    }
  }

}());
