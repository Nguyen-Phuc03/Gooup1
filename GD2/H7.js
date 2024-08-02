
// function analyzePassword(password) {
//     const specialCharacters = '-#!$@£%^&*()_+|~=`{}[]:";\'<>?,./';
//     let counts = { total: 0, special: 0, numeric: 0, uppercase: 0, lowercase: 0 };
//     for (let i = 0; i < password.length; i++) {
//         let char = password[i];
//         counts.total++;
//         if (/\d/.test(char)) {
//             counts.numeric += 1;
//         } else if (specialCharacters.includes(char)) {
//             counts.special += 1;
//         } else if (/[A-Z]/.test(char)) {
//             counts.uppercase += 1;
//         } else if (/[a-z]/.test(char)) {
//             counts.lowercase += 1;
//         }
//     }

//     return {
//         'Total Characters': counts.total,
//         'Numeric Characters': counts.numeric,
//         'Special Characters': counts.special,
//         'uppercase Charactor': counts.uppercase,
//         'lowercase Charactor': counts.lowercase
//     };
// }
// let password = "P@ssword123&";
// let result = analyzePassword(password);
// console.log(result);








function validatePassword(password, policy) {
    const specialCharacters = '-#!$@£%^&*()_+|~=`{}[]:";\'<>?,./';
    let counts = { total: 0, special: 0, numeric: 0, uppercase: 0, lowercase: 0 };
    for (let i = 0; i < password.length; i++) {
        let char = password[i];
        counts.total++;
        if (/\d/.test(char)) {
            counts.numeric += 1;
        } else if (specialCharacters.includes(char)) {
            counts.special += 1;
        } else if (/[A-Z]/.test(char)) {
            counts.uppercase += 1;
        } else if (/[a-z]/.test(char)) {
            counts.lowercase += 1;
        }
    }


    let messages = [];
    if (policy.minLength && counts.total < policy.minLength) 
        messages.push(`at least ${policy.minLength} characters`);
    if (policy.maxLength && counts.total > policy.maxLength) 
        messages.push(`at most ${policy.maxLength} characters`);
    if (policy.specialCharactor && counts.special < policy.specialCharactor) 
        messages.push(`at least ${policy.specialCharactor} special character(s)`);
    if (policy.numbericCharactor && counts.numeric < policy.numbericCharactor) 
        messages.push(`at least ${policy.numbericCharactor} numeric character(s)`);
    if (policy.uppercaseCharactor && counts.uppercase < policy.uppercaseCharactor ) 
        messages.push(`at least ${policy.uppercaseCharactor} uppercase character(s)`);
    if (policy.lowercaseCharactor && counts.lowercase < policy.lowercaseCharactor) 
        messages.push(`at least ${policy.lowercaseCharactor} lowercase character(s)`);

    return messages.length === 0 ? { isValidPassword: true } : { isValidPassword: false, message: "Password should be " + messages.join(', ') + "." };
}
let password = "@2356P";
let passwordPolicy = {
    minLength: 8,
    maxLength: 64,
    specialCharactor: 1,
    numbericCharactor: 5,
    lowercaseCharactor: 0,
    uppercaseCharactor: 1
};

let result = validatePassword(password, passwordPolicy);
console.log(result);
