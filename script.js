// Encapsulates state of the board 
const board = (() => {
    let selections = Array.from(' '.repeat(9))
    const get = () => selections
    const change = (char, index) => {
        // Verify within range of board's array
        if (index < 0 || index > 8) return false
        // Verify selection has not already been selected
        if (selections[index] !== ' ') return false
        selections[index] = char
        return true
    }
    return {get, change}
})()

const Player = (name, char) => {
    return {name, char}
}

const AI = (name, char, difficulty) => {
    const choose = () => {
        let index = null
        switch (difficulty) {
            default:
                index = random()
        }
        return index
    }
const random = () => {
        if (board.get().filter(s => s === ' ').length === 0) return -1
        let index = 0
        let selection = false
        while (selection === false) {
            index = Math.floor(Math.random() * 9)
            selection = (board.get()[index] === ' ')
        }
        return index
    } 
    return {name, char, choose}
}

// Controls player's turns, populating the board, and determines winner of game
const controller = (() => {
    const write = (player, index) => {
        // Verify within range of board's array
        if (index < 0 || index > 8) return false
        // Verify selection has not already been selected
        if (board.get()[index] !== ' ') return false
        board.change(player.char, index)
        return true
    }
    
    const show = () => {
        return board.get()
    }

    const winner = (player) => {
        const char = player.char
        const arr = board.get()
        if (arr[0] === char && arr[1] === char && arr[2] === char) return true
        if (arr[0] === char && arr[3] === char && arr[6] === char) return true
        if (arr[0] === char && arr[4] === char && arr[8] === char) return true
        if (arr[1] === char && arr[4] === char && arr[7] === char) return true
        if (arr[2] === char && arr[4] === char && arr[6] === char) return true
        if (arr[2] === char && arr[5] === char && arr[8] === char) return true
        if (arr[3] === char && arr[4] === char && arr[5] === char) return true
        if (arr[6] === char && arr[7] === char && arr[8] === char) return true
        return false
    }
    return {write, show, winner}
})()

const UI = (() => {
    const selectionDivs = document.querySelectorAll('.selection')
    selectionDivs.forEach(item => {
        item.addEventListener('click', e => {
            // End function if user makes an invalid selection
            if (!controller.write(player, e.target.id)) return
            if (controller.winner(player)) {
                alert(`${player.name} has won, ${ai.name} has been defeated`)
                return
            }           
            controller.write(ai, ai.choose())
            if (controller.winner(ai)) {
                alert(`${ai.name} has won, ${player.name} has been defeated`)
                return
            }
            display()
        })
    })
    const display = () => {
        // Check if unequal amount of selections in html and board array
        if (selectionDivs.length !== board.get().length) return
        selectionDivs.forEach((item, index) => {
            item.innerHTML = `<p>${board.get()[index]}</p>`
        })
    }
    display()
    return {display}
})()

// TODO: Receive user input to determine player `name` and `char`
const player = Player('Dave', 'X')
const ai = AI('Hal', 'O', 'easy')

