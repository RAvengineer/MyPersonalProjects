# <editor-fold defaultstate="collapsed" desc="Code Description">
"""
This is a pictorial solution of the famous old problem called 'Tower of Hanoi'
Tower of Hanoi is a mathematical puzzle where we have three rods and n disks.
The objective of the puzzle is to move the entire stack to another rod,
obeying the following simple rules:
1) Only one disk can be moved at a time.
2) Each move consists of taking the upper disk from one of the stacks
and placing it on top of another stack i.e. a disk can only be moved
if it is the uppermost disk on a stack.
3) No disk may be placed on top of a smaller disk.

The thing added is pictorial assistance of the modification done to the rods, which
effectively helps solving the problem.
I took the above said idea as a Personal Project.
The Rods with 3 disc is depicted as
   _|_   	    |    	    |
  __|__  	    |    	    |
 ___|___ 	    |    	    |
=========	=========	=========
    A           B           C

Author: Rahul Dilip Bera
Sources/References: https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/
"""
# </editor-fold>


# <editor-fold defaultstate="collapsed" desc="Print the Towers of Hanoi">
# Presentation
def towers(tower1, tower2, tower3):
    for i in range(1, n + 1):
        print(disc(tower1[-i]) + '\t' + disc(tower2[-i]) + '\t' + disc(tower3[-i]))
    print(('=' * (2 * n + 3) + '\t') * 3)


# </editor-fold>


# <editor-fold defaultstate="collapsed" desc="Print the disc">
def disc(length):
    return ' ' * (n - length + 1) + '_' * length + '|' + '_' * length + ' ' * (n - length + 1)


# </editor-fold>


# <editor-fold defaultstate="collapsed" desc="Return tower name... Actually, it's Show Off  ;P">
def return_tower_name(rod):
    if rod == A:
        return 'A'
    elif rod == B:
        return 'B'
    else:
        return 'C'


# </editor-fold>


# <editor-fold defaultstate="collapsed" desc="Move Disc and print the modified Towers">
def move_disc(num, f_rod, t_rod):
    global number_of_steps
    temp = f_rod[f_rod[0]]
    f_rod[f_rod[0]] = 0
    f_rod[0] -= 1
    t_rod[t_rod[0] + 1] = temp
    t_rod[0] += 1
    # print(A, B, C) For Testing stuff and debugging the code!
    towers(A, B, C)
    print('Step {}: '
          'Move Disc {} from rod {} to rod {}\n'
          .format(number_of_steps, num, return_tower_name(f_rod), return_tower_name(t_rod)))
    number_of_steps += 1
    return


# </editor-fold>


# <editor-fold defaultstate="collapsed" desc="The Code!">
def toh(number_of_discs, from_rod, to_rod, aux_rod):
    if number_of_discs == 1:
        move_disc(number_of_discs, from_rod, to_rod)
        return
    toh(number_of_discs - 1, from_rod, aux_rod, to_rod)
    move_disc(number_of_discs, from_rod, to_rod)
    toh(number_of_discs - 1, aux_rod, to_rod, from_rod)


# </editor-fold>


n = int(input('Enter the number of Disc(s): '))
number_of_steps = 1
# <editor-fold defaultstate="collapsed" desc="Initializing the rod lists A, B & C">
A = [n] + [x for x in range(n, 0, -1)]
"""
Here, A is storing the index of the last disc in the first element of the list.
And rest are the disc numbers!
Similarly, for the rods B and C, the first element is the index of the last disc i.e. Empty 
"""
B = [0] + [0] * n
C = [0] + [0] * n
# </editor-fold>
towers(A, B, C)
print("Initial setup")
toh(n, A, C, B)  # toh: Tower of Hanoi
