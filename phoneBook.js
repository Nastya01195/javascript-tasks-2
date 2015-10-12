'use strict';

var phoneBook = []; 

function isCorrectPhone(phone){
    var re=/^(\+?\d{1,}?)\s?(\(\d{3}\)|\d{3})[\d\-\s\b]*$/;
    return re.test(phone);
}

function isCorrectEmail(email){
    var re=/^\w+@[а-я\w-]+\.[а-я\w-]+\.?[а-я\w-]+$/;
    return re.test(email);
}

module.exports.add = function add(name, phone, email) {
    if(isCorrectPhone(phone) && isCorrectEmail(email)){
        var contact ={
            name: name,
            phone: phone.replace(/\D/g,''),
            email: email
        }
        phoneBook.push(contact);
    }
};

function phoneToCorrectForm(phone){
    var correctPhone='+';
    var i=0;
    if(phone.length-7-3===0){
        correctPhone+='7';
    }
    while(i<phone.length-7-3){
        correctPhone+=phone[i];
        i++;
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

module.exports.find = function find(query, outputOnConsole) {
    var foundContacts=[];
    if (!query) {
        for (var i = 0; i < phoneBook.length; i++) {
            console.log(phoneBook[i].name+', '+phoneToCorrectForm(phoneBook[i].phone)+', '+phoneBook[i].email);
        }
    } else {
        for (var i = 0; i < phoneBook.length; i++){
            if(phoneBook[i].name.indexOf(query)!=-1 || phoneBook[i].phone.indexOf(query)!=-1 || phoneBook[i].email.indexOf(query)!=-1){
                    foundContacts.push(phoneBook[i]);
                if(outputOnConsole===true){
                    console.log(phoneBook[i].name+', '+phoneToCorrectForm(phoneBook[i].phone)+', '+phoneBook[i].email);
                }
            }
        }
    }
    return foundContacts;
};

module.exports.remove = function remove(query) {
    var contactsToRemove=module.exports.find(query,false);
        for (var i = 0; i <contactsToRemove.length; i++){
            for(var j=0;j<phoneBook.length;j++){
                if(contactsToRemove[i]===phoneBook[j]){
                    phoneBook.splice(j,1);
                }
            }
        }
        console.log('Удален(о) '+contactsToRemove.length+' контактов');
};
