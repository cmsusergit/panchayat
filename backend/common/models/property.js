'use strict';
const _=require('lodash')

const appl=require('../../server/server')
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
  Property.observe('after save', function(ctx, next) {
    if (ctx.isNewInstance && ctx.instance) {
      const currProperty=ctx.instance
      const ob={
        fields:{
          taxid:1,
          taxvaluetype:1,
          taxvalue:1
        }
      }
      appl.models.TaxDetail.find(ob)
        .then(rr=>{
          rr.map(taxOb=>{
            propertyTaxExist({
              f_propnumber:currProperty.propertyNumber
            })
            .then(response=>{
              if(response==null){
                insertTaxCollection(taxOb,currProperty)
              }
              else{


                const tempTaxOb=_.find(response,{f_taxid:taxOb.taxid})
                console.log('$$$$',tempTaxOb);
                taxOb.pendingtax=tempTaxOb.pendingtax+tempTaxOb.currenttax
                updateTaxCollection(taxOb,currProperty)
              }
            })
            .catch(error=>{
              console.log('****',error);
            })
          })
        })
        .catch(error=>{
          console.log('****',error);
        })
    } else {
      console.log('Updated %s matching %j',
        ctx.Model.pluralModelName,
        ctx.where);
    }
    next();
  });
  const updateTaxCollection=(taxOb,currProperty)=>{
    console.log('$$$$',taxOb);
    let taxValue=taxOb.taxvalue
    if(taxOb.taxvaluetype==1){
        taxValue=currProperty.annualAssessmentValue*(taxOb.taxvalue/1000.0)
    }
    const temp={
      tcid:0,
      f_propnumber:currProperty.propertyNumber,
      f_taxid:taxOb.taxid,
      pendingtax:taxOb.pendingtax,
      currenttax:taxValue
    }

    appl.models.Taxcollection.updateAll(
      {f_propnumber:currProperty.propertyNumber,f_taxid:taxOb.taxid},
      temp)
    .then(r1=>{
      console.log('****',r1)
    })
    .catch(error=>{
      console.log('****',error)
    })
  }
  const insertTaxCollection=(taxOb,currProperty)=>{
    let taxValue=taxOb.taxvalue
    if(taxOb.taxvaluetype==1){
        taxValue=currProperty.annualAssessmentValue*(taxOb.taxvalue/1000.0)
    }
    const temp={
      tcid:0,
      f_propnumber:currProperty.propertyNumber,
      f_taxid:taxOb.taxid,
      pendingtax:0,
      currenttax:taxValue
    }
    appl.models.Taxcollection.create(temp)
    .then(r1=>{
      console.log('****',r1)
    })
    .catch(error=>{
      console.log('****',error)
    })
  }
  const propertyTaxExist=(taxDescription)=>{
    const ob={where:taxDescription,fields:{f_taxid:1,pendingtax:1,currenttax:1}}
    return new Promise((resolve,reject)=>{
      appl.models.Taxcollection.find(ob)
      .then(rr=>{
        console.log('----',JSON.stringify(rr));
        if(rr.length>0)
          resolve(rr)
        else
          resolve(null)
      })
      .catch(error=>{
        reject(error)
      })
    });
  }
};
