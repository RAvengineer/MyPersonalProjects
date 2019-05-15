w = 'Tic Tac Toe'
print(w.center(75, '*'))
match_no = s1 = s2 = d = 0

# Instructions:
print("\nPlayer 1 will be alloted 'X' \nand Player 2 will be alloted '0'")
print('Player 1 will play first and \nthe chance will be alternated, if you continue to play!')

n1 = n2 = ''
while n1 == '' and n2 == '':
    n1 = input('\nEnter your Name Player 1 : ')
    n2 = input('Enter your Name Player 2 : ')

t = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
print('\nThe Board will look like...')
for i in range(0, 3):
    for j in range(0, 3):
        print(t[i][j], end='  ')
    print('\n')

print('\nYou have to mark X or 0 using Row and Column numbers\nin the format:')
for i in range(1, 4):
    for j in range(1, 4):
        print('({},{})'.format(i, j), end='  ')
    print('\n')

while True:
    p1w = p2w = False
    if match_no % 2 == 0:
        p1 = n1
        p2 = n2
    else:
        p1 = n2
        p2 = n1
    t = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
    z = 0
    # The Game:
    for z in range(0, 9):
        # Formalities:
        if z % 2 == 0:
            v = 'X'
            if z == 0:
                print("\nLet's start with you, {}".format(p1))
            else:
                print("\nIt's your turn, {}".format(p1))
        else:
            v = '0'
            print("\nIt's your turn, {}".format(p2))
        # Ask the for which tile:
        while True:
            try:
                row = int(input('\nEnter the Row Number : '))
                col = int(input('\nEnter the Column Number : '))
            except ValueError:
                print('\nInvalid Input!')
                print('The Row and Column numbers can only be\nintegers between 1 and 3, including them.')
                print("Don't worry, you haven't lost your chance!   :)")
                continue
            m = row - 1
            n = col - 1
            if 0 < row < 4 and 0 < col < 4:
                if t[m][n] == '-':
                    break
                else:
                    print('\nYour desired input already has a value!')
                    print('Look for empty tiles in the Game Board above.')
                    print("Don't worry, you haven't lost your chance!   :)")
            else:
                print('\nInvalid Input!')
                print('The Row and Column numbers can only be\nintegers between 1 and 3, including them.')
                print("Don't worry, you haven't lost your chance!   :)")
        # Input:
        t[m][n] = v
        print('\nBoard : ')
        for i in range(0, 3):
            for j in range(0, 3):
                print(t[i][j], end='  ')
            print('\n')

        # The Refree :
        for i in range(0, 3):
            if t[i][1] == t[i][2] and t[i][0] == t[i][2] and t[i][1] == t[i][0] and t[i][1] != '-':
                if t[i][1] == 'X':
                    p1w = True
                    break
                else:
                    p2w = True
                    break
            if t[1][i] == t[2][i] and t[0][i] == t[2][i] and t[1][i] == t[0][i] and t[1][i] != '-':
                if t[1][i] == 'X':
                    p1w = True
                    break
                else:
                    p2w = True
                    break
        if p1w or p2w:
            break
        if t[0][0] == t[1][1] and t[0][0] == t[2][2] and t[2][2] == t[1][1] and t[0][0] != '-':
            if t[0][0] == 'X':
                p1w = True
                break
            else:
                p2w = True
                break
        if t[0][2] == t[1][1] and t[0][2] == t[2][0] and t[2][0] == t[1][1] and t[0][2] != '-':
            if t[2][0] == 'X':
                p1w = True
                break
            else:
                p2w = True
                break

    # Results
    print('\n\nResults : ')
    if match_no % 2 == 0:
        if p1w:
            print('Congrats {}, you WON the Match'.format(p1.upper()))
            s1 = s1 + 1
        elif p2w:
            print('Congrats {}, you WON the Match'.format(p2.upper()))
            s2 = s2 + 1
        else:
            print('Oh! It is a Draw!!!')
            d = d + 1
    else:
        if p1w:
            print('Congrats {}, you WON the Match'.format(p1.upper()))
            s2 = s2 + 1
        elif p2w:
            print('Congrats {}, you WON the Match'.format(p2.upper()))
            s1 = s1 + 1
        else:
            print('Oh! It is a Draw!!!')
            d = d + 1

    # The ScoreBoard:
    print('\nScore:\n{} : {}\t\t{} : {}\t\tDraw : {} '.format(n1, s1, n2, s2, d))

    # Wanna Play Again?
    print('\n\nDo you want to play again?')
    print('1. Yes\t\t2. No')
    while True:
        ch = int(input('Enter your option : '))
        if ch == 1 or ch == 2:
            break
        else:
            print('\nInvalid Input!')
            print('Please enter integer values i.e. either 1 or 2.\n')

    # Bored?...Np, Bye :)
    if ch == 2:
        print('')
        print(' Thank you  :) '.center(75, '#'))
        break
    else:
        match_no = match_no + 1
        print(' New Game '.center(75, 'O'))
