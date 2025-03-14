// Enhanced ASCII art for different states with animation frames
const ASCII_ART = {
    IDLE: [
        // Frame 1
        [
            '     /\\_/\\     ',
            '    (• ω •)    ',
            '    > ^ <      ',
            '   /     \\     ',
            '               ',
            '     meow~     '
        ],
        // Frame 2
        [
            '     /\\_/\\     ',
            '    (• ω •)    ',
            '    > ~ <      ',
            '   /     \\     ',
            '               ',
            '     mew~      '
        ],
        // Frame 3
        [
            '     /\\_/\\     ',
            '    (• ω -)    ',
            '    > ^ <      ',
            '   /     \\     ',
            '       z       ',
            '               '
        ],
        // Frame 4
        [
            '     /\\_/\\     ',
            '    (- ω •)    ',
            '    > ^ <      ',
            '   /     \\     ',
            '      z        ',
            '               '
        ],
        // Frame 5
        [
            '     /\\_/\\     ',
            '    (• ω •)    ',
            '    > ^ <      ',
            '   /     \\~    ',
            '               ',
            '               '
        ],
        // Frame 6
        [
            '     /\\_/\\     ',
            '    (• ω •)    ',
            '    > ^ <      ',
            '   ~\\     \\    ',
            '               ',
            '               '
        ]
    ],
    EATING: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (• ω •)     ',
            '    > ^ <  🍔   ',
            '   /     \\      ',
            '                ',
            '   *sniff*      '
        ],
        // Frame 2
        [
            '     /\\_/\\      ',
            '    (• ω •)     ',
            '    > O <       ',
            '   /     \\      ',
            '     nom        ',
            '                '
        ],
        // Frame 3
        [
            '     /\\_/\\      ',
            '    (• ω •)     ',
            '    > ~ <   🍔  ',
            '   /     \\      ',
            '    nomnom      ',
            '                '
        ],
        // Frame 4
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '   *chomp*      ',
            '     nom!       '
        ],
        // Frame 5
        [
            '     /\\_/\\      ',
            '    (• ω •)     ',
            '    > O <  🍔   ',
            '   /     \\      ',
            '   *munch*      ',
            '                '
        ],
        // Frame 6
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '     yum        ',
            '    *burp*      '
        ]
    ],
    PLAYING: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '      \\ /       ',
            '     / \\        ',
            '     \\o/        ',
            '    wheee!      '
        ],
        // Frame 2
        [
            '       /\\_/\\    ',
            '      (^ ω ^)   ',
            '        \\ /     ',
            '       / \\      ',
            '       ~🧶~     ',
            '    bounce!     '
        ],
        // Frame 3
        [
            '   \\/\\_/\\       ',
            '  (^ ω ^)       ',
            '    \\ /         ',
            '   / \\          ',
            '     🧶~        ',
            '    zoom!       '
        ],
        // Frame 4
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '      / \\       ',
            '     /   \\      ',
            '   🧶           ',
            '    yippee!     '
        ],
        // Frame 5
        [
            '    /\\_/\\       ',
            '   (^ ω ^)      ',
            '     \\ /        ',
            '     / \\        ',
            '        🧶      ',
            '    woohoo!     '
        ],
        // Frame 6
        [
            '      /\\_/\\     ',
            '     (^ ω ^)    ',
            '       | |      ',
            '      /   \\     ',
            '     🧶          ',
            '   *pounce*     '
        ]
    ],
    SLEEPING: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (- ω -)     ',
            '    > z z <     ',
            '   U      U     ',
            '     ZzzZz      ',
            '                '
        ],
        // Frame 2
        [
            '     /\\_/\\      ',
            '    (- ω -)     ',
            '    > Z z <     ',
            '   U      U     ',
            '      zZz       ',
            '                '
        ],
        // Frame 3
        [
            '     /\\_/\\      ',
            '    (- ω -)     ',
            '    > z Z <     ',
            '   U      U     ',
            '     Zzzz       ',
            '                '
        ],
        // Frame 4
        [
            '     /\\_/\\      ',
            '    (- ω -)     ',
            '    > Z Z <     ',
            '   U      U     ',
            '      zZzZ      ',
            '                '
        ],
        // Frame 5
        [
            '     /\\_/\\      ',
            '    (- ω -)     ',
            '    > z z <     ',
            '   U      U     ',
            '    *dream*     ',
            '      ZzZ       '
        ],
        // Frame 6
        [
            '     /\\_/\\      ',
            '    (- ω -)     ',
            '    > Z Z <     ',
            '   U      U     ',
            '   *snooze*     ',
            '      Zzz       '
        ]
    ],
    HAPPY: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '    > ^ <       ',
            '   /     \\      ',
            '    *purr*      ',
            '     meow~      '
        ],
        // Frame 2
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '     \\^/        ',
            '    /  \\        ',
            '   *purr~*      ',
            '     happy      '
        ],
        // Frame 3
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '       \\^/      ',
            '      /  \\      ',
            '    *purr~*     ',
            '   *wiggle*     '
        ],
        // Frame 4
        [
            '     /\\_/\\      ',
            '    (^ o ^)     ',
            '    > ^ <       ',
            '   /     \\      ',
            '   *purrr~*     ',
            '    *nuzzle*    '
        ],
        // Frame 5
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '    > ^ <       ',
            '  /       \\     ',
            '  \\_/\\_/\\_/     ',
            '    *purr*      '
        ],
        // Frame 6
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '    > ^ <       ',
            '   /     \\~     ',
            '  *purrrr*      ',
            '   *twitch*     '
        ]
    ],
    HUNGRY: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (• ω O)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '   *growl*      ',
            '     food?      '
        ],
        // Frame 2
        [
            '     /\\_/\\      ',
            '    (O ω •)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '  *rumble*      ',
            '    hungry      '
        ],
        // Frame 3
        [
            '     /\\_/\\      ',
            '    (• ω O)     ',
            '    > o <       ',
            '   /     \\      ',
            '  *stomach*     ',
            '   *growls*     '
        ],
        // Frame 4
        [
            '     /\\_/\\      ',
            '    (- ω -)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '    *sigh*      ',
            '    feed me     '
        ],
        // Frame 5
        [
            '     /\\_/\\      ',
            '    (> ω <)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '  *staaaare*    ',
            '    MEOW!       '
        ],
        // Frame 6
        [
            '     /\\_/\\      ',
            '    (u ω u)     ',
            '    > . <       ',
            '   /     \\      ',
            '    *pout*      ',
            '   so hungry    '
        ]
    ],
    TIRED: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (• ω •)     ',
            '    > - <       ',
            '   /     \\      ',
            '    *yawn*      ',
            '                '
        ],
        // Frame 2
        [
            '     /\\_/\\      ',
            '    (• ω •)     ',
            '    > O <       ',
            '   /     \\      ',
            '    *YAWN*      ',
            '    sleepy      '
        ],
        // Frame 3
        [
            '     /\\_/\\      ',
            '    (- ω •)     ',
            '    > - <       ',
            '   /     \\      ',
            '    *tired*     ',
            '      zzz       '
        ],
        // Frame 4
        [
            '     /\\_/\\      ',
            '    (• ω -)     ',
            '    > - <       ',
            '   /     \\      ',
            '    *sleepy*    ',
            '     *yawn*     '
        ],
        // Frame 5
        [
            '     /\\_/\\      ',
            '    (• ω •)     ',
            '    > - <       ',
            '   /     \\      ',
            '    *blink*     ',
            '      zzz       '
        ],
        // Frame 6
        [
            '     /\\_/\\      ',
            '    (- ω -)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '   *droopy*     ',
            '    *yawn*      '
        ]
    ],
    BORED: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (u ω u)     ',
            '    > . <       ',
            '   /     \\      ',
            '     *sigh*     ',
            '    anything?   '
        ],
        // Frame 2
        [
            '     /\\_/\\      ',
            '    (u ω u)     ',
            '    > , <       ',
            '   /     \\      ',
            '     bored      ',
            '    *fidget*    '
        ],
        // Frame 3
        [
            '     /\\_/\\      ',
            '    (- ω -)     ',
            '    > . <       ',
            '   /     \\      ',
            '     *hmph*     ',
            '   so boring    '
        ],
        // Frame 4
        [
            '     /\\_/\\      ',
            '    (u ω u)     ',
            '    > . <       ',
            '   /     \\      ',
            '     *yawn*     ',
            '    booored     '
        ],
        // Frame 5
        [
            '     /\\_/\\      ',
            '    (- _ -)     ',
            '    > , <       ',
            '   /     \\      ',
            '   *stretch*    ',
            '    nothing     '
        ],
        // Frame 6
        [
            '     /\\_/\\      ',
            '    (u _ u)     ',
            '    > . <       ',
            '   /     \\      ',
            '    *paws*      ',
            '     dull       '
        ]
    ],
    DIRTY: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (> _ <)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '     *ick*      ',
            '    ewwww       '
        ],
        // Frame 2
        [
            '     /\\_/\\      ',
            '    (> _ <)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '     *ew*       ',
            '    *shake*     '
        ],
        // Frame 3
        [
            '     /\\_/\\      ',
            '    (x _ x)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '     *dirt*     ',
            '    *sneeze*    '
        ],
        // Frame 4
        [
            '     /\\_/\\      ',
            '    (> _ <)     ',
            '    > * <       ',
            '   /     \\      ',
            '    *cough*     ',
            '    *achoo*     '
        ],
        // Frame 5
        [
            '     /\\_/\\      ',
            '    (T _ T)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '     *mud*      ',
            '    *shiver*    '
        ],
        // Frame 6
        [
            '     /\\_/\\      ',
            '    (> _ <)     ',
            '    > * <       ',
            '   /     \\      ',
            '     *gross*    ',
            '     *pout*     '
        ]
    ],
    CLEANING: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (• ω •)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '    *splash*    ',
            '      ~~~       '
        ],
        // Frame 2
        [
            '     /\\_/\\      ',
            '    (• ω •)~    ',
            '    > ~ <       ',
            '   /     \\      ',
            '    *scrub*     ',
            '     ~~~~~      '
        ],
        // Frame 3
        [
            '     /\\_/\\      ',
            '   ~(• ω •)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '    *rinse*     ',
            '      ~~~~      '
        ],
        // Frame 4
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '    *clean!*    ',
            '     *dry*      '
        ],
        // Frame 5
        [
            '     /\\_/\\      ',
            '    (• ω •)~~~  ',
            '    > ~ <       ',
            '   /     \\      ',
            '    *bubbles*   ',
            '      ~~~       '
        ],
        // Frame 6
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '    > ~ <       ',
            '   /     \\      ',
            '    *groom*     ',
            '     *shine*    '
        ]
    ],
    PLAYFUL: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (• ω •)     ',
            '    > ^ <       ',
            '   /     \\~     ',
            '     *tail*     ',
            '    *wiggle*    '
        ],
        // Frame 2
        [
            '     ^/\\_/\\     ',
            '    (  • ω •)   ',
            '     > ^ <      ',
            '    /     \\     ',
            '    *alert*     ',
            '    *ready*     '
        ],
        // Frame 3
        [
            '     /\\_/\\|     ',
            '    (^ ω ^)     ',
            '     > o <      ',
            '   _/     \\     ',
            '    *paws*      ',
            '    *swipe*     '
        ],
        // Frame 4
        [
            '    |/\\_/\\      ',
            '    (^ ω ^)     ',
            '    > o <       ',
            '    /     \\_    ',
            '   *stalking*   ',
            '   *crouched*   '
        ],
        // Frame 5
        [
            '     /\\_/\\      ',
            '    (^ o ^)     ',
            '    > w <       ',
            '   /     \\      ',
            '   *excited*    ',
            '  *tail wag*    '
        ],
        // Frame 6
        [
            '       /\\_/\\    ',
            '      (> w <)   ',
            '      > ^ <     ',
            '     /     \\    ',
            '   *pouncing*   ',
            '   *attacking*  '
        ]
    ],
    RELAXED: [
        // Frame 1
        [
            '    __/\\_/\\__   ',
            '   (  • ω •  )  ',
            '    > ~ <       ',
            '     U    U     ',
            '    *lounge*    ',
            '   *relaxed*    '
        ],
        // Frame 2
        [
            '    __/\\_/\\__   ',
            '   (  ^ ω ^  )  ',
            '    > ~ <       ',
            '     U    U     ',
            '    *comfy*     ',
            '    *sunny*     '
        ],
        // Frame 3
        [
            '    __/\\_/\\__   ',
            '   (  u ω u  )  ',
            '    > ~ <       ',
            '     U    U     ',
            '    *sunspot*   ',
            '    *warm*      '
        ],
        // Frame 4
        [
            '    __/\\_/\\__   ',
            '   (  - ω -  )  ',
            '    > ~ <       ',
            '     U    U     ',
            '    *cozy*      ',
            '    *comfy*     '
        ],
        // Frame 5
        [
            '    __/\\_/\\__   ',
            '   (  ^ ω ^  )  ',
            '    > ~ <       ',
            '     U    U     ',
            '    *basking*   ',
            '    *bliss*     '
        ],
        // Frame 6
        [
            '    __/\\_/\\__   ',
            '   (  • ω •  )  ',
            '    > ~ <       ',
            '     U    U     ',
            '    *dozing*    ',
            '    *chill*     '
        ]
    ],
    // FOLLOWING_MOUSE state - curious pet following the cursor
    FOLLOWING_MOUSE: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (o ω o)     ',
            '    > ^ <       ',
            '   /     \\      ',
            '    *track*     ',
            '    *follow*    '
        ],
        // Frame 2
        [
            '     /\\_/\\      ',
            '    (o ω o)---> ',
            '    > ^ <       ',
            '   /     \\      ',
            '   *curious*    ',
            '    *stalk*     '
        ],
        // Frame 3
        [
            '     /\\_/\\      ',
            '    (> ω <)     ',
            '    > ^ <       ',
            '   /     \\      ',
            '   *spotted*    ',
            '     *peek*     '
        ],
        // Frame 4
        [
            '     /\\_/\\      ',
            ' <---(o ω o)    ',
            '    > ^ <       ',
            '   /     \\      ',
            '   *watching*   ',
            '     *hunt*     '
        ],
        // Frame 5
        [
            '     /\\_/\\      ',
            '    (o ω o)     ',
            '    > ^ <       ',
            '   /     \\      ',
            '    *follow*    ',
            '    *sneak*     '
        ],
        // Frame 6
        [
            '     /\\_/\\      ',
            '    (O ω O)     ',
            '    > ^ <       ',
            '   /     \\      ',
            '   *fixated*    ',
            '   *focused*    '
        ]
    ],
    PLAYING_WITH_MOUSE: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (^ ω ^)~~~  ',
            '      \\ /       ',
            '     / \\        ',
            '    *swipe*     ',
            '     *paw*      '
        ],
        // Frame 2
        [
            '     /\\_/\\      ',
            '  ~~~(^ ω ^)    ',
            '      / \\       ',
            '     \\ /        ',
            '    *swat*      ',
            '    *batting*   '
        ],
        // Frame 3
        [
            '     /\\_/\\      ',
            '    (> ω <)~~~  ',
            '      \\ /       ',
            '     / \\        ',
            '   *pounce*     ',
            '    *chase*     '
        ],
        // Frame 4
        [
            '     /\\_/\\      ',
            '  ~~~(> ω <)    ',
            '      / \\       ',
            '     \\ /        ',
            '    *tackle*    ',
            '   *wrestle*    '
        ],
        // Frame 5
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '    > ^ <       ',
            '   /~~~~~\\      ',
            '   *playtime*   ',
            '    *excited*   '
        ],
        // Frame 6
        [
            '     /\\_/\\      ',
            '    (^ ω ^)     ',
            '    > ^ <       ',
            '   /     \\      ',
            '     *tap*      ',
            '   *playful*    '
        ]
    ],
    SURPRISED: [
        // Frame 1
        [
            '     /\\_/\\      ',
            '    (O ω O)     ',
            '    > ! <       ',
            '   /     \\      ',
            '   *shocked*    ',
            '    *gasp*      '
        ],
        // Frame 2
        [
            '     /\\_/\\      ',
            '    (O ω O)!    ',
            '    > ! <       ',
            '   /     \\      ',
            '  *surprised*   ',
            '     !!!        '
        ],
        // Frame 3
        [
            '     /\\_/\\      ',
            '    (O_O)       ',
            '    > ! <       ',
            '   /     \\      ',
            '    *alarm*     ',
            '     *!*        '
        ],
        // Frame 4
        [
            '     /\\_/\\      ',
            '    (O ω O)     ',
            '    > ! <       ',
            '   /     \\      ',
            '    *freeze*    ',
            '   *startled*   '
        ],
        // Frame 5
        [
            '     /\\_/\\      ',
            '   !(O ω O)     ',
            '    > ! <       ',
            '   /     \\      ',
            '   *spooked*    ',
            '     *wow*      '
        ],
        // Frame 6
        [
            '     /\\_/\\      ',
            '    (O_O)!      ',
            '    > ! <       ',
            '   /     \\      ',
            '  *wide-eyed*   ',
            '    *alert*     '
        ]
    ]
};

// Export the ASCII art
export default ASCII_ART;