const { PDFDocument ,StandardFonts} = require('pdf-lib');
const fs = require('fs');
const { stringify } = require('querystring');
const button = document.getElementById('savePdf');



const designation = document.getElementById('designation');
const qte = document.getElementById('qte');
const pu = document.getElementById('pu');
var fileLink ="";



function  addspace (ch,max){
  const array = ch.split("\n")
  console.log(array)
  //console.log("rabi em3ana"+decomposer2(ch,max))


  for (let index = 0; index < array.length; index++) {
    //let element = array[index];
    //console.log("rabi em3ana"+decomposerch(element,max))
   if (array[index].includes(" ")){
    console.log("with espace")

      array[index] =decomposer2(array[index],max)


   }else{
     console.log("complet")
     array[index]= decomposerch(array[index],max)

    }
 


      
    }




    
  


return array.toString()



}

function decomposerch(ch,max){
  console.log(ch)
  console.log(max)
  var resulta = "";
  var n = ch.length % max;
  console.log("nnnnnnnnnnnnnnnnnnnnnnnnn"+n)

  console.log( ch.slice(ch.length-n,ch.length))
     resulta =  resulta+ch.slice(ch.length-n,ch.length) 
    console.log("ddddddddddddddddddd"+resulta)
  //const array = [];
  for ( let index =ch.length- n; index -max>=0; index=index-max) {
    resulta = ch.slice(index-max,index) +"\n"+resulta
    // array.push(ch.slice(index,index+max))
     //console.log("///"+resulat)
  }

  return "-"+resulta;


  }

  function decomposer2(ch,max){
    var index =0;
    var resulat="";
    while(index+max<=ch.length){
      console.log("index"+index)
      resulat = resulat +"\n" +  ch.slice(index,ch.slice(0,index + max).lastIndexOf(" "));
      index = ch.slice(0,index + max).lastIndexOf(" ") +1;

    }
    if(resulat!=""){
      return "-"+ resulat.slice(1,resulat.length) + "\n" + ch.slice(index ,ch.length);


    }else{
     return "-"+ ch.slice(index ,ch.length);

    }



  }

Array.prototype.toString = function(){
  var resulta="";
  for (let index = this.length-1; index >=0; index--) {
    const element = this[index];
    resulta = element + "\n" + resulta 
  }
  return resulta;
}

function ifEmpty(ch){
  if(ch){
    return ch ;
  }
  else {
    return " ";
  }

}


const montant = document.getElementById('montant');
const base_tva = document.getElementById('base_tva');
const total_ht = document.getElementById("total_ht");
const total_ht_dt = document.getElementById("total_ht_dt");
const total_ttc_td = document.getElementById("total_ttc_td");
const change = document.getElementById("change");
 const conditionDePaiement = document.getElementById("conditionDePaiement")
 
var val_pu=1;
var val_qte=1;
const posY=580;
const posY1=377;
var device ;
var dateText;

/////////////////////////

const numeroFacture = document.getElementById('numeroFacture');

const date = document.getElementById('date');
//data.value = dateAujourdhui;

date .addEventListener('input' ,function(event){
  dateText=  dateFormate(event.target.value)
  
  console.log(dateText);

})
function dateFormate(ch){
   const array = ch.split('-') ;
   return array[2] + '/'+ array[1] + '/'+ array[0];


}


function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  } 

  if(mm<10) {
      mm = '0'+mm
  } 

  today = yyyy + '-' + mm + '-' + dd;
  dateText = dd + '/' + mm +'/' + yyyy;
  console.log(dateText)
  console.log(today);
  document.getElementById("date").value = today;
}



window.onload = function() {
  getDate();
  createFolder()
};






change.addEventListener('input',function(event){
  console.log("test");
  device=event.target.value;
  total_ht_dt.textContent= device*val_pu*val_qte + " TND";
  total_ttc_td.textContent = device*val_pu*val_qte +0.600 +" TND";

})


////////////////////////////////
 const area1 = document.getElementById('textarea1')
 var area1Text

//////////////////////////////////


const codeClient = document.getElementById('codeClient');
const box1 = document.getElementById('textbox1');
const box2 = document.getElementById('textbox2');
const box3 = document.getElementById('textbox3');
const box4 = document.getElementById('textbox4');

function personliserbox2(ch){
  if(ch.startsWith("KBIS:")||ch.startsWith("kbis:")){
    return ch

  }else{
    return "KBIS:"+ch;
  }

}
pu.addEventListener('input',function(event){   
  if(event.target.value){
    val_pu=event.target.value;
  }else{
    val_pu=1;
  }

  montant.value= val_pu*val_qte + " €"
 base_tva.value = val_pu*val_qte + " €"
  total_ht.textContent= val_pu*val_qte + " €";
  if(device){
    total_ht_dt.textContent= (device*val_pu*val_qte) + " TND";
    total_ttc_td.textContent = (device*val_pu*val_qte )+0.600 +" TND";

  }



  
})
qte.addEventListener('input',function(event){   
  if(event.target.value){
    val_qte=event.target.value;
  }else{
    val_qte=1;
  }
  montant.value= val_pu*val_qte + " €"
  base_tva.value = val_pu*val_qte + " €"
  total_ht.textContent= val_pu*val_qte + " €";
  if(device){
    total_ht_dt.textContent= device*val_pu*val_qte + " TND";
    total_ttc_td.textContent = device*val_pu*val_qte +0.600 +" TND";

  }
  
})
function writeNumber(){

}



function conditionFormate(ch){
  if(ch.endsWith("date de facture")){
    return "Conditions de paiement : "+ch ;

  }else{
    return "Conditions de paiement : "+ch+ " date de facture";

  }
}
function numberStyle(a,n){
  resulta ="";
   var index = n.indexOf(".");
   if(index ==-1){

     return n;
   }else{
      if(n.slice(index,n.length).length>4){
        if(a==1){
          document.getElementById('approximation1').style.display="block"

          document.getElementById('val1').textContent=n;
          document.getElementById('val2').textContent=  n.slice(0,index+4);

        }else if(a==2){
          document.getElementById('approximation2').style.display="block"

          document.getElementById('val3').textContent=n;
          document.getElementById('val4').textContent=  n.slice(0,index+4);

        }
  


        return n.slice(0,index+4);
      }else{
        return n;
      }

   }
   




  






}
function createFolder(){
  const dir = require('os').homedir()+ "/FacturationApp";
  console.log(dir)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true
    });
  }
  return dir;
  

}
document.getElementById('delete').onclick = deleteFile


document.getElementById('nouvelleFcture').onclick = reloadr

function reloadr() {
  console.log('test')
 location.reload(); 
}


button.onclick = function1; 
async function function1(){
    if(numeroFacture.value){

    
  
    const pdfDoc = await PDFDocument.load(fs.readFileSync('template1.pdf'))
    const helveticaFont1 = await pdfDoc.embedFont(StandardFonts.CourierOblique)
    const helveticaFont2 = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
    const helveticaFont3 = await pdfDoc.embedFont(StandardFonts.CourierBoldOblique)
    const helveticaFont4 = await pdfDoc.embedFont(StandardFonts.Courier)



  
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    
    firstPage.drawText(addspace(ifEmpty(designation.value),35)
    
  , {
      x: 33,
      y: posY,
      size: 10,
      font: helveticaFont4  
   
    })
    
    firstPage.drawText("Cours Change €/TND    "+ device
    
      , {
        x: 135,
        y: posY1+40,
          size: 10,
          font: helveticaFont4  
     
        })
    firstPage.drawText(val_qte+"" , {
      x: 270,
      y: posY,
      size: 11,
      font: helveticaFont4  

    })
    firstPage.drawText(val_pu + " €", {
      x: 325,
      y: posY,
      size: 11,
      font: helveticaFont4

    })
    firstPage.drawText(val_pu*val_qte + " €", {
      x: 400,
      y: posY,
      size: 10,
      font: helveticaFont4  
    // font: helveticaFont,
     // color: rgb(0.95, 0.1, 0.1),
      //rotate: degrees(-45),
    })
    firstPage.drawText("Exonere", {
      x: 510,
      y: posY,
      size: 10,
      font: helveticaFont4  
   
    })
    //table 2
    if((val_pu*val_qte + " €").length<=9){
      firstPage.drawText(val_pu*val_qte  +" €", { //BASE TVA
        x: 28,
        y: posY1,
        size: 10,
        font: helveticaFont4 
  
      })

    }else{
      firstPage.drawText(val_pu*val_qte +"", { //BASE TVA
        x: 28,
        y: posY1+5,
        size: 10,
        font: helveticaFont4
  
      })
      firstPage.drawText("    €", { //BASE TVA
        x: 28,
        y: posY1-5,
        size: 10,
        font: helveticaFont4  
  
      })

    }
 
    firstPage.drawText(" 0%", { //TAUX
      x: 100,
      y: posY1,
      size: 10,
      font: helveticaFont4  

    })
    firstPage.drawText("Exonere", { //MONTANT
      x: 140,
      y: posY1,
      size: 10,
      font: helveticaFont4  

    })
    if((val_pu*val_qte +" €").length<=11){
      firstPage.drawText(val_pu*val_qte +" €", { //TOTAL HT €
        x: 205,
        y: posY1,
        size: 10,
        font: helveticaFont4  
      // font: helveticaFont,
       // color: rgb(0.95, 0.1, 0.1),
        //rotate: degrees(-45),
      })

    }else{
      firstPage.drawText(val_pu*val_qte +"", { //TOTAL HT €
        x: 205,
        y: posY1+5,
        size: 10,
        font: helveticaFont4
      // font: helveticaFont,
       // color: rgb(0.95, 0.1, 0.1),
        //rotate: degrees(-45),
      })
      firstPage.drawText( "     €", { //TOTAL HT €
        x: 205,
        y: posY1-5,
        size: 10,
        font: helveticaFont4  
      // font: helveticaFont,
       // color: rgb(0.95, 0.1, 0.1),
        //rotate: degrees(-45),
      })
    }
 
    if((device*val_pu*val_qte +" TND").length<14){
      firstPage.drawText( numberStyle(1,device*val_pu*val_qte+"")  +" TND" , { //TOTAL HT DT
        x: 275,
        y: posY1,
        size: 10,
        font: helveticaFont4  
      })

    }else{
      firstPage.drawText( "     TND" ,  { //TOTAL HT DT
        x: 275,
        y: posY1-5,
        size: 10,
        font: helveticaFont4  
      })
      firstPage.drawText( numberStyle(1,device*val_pu*val_qte+""),  { //TOTAL HT DT
        x: 275,
        y: posY1+5,
        size: 10,
        font: helveticaFont4  
      })


    }

    
    firstPage.drawText("0,600 TND", { //0,600 TND DT
      x: 400,
      y: posY1,
      size: 10,
      font: helveticaFont4  

     // font: helveticaFont,
     // color: rgb(0.95, 0.1, 0.1),
      //rotate: degrees(-45),
    })
    firstPage.drawText("Exonere", { //MONTANT
      x: 350,
      y: posY1,
      size: 10,
      font: helveticaFont4  
 
    })

    if((device*val_pu*val_qte +0.600  +" TND").length<16){
      firstPage.drawText( numberStyle(2,device*val_pu*val_qte +0.600+"") +" TND", { //TOTAL TTC DT
        x: 470,
        y: posY1,
        size: 10,
        font: helveticaFont4  
      })

    }else{
      firstPage.drawText(numberStyle(2,device*val_pu*val_qte +0.600 +""), { //TOTAL TTC DT

        x: 470,
        y: posY1+5,
        size: 10,
        font: helveticaFont4  
      })
      firstPage.drawText("     TND", { //TOTAL TTC DT
        x: 470,
        y: posY1-5,
        size: 10,
        font: helveticaFont4  
      })

    }
 
    firstPage.drawText("N° FC  "+ ifEmpty(numeroFacture.value), { //TOTAL TTC DT
      x: 28,
      y: 670,
      size: 12,
      font: helveticaFont4,

 
    })
    firstPage.drawText( "DATE  "+dateText, { //TOTAL TTC DT
      x: 28,
      y: 650,
      size: 12,
      font: helveticaFont4,

  
    })


    firstPage.drawText("Code Client       "+ifEmpty(codeClient.value), { //TOTAL TTC DT
      x: 280,
      y: 750,
      size: 12,
      font: helveticaFont4,

    })
  
 
    firstPage.drawText(ifEmpty(box1.value), { //TOTAL TTC DT
      
      x: 280,
      y: 730,
      size: 10,
      font: helveticaFont2,

    })
    firstPage.drawText(personliserbox2(ifEmpty(box2.value)), { //TOTAL TTC DT
      x: 280,
      y: 710,
      
      size: 12,
      font: helveticaFont4,


    })
    firstPage.drawText(ifEmpty(box3.value), { //TOTAL TTC DT
      x: 280,
      y: 690,
      size: 12,
      font: helveticaFont4,


    })
    firstPage.drawText(ifEmpty(box4.value), { //TOTAL TTC DT
      x: 280,
      y: 670,
      size: 12,
      font: helveticaFont4


    })
 
    firstPage.drawText(addspace("Arrêté la présente facture à la somme de: " + ifEmpty(area1.value),63 ), { //TOTAL TTC DT
      x: 210,
      y: 350,
      size: 9,
      font: helveticaFont4     // color: rgb(0.95, 0.1, 0.1),
})
firstPage.drawText(conditionFormate(ifEmpty(conditionDePaiement.value )), { //TOTAL TTC DT
  x: 33,
  y: 170,
  size: 10,
  font: helveticaFont4

 // font: helveticaFont,
 // color: rgb(0.95, 0.1, 0.1),
  //rotate: degrees(-45),
})
firstPage.drawText( addspace( ifEmpty(document.getElementById('modeReglement').value ),45), { //TOTAL TTC DT
  x: 33,
  y: 250,
  size: 10,
  font: helveticaFont4


})
//

firstPage.drawText( addspace(ifEmpty(document.getElementById('signature').value) ,50),{ //TOTAL TTC DT
  x: 300,
  y: 250,
  size: 10,
  font: helveticaFont4


})




    const dir =createFolder();
    fs.writeFileSync(dir+"/facture_numero" + ifEmpty(numeroFacture.value) +".pdf", await pdfDoc.save());
    theFileisDownloaded(dir+"/facture_numero" + ifEmpty(numeroFacture.value)+".pdf")
    fileLink = dir+"/facture_numero" + ifEmpty(numeroFacture.value)+".pdf";

 
    }else{
      document.getElementById('alert1').style.visibility = "visible";

      setTimeout(function(){
        document.getElementById('alert1').style.visibility = "hidden";

        
        }, 1000);





    }
}

function theFileisDownloaded(ch){
  document.getElementById('file').textContent = ch;
  document.getElementById('alert').style.display = "block";

}
function deleteFile(){alert

  fs.unlinkSync(fileLink)
  location.reload(); 

  console.log("trase")



}
document.getElementById('update').onclick = updateFile;
function updateFile(){
  numeroFacture.disabled=true;
  document.getElementById('numeroUpdate').textContent=numeroFacture.value
  document.getElementById('nouveauAlert').style.display="none"
  document.getElementById('updateAlert').style.display = "block"
  document.getElementById('approximation1').style.display="none"
  document.getElementById('approximation2').style.display="none"

  window.scrollTo(10, 100);
  document.getElementById('alert').style.display="none";


}




