// Copyright (c) 2014 <Joseph Ellsworth, Bayes Analytic> - See use terms in License.txt
/* strbuf.js -  javascript string buffer  */

/* strbuf for fast string building 
* general trade of is strbuff is 
* a better choice than 2 or more
* document.write and 6 or more 
* string concatonation using +.
* all adds can transparantly handle numbers
*
*  Instance menthods
*    abuf.b - adds a single string
*    abuf.push - adds a single string
*    abuf.add  - Add one or more strings 
*    abuf.log  - add one or more strings
*
*  overloaded names such as add and log
*  used to make clear to make contextual
*  use more clear. 
*/
function Strbuf()  // CONSTRUCTOR 
{
// ------------------------
//  String buffer management
// -------------------------
  /* clean out our and set up for re-use */
  function clear()
  {
    this.length = 0;  
  }

  // single string add function
  function push_s(aStr)
  {    
    this.push(aStr); 
    return this
  } 
  
  // multi parameter buffer add
  // separated from push_s because
  // slightly slower.  so keep the b.b function
  // which is single parm only
  function add()
  {
    for (var i = 0; i < arguments.length; ++i)
    {
      var aparm = arguments[i];
      if (aparm != undefined)
      {
        this.push(aparm)
      }
    }
  }

  /* convert our array into a single
  * string that can be inserted into 
  * a string.   adelim is optional, if
  * supplied it will placed between
  * all array elements otherwise no
  * space will be inserted. 
  */
  function to_str(adelim)
  {
    this.push("");
    if (adelim == undefined)
    {
      return this.join("");
    }
    else
    {
      return this.join(adelim);
    }
  }
 
  
  /* Inserts current contents of buffer into
  * a div if the div by id can be found. Returns
  * the div if sucessful otherwise returns undefined
  */
  function to_div(div_id)
  {
    var adiv = document.getElementById(div_id);
    if (adiv != undefined)
    {
      adiv.innerHTML = this.to_str();
    }
    return adiv
  }


  var arr = [];
  arr.b = push_s;
  arr.log = add;
  arr.add = add;
  arr.to_str = to_str;
  arr.clear = clear;
  arr.to_div = to_div;
  return arr;
}


