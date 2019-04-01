let firstName = 'Huang'
let lastName = 'Hua'
let birthday = '1984_06_05'
let nationality = 'china'
function getPersonalInformation () {
    return firstName + ' ' + lastName + ' born in ' + birthday + ' come from ' + nationality
}

export {
    firstName,
    lastName,
    birthday,
    nationality,
    getPersonalInformation
}