// TODO: displayController- Module Pattern


const Player = (name, char) => {
    return {name, char}
}

// TODO: Receive user input to determine player `name` and `char`
const player1 = Player('User', 'X')
const player2 = Player('Computer', 'O')


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
    // TODO: Control players turn

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


controller.write(player1, 0)
controller.write(player1, 1)
controller.write(player1, 2)
controller.isWinner(player1)
