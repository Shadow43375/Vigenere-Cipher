var CipherMode = function() {
  this.mode = "cipherMode";
} 

CipherMode.prototype.changeState = function() {
 if(this.mode === "cipherMode") {
   this.mode = "decipherMode";
 }
 else if(this.mode === "decipherMode") {
   this.mode = "cipherMode";
 }
}

function mod(n, m) {
return ((n % m) + m) % m;
}
 
function VigenereCipher(plainText, keyWord) {
keyWord = keyWord.toLowerCase();
let cipherText = "";
let key = null;
  
function caesarEncipher(plainText, key) {
let cipherText = "";
let newCharacter = "";
let isUpper = false;
let re = /[a-z]/gi
for(let i = 0; i < plainText.length; i++) {
      
if(plainText[i].match(re)) {
if(plainText.charCodeAt(i) >= 65 && plainText.charCodeAt(i) <= 90) {
isUpper = true;
        }
newCharacter = (plainText.toLowerCase(i).charCodeAt(i) - 97) + key;
newCharacter = newCharacter%26
newCharacter = newCharacter + 97;
if(isUpper) {
newCharacter = newCharacter- 32;
        }
newCharacter = String.fromCharCode(newCharacter);
cipherText = cipherText + newCharacter;
isUpper = false;      
      }
      
else if(!plainText[i].match(re)) {
newCharacter = plainText[i];
cipherText = cipherText + newCharacter;
      }
    }
return cipherText;
  }
  
for(let i = 0; i<plainText.length; i++) {
key = keyWord.charCodeAt(i%keyWord.length) - 97;
cipherText = cipherText + caesarEncipher(plainText[i], key);
  }
 
return cipherText;
}
 
function VigenereDecipher(cipherText, keyWord) {
keyWord = keyWord.toLowerCase();
let plainText = "";
let key = null;
  
 
function caesarDecipher(cipherText, key) {
let plainText = "";
let newCharacter = "";
let isUpper = false;
let re = /[a-z]/gi
for(let i = 0; i < cipherText.length; i++) {
    
if(cipherText[i].match(re)) {
if(cipherText.charCodeAt(i) >= 65 && cipherText.charCodeAt(i) <= 90) {
isUpper = true;
      }
newCharacter = (cipherText.toLowerCase(i).charCodeAt(i) - 97) - key;
//this should equal 25 after the mod...
newCharacter = mod(newCharacter,26);
newCharacter = newCharacter + 97;
if(isUpper) {
newCharacter = newCharacter- 32;
      }
newCharacter = String.fromCharCode(newCharacter);
plainText = plainText + newCharacter;
isUpper = false;      
    }
    
else if(!cipherText[i].match(re)) {
newCharacter = cipherText[i];
plainText = plainText + newCharacter;
    }
  }
return plainText;  
}
  
for(let i = 0; i<cipherText.length; i++) {
key = keyWord.charCodeAt(i%keyWord.length) - 97;
console.log(cipherText[i]);
console.log(key);
plainText = plainText + caesarDecipher(cipherText[i], key);
}
 
return plainText;
}

let cipherModeButton = document.getElementById("cipherModeButton");
let decipherModeButton = document.getElementById("decipherModeButton");
let encipherButton = document.getElementById("encipherButton");
let plainTextBox = document.getElementById("plainTextBox");
let cipherTextBox = document.getElementById("cipherTextBox");
let keyWordBox = document.getElementById("keyWordBox");
var cipherMode = new CipherMode();

cipherModeButton.addEventListener('click', function() {
  if(cipherMode.mode === 'cipherMode') {
    //do nothing
  }
  else if(cipherMode.mode === 'decipherMode') {
    cipherMode.changeState();
    plainTextBox.placeholder = "plain text";
    encipherButton.innerHTML = "Encipher";
    cipherTextBox.placeholder = "cipher text";
  }
});

decipherModeButton.addEventListener('click', function() {
  if(cipherMode.mode === 'decipherMode') {
    //do nothing
  }
  else if(cipherMode.mode === 'cipherMode') {
    cipherMode.changeState();
    plainTextBox.placeholder = "cipher text";
    encipherButton.innerHTML = "Decipher";
    cipherTextBox.placeholder = "plain text";
  }
});

encipherButton.addEventListener('click', function() {
  if(cipherMode.mode === "cipherMode") {
    cipherTextBox.value = VigenereCipher(plainTextBox.value, keyWordBox.value);    
  }
  else if(cipherMode.mode === "decipherMode") {
    cipherTextBox.value = VigenereDecipher(plainTextBox.value, keyWordBox.value);    
  }
});
