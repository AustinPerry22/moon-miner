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




let gold = 999
let clickTotal = 1
let autoTotal = 0

function mine() {
    clickTotalCalc()
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
                autoTotalCalc()
                update()
                console.log("bought")
            }
        }
    })
}

function update() {
    let goldElem = document.getElementById('goldCount')
    goldElem.innerText = 'Gold: ' + gold

    let clickTotalElem = document.getElementById('clickTotal')
    clickTotalElem.innerText = 'Click Total: ' + clickTotal

    let autoTotalElem = document.getElementById('autoTotal')
    autoTotalElem.innerText = 'Auto Total: ' + autoTotal



    clickUpgrades.forEach((upgrade) => {
        let clickElem = document.getElementById(upgrade.name)
        clickElem.innerText = `${upgrade.name}: ${upgrade.quantity}`
    })
    autoUpgrades.forEach((upgrade) => {
        let autoElem = document.getElementById(upgrade.name)
        autoElem.innerText = `${upgrade.name}: ${upgrade.quantity}`
    })
}


setInterval(collectAuto, 3000)

update()