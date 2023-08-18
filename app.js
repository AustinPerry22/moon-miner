let clickUpgrades = [
    {
        name: 'clickUpgrade1',
        price: 15,
        quantity: 0,
        multiplier: 1,
        unlocked: false
    },
    {
        name: 'clickUpgrade2',
        price: 50,
        quantity: 0,
        multiplier: 3,
        unlocked: false
    },
    {
        name: 'clickUpgrade3',
        price: 200,
        quantity: 0,
        multiplier: 10,
        unlocked: false
    }
]

let autoUpgrades = [
    {
        name: 'autoUpgrade1',
        price: 50,
        quantity: 0,
        multiplier: 1,
        unlocked: false
    },
    {
        name: 'autoUpgrade2',
        price: 125,
        quantity: 0,
        multiplier: 3,
        unlocked: false
    },
    {
        name: 'autoUpgrade3',
        price: 350,
        quantity: 0,
        multiplier: 10,
        unlocked: false
    }
]

let gold = 0
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
                autoUpgrade.price += Math.floor(autoUpgrade.price * .1)
                autoTotalCalc()
                update()
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
    drawTrophies()
    unlockUpgrades()
    disableButtons()
}

function drawTrophies() {
    let trophy100 = document.getElementById("trophy100")
    let trophy100txt = document.getElementById("trophy100txt")
    let trophy1000 = document.getElementById("trophy1000")
    let trophy1000txt = document.getElementById("trophy1000txt")
    let trophy9999 = document.getElementById("trophy9999")
    let trophy9999txt = document.getElementById("trophy9999txt")
    if (goldCollected >= 100 && trophy100.classList.contains('hidden')) {
        trophy100.classList.remove('hidden')
        trophy100txt.innerText = "Got 100!"
    }
    if (goldCollected >= 1000 && trophy1000.classList.contains('hidden')) {
        trophy1000.classList.remove('hidden')
        trophy1000txt.innerText = "Got 1000!"
    }
    if (goldCollected >= 9999 && trophy9999.classList.contains('hidden')) {
        trophy9999.classList.remove('hidden')
        trophy9999txt.innerText = "Got 9999!"
    }
}

function unlockUpgrades() {
    clickUpgrades.forEach((upgrade => {
        if (upgrade.price <= gold) {
            upgrade.unlocked = true
        }
    }))
    autoUpgrades.forEach((upgrade) => {
        if (upgrade.price <= gold) {
            upgrade.unlocked = true
        }
    })
}

function disableButtons() {
    let buttons = document.getElementsByClassName("btn-div")
    for (let i = 0; i < buttons.length; i++) {
        let clickUpgrade = []
        let autoUpgrade = []
        let clickOrAuto = ''
        let clickAuto = null
        let button = document.getElementById(buttons[i].id)

        clickUpgrade = clickUpgrades.filter((clickUpgrade) => clickUpgrade.name + '-btn' == button.id)
        autoUpgrade = autoUpgrades.filter((autoUpgrade) => autoUpgrade.name + '-btn' == button.id)
        if (clickUpgrade[0]) {
            clickOrAuto = 'Click'
            clickAuto = clickUpgrade[0]
        } else {
            clickOrAuto = 'Auto'
            clickAuto = autoUpgrade[0]
        }
        if (clickAuto.price <= gold && clickAuto.unlocked == true) {
            button.innerHTML = `<button class="btn btn-dark" onclick="buy${clickOrAuto
                }('${button.id.replace("-btn", "")}')">buy ${button.id.replace("-btn", "")}</button>`
        } else if (clickAuto.unlocked == true) {
            button.innerHTML = `<button class="btn btn-dark" onclick="buy${clickOrAuto
                }('${button.id.replace("-btn", "")}')"disabled="true">buy ${button.id.replace("-btn", "")}</button>`
        }
    }
}

setInterval(collectAuto, 1000)

update()