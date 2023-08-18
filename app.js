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
        multiplier: 1
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
        multiplier: 1
    }
]




let gold = 0

function mine() {
    gold++
    update()
}

function update() {
    let goldElem = document.getElementById('goldCount')
    goldElem.innerText = 'Gold: ' + gold
}