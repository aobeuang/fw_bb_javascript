function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkwait() {
    var cc = true;
    let count = 1;
    while (cc) {
        const overlay = document.getElementsByClassName('loading-modal--overlay');
        if (overlay.length == 0) {
            cc = false;
        }
        if (count >= 60) {
            const btn = document.getElementsByClassName('image-button close-modal');
            btn[0].click();
        }
        count++;
        await sleep(1000);
    }
}

async function setene(val) {
    await sleep(1000);
    try {
        localStorage.setItem('ene', `${val}`);
    } catch (err) {
        console.log(err);
    }

}

async function setE() {
    var val = prompt('0-100');
    await sleep(1000);
    try {
        localStorage.setItem('ene', `${val}`);
    } catch (err) {
        console.log(err);
    }

}

async function setR() {
    var val = prompt('0-100');
    await sleep(1000);
    try {
        localStorage.setItem('repa', `${val}`);
    } catch (err) {
        console.log(err);
    }

}

async function setrepa(val) {
    await sleep(1000);
    try {
        localStorage.setItem('repa', `${val}`);
    } catch (err) {
        console.log(err);
    }

}

async function mineDATA() {
    await checkwait();    
    var nameitem = document.getElementsByClassName('info-title-name')[0].outerText
    console.log(`Mine :${nameitem}`);
    if (!nameitem.includes('Member')) {
        await en();
        await repp();
    }

    try {
        var btn_Mine = document.getElementsByClassName('plain-button semi-short ');
        var time_run = document.getElementsByClassName('info-time');
        if (btn_Mine[0].textContent == 'Mine') {
            if (time_run[0].textContent == '00:00:00') {
                console.log(`Ready to Mine`);
                btn_Mine[0].click();
                await checkwait();
            }
        }
    } catch (err) {}
    try {
        var btn_Approve = document.getElementsByClassName('button-text');
        if (btn_Approve[0].textContent == 'Approve') {
            await sleep(6000);
            btn_Approve[0].click();
            await checkwait();
        }
    } catch (err) {}
    try {
        var btn_OOK = document.getElementsByClassName('plain-button short undefined');
        if (btn_OOK[0].textContent == 'OK') {
            btn_OOK[0].click();
            await checkwait();
        }
    } catch (err) {}
    

}
async function en() {
    await checkwait();
    try {
        var ennergy = document.getElementsByClassName('resource-number')[3].outerText.split(/\//);
        var maxen = parseInt(parseInt(ennergy[1]) / 3);
        const ene = localStorage.getItem('ene');
        var mid = parseInt(ennergy[0]) / parseInt(ennergy[1]) * 100;
        console.log(`You have ennergy (h/s/L) :${ennergy[0]} / ${mid}% / ${maxen}`);
        if (mid < ene) {
            var btn_pl = document.getElementsByClassName('resource-energy--plus')[0];
            var time_run = document.getElementsByClassName('info-time');
            if (time_run[0].textContent != '00:00:00') {
                await sleep(5000);
                btn_pl.click();
                await sleep(1000);
                var Repairitem = document.getElementsByClassName('image-button')[2];
                for (let index = 0; index < maxen; index++) {
                    Repairitem.click();
                }
                await sleep(1000);
                var Exch = document.getElementsByClassName('plain-button long')[0];
                Exch.click();
                console.log(`You Click refill energy`);
                await checkwait();
            }
        }
    } catch (err) {}
}
async function repp() {
    await checkwait();
    var repp = document.getElementsByClassName('card-number')[0].outerText.replace(/ /g, '').split(/\//);
    var percentre = parseInt(repp[0]) / parseInt(repp[1]) * 100;
    const repa = localStorage.getItem('repa');
    var nameitem = document.getElementsByClassName('info-title-name')[0].outerText
    console.log(`${nameitem} have percentre repair :${percentre}%`);
    if (percentre < repa) {
        try {
            var Repairitem = document.getElementsByClassName('plain-button semi-short')[1];
            if (Repairitem.textContent == 'Repair') {
                var time_runn = document.getElementsByClassName('info-time');
                if (time_runn[0].textContent != '00:00:00') {
                    Repairitem.click();
                    console.log(`You Repair success`);
                    await checkwait();
                }
            }
        } catch (err) {}
    }

}

async function start() {
    let count = 1;
    while (true) {
        await checkwait();
        console.log(`count Check : ${count}`);
        try {
            var alltool = document.getElementsByClassName('carousel__img--item');
            for (let i = 0; i < alltool.length; i++) {
                alltool[i].click();
                await sleep(1000);
                await mineDATA();
            }
            await sleep(5000);
        } catch (err) {}
        if (count >= 60) {
            window.location.reload();
        }
        count++;
        console.log('')
        await sleep(30000);

    }

}

async function config() {
    await sleep(1000);
    try {
        localStorage.setItem('ene', '50');
        localStorage.setItem('repa', '50');
        console.log(`Set ene repa frist time`);
    } catch (err) {
        console.log(err);
    }

}

async function login() {
    const ene = localStorage.hasOwnProperty('ene');
    const repa = localStorage.hasOwnProperty('repa');
    if (!ene || !repa) {
        await config();
        await sleep(1000);
    }
    var check = true;
    while (check) {
        await sleep(3000);
        const btn_login = document.getElementsByClassName('login-button');
        if (btn_login.length > 0) {
            for (const btn of btn_login) {
                if (btn.textContent == 'Login') {
                    btn.click();
                    console.log(`Login Wax wait.....`);
                }
            }
            await sleep(500);
            const login_wax = document.getElementsByClassName('login-button--text');
            for (const btn of login_wax) {
                if (btn.textContent == 'Wax Wallet Account') {
                    btn.click();
                    console.log(`Login Wax sucess`);
                }
            }
        } else {
            check = false;
            console.log(`No login`);
        }
        await checkwait();
    }
    await start();
}

login();
