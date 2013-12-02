var hash = function(string){
  // some cool hashing
  var hash = [];

  for(var i = 0, len = string.length; i < len; i++){
    hash.push(string.charCodeAt(i));
  }

  return hash.join('');
};

var dict = {};

dict[hash(obj1)] = obj1;
dict[hash(obj2)] = obj2;

