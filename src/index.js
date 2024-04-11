import './style.css';
import {initializeApp} from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";


const firebaseConfig = {
    databaseURL: "https://uhf-rfid-d9cd6-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);

async function displayRFIDTagData(main){
    const sensorCodeDiv = document.createElement('div');
    const tagRSSIDiv = document.createElement('div');

    sensorCodeDiv.setAttribute('id', 'sensorcode-div');
    tagRSSIDiv.setAttribute('id', 'tagRSSI-div');

    const sensorCodeTitleDiv = document.createElement('div');
    const tagRSSITitleDiv = document.createElement('div');
    sensorCodeTitleDiv.setAttribute('id', 'sensorcode-title');
    tagRSSITitleDiv.setAttribute('id', 'tagRSSI-title');
    sensorCodeTitleDiv.innerText = 'Sensor Code:';
    tagRSSITitleDiv.innerText = 'Tag RSSI:';

    sensorCodeDiv.appendChild(sensorCodeTitleDiv);
    tagRSSIDiv.appendChild(tagRSSITitleDiv);

    const sensorCodeResultsDiv = document.createElement('div');
    const tagRSSIResultsDiv = document.createElement('div');
    sensorCodeResultsDiv.setAttribute('id', 'sensorcode-results');
    tagRSSIResultsDiv.setAttribute('id', 'tagRSSI-results');

    sensorCodeDiv.appendChild(sensorCodeResultsDiv);
    tagRSSIDiv.appendChild(tagRSSIResultsDiv);

    try{
        const database = await getDatabase(app);
            const reference = ref(database, 'RFID');
            onValue(reference, (snapshot) => {
                const tagData = snapshot.val();
                const sensorCode = tagData["Sensor Code"];
                const tagRSSI = tagData[" Tag RSSI"];
                console.log(`Sensor Code: ${sensorCode}`);
                console.log(`RSSI: ${tagRSSI}`);
                sensorCodeResultsDiv.innerText = `${sensorCode}`;
                tagRSSIResultsDiv.innerText = `${tagRSSI} dBm`;
            });

        main.appendChild(sensorCodeDiv);
        main.appendChild(tagRSSIDiv);
    } catch (error){
        console.log(error);
    }
}

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
