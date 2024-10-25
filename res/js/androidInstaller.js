let webusb = null;
let adb = null;
const statusText = document.getElementById("status_text");

async function init() {
    return await Adb.open("WebUSB");
}

async function connectDevice(webusb) {
    console.log(webusb);
    if (webusb.isAdb()) {
        try {
            let adb = await webusb.connectAdb("host::", alert("Please check the screen of your " + webusb.device.productName + "."));
            return adb;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

async function runShell(adb, command) {
    try {
        let shell = await adb.shell(command);
        let output = await shell.receive();
        console.log(output);
        let readable = new TextDecoder().decode(output.data);
        console.log(readable);
        return readable;
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function installApk(adb, apk) {
    try {
        statusText.innerText = "Pushing APK to device...";
        var sync = await adb.sync();
        console.log(sync);
        let start = Date.now();
        await sync.push(apk, "/data/local/tmp/pebble-4.4.3.apk", "0644");
        statusText.innerText = "APK pushed! (Took " + (Date.now() - start) + "ms)";
        console.log("Pushed in " + (Date.now() - start) + "ms");
        start = Date.now();
        statusText.innerText = "Installing APK...";
        await runShell(adb, "pm install --bypass-low-target-sdk-block /data/local/tmp/pebble-4.4.3.apk");
        console.log("Installed in " + (Date.now() - start) + "ms");
        statusText.innerText = "APK installed! (Took " + (Date.now() - start) + "ms)";
        sync = null;
        statusText.innerText = "Opening Pebble app...";
        await runShell(adb, "monkey -p com.getpebble.android.basalt -c android.intent.category.LAUNCHER 1");
        statusText.innerText = "All Done!";
        return;
    } catch (e) {
        console.error(e);
        statusText.innerText = "Failed to install APK! " + e;
        alert("Failed to install! Please try the manual installation method. If that doesn't work, please send a message at https://rebble.io/discord.");
    }
}

async function downloadApk() {
    statusText.innerText = "Downloading APK from binaries.rebble.io...";
    try {
        let response = await fetch("https://cors-anywhere.herokuapp.com/" + "https://binaries.rebble.io/apks/pebble-4.4.3.apk", {
            method: "GET",
            headers: {
                "Content-Type": "application/vnd.android.package-archive",
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let blob = await response.blob();
        console.log(blob);
        statusText.innerText = "APK downloaded!";
        return blob;
    } catch (e) {
        statusText.innerText = "Failed to download APK! " + e;
        console.error(e);
        throw e;
    }
}

async function install() {
    let apk = null;
    try {
        apk = await downloadApk();
    } catch (e) {
        console.error(e);
        return;
    }
    console.log(adb);
    await installApk(adb, apk);
    console.log("Done!");
    nextStep();
}


function nextStep() {
    const currentStep = document.querySelector('.active');
    currentStep.classList.add('completed');
    const nextStep = currentStep.nextElementSibling.nextElementSibling;
    console.log(nextStep);
    if (nextStep) {
        nextStep.classList.remove('upcoming');
        nextStep.classList.remove('inactive');
        currentStep.classList.add('inactive');
        nextStep.classList.add('active');
        nextStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.getElementById("connect").onclick=async() => {
    webusb = await init();
    adb = await connectDevice(webusb);
    nextStep();
};

document.getElementById("install").onclick=async() => {
    await install();
};