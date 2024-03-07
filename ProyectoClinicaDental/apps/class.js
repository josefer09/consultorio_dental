class User {
    constructor(email, password, token, userName, type) {
        this.email = email;
        this.password = password;
        this.token = token;
        this.userName = userName;
        this.type = type;
    }
}

class UserSession extends User {
    constructor(email, token, userName, type) {
        super(email, null, token, userName, type);
    }
}

class Employee {
    constructor(name, licenseNumber, age, id_userRole, id_userSpecialty, id_user) {
        this.name = name;
        this.licenseNumber = licenseNumber;
        this.age = age;
        this.id_userRole = id_userRole;
        this.id_userSpecialty = id_userSpecialty;
        this.id_user = id_user;
    }
}

class Role {
    constructor(name) {
        this.name = name;
    }
}

class Specialty {
    constructor(name) {
        this.name = name;
    }
}

class Patient {
    constructor(name, lastname, age, cellphone, adress, id_user, gender) {
        this.nombre = name;
        this.apellido = lastname;
        this.edad = age;
        this.celular = cellphone;
        this.direccion = adress;
        this.id_user = id_user;
        this.sexo = gender;
    }
}

class Procedure {
    constructor(name, price, discount) {
        this.nombre = name;
        this.precio = price;
        this.descuento = discount;
    }
}

class Appointment {
    constructor(id_user, id_employee, date, time, motivo) {
        this.id_user = id_user;
        this.id_employee = id_employee;
        this.date = date;
        this.time = time;
        this.motivo = motivo;
    }
}

class MedicalNotes {
    constructor(nota, id_procedimiento, id_appointment, id_paciente, id_employee) {
        this.nota = nota;
        this.id_procedimiento = id_procedimiento;
        this.id_appointment = id_appointment;
        this.id_paciente = id_paciente;
        this.id_employee = id_employee;
    }
}
export {User, UserSession, Employee, Role, Specialty, Patient, Procedure, Appointment, MedicalNotes};
