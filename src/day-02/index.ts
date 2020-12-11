import { readInputAsString } from '../helpers'

const inputFile = `${__dirname}/input.txt`;
const target = 19690720;

export const day2_step_1 = (noun = 12, verb = 2): number => {
    const program = readInputAsString(inputFile).split(",").map((v) => parseInt(v, 10))
    program[1] = noun
    program[2] = verb
    for (let i = 0; i < program.length; i += 4) {
        switch(program[i]) {
            case 1:
                program[program[i+3]] = program[program[i+1]] + program[program[i+2]]
                break;
            case 2:
                program[program[i+3]] = program[program[i+1]] * program[program[i+2]]
                break;
            case 99:
                return program[0]
            default:
                throw Error(`Invalid program code: ${program[i]}`);
        }
    }
    return program[0] // 4690667 is correct
}

export const day2_step_2 = (): number => {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            const output = day2_step_1(noun, verb);
            if (output === target) {
                return 100 * noun + verb; // 6255 is correct
            }
        }
    }
    throw Error("Unable to find the correct noun and verb")
}
