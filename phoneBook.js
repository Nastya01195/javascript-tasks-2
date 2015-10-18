'use strict';

var phoneBook = [];

module.exports.tryAdd = function tryAdd(name, phone, email) {
    var IS_CORRECT_PHONE=/^(\+?\d{1,}?)\s?(\(\d{3}\)|\d{3})[\d\-\s\b]*$/;
    var IS_CORRECT_EMAIL=/^\w+@[а-я\w-]+\.[а-я\w-]+\.?[а-я\w-]+$/;
    if(IS_CORRECT_PHONE.test(phone) && IS_CORRECT_EMAIL.test(email)){
        var contact ={
            name: name,
            phone: phone.replace(/\D/g,''),
            email: email
        }
        phoneBook.push(contact);
        return true;
    }
    return false;
};

function phoneToCorrectForm(phone){
    var correctPhone='+';
    var i=0;
    if(phone.length-7-3===0){
        correctPhone+='7';
    }
    for(var i=0;i<phone.length-7-3;i++){
        correctPhone+=phone[i];
    }
    correctPhone+=' (';
    for(var j=0;j<3;j++){
        correctPhone+=phone[i];
        i++;
    }
    correctPhone+=') ';
    for(j=i;j<i+7;j++){
        if(j!=7){
            correctPhone+=phone[i];
        }
        else{
            correctPhone+='-'+phone[i]+'-';
        }
    }
    return correctPhone;
}

module.exports.outputOnConsole=function outputOnConsole(arrayForPrint){
    for(var i=0;i<arrayForPrint.length;i++){
        console.log(phoneBook[i].name+', '+phoneToCorrectForm(phoneBook[i].phone)+', '+phoneBook[i].email);
    }
}
module.exports.find = function find(query) {
    var foundContacts=[];
    for (var i = 0; i < phoneBook.length; i++){
        if(phoneBook[i].name.indexOf(query)!==-1 || phoneBook[i].phone.indexOf(query)!==-1 || phoneBook[i].email.indexOf(query)!==-1){
            foundContacts.push(phoneBook[i]);
        }
    }
    return foundContacts;
};

module.exports.remove = function remove(query) {
    var contactsToRemove=module.exports.find(query);
    for (var i = 0; i <contactsToRemove.length; i++){
        for(var j=0;j<phoneBook.length;j++){
            if(contactsToRemove[i]===phoneBook[j]){
                phoneBook.splice(j,1);
            }
        }
    }
    console.log('Удален(о) '+contactsToRemove.length+' контактов');
};

