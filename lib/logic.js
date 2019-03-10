/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.lms.ehr.GrantAccessToClinician} giveAccessToEHR -- give EHR access to clinician
 * @transaction
 */

 async function grantAccessToClinician(giveAccessToEHR){
    giveAccessToEHR.medicalRecord.authorisedClinicians.push(giveAccessToEHR.authorisedToModify);
    let assetRegistry = await getAssetRegistry('org.lms.ehr.MedicalRecord');
    await assetRegistry.update(giveAccessToEHR.medicalRecord);
   
   
    giveAccessToEHR.authorisedToModify.myPatients.push(giveAccessToEHR.medicalRecord.owner);
    let clinicianRegistry = await getParticipantRegistry('org.lms.ehr.Clinician');
    await clinicianRegistry.update(giveAccessToEHR.authorisedToModify);

   
 }

 
 /**
 * Sample transaction
 * @param {org.lms.ehr.revokeAccessFromClinician} revokeAccessOfClinician -- revoke EHR access to clinician
 * @transaction
 */
 async function revokeAccess(revokeAccessOfClinician){
    var list = revokeAccessOfClinician.medicalRecord.authorisedClinicians;
    var index = list.map(x => {
        return x.clinicianId;
      }).indexOf(revokeAccessOfClinician.revokeThisClinician.clinicianId);
      
      list.splice(index, 1);
    let assetRegistry = await getAssetRegistry('org.lms.ehr.MedicalRecord');
    await assetRegistry.update(revokeAccessOfClinician.medicalRecord);

    var patientList = revokeAccessOfClinician.revokeThisClinician.myPatients;
    var index = patientList.map(patient => {
        return patient;
      }).indexOf(revokeAccessOfClinician.revokeThisClinician.myPatients.patient);
      
      patientList.splice(index, 1);
    let clinicianRegistry = await getParticipantRegistry('org.lms.ehr.Clinician');
    await clinicianRegistry.update(revokeAccessOfClinician.revokeThisClinician);
 }

 /**
 * Sample transaction
 * @param {org.lms.ehr.GrantAccessToLab} GrantAccessToLab -- give EHR access to Lab
 * @transaction
 */

async function GrantAccessToLab(GrantAccessToLab){
  GrantAccessToLab.medicalRecord.authorisedLabs.push(GrantAccessToLab.addThislab);
  let assetRegistry = await getAssetRegistry('org.lms.ehr.MedicalRecord');
  await assetRegistry.update(GrantAccessToLab.medicalRecord);

  GrantAccessToLab.addThislab.myPatients.push(GrantAccessToLab.medicalRecord.owner);
  let labRegistry = await getParticipantRegistry('org.lms.ehr.Lab');
  await labRegistry.update(GrantAccessToLab.addThislab);

}

/**
 * Sample transaction
 * @param {org.lms.ehr.revokeAccessFromLab} revokeAccessFromLab -- revoke EHR access from lab
 * @transaction
 */
async function revokeAccessFromLab(revokeAccessFromLab){
  var list = revokeAccessFromLab.medicalRecord.authorisedLabs;
  var index = list.map(x => {
      return x.labId;
    }).indexOf(revokeAccessFromLab.revokeThisLab.labId);
    
    list.splice(index, 1);
  let assetRegistry = await getAssetRegistry('org.lms.ehr.MedicalRecord');
  await assetRegistry.update(revokeAccessFromLab.medicalRecord);

  var patientList = revokeAccessFromLab.revokeThisLab.myPatients;
    var index = patientList.map(patient => {
        return patient;
      }).indexOf(revokeAccessFromLab.revokeThisLab.myPatients.patient);
      
      patientList.splice(index, 1);
    let labRegistry = await getParticipantRegistry('org.lms.ehr.Lab');
    await labRegistry.update(revokeAccessFromLab.revokeThisLab);
}


/**
 * Create record Transaction
 * @param {org.lms.ehr.CreateMedicalRecord} recordData
 * @transaction
 */
function CreateMedicalRecord(recordData) {
  // Get the Asset Registry
  return getAssetRegistry('org.lms.ehr.MedicalRecord')
      .then(function(medicalRecordRegistry){
          var  factory = getFactory();
          var  NS =  'org.lms.ehr';
          var  recordId = new Date().toLocaleDateString() + '_' + new Date().toLocaleTimeString()+'_'+recordData.owner.patientId
          var  medicalRecord = factory.newResource(NS,'MedicalRecord',recordId);
          medicalRecord.heartDisease = recordData.heartDisease;
		  medicalRecord.diabetese = recordData.diabetese;
		  medicalRecord.asthama = recordData.asthama;
		  medicalRecord.brokenBones = recordData.brokenBones;
  		  medicalRecord.thyroidProblems = recordData.thyroidProblems;
		  medicalRecord.surgicalHistory = recordData.heartDisease;
		  medicalRecord.dustAllergy = recordData.dustAllergy;
		  medicalRecord.skinAllergy = recordData.skinAllergy;
		  medicalRecord.petAllergy = recordData.petAllergy;
		  medicalRecord.insectStingAllergy = recordData.insectStingAllergy;
		  medicalRecord.peanutAllergy = recordData.peanutAllergy;
          medicalRecord.bloodGroup = recordData.bloodGroup;
          medicalRecord.currentMedication = recordData.currentMedication;
          medicalRecord.lastConsultationWith = recordData.lastConsultationWith;
    	  medicalRecord.lastConsultationDate = recordData.lastConsultationDate;
		  medicalRecord.activeHoursInAWeek = recordData.activeHoursInAWeek;
		  medicalRecord.smoking = recordData.smoking;
          medicalRecord.owner = recordData.owner;
    	  medicalRecord.authorisedClinicians = recordData.authorisedClinicians;
          medicalRecord.authorisedLabs = recordData.authorisedLabs;
          medicalRecord.authorisedResearcher = recordData.authorisedResearcher;
     	  medicalRecord.authorisedPharmacist = recordData.authorisedPharmacist;
          medicalRecord.authorisedInsuranceCompany = recordData.authorisedInsuranceCompany;
   
          
          // 4. Add to registry
          return medicalRecordRegistry.add(medicalRecord);
      });
}




 /**
 * Sample transaction
 * @param {org.lms.ehr.grantReadAccessToResearcher} GrantAccessToResearcher -- give EHR access to Researcher
 * @transaction
 */

async function GrantReadAccessToResearcher(GrantAccessToResearcher){
GrantAccessToResearcher.medicalRecord.authorisedResearcher.push(GrantAccessToResearcher.grantThisResearcher);
  let assetRegistry = await getAssetRegistry('org.lms.ehr.MedicalRecord');
  await assetRegistry.update(GrantAccessToResearcher.medicalRecord);

  GrantAccessToResearcher.grantThisResearcher.myPatients.push(GrantAccessToResearcher.medicalRecord.owner);
  let researcherRegistry = await getParticipantRegistry('org.lms.ehr.Researcher');
  await researcherRegistry.update(GrantAccessToResearcher.grantThisResearcher);

}


/**
 * Sample transaction
 * @param {org.lms.ehr.RevokeReadAccessFromResearcher} revokeAccessFromResearcher -- revoke EHR access from lab
 * @transaction
 */
async function revokeReadAccessFromResearche(revokeAccessFromResearcher){
  var list = revokeAccessFromResearcher.medicalRecord.authorisedResearcher;
  var index = list.map(x => {
      return x.researcherId;
    }).indexOf(revokeAccessFromResearcher.revokeThisResearcher.researcherId);
    
    list.splice(index, 1);
  let assetRegistry = await getAssetRegistry('org.lms.ehr.MedicalRecord');
  await assetRegistry.update(revokeAccessFromResearcher.medicalRecord);

  var patientList = revokeAccessFromResearcher.revokeThisResearcher.myPatients;
    var index = patientList.map(patient => {
        return patient;
      }).indexOf(revokeAccessFromResearcher.revokeThisResearcher.myPatients.patient);
      
      patientList.splice(index, 1);
    let researcherRegistry = await getParticipantRegistry('org.lms.ehr.Researcher');
    await researcherRegistry.update(revokeAccessFromResearcher.revokeThisResearcher);
}

 /**
 * Sample transaction
 * @param {org.lms.ehr.GrantReadAccessToPharmacist} GrantAccessToPharmacist -- give EHR access to Pharmacist
 * @transaction
 */

async function GrantReadAccessToPharmacist(GrantAccessToPharmacist){
GrantAccessToPharmacist.medicalRecord.authorisedPharmacist.push(GrantAccessToPharmacist.grantThisPharmacist);
  let assetRegistry = await getAssetRegistry('org.lms.ehr.MedicalRecord');
  await assetRegistry.update(GrantAccessToPharmacist.medicalRecord);

  GrantAccessToPharmacist.grantThisPharmacist.myPatients.push(GrantAccessToPharmacist.medicalRecord.owner);
  let researcherRegistry = await getParticipantRegistry('org.lms.ehr.Pharmacist');
  await researcherRegistry.update(GrantAccessToPharmacist.grantThisPharmacist);

}
/**
 * Sample transaction
 * @param {org.lms.ehr.RevokeReadAccessFromPharmacist} revokeAccessFromPharmacist -- revoke EHR access from lab
 * @transaction
 */
async function revokeAccessFromPharmacist(revokeAccessFromPharmacist){
  var list = revokeAccessFromPharmacist.medicalRecord.authorisedPharmacist;
  var index = list.map(x => {
      return x.pharmacistId;
    }).indexOf(revokeAccessFromPharmacist.revokeThisPharmacist.pharmacistId);
    
    list.splice(index, 1);
  let assetRegistry = await getAssetRegistry('org.lms.ehr.MedicalRecord');
  await assetRegistry.update(revokeAccessFromPharmacist.medicalRecord);

  var patientList = revokeAccessFromPharmacist.revokeThisPharmacist.myPatients;
    var index = patientList.map(patient => {
        return patient;
      }).indexOf(revokeAccessFromPharmacist.revokeThisPharmacist.myPatients.patient);
      
      patientList.splice(index, 1);
    let researcherRegistry = await getParticipantRegistry('org.lms.ehr.Pharmacist');
    await researcherRegistry.update(revokeAccessFromPharmacist.revokeThisPharmacist);
}

/**
 * Sample transaction
 * @param {org.lms.ehr.GrantReadAccessToInsuranceCompany} GrantAccessToInsuranceCompany -- give EHR access to Pharmacist
 * @transaction
 */

async function GrantAccessToInsuranceCompany(GrantAccessToInsuranceCompany){
GrantAccessToInsuranceCompany.medicalRecord.authorisedInsuranceCompany.push(GrantAccessToInsuranceCompany.grantThisInsuranceCompany);
  let assetRegistry = await getAssetRegistry('org.lms.ehr.MedicalRecord');
  await assetRegistry.update(GrantAccessToInsuranceCompany.medicalRecord);

  GrantAccessToInsuranceCompany.grantThisInsuranceCompany.myPatients.push(GrantAccessToInsuranceCompany.medicalRecord.owner);
  let researcherRegistry = await getParticipantRegistry('org.lms.ehr.InsuranceCompany');
  await researcherRegistry.update(GrantAccessToInsuranceCompany.grantThisInsuranceCompany);

}

/**
 * Sample transaction
 * @param {org.lms.ehr.RevokeReadAccessFromInsuranceCompany} revokeAccessFromInsuranceCompany -- revoke EHR access from lab
 * @transaction
 */
async function revokeAccessFromInsuranceCompany(revokeAccessFromInsuranceCompany){
  var list = revokeAccessFromInsuranceCompany.medicalRecord.authorisedInsuranceCompany;
  var index = list.map(x => {
      return x.InsuranceCompanyID;
    }).indexOf(revokeAccessFromInsuranceCompany.revokeThisInsuranceCompany.InsuranceCompanyID);
    
    list.splice(index, 1);
  let assetRegistry = await getAssetRegistry('org.lms.ehr.MedicalRecord');
  await assetRegistry.update(revokeAccessFromInsuranceCompany.medicalRecord);

  var patientList = revokeAccessFromInsuranceCompany.revokeThisInsuranceCompany.myPatients;
    var index = patientList.map(patient => {
        return patient;
      }).indexOf(revokeAccessFromInsuranceCompany.revokeThisInsuranceCompany.myPatients.patient);
      
      patientList.splice(index, 1);
    let researcherRegistry = await getParticipantRegistry('org.lms.ehr.InsuranceCompany');
    await researcherRegistry.update(revokeAccessFromInsuranceCompany.revokeThisInsuranceCompany);
}

/**
 * Handle a transaction that returns a string.
 * @param {org.lms.ehr.getUserType} data The transaction.
 * @transaction
 */
async function getUserType(data) {
  return getParticipantRegistry('org.lms.ehr.Clinician')
  .then(function (participantRegistry) {
    return participantRegistry.get(data.email);
  })
  .then(function (clinician) {
    if(clinician){
      return "Clinician"
    }
  })
  .catch(function (error) {
    return getParticipantRegistry('org.lms.ehr.Patient')
    .then(function (patientRegistry) {
      return patientRegistry.get(data.email);
    })
    .then(function (patient) {
      if(patient){
        return "Patient"
      }
    })
    .catch(function (error) {
      return getParticipantRegistry('org.lms.ehr.Lab')
       .then(function (labRegistry) {
         return labRegistry.get(data.email);
       })
       .then(function (lab) {
          if(lab){
            return "Lab"
          }
       })
       .catch(function (error) {
           return "no data"
       });
    });
  });
  
}