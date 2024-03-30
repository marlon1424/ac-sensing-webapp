import './style.css';
import {initializeApp} from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";


const firebaseConfig = {
    databaseURL: "https://uhf-rfid-d9cd6-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);

async function getRfidData(){
    try{
        const database = await getDatabase(app);
        const reference = ref(database, 'RFID/Sensor Code');
        onValue(reference, (snapshot) => {
            const sensorcodeData = snapshot.val();
            console.log("Sensor Code: " + sensorcodeData);
        })
    } catch (error){
        console.log(error);
    }
}

getRfidData();