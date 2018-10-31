//cbadly named variables
var sp = document.getElementById('sp'),
    sn = document.getElementById('sn'),
    ck = document.getElementById('ck'),
  sbbt = document.getElementById('submitBtn'),
  rcbt = document.getElementById('receipt-btn'),
  btngrp = document.getElementById('btn-group');

btngrp.classList.add('hidden');

//button logic
sbbt.addEventListener("click", function(event){
  event.preventDefault()
  sp.classList.add('hidden')
  sn.classList.remove('hidden');
  setTimeout(function (){
    rcbt.classList.add('drop');
    sn.classList.add('hidden');
    ck.classList.remove('hidden');
    sbbt.classList.add('green');
  }, 1500);
});



//Consentua setup
var ccid = '1'; // Customer ID
var csid = '25'; // Consentua service ID
var ctid = '20'; // Template ID
var cuid = false;

var ccb_ready = function (msg) {
  //When consentua is ready hide load bar
  console.log('UID is:' + msg.message.uid);
  //document.getElementById('loading').classList.add('hidden');
  sp.classList.remove('hidden')
  sn.classList.add('hidden');
};

var got_consent = true;
var ccb_set = function (msg) {
  console.log("Consent received from Consentua", msg);
  got_consent = true;
  validating = true;
  validate();
};

var validating = false;
function validate(){
    var ins = [document.getElementById('name'), document.getElementById('email')];
    var fail = false;
    for(var i in ins){
        var inp = ins[i];

        if(inp.value == ""){
            inp.classList.add('error');
            fail = true;
        } else {
            inp.classList.remove('error');
        }
    }

    if(!got_consent || fail){
        btngrp.classList.add('hidden');
        return;
    }

    btngrp.classList.remove('hidden');
}

// Validate inputs
var ins = [document.getElementById('name'), document.getElementById('email')];
var fail = false;
for(var i in ins){
    inp = ins[i];
    inp.addEventListener("change", function(){
        if(validating){
            validate();
        }
    });
}

var ciframe = document.getElementById('consentua-cookie-widget');

var cwrap = new ConsentuaEmbed({
    iframe: ciframe,
    clientid: ccid,
    uid: cuid,
    templateid: ctid,
    serviceid: csid,
    opts: {ix: 'https://kni-test-node.herokuapp.com/custom-interaction.html'}
});

cwrap.onset = ccb_set;
cwrap.onready = ccb_ready;

/**
 * Receipt handling
 */
var crurl = false;

rcbt.addEventListener("click", function(event){
  event.preventDefault();

  if(crurl !== false)
    window.open(crurl);
});

cwrap.onreceipt = function(msg){
    crurl = msg.message.receiptURL;
    console.log("Got consent receipt", msg, crurl);
}
