var str = "junoon s or ishq s milti hai azadi";
let para = document.getElementById("para");

let ew = str.split(" ").map((word)=>{
  return word.split("").reverse().join("")

})
para.innerHTML = ew.join(" ")
 