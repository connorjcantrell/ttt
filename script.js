const Player = (name, char) => {
    return {name, char}
}

const AI = (name, char, difficulty) => {
    const makeSelection = (board) => {
        let index = null
        switch (difficulty) {
            default:
                index = easySelect(board)
        }
        return index
    }
    const easySelect = () => {
        if (board.get().filter(s => s === ' ').length === 0) return -1
        let index = 0
        let selection = false
        while (selection === false) {
            index = Math.floor(Math.random() * 9)
            selection = (board.get()[index] === ' ')
        }
        return index
    } 
    return {name, char, difficulty, makeSelection}
}

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

    const isWinner = (player) => {
        const char = player.char
        if (board[0] === char && board[1] === char && board[2] === char) return true
        if (board[0] === char && board[3] === char && board[6] === char) return true
        if (board[0] === char && board[4] === char && board[8] === char) return true
        if (board[1] === char && board[4] === char && board[7] === char) return true
        if (board[2] === char && board[4] === char && board[6] === char) return true
        if (board[2] === char && board[5] === char && board[7] === char) return true
        if (board[3] === char && board[4] === char && board[5] === char) return true
        if (board[6] === char && board[7] === char && board[8] === char) return true
        return false
    }
    return {write, show, isWinner}
})()

const UI = (() => {
    const selectionDivs = document.querySelectorAll('.selection')
    const display = () => {
        selectionDivs.forEach((item, index) => {
            item.innerHTML = `<p>${board.get()[index]}</p>`
        })
    }
    return {display}
})()

// TODO: Receive user input to determine player `name` and `char`
const player = Player('Dave', 'X')
const ai = AI('Hal', 'O', 'easy')

// Test
controller.write(ai, ai.makeSelection(board))
controller.write(player, ai.makeSelection(board))
controller.write(ai, ai.makeSelection(board))
controller.write(player, ai.makeSelection(board))
controller.write(ai, ai.makeSelection(board))
controller.write(player, ai.makeSelection(board))
controller.write(ai, ai.makeSelection(board))
controller.write(player, ai.makeSelection(board))
controller.write(ai, ai.makeSelection(board))
UI.display()
