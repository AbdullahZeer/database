
$(document).ready(function () {
  var becketSize = 2;


  var HashTable = function(becketSize) {
    this.count = 0;
    this.Gdepth = 1;
    this.tupls = [new Bucket() , new Bucket() ];
  }

  HashTable.prototype.insert = function(key){


    var keyByte = byteString(key).substr(-1 * this.Gdepth);
          console.log(keyByte);
          console.log(this.Gdepth);
    for (var i = 0; i < this.tupls.length; i++) {
      if(byteString(i).substr(-1 * this.Gdepth) === keyByte){

        if(this.tupls[i].insertRecored(key)){
          return true;

        }else if (this.Gdepth === this.tupls[i].Ldepth) {

          this.double();
          this.tupls[i].split(i,this);
          this.insert(key);
          return true;

        }else if (this.Gdepth > this.tupls[i].Ldepth) {

          this.tupls[i].split(i,this);
          this.insert(key);
          return true;
        }
      }

    }
      return false;
  }

  HashTable.prototype.find = function(key){

  var found = false;
    var keyByte = byteString(key).substr(-1 * this.Gdepth);

    for (var i = 0; i < this.tupls.length; i++) {
      if(byteString(i).substr(-1 * this.Gdepth) === keyByte){
        console.log("heyyy");

        this.tupls[i].recoreds.forEach(function(recored){
          if(key === recored){

            found = true;
          }
        })
      }
    }
    return found;
  }

  var Bucket = function(){
    this.size = becketSize ;
    this.Ldepth = 1;
    this.recoreds = [];
  }

  Bucket.prototype.split = function(index,table){
    var copedRecoreds = [];

    table.tupls[index].recoreds.forEach(function(recored){
      copedRecoreds.push(recored);
    });

    table.tupls[index].recoreds = [];//did it reset??

    table.tupls[index].Ldepth++
    var d = Math.pow(2,this.Gdepth - table.tupls[index].Ldepth);
    var bucket = table.tupls[index];
    for (var i = index; i < index+d; i++) {
      table.tupls[index] = bucket;
    }
    var bucket2 = new Bucket(becketSize);
    bucket.Ldepth = table.tupls[index].Ldepth
    for (var i = index+d; i < index+d+d; i++) {
      table.tupls[index+d] = bucket2;
    }
    copedRecoreds.forEach(function(record){
      table.insert(recored);
    })
  }

  Bucket.prototype.insertRecored = function(recored){

    console.log(this.recoreds.length);
    console.log(this.size);
    if(this.recoreds.length < this.size){

      this.recoreds.push(recored);
      return true;
    }else {
      return false;
    }
  }

  HashTable.prototype.double = function() {

    for (var i = 0; i < Math.pow(2,this.Gdepth) ; i++) {
      var d = Math.pow(2,this.Gdepth - this.tupls[i].Ldepth);
      var bucket = this.tupls[i];
      for (var j = 1; j < d+1; j++) {
        this.tupls[j+i] = bucket;
        i += j;
      }
    }
    this.Gdepth = Math.pow(2,this.Gdepth);
  }


  function byteString(n) {
    if (n < 0 || n > 255 || n % 1 !== 0) {
        throw new Error(n + " does not fit in a byte");
    }
    return ("000000000" + n.toString(2)).substr(-8)
  }

  var ourTable = new HashTable(5);

  ourTable.insert(22);
  console.log(ourTable.tupls);
  console.log(ourTable.find(22));

  var ViewModel = function() {
    var data = ko.observableArray(ourTable.tupls);
  }
  console.log($('.a'));
  $(function() {
    ko.applyBindings(new ViewModel());
  });

});
