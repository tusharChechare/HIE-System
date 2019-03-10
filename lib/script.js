
/**
 * Creating Prescreption
 * @param {org.lms.ehr.CreatePrescription} recordData - Transaction to create a new record.
 * @transaction
 */

async function CreatePrescription(recordData) {
	return getAssetRegistry('org.lms.ehr.MedicalRecord')
			.then(function(medicalRecordRegistry) {
	return medicalRecordRegistry.get(recordData.medicalRecord.recordId).then(function(medicalRecord) {
								if(medicalRecord.prescriptionRec == null) {
									medicalRecord.prescriptionRec = [];
							}								var factory = getFactory();
			var newPrescriptionRecord = factory.newConcept('org.lms.ehr', 'Prescription');
							var newRecordId = new Date().toLocaleDateString() + '_' + new Date().toLocaleTimeString();
							newPrescriptionRecord.prescriptionID = newRecordId;   
							newPrescriptionRecord.clinicianID = recordData.clinicianID;
							newPrescriptionRecord.prescriptionFile = recordData.prescriptionFile;
              medicalRecord.prescriptionRec.push(newPrescriptionRecord);
							return medicalRecordRegistry.update(medicalRecord);
					})
			});
}


/**
* Creating LabReport
* @param {org.lms.ehr.CreateLabReport} recordData1 - Transaction to create a new record.
* @transaction
*/

async function CreateLabReport(recordData1) {
	return getAssetRegistry('org.lms.ehr.MedicalRecord')
			.then(function(medicalRecordRegistry) {
	return medicalRecordRegistry.get(recordData1.medicalRecord.recordId).then(function(medicalRecord) {
								if(medicalRecord.labReport == null) {
									medicalRecord.labReport = [];
							}								var factory = getFactory();
			        var newLabReportRecord = factory.newConcept('org.lms.ehr', 'LabReport');
              var newRecordId1 = new Date().toLocaleDateString() + '_' + new Date().toLocaleTimeString();
							newLabReportRecord.labReportID = newRecordId1;   
							newLabReportRecord.labID = recordData1.labID;
							newLabReportRecord.labReportFile = recordData1.labReportFile;
							medicalRecord.labReport.push(newLabReportRecord);
							return medicalRecordRegistry.update(medicalRecord);
					})
			});
}
