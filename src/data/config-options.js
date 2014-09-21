module.exports = {
    rockView: {
        ball:{
            size: {
                type: 'range',
                value: 80,
                min: 1,
                max: 200,
                step: 0.5
            },
            drag: {
                type: 'range',
                value: 0.78,
                min: 0,
                max: 0.9,
                step: 0.01
            },
            mass: {
                type: 'range',
                value: 10,
                min: 1,
                max: 20000,
                step: 0.5
            },
            numberOfBalls: {
                type: 'range',
                value: 8,
                min: 1,
                max: 20,
                step: 2
            }
        }
    }
};