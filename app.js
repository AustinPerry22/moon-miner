let clickUpgrades = [
    {
        name: 'clickUpgrade1',
        price: 25,
        quantity: 0,
        multiplier: 1
    },
    {
        name: 'clickUpgrade2',
        price: 50,
        quantity: 0,
        multiplier: 3
    }
]

let autoUpgrades = [
    {
        name: 'autoUpgrade1',
        price: 100,
        quantity: 0,
        multiplier: 1
    },
    {
        name: 'autoUpgrade2',
        price: 250,
        quantity: 0,
        multiplier: 5
    }
]

let gold = 9999
let goldCollected = 0
let clickTotal = 1
let autoTotal = 0

function mine() {
    clickTotalCalc()
    goldCollected += clickTotal
    gold += clickTotal
    update()
}

function clickTotalCalc() {
    clickTotal = 1
    clickUpgrades.forEach((upgrade) => {
        clickTotal += (upgrade.multiplier * upgrade.quantity)
    })
}

function collectAuto() {
    autoTotalCalc()
    gold += autoTotal
    goldCollected += autoTotal
    update()
}

function autoTotalCalc() {
    autoTotal = 0
    autoUpgrades.forEach((upgrade) => {
        autoTotal += (upgrade.multiplier * upgrade.quantity)
    })
}

function buyClick(upgrade) {
    clickUpgrades.forEach((clickUpgrade) => {
        if (clickUpgrade.name == upgrade) {
            if (gold >= clickUpgrade.price) {
                clickUpgrade.quantity++
                gold -= clickUpgrade.price
                clickUpgrade.price += Math.floor(clickUpgrade.price * .1)
                clickTotalCalc()
                update()
                console.log("bought")
            }
        }
    })
}

function buyAuto(upgrade) {
    autoUpgrades.forEach((autoUpgrade) => {
        if (autoUpgrade.name == upgrade) {
            if (gold >= autoUpgrade.price) {
                autoUpgrade.quantity++
                gold -= autoUpgrade.price
                autoUpgrade.price += Math.floor(autoUpgrade.price * .2)
                autoTotalCalc()
                update()
                console.log("bought")
            }
        }
    })
}

function update() {
    let goldElem = document.getElementById('goldCount')
    goldElem.innerText = 'Current Gold: ' + gold

    let goldCollectedElem = document.getElementById('goldCollected')
    goldCollectedElem.innerText = 'Total Gold Collected: ' + goldCollected

    let clickTotalElem = document.getElementById('clickTotal')
    clickTotalElem.innerText = 'Click Total: ' + clickTotal

    let autoTotalElem = document.getElementById('autoTotal')
    autoTotalElem.innerText = 'Auto Total: ' + autoTotal

    clickUpgrades.forEach((upgrade) => {
        let clickElem = document.getElementById(upgrade.name)
        clickElem.innerText = `Owned: ${upgrade.quantity} | Price: ${upgrade.price}`
    })
    autoUpgrades.forEach((upgrade) => {
        let autoElem = document.getElementById(upgrade.name)
        autoElem.innerText = `Owned: ${upgrade.quantity} | Price: ${upgrade.price}`
    })

    disableButtons()
}

function disableButtons() {
    debugger
    let buttons = document.getElementsByClassName("btn")
    for (let i = 0; i < buttons.length; i++) {
        //if cant afford then disable
        //else enable
        let clickUpgrade = []
        let autoUpgrade = []
        let clickOrAuto = ''
        let button = document.getElementById(buttons[i].id)
        clickUpgrade = clickUpgrades.filter((clickUpgrade) => clickUpgrade.name == button.id)
        autoUpgrade = autoUpgrades.filter((autoUpgrade) => autoUpgrade.name == button.id)
        if (clickUpgrade) {
            clickOrAuto = 'Click'
        } else {
            clickOrAuto = 'Auto'
        }
        if (clickUpgrade[0].price > gold || autoUpgrade[0].price > gold) {
            button.innerHTML = `<button class="btn btn-dark" onclick="buy${clickOrAuto
                } ('${button.id}')">buy ${button.id}</button>`
        } else {
            button.innerHTML = `<button class="btn btn-dark" onclick="buy${clickOrAuto
                } ('${button.id}')"disabled="true">buy ${button.id}</button>`
        }
    }
}

setInterval(collectAuto, 3000)

update()