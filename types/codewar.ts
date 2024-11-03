interface CheckMark {
    a: string;
    b: string;
  }
  const checkMark = (params: CheckMark) => {

    const { a, b } = params;

   
    let cc = 0;
    let gg = 0;

    if (/^[A-Za-z]$/.test(a) && /^[A-Za-z]$/.test(b)) {

        if(a === a.toUpperCase()){
            cc = cc + 1;
         }

         if( b === b.toUpperCase()){
             gg = gg + 1;
         }   

         if(gg === cc){
             return 1
         } else {
             return 0
         }

      } else {
        return -1
      }

}




