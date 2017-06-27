const arrFn = [];

const dbSaver = (saverFunc)=>{
    arrFn.push({
        last_update: null,
        saverFunc
    });
};

const toInterval = ()=>{

    return new Promise((res, rej)=>{
        console.log(arrFn)
        arrFn.sort((a, b)=>{
            return b.last_update - a.last_update;
        });
        res(arrFn);
    }).then((arr) => {
        for(let i=0; i<10; i++) {
            if(arr[i]){
                arr[i].saverFunc();
                arr[i].last_update = Date.now();
            }
        }
    }).catch((err)=>{
        console.log(`Error in dbSaver: ${err}`);
    })
};

let interval = setInterval(toInterval, 1000*60*5);

module.exports = dbSaver;