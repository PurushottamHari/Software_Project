var fs = require('fs'),
PNG = require('pngjs').PNG;
msg = "hello world satvik nema purushottam";
// msg = "Command center here! The capital has been breached. RUN FOR YOU LIFES!"
var len = msg.length;
var p = 11,q = 23, m = 93, e = 67;
var n = p*q, phi = (p-1)*(q-1);

fs.createReadStream('./images/pylogo.png').pipe(new PNG()).on('parsed', function() {
    for (var x = 0; x < len; x++) {
        var idx = x << 2;
        console.log("Orinial ASCII: "+msg.charCodeAt(x));
        enc = modPow(msg.charCodeAt(x), e, n);
        this.data[idx] = enc;
        console.log("Encrypted ASCII: "+this.data[idx]+"\n");
    }
    lenIndex = (this.height-1)<<2;
    this.data[lenIndex] = len;
    console.log("Space encoded at: "+lenIndex);
    this.pack().pipe(fs.createWriteStream('./images/out.png'));
});


function modPow(a,n,m){
    if(n==0){
        return 1;
    }else if(n==1){
        return a;
    }else{
        if (n%2==0){
            return modPow(Math.pow(a,2)%m,n/2,m)%m;
        }else{
            return a*(modPow(Math.pow(a,2)%m,Math.floor(n/2),m)%m)%m;
        }
    }
}

// fs.createReadStream('./images/pylogo.png').pipe(new PNG()).on('parsed', function() {
//     for (var y = 0; y < this.height; y++) {
//         for (var x = 0; x < this.width; x++) {
//             var idx = (this.width * y + x) << 2;
//             this.data[idx] = 0;
//         }
//     }
//     this.pack().pipe(fs.createWriteStream('./images/out.png'));
// });

