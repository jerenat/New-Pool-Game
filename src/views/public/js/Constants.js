const CONSTANTS = {
    ballsParams: [
        [new Vector2(1022, 413), COLOR.YELLOW], // 1
        [new Vector2(1056, 393), COLOR.BLUE], // 2
        [new Vector2(1056, 433), COLOR.RED], // 3
        [new Vector2(1090, 374), COLOR.VIOLET], // 4
        [new Vector2(1090, 413), COLOR.ORANGE], // 5
        [new Vector2(1090, 452), COLOR.GREEN], // 6
        [new Vector2(1126, 354), COLOR.PINK], // 7
        [new Vector2(1126, 393), COLOR.BLACK], // 8
        [new Vector2(1126, 433), COLOR.L_YELLOW], // 9
        [new Vector2(1126, 472), COLOR.L_BLUE], // 10
        [new Vector2(1162, 335), COLOR.L_RED], // 11
        [new Vector2(1162, 374), COLOR.L_ORANGE], // 12
        [new Vector2(1162, 413), COLOR.L_VIOLET], // 13
        [new Vector2(1162, 452), COLOR.L_GREEN], // 14
        [new Vector2(1162, 491), COLOR.L_PINK], // 15
        [new Vector2(413, 413), COLOR.WHITE],
    ],
    delta: 1 / 177,


    // stick
    maxShotPower: 8000,
    powerInterval: 120,
    originXInterval: 5,
    stickOrigin: new Vector2(970, 11),
    stickShotOrigin: new Vector2(950, 11),

    // ball
    whiteBallInitialPos: new Vector2(413, 413),
    ballOrigin: new Vector2(25, 25),
    ballDiameter: 38,
    minVelocityLength: 5,
    frictionEnergyLoss: 0.016,
    collisionEnergyLoss: 0.02,

    // table
    pocketRadius: 46, 
    pockets: [
        new Vector2(750, 32),
        new Vector2(750, 794),
        new Vector2(62, 62),
        new Vector2(1435, 62),
        new Vector2(62, 762),
        new Vector2(1435, 762),
    ]
}