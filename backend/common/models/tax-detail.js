'use strict';
module.exports = function(Taxdetail) {

    Taxdetail.removeTaxDetailForAyear=function(ayear,cb){
      console.log('****',ayear);
      Taxdetail.destroyAll({
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
    Taxdetail.copyTaxDetailToAyear=function(dt,cb){
    let prlist1=[]
    console.log('****',dt);
    Taxdetail.find(
      {where:
        {fAyear:dt.prevyear}
      }).then(rr=>{
        console.log('****',JSON.stringify(rr));
        rr.map(ob=>{
          ob.fAyear=dt.curryear
          ob.taxid=0

          const pr=new Promise((resolve,reject)=>{
            Taxdetail.create(ob)
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
    Taxdetail.remoteMethod('removeTaxDetailForAyear',{
      accepts:[{arg:'ayear',type:'string'}],
      http:{path:'/removeTaxDetailForAyear/:ayear',verb:'delete'},
      returns:{arg:'done',type:'array'}
    })
    Taxdetail.remoteMethod('copyTaxDetailToAyear',{
      accepts:[{arg:'dt',type:'object'}],
      http:{path:'/copyTaxDetailToAyear',verb:'post'},
      returns:{arg:'done',type:'array'}
    })
};
