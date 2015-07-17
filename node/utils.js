(function () {
  "use strict";

  /**
   * Make an error comming from webdriver a little more readable.
   */
  exports.cleanError = function (err) {

    var message = '';

    if (typeof err === 'string') {
      return new Error(err);

    } else if (typeof err === 'object') {

      if (err.cause) {
        // probably a webdriver error
        try {
          message = JSON.parse(err.cause.value.message).errorMessage;
        } catch ($) {
          message = err.cause.value.message;
        }
      } else {
        message = err.message || err.toString();
      }
      return new Error(message);
    }
    return new Error(err.toString());
  };

  exports.either = function either (first) {

    return {
      or: function (second) {
        return function (arg1, arg2) {
          return arg1 ? first(arg1) : second(arg2);
        };
      }
    };
  };

}());
