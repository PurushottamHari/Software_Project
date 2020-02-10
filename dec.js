var fs = require('fs'),
PNG = require('pngjs').PNG;
var decodedMsg = '';
var p = 11,q = 23, m = 93, e = 67, d=23;
var n = p*q, phi = (p-1)*(q-1);

t = 0;
idx=0;
fs.createReadStream('./images/out.png').pipe(new PNG()).on('parsed', function() {
	len = this.data[(this.height-1)<<2];
	console.log("Length recieved from: "+((this.height-1)<<2))
    for (var x = 0; x < len; x++) {
        idx = x << 2;
        // console.log(String.fromCharCode(this.data[idx]));

        dec = modPow(this.data[idx], d, n);
        console.log("Decrypted ASCII: "+dec)
        decodedMsg += String.fromCharCode(dec)
        t+=1

    }
    console.log("Decoded message: "+decodedMsg)
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
