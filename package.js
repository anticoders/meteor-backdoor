
Package.describe({
  summary: "",
  name: "anti:backdoor",
  version: "1.0.0",
  git: "https://github.com/anticoders/meteor-backdoor.git",
  debugOnly: true,
});

Package.onUse(function (api) {

  api.versionsFrom('METEOR@0.9.0');

  // for "methods" and "WebApp.onListening"
  api.use([ 'livedata', 'webapp' ] , 'server');

  // do we really need these two?
  api.use(['underscore', 'mongo'], [ 'client', 'server' ]);

  api.addFiles([
    'meteor/backdoor.js',
    'meteor/methods.js',
  ], 'server');

  if (api.export) {
    api.export('Backdoor');
  }

});
