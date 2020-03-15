const defaultObj = {
    arrhythmias: null,
    createdDate: null,
    id: null,
    patientName: null,
    status: null,
}

export default class Card {
    constructor(obj = defaultObj) {
        this.arrhythmias = obj.arrhythmias;
        this.createdDate = obj.createdDate;
        this.id = obj.id;
        this.patientName = obj.patientName;
        this.status = obj.status;
    }

    static mapJsonToModel(jsonData) {
        return new Card({
            arrhythmias: jsonData.arrhythmias,
            createdDate: new Date(jsonData.created_date),
            id: jsonData.id,
            patientName: jsonData.patient_name,
            status: jsonData.status,
        });
    }
}
