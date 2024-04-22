import './style.css';
import {initializeApp} from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";

//Firebase's configuration data
const firebaseConfig = {
    databaseURL: "https://uhf-rfid-d9cd6-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig); //Initialize Firebase API


//Asynchronously get RFID tag sensor values from Firebase's Realtime Database and display onto webpage
async function displayRFIDTagData(main){
    const sensorCodeDiv = document.createElement('div');
    const tagRSSIDiv = document.createElement('div');
    const tagEPCDiv =document.createElement('div');

    sensorCodeDiv.setAttribute('id', 'sensorcode-div');
    tagRSSIDiv.setAttribute('id', 'tagRSSI-div');
    tagEPCDiv.setAttribute('id', 'tagEPC-div');

    const sensorCodeTitleDiv = document.createElement('div');
    const tagRSSITitleDiv = document.createElement('div');
    const tagEPCTitleDiv = document.createElement('div');

    sensorCodeTitleDiv.setAttribute('id', 'sensorcode-title');
    tagRSSITitleDiv.setAttribute('id', 'tagRSSI-title');
    tagEPCTitleDiv.setAttribute('id', 'tagEPC-title');
    sensorCodeTitleDiv.innerText = 'Sensor Code:';
    tagRSSITitleDiv.innerText = 'Tag RSSI:';
    tagEPCTitleDiv.innerText = 'Tag EPC:';

    sensorCodeDiv.appendChild(sensorCodeTitleDiv);
    tagRSSIDiv.appendChild(tagRSSITitleDiv);
    tagEPCDiv.appendChild(tagEPCTitleDiv);

    const sensorCodeResultsDiv = document.createElement('div');
    const tagRSSIResultsDiv = document.createElement('div');
    const tagEPCResultsDiv = document.createElement('div');
    sensorCodeResultsDiv.setAttribute('id', 'sensorcode-results');
    tagRSSIResultsDiv.setAttribute('id', 'tagRSSI-results');
    tagEPCResultsDiv.setAttribute('id', 'tagEPC-results');

    sensorCodeDiv.appendChild(sensorCodeResultsDiv);
    tagRSSIDiv.appendChild(tagRSSIResultsDiv);
    tagEPCDiv.appendChild(tagEPCResultsDiv);

    try{
        const database = await getDatabase(app);
            const reference = ref(database, 'RFID');
            onValue(reference, (snapshot) => {
                const tagData = snapshot.val();
                const sensorCode = tagData["Sensor Code"];
                const tagRSSI = tagData["Tag RSSI"];
                const tagEPC = tagData["Tag EPC"];
                console.log(`Sensor Code: ${sensorCode}`);
                console.log(`RSSI: ${tagRSSI}`);
                console.log(`Tag EPC: ${tagEPC}`);
                sensorCodeResultsDiv.innerText = `${sensorCode}`;
                tagRSSIResultsDiv.innerText = `${tagRSSI} dBm`;
                tagEPCResultsDiv.innerText = `${tagEPC}`;
            });

        main.appendChild(sensorCodeDiv);
        main.appendChild(tagRSSIDiv);
        main.appendChild(tagEPCDiv);
    } catch (error){
        console.log(error);
    }
}

//Create Web App layout
function displayWebPage(){
    const headings = document.createElement('div');
    const main = document.createElement('div');
    headings.setAttribute('class', 'headings');
    main.setAttribute('class', 'main');

    const mainTitle = document.createElement('div');
    const subTitle = document.createElement('div');
    mainTitle.setAttribute('id', 'main');
    subTitle.setAttribute('id', 'sub-title');
    mainTitle.innerText = 'UHF RFID AC Current Sensing System';
    subTitle.innerText = 'By Marlon Blackman';

    headings.appendChild(mainTitle);
    headings.appendChild(subTitle);

    displayRFIDTagData(main);

    document.body.appendChild(headings);
    document.body.appendChild(main);
}

displayWebPage();
