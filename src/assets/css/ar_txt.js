var latinKeys=new Array(1584,1588,1575,1572,1610,1579,1576,1604,1575,1607,1578,1606,1605,1577,1609,1582,1581,1590,1602,1587,1601,1593,1585,1589,1569,1594,1574);
var shftLatinKeys=new Array(1617,1616,1570,125,93,1615,91,1571,1571,247,1600,1548,47,8271,1570,215,1563,1614,1612,1613,1573,8216,123,1611,1618,1573,126);
var specialKeys=new Array(new Array(39,44,46,47,59,91,93,126,40,41,123,125,58,34,60,62,63),new Array(1591,1608,1586,1592,1603,1580,1583,1617,41,40,60,62,58,34,44,46,1567));
var sd;

function MakeArTxt()
{
    var seek=0;
    var addL=false;
    
    if(event.keyCode==13)
    {                   
         return false;
    }
    if(event.keyCode>47 && event.keyCode<59)
    {
         return false;
    }
    else if(event.keyCode>95 && event.keyCode<123)
    {
         seek=96;
    }
    else if(event.keyCode>64 && event.keyCode<91)
         seek=64;
    if(event.keyCode==98 || event.keyCode==66 || event.keyCode==71 || event.keyCode==84)
         addL=true;
    if(seek>0)
    {
         if(event.shiftKey)
              event.keyCode=shftLatinKeys[event.keyCode-seek];
         else
         {                              
              event.keyCode=latinKeys[event.keyCode-seek];

         }
         if(addL)
         event.srcElement.value+=String.fromCharCode(1604);
    }
    else
    {
         for(var i=0;i<specialKeys[0].length;i++)
         {
              if(specialKeys[0][i]==event.keyCode)
              {
                   event.keyCode=specialKeys[1][i];
                   break;
              }
         }
    }
}