const fs = require('fs');
const xlsx = require('xlsx-to-json');


let stateInfo = {
    state: {
        protests: 0,
        causes: {},
        types: {},
        fatalities: 0
    }
}



async function readData() {
    // let json = await csvtojson().fromFile(csvPath);
    xlsx({
        input: 'USA_2020_2021_Jun18.xlsx',
        output: 'output.json'
    }, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log(res);
            parseJson(res);
        }
    });
    // console.log(json);
}


async function parseJson(data) {
    for(protest of data) {
        // console.log(stateInfo[protest['ADMIN1']])
        console.log(data.indexOf(protest))
        if(!stateInfo[protest['ADMIN1']]) {
            stateInfo[protest['ADMIN1']] = {
                protests: 1,
                causes: {},
                types: {},
                fatalities: parseInt(protest['FATALITIES'])
            }
            try {
                if(stateInfo[protest['ADMIN1']]['causes'][protest['ACTOR1']] == undefined) {
                    stateInfo[protest['ADMIN1']]['causes'][protest['ACTOR1']] = 1;
                } else {
                    stateInfo[protest['ADMIN1']]['causes'][protest['ACTOR1']] += 1;
                }
            } catch(e) {
                stateInfo[protest['ADMIN1']]['causes'][protest['ACTOR1']] = 1;
    
            }
                
            try {
                if(stateInfo[protest['ADMIN1']]['types'][protest['SUB_EVENT_TYPE']] == undefined) {
                    stateInfo[protest['ADMIN1']]['types'][protest['SUB_EVENT_TYPE']] = 1;
                } else {
                    stateInfo[protest['ADMIN1']]['types'][protest['SUB_EVENT_TYPE']] += 1;
                }
            } catch(e) {
                stateInfo[protest['ADMIN1']]['types'][protest['SUB_EVENT_TYPE']] = 1;
    
            }
        } else {
            stateInfo[protest['ADMIN1']]['protests'] += 1;
            stateInfo[protest['ADMIN1']]['fatalities'] += parseInt(protest['FATALITIES']);
            try {
                if(stateInfo[protest['ADMIN1']]['causes'][protest['ACTOR1']] == undefined) {
                    stateInfo[protest['ADMIN1']]['causes'][protest['ACTOR1']] = 1;
                } else {
                    stateInfo[protest['ADMIN1']]['causes'][protest['ACTOR1']] += 1;
                }
            } catch(e) {
                stateInfo[protest['ADMIN1']]['causes'][protest['ACTOR1']] = 1;
    
            }
                
            try {
                if(stateInfo[protest['ADMIN1']]['types'][protest['SUB_EVENT_TYPE']] == undefined) {
                    stateInfo[protest['ADMIN1']]['types'][protest['SUB_EVENT_TYPE']] = 1;
                } else {
                    stateInfo[protest['ADMIN1']]['types'][protest['SUB_EVENT_TYPE']] += 1;
                }
            } catch(e) {
                stateInfo[protest['ADMIN1']]['types'][protest['SUB_EVENT_TYPE']] = 1;
    
            }
        }
        
        

    }
    
    console.log(stateInfo);
    fs.writeFileSync('data.json', JSON.stringify(stateInfo, null, 2))
}



readData();