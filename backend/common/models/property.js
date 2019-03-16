'use strict';
module.exports = function(Property) {

  Property.removePropertyForAyear=function(ayear,cb){
    Property.destroyAll({
          fAyear:ayear
    })
    .then(rr=>{
      cb(null,rr)
    })
    .catch(error=>{
      console.log('****',error);

      cb(error,null)
    })
  }
  Property.copyPropertyToAyear=function(dt,cb){
  let prlist1=[]
  Property.find(
    {where:
      {fAyear:dt.prevyear}
    }).then(rr=>{
      rr.map(ob=>{
        ob.fAyear=dt.curryear
        ob.propertyCode=0
        const pr=new Promise((resolve,reject)=>{
          Property.create(ob)
            .then(r1=>{
              resolve(r1)
            })
            .catch(error=>{
              console.log('****',error);
              reject(error)
            })
          });
          prlist1.push(pr)
      })
      Promise.all(prlist1).then(rr=>{cb(null,rr);}).catch(error=>{cb(error,null);})
    }).catch(error=>{cb(error,null);})
  }
  Property.remoteMethod('removePropertyForAyear',{
    accepts:[{arg:'ayear',type:'string'}],

    http:{path:'/removePropertyForAyear/:ayear',verb:'delete'},
    returns:{arg:'done',type:'array'}
  })
  Property.remoteMethod('copyPropertyToAyear',{
    accepts:[{arg:'dt',type:'object'}],
    http:{path:'/copyPropertyToAyear',verb:'post'},
    returns:{arg:'done',type:'array'}
  })
};
