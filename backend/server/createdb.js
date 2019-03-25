var server = require('./server');
var ds = server.dataSources.panchayat;


var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role','property','Akarniyear','GrampanchayatInfo','TaxDetail','Taxchallan','Taxcollection'];
//
// var lbTables=['Taxchallan','Taxcollection']
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});
