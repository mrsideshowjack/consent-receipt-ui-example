//cbadly named variables
var sp = document.getElementById('sp'),
    sn = document.getElementById('sn'),
    ck = document.getElementById('ck'),
  sbbt = document.getElementById('submitBtn'),
  rcbt = document.getElementById('recept-btn');

//button logic
sbbt.addEventListener("click", function(event){
  event.preventDefault()
  sp.classList.add('hidden')
  sn.classList.remove('hidden');
  setTimeout(function (){
    rcbt.classList.add('drop');
    sn.classList.add('hidden');
    ck.classList.remove('hidden'); 
    sbbt.classList.add('green')
  }, 1500); 
});

rcbt.addEventListener("click", function(event){
  event.preventDefault()
  sbbt.classList.remove('green')
  sp.classList.remove('hidden')
  sn.classList.add('hidden');
  ck.classList.add('hidden'); 
  rcbt.classList.remove('drop');
});

//Consentua setup
var ccid = '1'; // Customer ID
var csid = '25'; // Consentua service ID
var cskey = '4d58ba73-1dec-4724-b040-df0b0caf38c5'; // Consentua service key
var ctid = '20'; // Template ID
var cuid = false;
var ccb_ready = function (msg) {
  //When consentua is ready hide load bar
  console.log('UID is:' + msg.message.uid);
  document.getElementById('loading').classList.add('hidden');
  sp.classList.remove('hidden')
  sn.classList.add('hidden');
};
var ccb_set = function (msg) {
  //update cookie when consent is set
  console.log("Consent received from Consentua", msg);
};
var ciframe = document.getElementById('consentua-cookie-widget');
var ccwrap = new ConsentuaUIWrapper(ciframe, ccid, cuid, ctid, csid, cskey, function () {} , 'en', {ix: 'https://kni-test-node.herokuapp.com/custom-interaction.html'});
// set cb
ccwrap.onset = ccb_set;
ccwrap.onready = ccb_ready;
